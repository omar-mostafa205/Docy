import { z } from "zod";
import  { downloadRepo } from "@/lib/downloadRepo";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { extractFile } from "@/lib/zipExtract";
import { TRPCError } from "@trpc/server";
import { generateApiDocumentation, generateTechnicalDocumentation } from "@/lib/ai";
import { revalidateTag, unstable_cache } from 'next/cache';

export const projectRouter = createTRPCRouter({
    getDocumentations : publicProcedure.query(async ({ctx}) => {
        if (!ctx.session?.user.id) {
            throw new TRPCError({code: "UNAUTHORIZED"});
        }
        
        return ctx.db.documentation.findMany({
            where : {
                projectData : {
                    userId : ctx.session.user.id
                }
            }
        })
    }),

    createRepo: publicProcedure.input(z.object({
        repoisteryUrl: z.string(),
        repoToken: z.string(),
        type : z.enum(['technical', 'api', 'both'])
    })).mutation(async ({ctx, input}) => {
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

            const existingProject = await ctx.db.projectData.findFirst({
                where: {
                    repoisteryUrl: input.repoisteryUrl,
                    userId: userId
                }
            });

            let projectData;
            if(existingProject) {
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
                throw downloadError;
            }
            
            if (!zipBuffer) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to download repository. The zip buffer is empty.'
                });
            }

            const ast = await extractFile(zipBuffer);

            if(input.type === 'technical') {
                const documentation = await generateTechnicalDocumentation(ast);
                await ctx.db.documentation.create({
                    data: {
                        projectDataId: projectData.id,
                        body: JSON.stringify(documentation),
                        type : "TECHNICAL"
                    }
                });
            }
            else if(input.type === 'api') {
                const apiDocumentation = await generateApiDocumentation(ast);
                await ctx.db.documentation.create({
                    data: {
                        projectDataId: projectData.id,
                        body: JSON.stringify(apiDocumentation),
                        type : "API"
                    }
                });
            }
            else {
                const technicalDocumentation = await generateTechnicalDocumentation(ast);
                const apiDocumentation = await generateApiDocumentation(ast);
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

    getDocById : publicProcedure.input(z.object({
        id : z.string()
    })).query(async ({ctx, input}) => {
        const doc = await ctx.db.documentation.findUnique({
            where : {
                id : input.id
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
  

    getReopId : publicProcedure.input(z.object({
        id : z.string()
    })).query(async ({ctx, input}) => {
        return ctx.db.projectData.findUnique({
            where : {
                id : input.id
            }
        })
    }), 
    
    getDocs : publicProcedure.input(z.object({
        id: z.string()
    })).query(async ({ctx , input})=> {
        const cachedDocs = await unstable_cache(
            async () => {
                return ctx.db.documentation.findMany({
                    where : {
                        projectDataId : input.id
                    },
                    orderBy :{
                        createdAt : 'desc'
                    }
                })
            },
            [`docs-${input.id}`], 
            {
                revalidate : 600 , 
                tags : [`docs-${input.id}`]
            }
        )();
        return cachedDocs;
    })
    
})