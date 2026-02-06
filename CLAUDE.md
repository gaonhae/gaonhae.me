# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

gaonhae.me is a personal brand platform combining portfolio, technical blog, and habit tracking. It's a Next.js 14+ application using TypeScript, Tailwind CSS v4, Supabase (PostgreSQL), and MDX for content.

## Essential Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run start        # Run production server
npm run lint         # Run ESLint

# Database
# Run supabase-schema.sql in Supabase SQL Editor to initialize database
```

## Environment Setup

Required environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `.env.local.example` for template.

## Architecture

### Content Strategy (Hybrid MDX + Supabase)

The platform uses a hybrid content approach:

**Blog Posts**: Pure MDX files in `content/blog/` directory
- File-based routing using `gray-matter` for frontmatter parsing
- No database storage - MDX files are read directly at build/request time
- Utilities in `src/lib/mdx/mdx-utils.ts` handle file operations
- Functions: `getAllMDXContent('blog')`, `getMDXContent('blog', slug)`

**Projects**: Database + MDX hybrid
- Metadata (name, tech stack, URLs) stored in Supabase `projects` table
- Detailed content stored as MDX files in `content/projects/`
- Slug used to link database record to MDX file
- Server Actions in `src/actions/projects.ts` handle database operations

**Habits**: Pure Supabase
- All data stored in `habits` table with date-based tracking
- No MDX files involved
- Real-time CRUD via Server Actions in `src/actions/habits.ts`

### MDX Configuration

MDX is configured with:
- `next.config.ts`: Enables MDX support with `@next/mdx`
- `src/lib/mdx/mdx-components.tsx`: Custom component mappings for MDX
- `src/mdx-components.tsx`: Root MDX components configuration
- Plugins: `remark-math`, `remark-gfm`, `rehype-katex`, `rehype-highlight`

To render MDX:
```tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/lib/mdx/mdx-components'

<MDXRemote source={content} components={MDXComponents} />
```

### Supabase Integration

**Client Types**:
- `src/lib/supabase/client.ts`: Browser client using `createBrowserClient` from `@supabase/ssr`
- `src/lib/supabase/server.ts`: Server client using `createServerClient` with cookies

**Server Actions Pattern**:
All database operations use Next.js Server Actions (files in `src/actions/`):
- `posts.ts`: Blog post CRUD (currently unused - blogs are MDX-only)
- `projects.ts`: Project metadata CRUD
- `habits.ts`: Habit tracking CRUD
- Each action uses `createClient()` from `server.ts` and calls `revalidatePath()` after mutations

**Type Safety**:
Database types are defined in `src/types/database.types.ts` (generated from Supabase schema).
Helper types in `src/types/index.ts` provide cleaner type exports:
```tsx
type Project = Tables<"projects">
type Inserts<"projects"> // for inserts
type Updates<"projects"> // for updates
```

### App Router Structure

```
src/app/
├── layout.tsx                 # Root layout (metadata, fonts, theme provider)
├── globals.css                # Tailwind v4 + design tokens
└── (main)/                    # Route group with shared Header/Footer
    ├── layout.tsx             # Wraps all routes with navigation
    ├── page.tsx               # Home dashboard
    ├── blog/
    │   ├── page.tsx          # Blog list (reads MDX files)
    │   └── [slug]/page.tsx   # Blog detail (renders MDX)
    ├── projects/
    │   ├── page.tsx          # Projects grid (Supabase + MDX)
    │   └── [slug]/page.tsx   # Project detail (hybrid)
    └── habits/
        └── page.tsx          # Habit tracker (pure Supabase)
```

The `(main)` route group allows shared layout without affecting URL structure.

### Component Organization

```
src/components/
├── ui/                # Shadcn UI primitives (button, card, etc.)
├── layout/            # Header, Footer, Navigation, ThemeToggle
├── home/              # HeroSection, RoutineWidget, RecentActivity
├── blog/              # PostCard
├── projects/          # ProjectCard, ProjectGrid
└── habits/            # HabitCard, ConsistencyGrid, ProgressChart
```

**Key Components**:
- `ConsistencyGrid`: GitHub-style habit visualization (105 days)
- `ProgressChart`: Recharts-based progress tracking
- `MDXContent`: Located in `src/lib/mdx/mdx-components.tsx` - handles MDX rendering with custom components

### Design System

**Tailwind CSS v4** (CSS-native configuration):
- Design tokens defined in `src/app/globals.css` using CSS variables
- Primary color: `#74A12E` (oklch(0.59 0.12 122))
- Font: Inter (300-900 weights)
- Dark mode: Custom variant `@custom-variant dark (&:is(.dark *))`

**Color scheme**:
- Light: `--background: #f7f7f6`, `--foreground: #151513`
- Dark: `--background: #1a1c16`, `--foreground: #f3f3f2`

**Shadcn UI**:
Configuration in `components.json`. Components use `class-variance-authority` and `tailwind-merge` for dynamic styling.

## Database Schema

Tables (see `supabase-schema.sql`):
- `profiles`: User profiles (username, bio, avatar)
- `posts`: Blog posts (currently unused - using MDX files instead)
- `projects`: Project metadata (name, tech_stack, github_url, live_url, thumbnail)
- `habits`: Daily habit tracking (habit_name, status, date with UNIQUE constraint)

Key indexes on `created_at`, `category`, `published`, and `date` fields for performance.

## Content Creation

**Adding a blog post**:
1. Create `content/blog/your-slug.mdx`
2. Add frontmatter: `title`, `date`, `description`, `category` (Dev/Product/Life), `tags`, `published`
3. File is automatically picked up by `getAllMDXContent('blog')`

**Adding a project**:
1. Insert record in Supabase `projects` table via Server Action or SQL
2. Create `content/projects/[slug].mdx` with detailed description
3. Both sources are combined in the project detail page

**Adding a habit**:
Use the `/habits` UI to add habits directly - no file creation needed.

## Important Patterns

**Data Fetching**:
- Use Server Actions from `src/actions/` for all Supabase queries
- Blog posts use file-system functions from `src/lib/mdx/mdx-utils.ts`
- Always use async/await with proper error handling

**Path Aliases**:
`@/*` maps to `src/*` (configured in `tsconfig.json`)

**Revalidation**:
Server Actions call `revalidatePath()` after mutations to ensure ISR updates.

**TypeScript Strict Mode**:
Project uses strict TypeScript. Always type Supabase responses properly using generated types.

## Common Workflows

**Modifying the design system**:
Edit CSS variables in `src/app/globals.css` under the `@theme` block.

**Adding a new page**:
Create route in `src/app/(main)/` to inherit Header/Footer layout.

**Adding a Shadcn component**:
The project already has Shadcn configured. Add new components to `src/components/ui/`.

**Database schema changes**:
1. Update `supabase-schema.sql`
2. Run new migration in Supabase SQL Editor
3. Regenerate types in `src/types/database.types.ts` using Supabase CLI or manual definition
