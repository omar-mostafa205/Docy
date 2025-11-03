# API Reference Documentation

## Overview

**Technology Stack:**

- **Web Framework:** Next.js
- **API Layer:** tRPC
- **Database ORM:** Prisma
- **Authentication:** NextAuth.js
- **Validation:** Zod
- **Language:** TypeScript
- **AI Service:** Google Gemini

**Summary:**
This API supports the "Docy" application, an automated code documentation service. It manages user authentication via OAuth (GitHub, Google, GitLab), handles the processing of git repositories by downloading them, parsing the code into an Abstract Syntax Tree (AST), and then uses an AI service to generate API and technical documentation. The generated documentation and project metadata are stored in a database managed by Prisma.

---

## Authentication

### Authentication Method

**Type Detected:** OAuth with Session Management (NextAuth.js)

**Implementation Location:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/auth/config.ts`

**How Authentication Works:**
The application uses NextAuth.js to handle authentication. It is configured with OAuth providers for GitHub, Google, and GitLab. User sessions and account information are persisted to the database via the `PrismaAdapter`. Once authenticated, a session is established, which is used to authorize access to protected procedures and routes.

**Code Reference:**
The core NextAuth.js configuration is defined in `authConfig`.

_Source: `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/auth/config.ts`_

```typescript
// [Actual auth middleware or function from AST]
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import GitlabProvider from "next-auth/providers/gitlab";

import { db } from "@/server/db";

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_ID,
      clientSecret: process.env.GITLAB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
```

### Authentication Flow

Authentication is initiated from the frontend, which calls the `signIn` function provided by NextAuth.js. NextAuth.js then handles the entire OAuth 2.0 flow with the selected provider. All authentication-related API calls are managed by a catch-all Next.js route handler.

**Authentication Endpoint:** `POST /api/auth/[...nextauth]`
This is a catch-all route managed by NextAuth.js that handles various authentication actions like sign-in, sign-out, and callbacks from OAuth providers.

_Source: `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/app/api/auth/[...nextauth]/route.ts`_

```typescript
// Actual route handler code
import { handlers } from "@/server/auth";
export const { GET, POST } = handlers;
```

**Token Usage:**
The system uses session-based authentication managed by NextAuth.js. The session state is validated on the server-side within protected tRPC procedures and in Next.js middleware to control access.

### Authorization

Authorization is implemented by checking for a valid user session. There is no evidence of role-based access control in the codebase.

**Protected tRPC Procedures:**
tRPC procedures created with `protectedProcedure` will throw a `UNAUTHORIZED` error if the user session does not exist.

_Source: `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/trpc.ts`_

```typescript
// Actual permission checking code
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
```

**Protected Routes (Middleware):**
The Next.js middleware protects routes starting with `/dashboard`, `/docs`, and `/upload-repo`. Unauthenticated users attempting to access these routes will be redirected to the sign-in page.

_Source: `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/middleware.ts`_

```typescript
// Actual permission checking code
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoutes = [
    req.nextUrl.pathname.startsWith("/dashboard"),
    req.nextUrl.pathname.startsWith("/docs"),
    req.nextUrl.pathname.startsWith("/upload-repo"),
  ];
  const isProtectedRoute = isProtectedRoutes.some(Boolean);

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
});
```

---

## API Endpoints

All backend logic is exposed via tRPC procedures, which are handled by a single Next.js API route.

### `POST /api/trpc/[trpc]`

This is the single entry point for all tRPC API calls. The specific procedure to be executed is determined by the `trpc` path parameter and the request payload.

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/app/api/trpc/[trpc]/route.ts:34`

**Description:** Handles all incoming tRPC requests, routing them to the appropriate router and procedure based on the path.

**Route Handler:**

```typescript
// Actual handler code from AST (or relevant snippet)
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
```

---

### tRPC Procedures

The following procedures are available under the `/api/trpc` endpoint. Procedures are grouped by their respective routers.

### Post Procedures

Router for managing `Post` entities.

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/post.ts`

#### `post.hello` (Query)

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/post.ts:10`

**Description:** A public procedure for testing purposes that returns a greeting message.

**Authentication Required:** No

**Route Handler:**

```typescript
// Actual handler code from AST (or relevant snippet)
hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
```

**Request Body Schema:**

```typescript
// Actual Zod schema from code
z.object({ text: z.string() });
```

**Response Schema:**

