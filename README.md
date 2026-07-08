# Portfolio Hugo

A single-page, bilingual (English / Vietnamese) personal portfolio for **Hugo — Technical Lead & Senior Full-Stack Engineer**. Built with the Next.js App Router, React 19 and Tailwind CSS v4, featuring light/dark theming, scroll-spy navigation and a Resend-powered contact form.

> For a deep dive into how everything fits together, see **[ARCHITECTURE.md](ARCHITECTURE.md)**.

---

## Features

- 🌐 **Bilingual (EN / VN)** — library-free i18n via locale JSON + middleware redirect; language switch persisted in a cookie.
- 🌗 **Light / dark theme** — resolved on the server (no flash), toggled on the client, persisted in a cookie.
- 🧭 **Scroll-spy navigation** — active section tracked with `IntersectionObserver`.
- 📱 **Responsive shell** — full sidebar on desktop, icon rail on tablet, top bar + slide-in drawer on mobile.
- 🖼️ **Testimonials with proof** — each testimonial can reveal a screenshot of the original message via a smooth, chained on-scroll animation.
- ✉️ **Contact form** — client-validated, sends email through [Resend](https://resend.com) via an API route.
- 🎨 **Semantic design tokens** — colors centralized in `lib/theme.ts` and mirrored as CSS variables for shadcn/Tailwind.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 · TypeScript 5.7 (strict) |
| Styling | Tailwind CSS v4 · shadcn (`@base-ui/react`) · `clamp()` fluid sizing |
| Animation | Framer Motion 12 |
| Email | Resend |
| Fonts | Sora (UI) · Fira Sans (italic quotes) via `next/font/google` |

---

## Getting Started

### Prerequisites

- **Node.js 18.18+** (Next.js 15 requirement; 20 LTS recommended)
- npm (or your preferred package manager)

### Install

```bash
npm install
```

### Environment variables

Create `.env.local` in the project root:

```bash
# Required only for the contact form (/api/contact) to actually send email.
RESEND_API_KEY=your_resend_api_key
```

Without `RESEND_API_KEY`, the site runs fine; only contact-form submissions return a 500. Get a key at [resend.com](https://resend.com). The recipient, phone and "from" address live in `lib/constants.ts` (`CONTACT`).

### Develop

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` (or `/vn` per the `locale` cookie).

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`eslint-config-next`) |

> **Windows note:** if the dev server throws `__webpack_modules__[...] is not a function`, `AnimatePresence is not defined`, or a blank page after edits, it's a stale/corrupted `.next` cache. Fix with `rm -rf .next` (PowerShell: `Remove-Item -Recurse -Force .next`) and restart `npm run dev`.

---

## Project Structure

```
app/            # App Router: root + [locale] layouts, page, error, /api/contact
components/     # Feature sections (hero, projects, skills, testimonials, about, contact) + sidebar + ui/ + icons/
context/        # LocaleContext (i18n) + ThemeContext (dark mode)
hooks/          # useScrollSpy
lib/            # utils (cn), constants, fonts, i18n, theme tokens
locales/        # en.json / vn.json — all site copy + project/testimonial data
types/          # shared TypeScript types
public/images/  # project + testimonial screenshots, avatar, favicon
middleware.ts   # locale-prefix redirect
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full tree and data-flow diagrams.

---

## Editing Content

All copy and data are data-driven — **no code changes needed for content**:

- **Text, projects, testimonials, skills** → edit `locales/en.json` and `locales/vn.json` (keep both in sync; `en.json` defines the TypeScript `Dictionary` shape).
- **Images** → drop files in `public/images/` and reference them by path (e.g. `projects.items.*.image`, testimonial proof screenshots in `public/images/testimonials/`).
- **Contact / social links** → `lib/constants.ts` (`CONTACT`, `SOCIAL_LINKS`).
- **Theme colors** → `lib/theme.ts` (semantic tokens) and the mirrored CSS variables in `app/globals.css`.

Adding a locale: add the code to `locales`/`isValidLocale` in `lib/i18n.ts`, the middleware, and `LOCALE_PREFIX_PATTERN` in `lib/constants.ts`, then create `locales/<code>.json`.

---

## Deployment

Standard Next.js app — deploys cleanly to **[Vercel](https://vercel.com)** (recommended) or any Node host.

1. Push to your Git provider and import the repo (or run `npm run build && npm run start`).
2. Set the `RESEND_API_KEY` environment variable in your host.
3. Image optimization is enabled (`next.config.ts`); use a host with serverless/Node support, or set `images.unoptimized: true` for pure static hosting.
