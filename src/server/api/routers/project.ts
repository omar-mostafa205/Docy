import { z } from "zod";
import { downloadRepo } from "@/lib/downloadRepo";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { extractFile } from "@/lib/zipExtract";
import { TRPCError } from "@trpc/server";
import { generateApiDocumentation, generateTechnicalDocumentation } from "@/lib/ai";
import { unstable_cache } from 'next/cache';

export const projectRouter = createTRPCRouter({
    getDocumentations: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.session?.user.id) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        
        return ctx.db.documentation.findMany({
            where: {
                projectData: {
                    userId: ctx.session.user.id
                }
            }
        })
    }),

    createRepo: publicProcedure.input(z.object({
        repoisteryUrl: z.string(),
        repoToken: z.string(),
        type: z.enum(['technical', 'api', 'both'])
    })).mutation(async ({ ctx, input }) => {
        try {
            if (!ctx.session?.user.id) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'You must be logged in to create a repository'
                });
            }

            if (!input.repoisteryUrl || !input.repoToken) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Repository URL and access token are required'
                });
            }

            const userId = ctx.session.user.id;

            const userProjects = await ctx.db.projectData.findMany({
                where: {
                    userId: userId
                },
                include: {
                    documentaion: true
                }
            });

            const totalDocs = userProjects.reduce((acc, project) => acc + project.documentaion.length, 0);

            if (totalDocs >= 300) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'You have reached your free limit'
                });
            }

            const existingProject = await ctx.db.projectData.findFirst({
                where: {
                    repoisteryUrl: input.repoisteryUrl,
                    userId: userId
                }
            });

            let projectData;
            if (existingProject) {
                projectData = existingProject;
            } else {
                projectData = await ctx.db.projectData.create({
                    data: {
                        repoisteryUrl: input.repoisteryUrl,
                        userId: userId
                    }
                });
            }

            let zipBuffer;
            try {
                zipBuffer = await downloadRepo(input.repoisteryUrl, input.repoToken);
            } catch (downloadError) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Failed to download repository: ${downloadError instanceof Error ? downloadError.message : 'Unknown error'}`,
                    cause: downloadError
                });
            }

            if (!zipBuffer) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to download repository. The zip buffer is empty.'
                });
            }

            let ast;
            try {
                ast = await extractFile(zipBuffer);
            } catch (extractError) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Failed to extract repository files: ${extractError instanceof Error ? extractError.message : 'Unknown error'}`,
                    cause: extractError
                });
            }

            try {
                if (input.type === 'technical') {
                    const documentation = await generateTechnicalDocumentation(ast);
                    await ctx.db.documentation.create({
                        data: {
                            projectDataId: projectData.id,
                            body: JSON.stringify(documentation),
                            type: "TECHNICAL"
                        }
                    });
                }
                else if (input.type === 'api') {
                    const apiDocumentation = await generateApiDocumentation(ast);
                    await ctx.db.documentation.create({
                        data: {
                            projectDataId: projectData.id,
                            body: JSON.stringify(apiDocumentation),
                            type: "API"
                        }
                    });
                }
                else {
                    const [technicalDocumentation, apiDocumentation] = await Promise.all([
                        generateTechnicalDocumentation(ast),
                        generateApiDocumentation(ast)
                    ]);

                    await ctx.db.$transaction([
                        ctx.db.documentation.create({
                            data: {
                                projectDataId: projectData.id,
                                body: JSON.stringify(technicalDocumentation),
                                type: "TECHNICAL"
                            }
                        }),
                        ctx.db.documentation.create({
                            data: {
                                projectDataId: projectData.id,
                                body: JSON.stringify(apiDocumentation),
                                type: "API"
                            }
                        })
                    ]);
                }
            } catch (aiError) {
                let errorMessage = 'Failed to generate documentation';
                
                if (aiError instanceof Error) {
                    if (aiError.message.includes('fetch failed')) {
                        errorMessage = 'Failed to connect to AI service. Please check your API configuration and internet connection.';
                    } else if (aiError.message.includes('timeout')) {
                        errorMessage = 'AI service request timed out. Please try again.';
                    } else if (aiError.message.includes('unauthorized') || aiError.message.includes('401')) {
                        errorMessage = 'AI service authentication failed. Please check your API key.';
                    } else if (aiError.message.includes('rate limit')) {
                        errorMessage = 'AI service rate limit exceeded. Please try again later.';
                    } else {
                        errorMessage = `AI generation failed: ${aiError.message}`;
                    }
                }
                
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: errorMessage,
                    cause: aiError
                });
            }

            return {
                success: true,
                projectId: projectData.id,
            };

        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }

            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: error instanceof Error ? error.message : 'Failed to create repository project',
                cause: error
            });
        }
    }),

    getDocById: publicProcedure.input(z.object({
        id: z.string()
    })).query(async ({ ctx, input }) => {
        const doc = await ctx.db.documentation.findUnique({
            where: {
                id: input.id
            }
        });

        if (!doc) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Documentation not found'
            });
        }

        return doc;
    }),

    getRepos: publicProcedure
        .input(z.object({
            userId: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            const repos = await ctx.db.projectData.findMany({
                where: {
                    userId: input.userId,
                },
            });

            return repos;
        }),

    getReopId: publicProcedure.input(z.object({
        id: z.string()
    })).query(async ({ ctx, input }) => {
        return ctx.db.projectData.findUnique({
            where: {
                id: input.id
            }
        })
    }),

    getDocsForUser: publicProcedure.input(z.object({
        userId: z.string()
    })).query(async ({ ctx, input }) => {
        const getDocs = await ctx.db.projectData.findMany({
            where: { userId: input.userId },
            include: {
                documentaion: true
            }
        });
        return getDocs.flatMap(project => project.documentaion);
    }),

    getDocs: publicProcedure.input(z.object({
        id: z.string()
    })).query(async ({ ctx, input }) => {
        const cachedDocs = await unstable_cache(
            async () => {
                return ctx.db.documentation.findMany({
                    where: {
                        projectDataId: input.id
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
            },
            [`docs-${input.id}`],
            {
                revalidate: 600,
                tags: [`docs-${input.id}`]
            }
        )();
        return cachedDocs;
    })
})