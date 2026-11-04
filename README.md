# YurLaps Web

YurLaps product landing page built with React, Vite, Tailwind CSS, and Lucide.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Vercel

Import this repository into Vercel. Vercel detects Vite automatically:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

The `/login` route is included and handled by the Vercel rewrite configuration. Authentication uses Supabase Auth with email/password login and registration.

Copy `.env.example` to `.env.local` for local development and fill in the Supabase project URL and anon/publishable key. Add the same variables to Vercel for Production, Preview, and Development environments. Enable **Email** under Supabase **Authentication → Providers**, and configure the site URL and redirect URLs to include your Vercel domain.
