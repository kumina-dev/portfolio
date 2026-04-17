# Portfolio

Personal portfolio built with Next.js 16, React 19, TypeScript, and Supabase.

The app has two main surfaces:

- Public portfolio at `/`
- Protected admin area at `/admin` for managing profile, projects, skills, and experience

Portfolio data is loaded from Supabase. If the profile record is missing, the public page falls back to local seed content from `content/fallback-portfolio.ts`.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Supabase SSR and `@supabase/supabase-js`
- ESLint 9

## Project Structure

```text
app/                  Routes, layouts, loading and error boundaries
features/admin/       Admin UI, server services, forms, and actions
features/portfolio/   Public portfolio UI and data mapping
integrations/         Supabase client, server, and proxy integration
content/              Local fallback content
shared/               Shared UI components and utilities
styles/               Global design tokens and utilities
supabase/             Local Supabase project metadata
```

Route groups are used under `app/` so admin and auth-specific organization does not affect URLs.

## Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

These values are required by `shared/lib/env.ts`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.

Admin login is available at [http://localhost:3000/admin/login](http://localhost:3000/admin/login). Proxy protects `/admin` routes through the Supabase session integration in `proxy.ts`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- `.env.local` and other environment files are intentionally ignored by git.
- `supabase/.temp/` contains local CLI state and is intentionally ignored.
- The repo targets Next.js 16 conventions. Check `node_modules/next/dist/docs/` before making framework-level changes.
