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
supabase/             SQL bootstrap and optional local Supabase metadata
scripts/              Verification scripts such as the smoke test
```

Route groups are used under `app/` so admin and auth-specific organization does not affect URLs.

## Environment Variables

Copy `.env.example` to `.env.local` and set:

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

Apply the database schema in your Supabase project:

```sql
\i supabase/schema.sql
```

The repo does not currently include Supabase CLI migrations. `supabase/schema.sql` is the source of truth for bootstrapping the tables and policies used by the app.

Create at least one user in Supabase Auth. Authenticated users can access the admin area and manage content through the policies defined in `supabase/schema.sql`.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.

Admin login is available at [http://localhost:3000/admin/login](http://localhost:3000/admin/login). Next.js 16 `proxy.ts` performs the optimistic admin redirect, and server actions enforce auth again at the mutation boundary.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test:smoke
```

## Notes

- `.env.local` and other environment files are intentionally ignored by git.
- `supabase/.temp/` contains local CLI state and is intentionally ignored.
- `npm run test:smoke` expects a successful production build and verifies the public home page, admin login page, and unauthenticated `/admin` redirect.
- The repo targets Next.js 16 conventions. Check `node_modules/next/dist/docs/` before making framework-level changes.