```typescript
{
  greeting: string;
}
```

#### `post.create` (Mutation)

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/post.ts:18`

**Description:** Creates a new `Post` record in the database, associating it with the currently authenticated user.

**Authentication Required:** Yes

**Route Handler:**

```typescript
// Actual handler code from AST (or relevant snippet)
create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
```

**Request Body Schema:**

```typescript
// Actual Zod schema from code
z.object({ name: z.string().min(1) });
```

**Database Operations:**

- Writes to: `Post` table

#### `post.getLatest` (Query)

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/post.ts:28`

**Description:** Retrieves the most recent `Post` created by the authenticated user.

**Authentication Required:** Yes

**Route Handler:**

```typescript
// Actual handler code from AST (or relevant snippet)
getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),
```

**Database Operations:**

- Reads from: `Post` table

#### `post.getSecretMessage` (Query)

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/post.ts:37`

**Description:** A protected procedure that returns a static secret message to authenticated users.

**Authentication Required:** Yes

**Route Handler:**

```typescript
// Actual handler code from AST (or relevant snippet)
getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
```

---

### Project Procedures

Router for managing projects and documentation.

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/project.ts`

#### `project.createRepo` (Mutation)

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/project.ts:24`

**Description:** The core business logic endpoint. It takes a repository URL and token, downloads the repository, parses it to create an AST, generates documentation using an AI model, and saves the project and documentation data to the database.

**Authentication Required:** Yes (checked inside the procedure)

**Route Handler:**

```typescript
.input(z.object({
    repoisteryUrl: z.string(),
    repoToken: z.string(),
    type : z.enum(['technical', 'api', 'both'])
}))
.mutation(async ({ctx, input}) => { ... })
```

**Request Body Schema:**

```typescript
// Actual Zod schema from code
z.object({
  repoisteryUrl: z.string(),
  repoToken: z.string(),
  type: z.enum(["technical", "api", "both"]),
});
```

**Database Operations:**

- Reads from: `ProjectData`
- Writes to: `ProjectData`, `Documentation`
- Uses transaction: Yes (when creating both technical and API docs)

**Side Effects:**

- Calls `downloadRepo()` to fetch a git repository from GitHub, GitLab, or Azure DevOps.
- Calls `extractFile()` to parse the downloaded code into an AST.
- Calls `generateTechnicalDocumentation()` and/or `generateApiDocumentation()` which make external API calls to the Google Gemini AI service.

**Error Handling Code:**

```typescript
// Actual error handling from route handler
if (!ctx.session?.user.id) {
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "You must be logged in to create a repository",
  });
}
// ...
if (!zipBuffer) {
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Failed to download repository. The zip buffer is empty.",
  });
}
```

#### `project.getRepos` (Query)

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/project.ts:164`

**Description:** Retrieves all repository projects associated with a given user ID. The result is cached for 600 seconds.

**Authentication Required:** No (but requires a `userId` which is typically from an authenticated session)

**Route Handler:**

```typescript
// Actual handler code from AST (or relevant snippet)
getRepos: publicProcedure.input(z.object({
        userId: z.string()
    })).query(async ({ctx, input}) => {
        const cachedRepos = await unstable_cache(
            async () => {
                return ctx.db.projectData.findMany({
                    where: {
                        userId: input.userId
                    }
                });
            },
            [`repos-${input.userId}`],
            {
                revalidate: 600,
                tags: [`repos-${input.userId}`]
            }
        )();
        return cachedRepos;
    }),
```

**Request Body Schema:**

```typescript
// Actual Zod schema from code
z.object({
  userId: z.string(),
});
```

**Database Operations:**

- Reads from: `ProjectData`

