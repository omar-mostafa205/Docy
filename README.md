# Docy

<div align="center">
  <img src="public/docyh.png" alt="Docy Logo" width="1500"  hieght="1500"/>
  
  ### Write Docs Without Writing Them
  
  **AI-powered documentation generation for your codebase**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.0+-black.svg)](https://nextjs.org/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Demo](https://docy-liard.vercel.app/) · [Documentation](https://github.com/omar-mostafa205/Docy/blob/main/README.md) · [Report Bug]([https://docy-liard.vercel.app/s](https://docy-liard.vercel.app/)) · [Request Feature](https://github.com/omar-mostafa205/Docy/issues)

</div>

---

## Overview

**Docy** is an intelligent documentation platform that transforms your codebase into comprehensive, structured documentation using advanced AI and AST (Abstract Syntax Tree) analysis. Upload your repository, and within seconds, get professional-grade documentation that your team can actually use.

###  Key Features

- **AI-Powered Generation** - Leverages GPT-4/Claude to understand your code and generate meaningful documentation
- **AST Analysis** - Deep code structure analysis for accurate technical insights
- **Multiple Doc Types** - Generate technical docs, API references, or both
- **Secure Authentication** - OAuth integration with GitHub, GitLab, and Google
- **Instant Generation** - Get documentation in seconds, not hours
- **Project Dashboard** - Manage all your documentation projects in one place
- **Export Options** - Download docs in multiple formats (Markdown, PDF, HTML)
- **Beautiful UI** - Modern, responsive interface built with Tailwind CSS

---

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- pnpm, npm, or yarn
- PostgreSQL database
- OpenAI API key (or Anthropic/Google AI)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/omar-mostafa205/Docy.git
   cd docy
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your credentials:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/docy"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITLAB_CLIENT_ID="your-gitlab-client-id"
   GITLAB_CLIENT_SECRET="your-gitlab-client-secret"

   # AI Service (choose one)
   OPENAI_API_KEY="sk-..."
   # or
   ANTHROPIC_API_KEY="..."
   ```

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Architecture

Docy is built on the powerful [T3 Stack](https://create.t3.gg/), combining the best tools in the TypeScript ecosystem:

### Tech Stack

| Technology                                          | Purpose                         |
| --------------------------------------------------- | ------------------------------- |
| **[Next.js 15](https://nextjs.org)**                | React framework with App Router |
| **[TypeScript](https://www.typescriptlang.org/)**   | Type-safe development           |
| **[tRPC](https://trpc.io)**                         | End-to-end typesafe APIs        |
| **[Prisma](https://prisma.io)**                     | Type-safe database ORM          |
| **[NextAuth.js](https://next-auth.js.org)**         | Authentication & OAuth          |
| **[Tailwind CSS](https://tailwindcss.com)**         | Utility-first styling           |
| **[React Hook Form](https://react-hook-form.com/)** | Form management                 |
| **[Zod](https://zod.dev/)**                         | Schema validation               |

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  Next.js App Router • React • Tailwind • Framer Motion    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ tRPC
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                      Backend API Layer                      │
│            tRPC Routers • Server Actions • Auth            │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┼─────────┬─────────────┐
        │         │         │             │
        ▼         ▼         ▼             ▼
  ┌──────────┐ ┌──────┐ ┌──────────┐ ┌──────────┐
  │          │ │      │ │          │ │          │
  │ Database │ │  AI  │ │  GitHub  │ │   AST    │
  │ Prisma   │ │ APIs │ │   API    │ │ Analysis │
  │          │ │      │ │          │ │          │
  └──────────┘ └──────┘ └──────────┘ └──────────┘
```

---

##  How It Works

1. **Upload Your Repository**
   - Provide your GitHub/GitLab repository URL and access token
   - Choose documentation type (Technical, API, or Both)

2. **AST Analysis**
   - Docy downloads and extracts your codebase
   - Performs deep Abstract Syntax Tree analysis
   - Identifies code structure, patterns, and relationships

3. **AI Generation**
   - Structured data is sent to AI (GPT-4/Claude)
   - AI generates human-readable documentation
   - Includes architecture overview, API endpoints, and code explanations

4. **Review & Export**
   - View generated documentation in your dashboard
   - Edit and refine as needed
   - Export in multiple formats

---

## Documentation Types

### Technical Documentation

Perfect for developers joining your project

- System architecture overview
- Folder structure explanation
- Technology stack details
- Code patterns and conventions
- Setup and installation guides

### API Documentation

Ideal for backend teams and API consumers

- Complete endpoint reference
- Request/response examples
- Authentication methods
- Error handling guide
- Rate limiting information

### Full Package

Get both documentation types for complete project coverage

---

## Features In Detail

### Authentication

- **OAuth Integration**: Sign in with GitHub, GitLab, or Google
- **Secure Sessions**: NextAuth.js with database sessions
- **Protected Routes**: Automatic authentication checks

### Project Management

- **Dashboard**: View all your documentation projects
- **Search & Filter**: Quickly find specific documentation
- **Version Control**: Track documentation changes over time

### AI-Powered Generation

- **Smart Analysis**: Understands code context and relationships
- **Multiple AI Providers**: Support for OpenAI, Anthropic, and more
- **Customizable**: Fine-tune generation parameters

---

## Development

### Project Structure

```
docy/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/         # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   └── repo/          # Repository components
│   ├── server/            # Backend code
│   │   ├── api/           # tRPC routers
│   │   ├── auth.ts        # NextAuth configuration
│   │   └── db.ts          # Prisma client
│   ├── lib/               # Utility functions
│   │   ├── ai.ts          # AI generation logic
│   │   ├── downloadRepo.ts # Repository download
│   │   └── zipExtract.ts  # AST extraction
│   └── types/             # TypeScript types
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── package.json
```

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Prisma Studio
pnpm db:generate      # Generate Prisma Client

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript checks
pnpm format           # Format with Prettier
```

---

##  Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Docker

```bash
# Build
docker build -t docy .

# Run
docker run -p 3000:3000 docy
```

### Environment Variables

Ensure all required environment variables are set in your deployment platform:

- Database connection string
- NextAuth secret and URL
- OAuth provider credentials
- AI service API keys

---

##  Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with [T3 Stack](https://create.t3.gg/)
- Powered by [Gemeni-Flash](https://gemini.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

##  Support

- Email: support@docy.dev
- Issues: [GitHub Issues](https://github.com/omar-mostafa205/Docy/issues)
- Docs: [Documentation](https://docs.docy.dev)

---
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
// Actual handler code from AST (or relevant snippet)
createRepo: publicProcedure.input(z.object({
        repoisteryUrl: z.string(),
        repoToken: z.string(),
        type : z.enum(['technical', 'api', 'both'])
    })).mutation(async ({ctx, input}) => {
        // ... implementation
    }),
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
// Actual function signature from code
export async function generateTechnicalDocumentation(ast: any);
```

**Implementation:**

```typescript
// Relevant portions of actual implementation
import { documentationPrompt } from "./TechnicalPrompt";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateTechnicalDocumentation(ast: any) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: documentationPrompt(ast),
          },
        ],
      },
    ],
  });
  return response.response.text();
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

**Signature:**

```typescript
// Actual function signature from code
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
