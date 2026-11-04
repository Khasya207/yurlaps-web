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

The `/login` route is included and handled by the Vercel rewrite configuration. Login uses email and password. Registration uses email, password, CAPTCHA, and a six-digit email OTP verification step.

Copy `.env.example` to `.env.local` for local development and fill in the Supabase project URL and anon/publishable key. Add the same variables to Vercel for Production, Preview, and Development environments. Enable **Email** under Supabase **Authentication → Providers**, and configure the site URL and redirect URLs to include your Vercel domain.

## YURLAPS AUTH email

Customize registration and password-reset emails from **Supabase → Authentication → Email Templates**. Suggested values:

- **Sender name:** `YURLAPS AUTH`
- **Confirm signup subject:** `Welcome to YURLAPS AUTH — confirm your email`
- **Reset password subject:** `YURLAPS AUTH — reset your password`
- **Confirm signup link:** keep Supabase's `{{ .ConfirmationURL }}` variable

For OTP emails, customize the **Magic Link** template and use the `{{ .Token }}` variable for the six-digit code. Example subject:

`Your YURLAPS AUTH verification code`

Use the Supabase template variables such as `{{ .Email }}`, `{{ .Token }}`, and `{{ .SiteURL }}`. Configure the same URLs under **Authentication → URL Configuration**:

- `http://127.0.0.1:5173`
- Your Vercel production URL

## Registration CAPTCHA

Create a Cloudflare Turnstile widget and set its site key as `VITE_TURNSTILE_SITE_KEY` in `.env.local` and Vercel. Add the same hostname(s) to the Turnstile widget configuration. Then enable CAPTCHA in **Supabase → Authentication → Bot and Abuse Protection** and enter the Turnstile secret key there. The secret key must never be added to Vite environment variables or frontend code.