#### `project.getDocs` (Query)

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/project.ts:194`

**Description:** Retrieves all documentation records associated with a project ID, ordered by creation date descending. The result is cached for 600 seconds.

**Authentication Required:** No

**Route Handler:**

```typescript
// Actual handler code from AST (or relevant snippet)
getDocs: publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const cachedDocs = await unstable_cache(
      async () => {
        return ctx.db.documentation.findMany({
          where: {
            projectDataId: input.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      },
      [`docs-${input.id}`],
      {
        revalidate: 600,
        tags: [`docs-${input.id}`],
      },
    )();
    return cachedDocs;
  });
```

**Request Body Schema:**

```typescript
// Actual Zod schema from code
z.object({
  id: z.string(),
});
```

**Database Operations:**

- Reads from: `Documentation`

---

## Data Models

⚠️ No `schema.prisma` file was found in the provided codebase. The following data models are inferred from their usage with the Prisma Client in the API routes.

### Post

**Inferred from:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/post.ts`

**Database Table/Collection:** `post`

| **Field Details:** | Field        | Type         | Required                                | Description        |
| ------------------ | ------------ | ------------ | --------------------------------------- | ------------------ | ----- | ------------ | ------------ | ----------- |
| `name`             | String       | Yes          | The name or content of the post.        |
| `createdBy`        | User         | Yes          | A relation to the user who created it.  |
| `createdAt`        | Date         | Yes          | Timestamp of when the post was created. | **Relationships:** | Field | Relationship | Target Model | Description |
| -----------        | ------------ | ------------ | ----------------------------            |
| `createdBy`        | Many-to-One  | `User`       | The user who created the post.          | ### ProjectData    |

**Inferred from:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/project.ts`

**Database Table/Collection:** `projectData`

| **Field Details:** | Field        | Type            | Required                                       | Description        |
| ------------------ | ------------ | --------------- | ---------------------------------------------- | ------------------ | ----- | ------------ | ------------ | ----------- |
| `id`               | String       | Yes             | Unique identifier for the project.             |
| `repoisteryUrl`    | String       | Yes             | The URL of the git repository.                 |
| `userId`           | String       | Yes             | The ID of the user who owns this project.      |
| `zipFileName`      | String       | No              | The name of the uploaded zip file (if applic). | **Relationships:** | Field | Relationship | Target Model | Description |
| --------           | ------------ | --------------- | ----------------------------------------       |
| `user`             | Many-to-One  | `User`          | The user who owns the project.                 |
| `docs`             | One-to-Many  | `Documentation` | The documentation generated for this proj.     | ### Documentation  |

**Inferred from:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/project.ts`

**Database Table/Collection:** `documentation`

| **Field Details:** | Field                         | Type          | Required                                         | Description        |
| ------------------ | ----------------------------- | ------------- | ------------------------------------------------ | ------------------ | ----- | ------------ | ------------ | ----------- |
| `id`               | String                        | Yes           | Unique identifier for the documentation record.  |
| `projectDataId`    | String                        | Yes           | Foreign key linking to the `ProjectData` record. |
| `body`             | String                        | Yes           | The JSON string of the generated documentation.  |
| `type`             | Enum (`"TECHNICAL"`, `"API"`) | Yes           | The type of documentation generated.             |
| `createdAt`        | Date                          | Yes           | Timestamp of when the documentation was created. | **Relationships:** | Field | Relationship | Target Model | Description |
| -------------      | ------------                  | ------------- | ------------------------------------------       |
| `projectData`      | Many-to-One                   | `ProjectData` | The project this documentation belongs to.       | ---                |

## Type Definitions

### Repository

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/components/DashboardNav.tsx`

**Definition:**

```typescript
// Exact type/interface definition from code
interface Repository {
  id: string;
  name?: string;
  repoisteryUrl?: string;
  zipFileName?: string;
  githubUrl?: string;
  createdAt: Date;
}
```

**Used By:**

- `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/components/DashboardNav.tsx`

### Doc

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/components/DocCard.tsx`

**Definition:**

```typescript
// Exact type/interface definition from code
type Doc = {
  id: string;
  title?: string;
  description?: string;
  body: string | object;
  type: string;
  createdAt: string;
  updatedAt: string;
};
```

**Used By:**

- `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/components/DocCard.tsx`
- `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/components/RenderDocs.tsx`

---

## Business Logic & Services

### AI Service Wrappers

**Location:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/lib/ai.ts`

**Purpose:** This module contains functions that interact with the Google Gemini AI service to generate documentation from a provided AST.

#### `generateTechnicalDocumentation()`

**Signature:**

```typescript
interface RenderDocumentProps {
  documentetaion: string;
}
```

| **Parameters:** | Parameter | Type | Required                             | Description                                                                         |
| --------------- | --------- | ---- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| `ast`           | `any`     | Yes  | The AST of the codebase to document. | **Returns:** `Promise<string>` - The generated technical documentation as a string. |

**Dependencies:**

- Google Gemini API (`@google/genai`)
- `documentationPrompt` from `./TechnicalPrompt`

#### `generateApiDocumentation()`

**Signature:**

```typescript
// Actual function signature from code
export async function generateApiDocumentation(ast: any);
```

**Implementation:**

```typescript
// Relevant portions of actual implementation
import { apiDocumentationPrompt } from "./ApiPrompt";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateApiDocumentation(ast: any) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: apiDocumentationPrompt(ast),
          },
        ],
      },
    ],
  });

  return response.response.text();
}
```

| **Parameters:** | Parameter | Type | Required                             | Description                                                                   |
| --------------- | --------- | ---- | ------------------------------------ | ----------------------------------------------------------------------------- |
| `ast`           | `any`     | Yes  | The AST of the codebase to document. | **Returns:** `Promise<string>` - The generated API documentation as a string. |

**Dependencies:**

- Google Gemini API (`@google/genai`)
- `apiDocumentationPrompt` from `./ApiPrompt`

### Repository Downloader

**Location:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/lib/downloadRepo.ts`

