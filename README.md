# Docy

<div align="center">
  <img src="public/docyh.png" alt="Docy Logo" width="1500"  hieght="1500"/>
  
  ### Write Docs Without Writing Them
  
  **AI-powered documentation generation for your codebase**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.0+-black.svg)](https://nextjs.org/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Demo](https://docy-liard.vercel.app/) · [Documentation](https://docs.docy.dev) · [Report Bug]([https://docy-liard.vercel.app/s](https://docy-liard.vercel.app/)) · [Request Feature](https://github.com/omar-mostafa205/Docy/issues)

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
