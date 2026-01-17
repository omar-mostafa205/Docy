# Docy

<div align="center">
  <img src="public/docyh.png" alt="Docy Logo" width="1500" height="1500"/>
  
  ### Write Docs Without Writing Them
  
  **AI-powered documentation generation for your codebase**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.0+-black.svg)](https://nextjs.org/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Demo](https://docy-liard.vercel.app/) · [Documentation](https://github.com/omar-mostafa205/Docy/blob/main/README.md) · [Report Bug](https://github.com/omar-mostafa205/Docy/issues) · [Request Feature](https://github.com/omar-mostafa205/Docy/issues)

</div>

---

## Overview

**Docy** is an intelligent documentation platform that transforms your codebase into comprehensive, structured documentation using advanced AI and AST (Abstract Syntax Tree) analysis. Upload your repository, and within seconds, get professional-grade documentation that your team can actually use.

### Key Features

- **AI-Powered Generation** - Leverages Gemini AI to understand your code and generate meaningful documentation
- **AST Analysis** - Deep code structure analysis for accurate technical insights
- **Multiple Doc Types** - Generate technical docs, API references, or both
- **Secure Authentication** - OAuth integration with GitHub, GitLab, and Google
- **Instant Generation** - Get documentation in seconds, not hours
- **Project Dashboard** - Manage all your documentation projects in one place
- **Export Options** - Download docs in Markdown format
- **Beautiful UI** - Modern, responsive interface built with Tailwind CSS

---

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- pnpm, npm, or yarn
- PostgreSQL database
- Google Gemini API key

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

   Create a `.env` file in the project root:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/docy"

   # NextAuth
   AUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   GOOGLE_ID="your-google-client-id"
   GOOGLE_SECRET="your-google-client-secret"
   GITLAB_ID="your-gitlab-client-id"
   GITLAB_SECRET="your-gitlab-client-secret"

   # AI Service
   GEMINI_API_KEY="your-gemini-api-key"
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

Docy is built on the powerful [T3 Stack](https://create.t3.gg/), combining the best tools in the TypeScript ecosystem.

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

### System Architecture Diagram

```mermaid
graph TD
    subgraph Browser
        A[React Components] -->|tRPC Hooks| B[tRPC Client]
    end

    subgraph Server_NextJS[Server Next.js]
        B -->|HTTP Requests| C[tRPC API Route]
        C -->|Procedure Calls| D[tRPC Routers]
        D -->|Database Queries| E{Prisma ORM}
        D -->|Auth Checks| F[NextAuth.js Middleware]
        D -->|File AI Processing| G[Core Library]
    end

    subgraph Core_Library[Core Library src/lib]
        G -->|calls| H[downloadRepo.ts]
        G -->|calls| I[zipExtract.ts / ast.ts]
        G -->|calls| J[ai.ts]
    end

    subgraph External_Services[External Services]
        E -->|SQL| K[Database]
        J -->|API Call| L[Google Gemini AI]
        F -->|OAuth| M[Auth Providers]
    end

    style Browser fill:#e6f7ff,stroke:#91d5ff
    style Server_NextJS fill:#f6ffed,stroke:#b7eb8f
    style External_Services fill:#fffbe6,stroke:#ffe58f
```

---

## How It Works

1. **Upload Your Repository**
   - Provide your GitHub/GitLab repository URL and access token
   - Choose documentation type (Technical, API, or Both)

2. **AST Analysis**
   - Docy downloads and extracts your codebase
   - Performs deep Abstract Syntax Tree analysis
   - Identifies code structure, patterns, and relationships

3. **AI Generation**
   - Structured data is sent to Google Gemini AI
   - AI generates human-readable documentation
   - Includes architecture overview, API endpoints, and code explanations

4. **Review & Export**
   - View generated documentation in your dashboard
   - Export in Markdown format

---

## Documentation Types

### Technical Documentation

Perfect for developers joining your project:

- System architecture overview
- Folder structure explanation
- Technology stack details
- Code patterns and conventions
- Setup and installation guides

### API Documentation

Ideal for backend teams and API consumers:

- Complete endpoint reference
- Request/response examples
- Authentication methods
- Error handling guide
- Validation schemas

### Full Package

Get both documentation types for complete project coverage.

---

## Features

### Authentication

- **OAuth Integration**: Sign in with GitHub, GitLab, or Google
- **Secure Sessions**: NextAuth.js with database sessions
- **Protected Routes**: Automatic authentication checks

### Project Management

- **Dashboard**: View all your documentation projects
- **Quick Access**: See recently created documentation
- **Project History**: Track all generated documentation

### AI-Powered Generation

- **Smart Analysis**: Understands code context and relationships
- **Google Gemini**: Powered by advanced AI models
- **Accurate Output**: Generates precise, structured documentation

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
│   │   └── dashboard/     # Dashboard components
│   ├── server/            # Backend code
│   │   ├── api/           # tRPC routers
│   │   ├── auth/          # NextAuth configuration
│   │   └── db.ts          # Prisma client
│   ├── lib/               # Utility functions
│   │   ├── ai.ts          # AI generation logic
│   │   ├── downloadRepo.ts # Repository download
│   │   └── zipExtract.ts  # AST extraction
│   └── types/             # TypeScript types
├── prisma/
│   └── schema.prisma      # Database schema
└── public/                # Static assets
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

## Deployment

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
- Gemini API key

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with [T3 Stack](https://create.t3.gg/)
- Powered by [Google Gemini](https://gemini.google.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

## Support

- **Email**: support@docy.dev
- **Issues**: [GitHub Issues](https://github.com/omar-mostafa205/Docy/issues)
- **Documentation**: [Full Docs](https://github.com/omar-mostafa205/Docy/blob/main/README.md)

---

# API Reference Documentation

## Overview

This API supports the Docy application, an automated code documentation service. It manages user authentication via OAuth, processes git repositories, analyzes code structure using AST, and generates documentation using Google Gemini AI.

### Technology Stack

- **Web Framework**: Next.js 15
- **API Layer**: tRPC
- **Database ORM**: Prisma
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Language**: TypeScript
- **AI Service**: Google Gemini

---

## Authentication

### Authentication Method

**Type**: OAuth 2.0 with Session Management (NextAuth.js)

**Implementation**: `src/server/auth/config.ts`

The application uses NextAuth.js with OAuth providers for GitHub, Google, and GitLab. User sessions and accounts are persisted to the database via `PrismaAdapter`.

**Configuration Example**:

```typescript
import { PrismaAdapter } from "@auth/prisma-adapter";
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
};
```

### Authentication Endpoints

**Endpoint**: `/api/auth/[...nextauth]`

**Methods**: GET, POST

**Description**: Catch-all route that handles sign-in, sign-out, and OAuth callbacks.

**Implementation**:

```typescript
import { handlers } from "@/server/auth";
export const { GET, POST } = handlers;
```

### Authorization

Authorization is implemented through session validation. Protected tRPC procedures throw `UNAUTHORIZED` errors if no valid session exists.

**Protected Procedure Example**:

```typescript
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
```

**Route Protection (Middleware)**:

Protected routes: `/dashboard/**`, `/docs/**`, `/upload-repo/**`

```typescript
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

All backend logic is exposed via tRPC procedures through a single API route.

### Base Endpoint

**Route**: `/api/trpc/[trpc]`

**Methods**: GET, POST

**Description**: Single entry point for all tRPC API calls. The specific procedure is determined by the path parameter and request payload.

---

## tRPC Procedures

### Post Router

Manages `Post` entities (example/test endpoints).

#### `post.hello` (Query)

**Authentication**: Not required

**Description**: Test procedure that returns a greeting message.

**Input Schema**:

```typescript
z.object({
  text: z.string(),
});
```

**Example Request**:

```json
{
  "text": "World"
}
```

**Example Response**:

```json
{
  "greeting": "Hello World"
}
```

#### `post.create` (Mutation)

**Authentication**: Required

**Description**: Creates a new post associated with the authenticated user.

**Input Schema**:

```typescript
z.object({
  name: z.string().min(1),
});
```

**Database Operations**:

- Writes to `Post` table

#### `post.getLatest` (Query)

**Authentication**: Required

**Description**: Retrieves the most recent post created by the authenticated user.

**Database Operations**:

- Reads from `Post` table

#### `post.getSecretMessage` (Query)

**Authentication**: Required

**Description**: Returns a static secret message to authenticated users.

**Response**: `"you can now see this secret message!"`

---

### Project Router

Manages projects and documentation generation.

#### `project.createRepo` (Mutation)

**Authentication**: Required

**Description**: Core endpoint that downloads a repository, analyzes it, generates documentation using AI, and saves results to the database.

**Input Schema**:

```typescript
z.object({
  repoisteryUrl: z.string(),
  repoToken: z.string(),
  type: z.enum(["technical", "api", "both"]),
});
```

**Example Request**:

```json
{
  "repoisteryUrl": "https://github.com/username/repo",
  "repoToken": "ghp_xxxxxxxxxxxxx",
  "type": "both"
}
```

**Process Flow**:

1. Validates user authentication
2. Downloads repository using `downloadRepo()`
3. Extracts and parses files using `extractFile()`
4. Generates documentation using Google Gemini AI
5. Saves project and documentation to database

**Database Operations**:

- Reads from: `ProjectData`
- Writes to: `ProjectData`, `Documentation`
- Uses transactions when creating multiple documentation types

**Possible Errors**:

- `UNAUTHORIZED`: User not logged in
- `INTERNAL_SERVER_ERROR`: Failed to download repository or generate documentation

#### `project.getRepos` (Query)

**Authentication**: Not required (but requires userId)

**Description**: Retrieves all repository projects for a user. Results are cached for 600 seconds.

**Input Schema**:

```typescript
z.object({
  userId: z.string(),
});
```

**Example Response**:

```json
[
  {
    "id": "clx123abc",
    "userId": "user-abc-123",
    "repoisteryUrl": "https://github.com/user/repo",
    "zipFileName": null,
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
]
```

**Database Operations**:

- Reads from: `ProjectData`

#### `project.getDocs` (Query)

**Authentication**: Not required

**Description**: Retrieves all documentation for a specific project, ordered by creation date descending. Results are cached for 600 seconds.

**Input Schema**:

```typescript
z.object({
  id: z.string(),
});
```

**Example Response**:

```json
[
  {
    "id": "doc-xyz-789",
    "body": "# Documentation...",
    "type": "TECHNICAL",
    "projectDataId": "clx123abc",
    "createdAt": "2024-01-15T10:01:00.000Z",
    "updatedAt": "2024-01-15T10:01:00.000Z"
  }
]
```

**Database Operations**:

- Reads from: `Documentation`

---

## Data Models

The following models are inferred from Prisma Client usage in the codebase.

### Post

**Table**: `post`

**Fields**:

| Field       | Type   | Required | Description        |
| ----------- | ------ | -------- | ------------------ |
| `name`      | String | Yes      | Post content       |
| `createdBy` | User   | Yes      | Creator relation   |
| `createdAt` | Date   | Yes      | Creation timestamp |

**Relationships**:

| Field       | Relationship | Target Model | Description                   |
| ----------- | ------------ | ------------ | ----------------------------- |
| `createdBy` | Many-to-One  | `User`       | The user who created the post |

### ProjectData

**Table**: `projectData`

**Fields**:

| Field           | Type   | Required | Description           |
| --------------- | ------ | -------- | --------------------- |
| `id`            | String | Yes      | Unique identifier     |
| `repoisteryUrl` | String | Yes      | Git repository URL    |
| `userId`        | String | Yes      | Owner user ID         |
| `zipFileName`   | String | No       | Uploaded zip filename |
| `createdAt`     | Date   | Yes      | Creation timestamp    |

**Relationships**:

| Field  | Relationship | Target Model    | Description                              |
| ------ | ------------ | --------------- | ---------------------------------------- |
| `user` | Many-to-One  | `User`          | The user who owns the project            |
| `docs` | One-to-Many  | `Documentation` | Documentation generated for this project |

### Documentation

**Table**: `documentation`

**Fields**:

| Field           | Type   | Required | Description             |
| --------------- | ------ | -------- | ----------------------- |
| `id`            | String | Yes      | Unique identifier       |
| `projectDataId` | String | Yes      | Project foreign key     |
| `body`          | String | Yes      | Generated documentation |
| `type`          | Enum   | Yes      | TECHNICAL or API        |
| `createdAt`     | Date   | Yes      | Creation timestamp      |
| `updatedAt`     | Date   | Yes      | Last update timestamp   |

**Type Enum Values**:

- `TECHNICAL` - Technical documentation
- `API` - API reference documentation

**Relationships**:

| Field         | Relationship | Target Model  | Description                               |
| ------------- | ------------ | ------------- | ----------------------------------------- |
| `projectData` | Many-to-One  | `ProjectData` | The project this documentation belongs to |

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ PROJECT_DATA : has
    USER ||--o{ POST : creates
    PROJECT_DATA ||--|{ DOCUMENTATION : contains

    USER {
        string id PK
        string name
        string email
        string image
        datetime emailVerified
    }

    PROJECT_DATA {
        string id PK
        string userId FK
        string repoisteryUrl
        string zipFileName
        datetime createdAt
    }

    DOCUMENTATION {
        string id PK
        string projectDataId FK
        string body
        string type
        datetime createdAt
        datetime updatedAt
    }

    POST {
        string id PK
        string name
        string createdById FK
        datetime createdAt
    }
```

---

## Type Definitions

### Repository

**Source**: `src/components/DashboardNav.tsx`

```typescript
interface Repository {
  id: string;
  name?: string;
  repoisteryUrl?: string;
  zipFileName?: string;
  githubUrl?: string;
  createdAt: Date;
}
```

**Used By**:

- Dashboard navigation components
- Repository listing components

### Doc

**Source**: `src/components/DocCard.tsx`

```typescript
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

**Used By**:

- Documentation display components
- Documentation rendering logic

---

## Business Logic & Services

### AI Service

**Location**: `src/lib/ai.ts`

Interacts with Google Gemini AI to generate documentation.

#### `generateTechnicalDocumentation(ast)`

**Purpose**: Generates technical documentation from AST.

**Signature**:

```typescript
async function generateTechnicalDocumentation(ast: any): Promise<string>;
```

**Parameters**:

| Parameter | Type | Required | Description                          |
| --------- | ---- | -------- | ------------------------------------ |
| `ast`     | any  | Yes      | Abstract Syntax Tree of the codebase |

**Returns**: `Promise<string>` - Generated technical documentation

**Dependencies**:

- Google Gemini API (`@google/genai`)
- `documentationPrompt` from `./TechnicalPrompt`

**Implementation**:

```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateTechnicalDocumentation(ast: any) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [
      {
        role: "user",
        parts: [{ text: documentationPrompt(ast) }],
      },
    ],
  });
  return response.response.text();
}
```

#### `generateApiDocumentation(ast)`

**Purpose**: Generates API documentation from AST.

**Signature**:

```typescript
async function generateApiDocumentation(ast: any): Promise<string>;
```

**Parameters**:

| Parameter | Type | Required | Description                          |
| --------- | ---- | -------- | ------------------------------------ |
| `ast`     | any  | Yes      | Abstract Syntax Tree of the codebase |

**Returns**: `Promise<string>` - Generated API documentation

**Dependencies**:

- Google Gemini API (`@google/genai`)
- `apiDocumentationPrompt` from `./ApiPrompt`

---

### Repository Downloader

**Location**: `src/lib/downloadRepo.ts`

Downloads git repositories as zip archives.

#### `downloadRepo(repoUrl, repoToken)`

**Purpose**: Downloads a repository from GitHub, GitLab, or Azure DevOps.

**Signature**:

```typescript
async function downloadRepo(
  repoUrl: string,
  repoToken: string,
): Promise<Buffer | null>;
```

**Parameters**:

| Parameter   | Type   | Required | Description                              |
| ----------- | ------ | -------- | ---------------------------------------- |
| `repoUrl`   | string | Yes      | Full URL of the git repository           |
| `repoToken` | string | Yes      | Personal access token for authentication |

**Returns**: `Promise<Buffer | null>` - Buffer containing zip file, or null on failure

**Dependencies**:

- `axios` for HTTP requests

**Example Usage**:

```typescript
const buffer = await downloadRepo(
  "https://github.com/user/repo",
  "ghp_xxxxxxxxxxxxx",
);

if (buffer) {
  // Process the downloaded repository
}
```

---

### ZIP Extractor & AST Parser

**Location**: `src/lib/zipExtract.ts`

Extracts zip files and parses source code into AST.

#### `extractFile(zipFile)`

**Purpose**: Extracts zip archive, filters files, and parses into AST.

**Signature**:

```typescript
async function extractFile(zipFile: Buffer): Promise<ParsedFile[]>;
```

**Parameters**:

| Parameter | Type   | Required | Description                   |
| --------- | ------ | -------- | ----------------------------- |
| `zipFile` | Buffer | Yes      | Repository zip archive buffer |

**Returns**: `Promise<ParsedFile[]>` - Array of parsed file AST objects

**Dependencies**:

- `adm-zip` for ZIP extraction
- Node.js `fs`, `os`, `path` modules
- `parseFile` from `./ast` for AST parsing

**Implementation Overview**:

```typescript
export async function extractFile(zipFile: Buffer): Promise<ParsedFile[]> {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "repo-"));
  const parsedFiles: ParsedFile[] = [];

  try {
    const zip = new AdmZip(zipFile);
    zip.extractAllTo(tempDir, true);

    // Walk directory tree, filter files, parse supported files
    // ...
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }

  return parsedFiles;
}
```

---

## Error Handling

### tRPC Error Formatting

The tRPC server includes an error formatter that adds Zod validation errors to responses:

```typescript
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

**Error Response Structure**:

When a Zod validation error occurs:

```json
{
  "error": {
    "message": "Validation failed",
    "code": "BAD_REQUEST",
    "data": {
      "zodError": {
        "fieldErrors": {
          "repoUrl": ["Invalid URL format"]
        }
      }
    }
  }
}
```

---

## Validation

**Library**: Zod

All input validation uses Zod schemas for type-safe runtime validation.

### Key Validation Schemas

#### Repository Creation Schema

```typescript
z.object({
  repoisteryUrl: z.string(),
  repoToken: z.string(),
  type: z.enum(["technical", "api", "both"]),
});
```

**Validation Rules**:

- `repoisteryUrl`: Must be a non-empty string
- `repoToken`: Must be a non-empty string
- `type`: Must be one of: 'technical', 'api', or 'both'

#### Post Creation Schema

```typescript
z.object({
  name: z.string().min(1),
});
```

**Validation Rules**:

- `name`: Must be a non-empty string (minimum 1 character)

---

## Configuration

### Environment Variables

| Variable         | Purpose                           | Example                               |
| ---------------- | --------------------------------- | ------------------------------------- |
| `NODE_ENV`       | Runtime environment               | `development` or `production`         |
| `DATABASE_URL`   | Prisma database connection string | `postgresql://user:pass@host:5432/db` |
| `AUTH_SECRET`    | NextAuth session encryption key   | Random 32+ character string           |
| `GITHUB_ID`      | GitHub OAuth client ID            | From GitHub OAuth app settings        |
| `GITHUB_SECRET`  | GitHub OAuth client secret        | From GitHub OAuth app settings        |
| `GOOGLE_ID`      | Google OAuth client ID            | From Google Cloud Console             |
| `GOOGLE_SECRET`  | Google OAuth client secret        | From Google Cloud Console             |
| `GITLAB_ID`      | GitLab OAuth client ID            | From GitLab OAuth app settings        |
| `GITLAB_SECRET`  | GitLab OAuth client secret        | From GitLab OAuth app settings        |
| `GEMINI_API_KEY` | Google Gemini API key             | From Google AI Studio                 |

### Configuration Files

- **`next.config.js`**: Next.js framework configuration
- **`src/env.js`**: Environment variable validation using `@t3-oss/env-nextjs`
- **`tsconfig.json`**: TypeScript compiler configuration
- **`prisma/schema.prisma`**: Database schema definition

---

## Dependencies

### Core Dependencies

| Package              | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `next`               | Web framework and React server components |
| `@prisma/client`     | Type-safe database ORM client             |
| `next-auth`          | Authentication library with OAuth support |
| `@trpc/server`       | Type-safe API layer (server)              |
| `@trpc/react-query`  | tRPC React client with React Query        |
| `zod`                | Runtime type validation                   |
| `@google/genai`      | Google Gemini AI SDK                      |
| `axios`              | HTTP client for external requests         |
| `adm-zip`            | ZIP file manipulation                     |
| `tree-sitter`        | Code parsing and AST generation           |
| `@t3-oss/env-nextjs` | Environment variable validation           |

---

## Performance & Caching

### Caching Strategy

- **Query Caching**: Repository and documentation queries cached for 600 seconds (10 minutes)
- **Cache Implementation**: Uses Next.js `unstable_cache` with tagged revalidation
- **Cache Tags**:
  - `repos-{userId}` for user repositories
  - `docs-{projectId}` for project documentation

**Example**:

```typescript
const cachedRepos = await unstable_cache(
  async () => {
    return ctx.db.projectData.findMany({
      where: { userId: input.userId },
    });
  },
  [`repos-${input.userId}`],
  {
    revalidate: 600,
    tags: [`repos-${input.userId}`],
  },
)();
```

---

## Security Considerations

1. **Authentication**: OAuth 2.0 via trusted providers (GitHub, Google, GitLab)
2. **Session Management**: Secure database-backed sessions with NextAuth.js
3. **Route Protection**: Middleware-based access control for protected routes
4. **Token Handling**: Secure handling of personal access tokens for repository access
5. **Input Validation**: Zod schemas validate all user inputs
6. **Error Handling**: Sanitized error messages in production (detailed errors in development only)
7. **CORS**: Configured appropriately for API routes
8. **Environment Variables**: Validated and type-checked at build time

---

_Documentation generated by Docy • Last updated: January 2026_
