# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup
- `npm run setup` - Install dependencies, generate Prisma client, and run database migrations
- `npm run db:reset` - Reset database with migrations (force reset)

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run dev:daemon` - Start dev server in background, logs to logs.txt
- `npm run build` - Build for production
- `npm run start` - Start production server

### Quality Assurance
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest tests

## Architecture Overview

UIGen is an AI-powered React component generator built on Next.js 15 with a virtual file system approach.

### Core Architecture

**Virtual File System**: Components are generated and stored in memory using `VirtualFileSystem` class (`src/lib/file-system.ts`). Files are never written to disk during development - everything exists in a virtual FS that can be serialized/deserialized.

**AI Integration**: Uses Anthropic's Claude via the Vercel AI SDK with custom tools:
- `str_replace_editor` - For editing file contents
- `file_manager` - For file system operations
- Generation prompt defines that all projects must have `/App.jsx` as root component

**Chat API**: `/src/app/api/chat/route.ts` handles AI conversations with streaming responses, manages file system state, and persists projects for authenticated users.

### Key Components

- **Main Interface** (`src/app/main-content.tsx`): Resizable panels with chat, file tree, code editor, and live preview
- **File System Context** (`src/lib/contexts/file-system-context`): Provides virtual FS state management
- **Chat Context** (`src/lib/contexts/chat-context`): Manages conversation state and AI interactions

### Database Schema

Uses Prisma with SQLite:
- `User`: Authentication with email/password
- `Project`: Stores serialized messages and virtual file system data
- Prisma client generated to `src/generated/prisma/`

### Authentication

JWT-based auth via `src/lib/auth.ts` with middleware protection. Supports anonymous users with session tracking via `anon-work-tracker.ts`.

### Import Aliases

TypeScript configured with `@/*` pointing to `src/*` directory.

### Key Technologies

- Next.js 15 App Router
- React 19
- Tailwind CSS v4
- Prisma ORM
- Vercel AI SDK
- Monaco Editor for code editing
- Virtual file system for component generation

### Environment Variables

Optional `ANTHROPIC_API_KEY` in `.env` - app runs with mock responses if not provided.
- the database schema is defined in the @prisma/schema.prisma file. refrence it anyitime you need to udnerstand the structure of data stored in the database