**Purpose:** Provides functionality to download a git repository as a zip archive from various providers (GitHub, GitLab, Azure DevOps).

#### `downloadRepo()`

**Location:** `src/lib/downloadRepo.ts`
**Purpose:** Downloads a Git repository as a zip archive from GitHub, GitLab, or Azure DevOps.

**Signature:**

```typescript
export async function downloadRepo(
  repoUrl: string,
  repoToken: string,
): Promise<Buffer | null>;
```

**Implementation:**

```typescript
// Relevant portions of actual implementation
export async function downloadRepo(
  repoUrl: string,
  repoToken: string,
): Promise<Buffer | null> {
  try {
    const repoInfo = parseRepoUrl(repoUrl);
    const downloadUrl = buildDownloadUrl(repoInfo);
    const headers = buildHeaders(repoInfo.provider, repoToken);

    const res = await axios.get(downloadUrl, {
      headers,
      responseType: "arraybuffer",
      maxRedirects: 5,
    });

    const buffer = Buffer.from(res.data);
    return buffer;
  } catch (error: any) {
    // ... error handling
  }
}
```

| **Parameters:** | Parameter | Type | Required                                    | Description                  |
| --------------- | --------- | ---- | ------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------- |
| `repoUrl`       | `string`  | Yes  | The full URL of the git repository.         |
| `repoToken`     | `string`  | Yes  | A personal access token for the repository. | **Returns:** `Promise<Buffer | null>`- A buffer containing the downloaded zip file, or`null` on failure. |

**Dependencies:**

- `axios`

### ZIP Extractor & AST Parser

**Location:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/lib/zipExtract.ts`

**Purpose:** Extracts files from a zip buffer, filters out ignored files, and parses the content of supported files into an AST representation.

#### `extractFile()`

**Location:** `src/lib/zipExtract.ts`
**Purpose:** Takes a zip file buffer, extracts it to a temporary directory, and recursively walks through the files, parsing supported file types into an array of `ParsedFile` AST objects.

**Signature:**

```typescript
// Actual function signature from code
export async function extractFile(zipFile: Buffer): Promise<ParsedFile[]>;
```

**Implementation:**

```typescript
// Relevant portions of actual implementation
export async function extractFile(zipFile: Buffer): Promise<ParsedFile[]> {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "repo-"));
  const parsedFiles: ParsedFile[] = [];
  try {
    const zip = new AdmZip(zipFile);
    zip.extractAllTo(tempDir, true);

    // ... recursive file walking and parsing
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
  return parsedFiles;
}
```

| **Parameters:** | Parameter | Type | Required                                     | Description                                                                                                   |
| --------------- | --------- | ---- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `zipFile`       | `Buffer`  | Yes  | A buffer containing the repository zip file. | **Returns:** `Promise<ParsedFile[]>` - An array of `ParsedFile` objects representing the AST of the codebase. |

**Dependencies:**

- `adm-zip`
- Node.js `fs`, `os`, `path` modules
- `parseFile` from `./ast` (AST parser not provided in detail)

---

## Middleware

### Route Protection Middleware

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/middleware.ts`

**Purpose:** To protect specific application routes from unauthenticated access. It leverages NextAuth.js's middleware integration.

**Implementation:**

```typescript
// Actual middleware function
import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoutes = [
    req.nextUrl.pathname.startsWith("/dashboard"),
    req.nextUrl.pathname.startsWith("/docs"),
    req.nextUrl.pathname.startsWith("/upload-repo"),
  ];
  const isProtectedRoute = isProtectedRoutes.some(Boolean);

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
});
```

