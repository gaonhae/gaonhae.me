# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` contains App Router routes, layouts, and page entry points (for example `src/app/(main)/blog/[slug]/page.tsx`).
- `src/components/` holds UI and feature components grouped by domain (`blog/`, `projects/`, `habits/`, `layout/`, `home/`, `ui/`).
- `src/lib/` includes shared utilities and integrations (`mdx/`, `supabase/`, `utils.ts`).
- `src/actions/` contains server actions for posts, projects, and habits.
- Content is file-based MDX under `content/blog/` and `content/projects/`.
- Static assets live in `public/`; schema/setup docs are in root docs and SQL files.

## Build, Test, and Development Commands
- `npm run dev`: starts the local Next.js dev server at `http://localhost:3000`.
- `npm run build`: creates an optimized production build.
- `npm run start`: runs the production build locally.
- `npm run lint`: runs ESLint with Next.js core-web-vitals + TypeScript rules.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true`) with React function components.
- Indentation: 2 spaces; keep imports organized and remove unused symbols.
- Components/files: `PascalCase` for React component files (`ProjectCard.tsx`), `camelCase` for utilities (`mdx-utils.ts`).
- Route and content folders use lowercase, descriptive names (for example `content/blog/`, `src/app/(main)/projects/`).
- Prefer the `@/*` alias for imports from `src`.

## Testing Guidelines
- There is currently no automated test runner configured in `package.json`.
- Minimum quality gate: run `npm run lint` and verify key routes (`/`, `/blog`, `/projects`, `/habits`) in `npm run dev` before opening a PR.
- If you add tests, place them near the feature (`*.test.ts(x)`) and include run instructions in your PR.

## Commit & Pull Request Guidelines
- Follow the repository’s conventional pattern: `type : short description` (examples: `feat : habit streak`, `fix : streak logic`, `style : header and footer`).
- Keep commits focused and atomic; avoid mixing content edits and refactors in one commit.
- PRs should include:
  - concise summary of user-visible changes,
  - linked issue/task (if available),
  - screenshots or short clips for UI changes,
  - notes for env/config/schema updates (for example changes to `supabase-schema.sql` or `.env.local.example`).

## Security & Configuration Tips
- Never commit real secrets. Use `.env.local.example` as the template for required variables.
- Restrict external image domains through `next.config.ts` and document any new domain additions in the PR.
