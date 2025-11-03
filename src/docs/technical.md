# Docy: Automated Code Documentation

Docy is a full-stack application built with the T3 Stack (Next.js, TypeScript, tRPC, Prisma, NextAuth.js) designed to automatically generate technical and API documentation from a given code repository. Users can sign in via various OAuth providers, submit a repository URL or upload a zip file, and Docy will analyze the codebase using Abstract Syntax Trees (AST) to produce comprehensive documentation.


## Quick Start



### Prerequisites


* Node.js (version specified in `package.json`, typically >= 18.x)
* A PostgreSQL database
* `npm` or a compatible package manager


### Installation and Setup


1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd docy-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and populate it with the required variables. See the [Environment Variables](#environment-variables) section for details.

4.  **Push Database Schema:**
    Apply the Prisma schema to your database.
    ```bash
    npm run db:push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.


## Architecture



### System Architecture Diagram


This diagram illustrates the high-level architecture of the Docy application, showing the flow of data from the user's browser through the Next.js frontend, tRPC API layer, and down to the Prisma ORM and database.
```mermaid
graph TD
    subgraph Browser
        A[React Frontend]
    end

    subgraph "Next.js Server"
        B[Next.js App Router & Server Components]
        C[tRPC API Routes]
        D[NextAuth.js Handlers]
        E[Prisma Client]
    end

    subgraph Database
        F[PostgreSQL]
    end

    subgraph External_Services[External Services]
        G[OAuth Providers <br/> GitHub, Google, GitLab]
        H[Google Gemini AI]
        I[Code Repositories <br/> GitHub, GitLab]
    end

    A -->|tRPC Queries/Mutations| C
    A -->|OAuth Sign-in| D
    B -->|Server Actions| C
    B -->|Data Fetching| C
    C -->|Database Operations| E
    C -->|AI Doc Generation| H
    C -->|Download Repo| I
    E -->|CRUD| F
    D -->|User Authentication| G
    D -->|Session Management| E
```


### Project Structure


The project follows a feature-colocated structure, primarily organized within the `src` directory.
```
/
├── prisma/
│   └── schema.prisma         # Database schema definition
├── public/                   # Static assets
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication-related pages (sign-in, sign-up)
│   │   ├── (main)/             # Core application pages after login
│   │   │   └── dashboard/      # Main dashboard and documentation viewer
│   │   ├── api/
│   │   │   ├── auth/           # NextAuth.js API handlers
│   │   │   └── trpc/[trpc]/    # tRPC API endpoint
│   │   ├── actions/            # Next.js Server Actions
│   │   ├── layout.tsx          # Root application layout
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable React components
│   │   ├── ui/                 # UI primitives (button, card, etc.)
│   │   └── *.tsx               # Application-specific components
│   ├── lib/                    # Core logic and utilities
│   │   ├── ai.ts               # AI documentation generation logic
│   │   ├── ast.ts              # Abstract Syntax Tree parsing logic (Not in AST)
│   │   ├── downloadRepo.ts     # Logic for downloading repos
│   │   └── zipExtract.ts       # Logic for extracting zip files
│   ├── server/
│   │   ├── api/
│   │   │   ├── root.ts         # tRPC root router
│   │   │   └── routers/        # tRPC procedure routers (post, project)
│   │   ├── auth/               # NextAuth.js configuration
│   │   ├── db.ts               # Prisma client initialization
│   ├── trpc/                   # tRPC client-side setup
│   └── env.js                  # Environment variable validation (T3 Env)
├── next.config.js              # Next.js configuration
└── package.json                # Project metadata and dependencies
```


## API Reference


The application uses [tRPC](https://trpc.io/) for its API layer, providing end-to-end typesafe APIs. The procedures are defined in `src/server/api/routers/`.


### `project` Router


Handles project creation, documentation generation, and data fetching.


#### `project.createRepo` (Mutation)


**Location:** `src/server/api/routers/project.ts`

**Purpose:** Downloads a repository from a given URL, parses its content, generates documentation using an AI model, and saves the results to the database.

**Signature:**
```typescript
.input(z.object({
    repoisteryUrl: z.string(),
    repoToken: z.string(),
    type : z.enum(['technical', 'api', 'both'])
}))
.mutation(async ({ctx, input}) => { ... })
```

**Request Body:**
```json
{
  "repoisteryUrl": "https://github.com/user/repo",
  "repoToken": "your_personal_access_token",
  "type": "technical"
}
```

**Parameters:**
* `repoisteryUrl` (string): The full URL to the Git repository.
* `repoToken` (string): A personal access token with permissions to read the repository.
* `type` ('technical' | 'api' | 'both'): The type of documentation to generate.

**Returns:**
On success, returns an object confirming the creation.
```json
{
  "success": true,
  "projectId": "clx..."
}
```

**Possible Errors:**
* `401 UNAUTHORIZED`: If the user is not logged in.
* `400 BAD_REQUEST`: If `repoisteryUrl` or `repoToken` are missing.
* `500 INTERNAL_SERVER_ERROR`: If the repository download or AI generation fails.

---


#### `project.getRepos` (Query)


**Location:** `src/server/api/routers/project.ts`

**Purpose:** Fetches all repositories (projects) associated with the currently logged-in user.

**Signature:**
```typescript
.input(z.object({
    userId: z.string()
}))
.query(async ({ctx, input}) => { ... })
```

**Request Input:**
```json
{
  "userId": "user_id_string"
}
```

**Returns:**
An array of `ProjectData` objects.
```json
[
  {
    "id": "clx...",
    "name": null,
    "repoisteryUrl": "https://github.com/user/repo",
    "zipFileName": null,
    "githubUrl": null,
    "createdAt": "2024-06-10T12:00:00.000Z",
    "updatedAt": "2024-06-10T12:00:00.000Z",
    "userId": "user_id_string"
  }
]
```
---


#### `project.getDocs` (Query)


**Location:** `src/server/api/routers/project.ts`

**Purpose:** Retrieves all documentation generated for a specific project ID.

**Signature:**
```typescript
.input(z.object({
    id: z.string()
}))
.query(async ({ctx , input})=> { ... })
```
**Request Input:**
```json
{
  "id": "project_id_string"
}
```
**Returns:**
An array of `Documentation` objects, ordered by creation date descending.
```json
[
  {
    "id": "doc_id_string",
    "body": "{\"markdown\": \"...\"}",
    "type": "TECHNICAL",
    "createdAt": "2024-06-10T12:00:00.000Z",
    "updatedAt": "2024-06-10T12:00:00.000Z",
    "projectDataId": "project_id_string"
  }
]
```
---

## Database & Data Models


The application uses Prisma as its ORM with a PostgreSQL database. The schema is defined in `prisma/schema.prisma`.


### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ SESSION : has
    USER ||--o{ ACCOUNT : has
    USER ||--o{ POST : "created by"
    USER ||--o{ PROJECT_DATA : "owns"

    PROJECT_DATA ||--o{ DOCUMENTATION : "has"

    USER {
        string id PK
        string name
        string email
        string image
        datetime emailVerified
    }

    ACCOUNT {
        string id PK
        string userId FK
        string type
        string provider
        string providerAccountId
    }

    SESSION {
        string id PK
        string sessionToken
        string userId FK
        datetime expires
    }

    POST {
        string id PK
        string name
        string createdById FK
        datetime createdAt
        datetime updatedAt
    }

    PROJECT_DATA {
        string id PK
        string repoisteryUrl
        string zipFileName
        string userId FK
        datetime createdAt
        datetime updatedAt
    }

    DOCUMENTATION {
        string id PK
        string body
        string type
        string projectDataId FK
        datetime createdAt
        datetime updatedAt
    }
```


## Core Components & Functions



### Frontend Components



#### `RepoForm`

**Location:** `src/components/RepoForm.tsx`
**Purpose:** Provides a form for users to input a repository URL and personal access token. It allows users to select the type of documentation they want to generate (Technical, API, or Both).

**State:**
* Uses `react-hook-form` for form state management.
* Uses `zod` for validation via `zodResolver`.
* Manages submission state (`generating`).

**Usage:**
```tsx
import { RepoForm } from '@/components/RepoForm';

<RepoForm />
```
---

#### `RenderDocs`

**Location:** `src/components/RenderDocs.tsx`
**Purpose:** The main component for displaying a list of generated documents for a project. It handles selecting a document to view in detail and provides options to export or download.

**State:**
* `selectedDocId`: Manages which document is currently being viewed in detail.

**Side Effects:**
* Uses the `api.project.getDocs.useQuery` tRPC hook to fetch all documentation for the current project ID from the URL parameters.

---

#### `RenderDocument`

**Location:** `src/components/RenderDocument.tsx`
**Purpose:** A specialized component responsible for rendering Markdown content. It includes support for GFM (GitHub Flavored Markdown), syntax highlighting for code blocks, and dynamically rendering Mermaid.js diagrams.

**Props:**
```typescript
interface RenderDocumentProps {
  documentetaion: string;
}
```
**Dependencies:**
* `react-markdown`: For parsing and rendering Markdown.
* `remark-gfm`: For GFM support (tables, strikethrough, etc.).
* `react-syntax-highlighter`: For code block syntax highlighting.
* `mermaid`: For rendering diagrams from code blocks.


### Core Backend Functions



#### `createZipFile()`

**Location:** `src/app/actions/createZip.ts`
**Purpose:** A Next.js Server Action that handles the upload of a repository as a `.zip` file. It retrieves the authenticated user's session, creates a `ProjectData` entry, extracts the zip file into an AST structure, triggers the AI documentation generation, and saves the result.

**Signature:**
```typescript
export async function createZipFile(formData: FormData)
```

**Parameters:**
* `formData` (FormData): Contains the `zipFile` (as a base64 string) and `zipFileName`.

**Returns:** This function does not return a value but will redirect the user to the dashboard upon completion.

---

#### `downloadRepo()`

**Location:** `src/lib/downloadRepo.ts`
**Purpose:** Downloads a Git repository as a zip archive from GitHub, GitLab, or Azure DevOps.

**Signature:**
```typescript
export async function downloadRepo(
  repoUrl: string,
  repoToken: string
): Promise<Buffer | null>
```

**Parameters:**
* `repoUrl` (string): The URL of the repository to download.
* `repoToken` (string): The personal access token for authentication.

**Returns:** `Promise<Buffer | null>` - A buffer containing the zip file data, or `null` on failure.

---

#### `extractFile()`

**Location:** `src/lib/zipExtract.ts`
**Purpose:** Takes a zip file buffer, extracts it to a temporary directory, and recursively walks through the files, parsing supported file types into an array of `ParsedFile` AST objects.

**Signature:**
```typescript
export async function extractFile(zipFile: Buffer): Promise<ParsedFile[]>
```

**Parameters:**
* `zipFile` (Buffer): The buffer containing the repository zip archive.

**Returns:** `Promise<ParsedFile[]>` - An array of objects representing the parsed AST for each file.


## Configuration & Setup



### Environment Variables


The following environment variables are required. Create a `.env` file in the project root to configure them. | Variable | Description | Example |
| -------------------- | ------------------------------------------------------------- | ------------------------------------- |
| `DATABASE_URL` | Connection string for your PostgreSQL database. | `postgresql://user:pass@host:port/db` |
| `AUTH_SECRET` | A secret key for NextAuth.js to encrypt tokens. | `your-super-secret-key` |
| `GEMINI_API_KEY` | Your API key for the Google Gemini AI service. | `AIzaSy...` |
| `GITHUB_ID` | Client ID for the GitHub OAuth application. | `your_github_client_id` |
| `GITHUB_SECRET` | Client secret for the GitHub OAuth application. | `your_github_client_secret` |
| `GOOGLE_ID` | Client ID for the Google OAuth application. | `your_google_client_id.apps.google...`|
| `GOOGLE_SECRET` | Client secret for the Google OAuth application. | `GOCSPX-...` |
| `GITLAB_ID` | Client ID for the GitLab OAuth application. | `your_gitlab_client_id` |
| `GITLAB_SECRET` | Client secret for the GitLab OAuth application. | `your_gitlab_client_secret` | ### Configuration Files

* **`next.config.js`**: Configures Next.js. Notably, it lists `tree-sitter` packages in `serverExternalPackages` to ensure they are correctly handled in the server environment.
* **`tsconfig.json`**: Standard TypeScript configuration for a Next.js project, setting up path aliases like `@/*`.
* **`src/env.js`**: Uses T3 Env to validate environment variables at build time, ensuring that required server and client variables are present and correctly typed.


## Authentication


Authentication is managed by **NextAuth.js**.

* **Providers**: Supports OAuth sign-in with GitHub, Google, and GitLab.
* **Session Management**: User sessions are stored in the database using the Prisma adapter.
* **Protected Routes**: The `middleware.ts` file intercepts requests to protect specific routes. Any route starting with `/dashboard`, `/docs`, or `/upload-repo` requires an authenticated session. Unauthenticated users are redirected to the `/sign-in` page.


## Testing


No test files were found in the provided codebase. To ensure reliability, it is recommended to add unit tests for utility functions (e.g., `downloadRepo`, `zipExtract`) and integration tests for tRPC procedures. The `package.json` does not contain any test scripts.