**Applied To:**
Routes matching the following patterns:

- `/dashboard/**`
- `/docs/**`
- `/upload-repo/**`

---

## Error Handling

### tRPC Error Handling

**Error Handler Middleware:**
The tRPC server is configured with an `errorFormatter` that automatically includes flattened Zod validation errors in the response payload under the `zodError` key.

_Source: `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/trpc.ts`_

```typescript
// Actual error handling middleware
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
```

**Error Response Format:**
When a Zod validation error occurs, the response will include a `zodError` object with details about the validation failure. For other errors, a standard tRPC error shape is returned.

---

## Validation

**Validation Library:** Zod

### Validation Schemas

#### `createRepo` Input Schema

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/project.ts:24`

```typescript
// Actual validation schema definition
z.object({
  repoisteryUrl: z.string(),
  repoToken: z.string(),
  type: z.enum(["technical", "api", "both"]),
});
```

**Used In:** `project.createRepo` tRPC mutation.

#### `createPost` Input Schema

**Source:** `omar-mostafa205-Docy-92eff79bcd7deda297ae677ef469a16d8c435fca/src/server/api/routers/post.ts:19`

```typescript
// Actual validation schema definition
z.object({ name: z.string().min(1) });
```

**Used In:** `post.create` tRPC mutation.

---

## Configuration & Environment

**Configuration Files Found:**

- `next.config.js`: Configuration for the Next.js framework.
- `src/env.js`: Defines and validates environment variables using `@t3-oss/env-nextjs`.
- `tsconfig.json`: TypeScript compiler configuration.

| **Environment Variables Used:** | Variable                         | Used In                                                    | Purpose |
| ------------------------------- | -------------------------------- | ---------------------------------------------------------- | ------- |
| `NODE_ENV`                      | `src/env.js`, `src/server/db.ts` | Defines the runtime environment (development, production). |
| `DATABASE_URL`                  | `src/env.js`                     | Connection string for the Prisma database.                 |
| `AUTH_SECRET`                   | `src/env.js`                     | Secret key used by NextAuth.js for session encryption.     |
| `GITHUB_ID`                     | `src/server/auth/config.ts`      | Client ID for the GitHub OAuth provider.                   |
| `GITHUB_SECRET`                 | `src/server/auth/config.ts`      | Client Secret for the GitHub OAuth provider.               |
| `GOOGLE_ID`                     | `src/server/auth/config.ts`      | Client ID for the Google OAuth provider.                   |
| `GOOGLE_SECRET`                 | `src/server/auth/config.ts`      | Client Secret for the Google OAuth provider.               |
| `GITLAB_ID`                     | `src/server/auth/config.ts`      | Client ID for the GitLab OAuth provider.                   |
| `GITLAB_SECRET`                 | `src/server/auth/config.ts`      | Client Secret for the GitLab OAuth provider.               |
| `GEMINI_API_KEY`                | `src/lib/ai.ts`                  | API key for the Google Gemini AI service.                  | ---     |

## Dependencies

| **Key Dependencies:** | Package             | Version                         | Purpose |
| --------------------- | ------------------- | ------------------------------- | ------- |
| `next`                | Unable to determine | Web Framework                   |
| `@prisma/client`      | Unable to determine | Database ORM                    |
| `next-auth`           | Unable to determine | Authentication                  |
| `@trpc/server`        | Unable to determine | API Layer                       |
| `@trpc/react-query`   | Unable to determine | tRPC client for React           |
| `zod`                 | Unable to determine | Validation                      |
| `@google/genai`       | Unable to determine | AI Service SDK                  |
| `axios`               | Unable to determine | HTTP Client                     |
| `adm-zip`             | Unable to determine | ZIP file manipulation           |
| `tree-sitter`         | Unable to determine | Code Parsing                    |
| `@t3-oss/env-nextjs`  | Unable to determine | Environment variable validation | ---     |

## Limitations of This Documentation

- Generated from static code analysis of AST
- Runtime behavior may differ from static analysis
- Dynamic routes or programmatically generated endpoints may not be captured
- Environment-specific configurations may not be visible
- Third-party service integrations may not be fully documented
- **This documentation only includes what exists in the provided code**
- The exact database schema could not be documented as `schema.prisma` was not provided; models were inferred from ORM usage.
