# AI Chatbot Project - Developer Instructions

This document provides comprehensive instructions for AI coding agents to understand, modify, and extend this Next.js AI chatbot project.

## Project Overview

This is a Next.js-based AI chatbot application built with the Vercel AI SDK. It features:

- Multi-model AI support (xAI, OpenAI, etc.)
- Chat interface with streaming responses
- Artifact system for generating code, images, text, and sheets
- User authentication with NextAuth.js
- Database integration with PostgreSQL
- Real-time data streaming with SSE
- Responsive UI with Tailwind CSS and shadcn/ui components

## Project Structure

```
├── app/                    # Next.js App Router structure
│   ├── (auth)/            # Authentication pages and API routes
│   ├── (chat)/            # Main chat interface and API routes
├── components/            # React components
├── lib/                   # Core logic and utilities
│   ├── ai/                # AI-related functionality
│   ├── db/                # Database operations
│   ├── artifacts/         # Artifact generation system
├── artifacts/             # Artifact-specific implementations
├── public/                # Static assets
├── tests/                 # Test files
```

## Key Components

### 1. AI System (`lib/ai/`)

- **Providers** (`lib/ai/providers.ts`): Configures AI model providers (OpenRouter, xAI, etc.)
- **Models** (`lib/ai/models.ts`): Defines available chat models
- **Prompts** (`lib/ai/prompts.ts`): System prompts for different AI tasks
- **Tools** (`lib/ai/tools/`): AI tools for document creation, weather, etc.

### 2. Chat Interface (`components/chat.tsx`)

Main chat component using `@ai-sdk/react` hooks:

- `useChat` for chat functionality
- Streaming responses with SSE
- Attachment handling
- Message history management

### 3. API Routes (`app/(chat)/api/`)

- `/api/chat`: Main chat endpoint with streaming
- `/api/document`: Document management
- `/api/history`: Chat history
- `/api/suggestions`: Code suggestions
- `/api/vote`: Message voting

### 4. Database (`lib/db/`)

Uses Drizzle ORM with PostgreSQL:

- Users, Chats, Messages, Documents
- Voting system for messages
- Stream management for resumable responses

### 5. Artifacts System

Generates and manages AI-created content:

- Code artifacts (`artifacts/code/`)
- Image artifacts (`artifacts/image/`)
- Text artifacts (`artifacts/text/`)
- Sheet artifacts (`artifacts/sheet/`)

## Adding New Features

### 1. Adding a New AI Model Provider

1. Update `lib/ai/providers.ts`:

   - Add new provider configuration
   - Map to appropriate model IDs

2. Update `lib/ai/models.ts`:
   - Add new model to `chatModels` array
   - Update descriptions as needed

### 2. Adding a New Artifact Type

1. Create new artifact directories:

   - `artifacts/new-type/client.tsx` (client component)
   - `artifacts/new-type/server.ts` (server logic)

2. Update `lib/artifacts/server.ts`:

   - Add new handler to `documentHandlersByArtifactKind`
   - Update `artifactKinds` type

3. Update database schema if needed:
   - Modify `lib/db/schema.ts` to support new artifact types

### 3. Adding New AI Tools

1. Create tool in `lib/ai/tools/`:

   - Implement tool function with proper typing
   - Add Zod schema for validation

2. Register tool in API route:
   - Add to `experimental_activeTools` array in `/api/chat/route.ts`
   - Add to `tools` object in `streamText` call

### 4. Adding New UI Components

1. Create component in `components/`:

   - Use TypeScript with proper typing
   - Follow existing component patterns
   - Use shadcn/ui components when possible

2. Integrate component:
   - Import and use in appropriate parent components
   - Pass required props and handle callbacks

## Common Bug Fixing Approaches

### 1. Chat Streaming Issues

Check:

- API route implementation in `/api/chat/route.ts`
- Network connectivity and CORS settings
- Model provider configuration in `lib/ai/providers.ts`
- Error handling in `components/chat.tsx`

### 2. Authentication Problems

Check:

- Middleware configuration in `middleware.ts`
- Auth configuration in `app/(auth)/auth.ts`
- Environment variables in `.env`
- Session handling in components

### 3. Database Issues

Check:

- Database connection in `lib/db/`
- Query implementations in `lib/db/queries.ts`
- Schema definitions in `lib/db/schema.ts`
- Migration status

### 4. Artifact Generation Problems

Check:

- Artifact handler implementations in `artifacts/*/server.ts`
- Prompt definitions in `lib/ai/prompts.ts`
- AI model configuration in `lib/ai/providers.ts`
- Data streaming in components

## Environment Setup

Required environment variables (see `.env.example`):

- `AUTH_SECRET`: Authentication secret
- `XAI_API_KEY`: xAI API key (or other provider keys)
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob storage token
- `POSTGRES_URL`: PostgreSQL database URL
- `REDIS_URL`: Redis URL (optional for resumable streams)

## Testing

Run tests with:

```bash
pnpm test
```

Tests are located in the `tests/` directory and use Playwright for end-to-end testing.

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

## Common Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Run database migrations
pnpm db:migrate

# Run database studio
pnpm db:studio
```

## Architecture Patterns

1. **Server Actions**: Used for server-side operations
2. **React Server Components**: For data fetching and server logic
3. **Streaming**: SSE for real-time responses
4. **Type Safety**: Extensive TypeScript usage
5. **Component Composition**: Reusable UI components
6. **Database Abstraction**: Drizzle ORM for database operations

## Troubleshooting

1. **API Errors**: Check server logs and network tab
2. **Authentication Issues**: Verify session and middleware
3. **Database Problems**: Check connection and migrations
4. **Streaming Failures**: Verify SSE implementation
5. **UI Rendering Issues**: Check component props and state

## Contributing Guidelines

1. Follow existing code patterns and conventions
2. Maintain TypeScript type safety
3. Write tests for new functionality
4. Update documentation as needed
5. Ensure responsive design compatibility
6. Test across different AI models
