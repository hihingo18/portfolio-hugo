# Portfolio Hugo — Architecture Overview

A single-page, bilingual (EN/VN) personal portfolio with light/dark theming, built on the Next.js App Router. Content is data-driven from locale JSON; there is no CMS or database.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS v4 + inline `clamp()` for fluid sizing |
| UI primitives | shadcn (`@base-ui/react`) + `class-variance-authority` |
| Animation | Framer Motion 12 |
| Email | Resend (contact form) |
| Utilities | `clsx` + `tailwind-merge` (via `lib/utils.ts` → `cn()`) |
| Fonts | `next/font/google` — Sora (UI) + Fira Sans (italic quotes) |

---

## Project Structure

```
portfolio-hugo/
├── app/
│   ├── layout.tsx                  # Root layout — reads `theme` cookie (server), sets <html class="dark">, mounts fonts + ThemeProvider
│   ├── globals.css                 # Tailwind v4 entry, shadcn tokens, dark variant, scrollbar, gradient keyframes
│   ├── [locale]/
│   │   ├── layout.tsx              # Locale layout (Server Component) — generateMetadata, getDictionary, LocaleProvider
│   │   ├── page.tsx                # Page entry — renders <PageContent />
│   │   └── error.tsx               # Error boundary for the locale segment
│   └── api/
│       └── contact/route.ts        # POST handler — sends contact email via Resend
├── components/
│   ├── page-layout/PageContent.tsx # Layout shell — sidebar/topbar + scrollable main; owns scroll-spy + contact-panel state
│   ├── sidebar/
│   │   ├── Sidebar.tsx             # Full panel (desktop): avatar, nav, theme toggle, locale switch, socials
│   │   ├── TopBar.tsx              # Mobile top bar with hamburger
│   │   ├── MobileDrawer.tsx        # Slide-in nav drawer (mobile)
│   │   └── navigation.ts           # NAV_ORDER, NAV_ICONS, SOCIAL_ICONS, useSwitchLocale()
│   ├── hero/HeroSection.tsx        # Landing hero with animated headline + CTA
│   ├── projects/
│   │   ├── ProjectsSection.tsx     # Projects grid from locale data
│   │   └── ProjectCard.tsx         # Single project card (theme-aware image, hover lift)
│   ├── skills/
│   │   ├── SkillsSection.tsx       # Core-capabilities columns + method chips
│   │   └── SectionConnector.tsx    # Decorative connector between sections
│   ├── testimonials/
│   │   ├── TestimonialsSection.tsx # Highlight quote + testimonial cards; drives chained proof-image reveal
│   │   └── TestimonialCard.tsx     # Single testimonial + "Original message" proof toggle
│   ├── about/AboutSection.tsx      # Bio, values, interests
│   ├── contact/ContactPanel.tsx    # Slide-in overlay contact form (posts to /api/contact)
│   ├── footer/Footer.tsx           # Page footer
│   ├── icons/
│   │   ├── NavIcons.tsx            # Home, Projects, Skills, About
│   │   ├── SocialIcons.tsx         # LinkedIn, GitHub
│   │   └── UIIcons.tsx             # Sun/Moon (theme), ArrowLeft, decorative icons
│   └── ui/                         # shadcn primitives: button, card, input, label, textarea
├── context/
│   ├── LocaleContext.tsx           # dict + locale context, useLocale()
│   └── ThemeContext.tsx            # theme state + toggle(), useTheme(), useColors()
├── hooks/
│   └── useScrollSpy.ts             # IntersectionObserver-based active-section tracker
├── lib/
│   ├── utils.ts                    # cn() = clsx + tailwind-merge
│   ├── constants.ts                # SOCIAL_LINKS, CONTACT, FORM_CONSTRAINTS, LOCALE_PREFIX_PATTERN
│   ├── fonts.ts                    # Sora + Fira Sans definitions
│   ├── i18n.ts                     # Dictionary type, locales, isValidLocale(), getDictionary()
│   └── theme.ts                    # ColorTokens + LIGHT_TOKENS / DARK_TOKENS + getColors()
├── locales/
│   ├── en.json                     # nav, hero, projects, testimonials, about, skills, footer, contact
│   └── vn.json                     # Vietnamese copy (identical schema — source of the Dictionary type)
├── types/index.ts                  # Project, Testimonial, SectionId, NavId
├── middleware.ts                   # Locale-prefix redirect
└── next.config.ts                  # Next.js Image optimization enabled
```

---

## i18n Architecture

Intentionally library-free — locales are plain JSON loaded via dynamic `import()`.

```
Request: /about
        │
        ▼
middleware.ts
  - Skips paths already prefixed with a valid locale, plus _next/api/images/static assets (matcher)
  - Reads "locale" cookie (default "en") → redirects to /en/about
        │
        ▼
app/[locale]/layout.tsx   (Server Component)
  - await params.locale → validate via isValidLocale (fallback "en")
  - getDictionary(locale) → dynamic import of locales/{locale}.json
  - Wraps children in <LocaleProvider dict={dict} locale={locale}>
        │
        ▼
context/LocaleContext.tsx  (Client boundary)
  - Holds dict + locale in React context, exposes useLocale()
        │
        ▼
Any client component:  const { dict, locale } = useLocale();
```

- **Language switch** (`useSwitchLocale` in `navigation.ts`): writes `locale=xx` cookie, then `window.location.href` (hard navigation) so the Server Component re-runs fresh, bypassing the Next.js Router Cache.
- **Type safety**: `Dictionary = typeof en` — the English JSON is the schema; `vn.json` must match it.
- **Path rewriting**: `LOCALE_PREFIX_PATTERN` (`/^\/(en|vn)(?=\/|$)/`) swaps the locale prefix while preserving the rest of the path.

---

## Theming (Light / Dark)

Theme is resolved on the server (no flash) and toggled on the client.

```
app/layout.tsx (Server)
  - reads "theme" cookie (default "light")
  - renders <html class={dark ? "dark" : ""}> + <ThemeProvider initialTheme={theme}>
        │
        ▼
context/ThemeContext.tsx (Client)
  - useState(initialTheme)
  - toggle(): flips <html>.dark, writes "theme" cookie (1yr), updates state
        │
        ▼
useColors() → getColors(isDark) from lib/theme.ts
  - returns semantic tokens { bgBase, textBase, brandPrimary, border*, status*, … } + isDark
```

Two token layers, kept in sync by convention:
- **`lib/theme.ts`** — `LIGHT_TOKENS` / `DARK_TOKENS` consumed in TS via `useColors()` (inline `style={{ color: colors.textBase }}`).
- **`globals.css`** — mirrored CSS variables under `:root` and `.dark` for shadcn/Tailwind utilities (`--background`, `--primary`, …). The Tailwind `dark:` variant is defined as `@custom-variant dark (&:where(.dark, .dark *))`.

> **Rule:** components pick tokens by name (`useColors()`) or `dark:` utilities — avoid raw hex.

---

## Page Layout & Responsiveness

`PageContent.tsx` is the top-level client component composing the whole page. It owns `activeSection` (via `useScrollSpy`) and `showContact` / `showDrawer` state.

```
mobile (< md)              tablet (md)                desktop (lg+)
┌───────────────┐          ┌──┬──────────┐            ┌───────────┬──────────────┐
│ TopBar (☰)    │          │IC│  main     │            │  Sidebar  │  main         │
├───────────────┤          │ON│ (scroll)  │            │  (full)   │  (scroll)     │
│  main         │          │  │           │            │  avatar   │  #home        │
│  (scroll)     │          │  │           │            │  nav      │  #projects    │
│               │          └──┴──────────┘            │  theme    │  #skills      │
│  MobileDrawer │          icon-only rail             │  EN / VN  │  #trust       │
│  (slide-in)   │          (md:w-16)                  │  socials  │  #about       │
└───────────────┘                                     └───────────┴──────────────┘
                                                       lg:w-[22vw] min 280 / max 360
```

- Sidebar container: `hidden md:block md:fixed md:w-16 lg:w-[22vw] lg:min-w-70 lg:max-w-90`, with a matching spacer so `main` isn't overlapped.
- Section order in `main`: `#home` → `#projects` → `#skills` → `SectionConnector` → `#about` → `Footer`, with `#trust` (testimonials) between projects and skills. `ContactPanel` is a fixed slide-in overlay.

---

## Scroll Spy

`useScrollSpy(sectionIds)` uses `IntersectionObserver` to pick the section with the highest `intersectionRatio`.

```ts
new IntersectionObserver(cb, { threshold: 0, rootMargin: "-120px 0px -70% 0px" })
```

The `rootMargin` shrinks the observation band to a strip near the top of the viewport (120px from top, 70% cut from bottom).

- **`SectionId` vs `NavId`**: sections include `"trust"` (testimonials), which has **no** nav item. `NAV_ORDER = [home, projects, skills, about]`; when `"trust"` is active no nav item lights up (intentional).

---

## Data Flow — Projects & Testimonials

All display content lives in `locales/*.json`; no separate data files.

```jsonc
// locales/en.json → projects.items.<id>
{ "name", "image", "imageDark", "cardBg", "type", "role", "stack", "description" }
// projects.items may also carry an optional "link"

// locales/en.json → testimonials.items.<id>
{ "name", "role", "company", "quote" }   // + highlight { quotes[], author, role, company }
```

- `ProjectsSection` maps the JSON items into `Project[]` and renders a `ProjectCard` each; the card swaps `image` / `imageDark` based on `useColors().isDark`.
- `TestimonialsSection` composes `Testimonial[]` in code and attaches the proof-screenshot paths (`/images/testimonials/*.png`).

### Testimonial proof reveal (chained on-scroll)

Each card has an **"Original message"** toggle showing a screenshot of the real message.
- Default **off**; images stay mounted (preloaded/decoded) so the reveal only animates a fixed numeric height (`0 → 230px`) + opacity — never `height: "auto"` (avoids layout jank).
- `TestimonialsSection` uses `useInView` (once) on the grid; when in view it reveals card 0, and each card fires `onRevealComplete` when its slide-down finishes to trigger the next → a smooth 0 → 1 → 2 chain (no fixed timers).
- Robust fallbacks: broken/missing images (`onError` / `naturalWidth === 0`) hide the box and advance the chain so it never stalls.

---

## Contact Form

```
ContactPanel (client)
  - client-side validation via FORM_CONSTRAINTS
  - POST /api/contact { name, email, message }
        │
        ▼
app/api/contact/route.ts (force-dynamic)
  - requires RESEND_API_KEY env var
  - Resend.emails.send({ from: CONTACT.fromEmail, to: CONTACT.email, replyTo: email })
  - returns JSON { message } | { error }
```

`CONTACT` (email/phone/fromEmail) in `lib/constants.ts` is the single source of truth for both the panel display and the mailer.

---

## Design Tokens

- **Semantic colors**: `lib/theme.ts` (`bg*`, `text*`, `brand*`, `border*`, `status*`, `white`) → `useColors()`.
- **shadcn/Tailwind CSS vars**: `globals.css` `:root` / `.dark` mirror the same palette.
- **Fluid sizing**: inline CSS `clamp()` (e.g. `clamp(14px, 1.1vw, 20px)`) keeps responsive behavior local to each component rather than spread across Tailwind breakpoints.
- Brand accent: `#020073` (light) / `#6b9fff` (dark).

---

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `PageContent` | Layout shell; scroll-spy, drawer + contact-panel state |
| `Sidebar` / `TopBar` / `MobileDrawer` | Navigation, theme toggle, locale switch, socials (per breakpoint) |
| `HeroSection` | Animated headline + "Work with me" CTA |
| `ProjectsSection` / `ProjectCard` | Project grid from locale data (theme-aware images) |
| `SkillsSection` / `SectionConnector` | Core capabilities + decorative connector |
| `TestimonialsSection` / `TestimonialCard` | Social proof + chained proof-image reveal |
| `AboutSection` | Bio, values, interests |
| `ContactPanel` | Slide-in form → `/api/contact` |
| `Footer` | Copyright |

---

## Key Design Decisions

1. **No i18n library** — dictionaries are dynamic `import()`s of JSON; shape is type-safe via `typeof en`. Zero runtime overhead.
2. **Server loads data/theme, client distributes** — `[locale]/layout.tsx` (async) loads the dictionary; root `layout.tsx` resolves the theme cookie before render (no theme flash). Providers push both into client context.
3. **Hard navigation for locale switch** — `window.location.href` guarantees the Server Component re-runs with the new locale, avoiding stale RSC payloads from the Router Cache.
4. **Two mirrored token systems** — TS tokens (`useColors()`) for inline styles + CSS vars for shadcn utilities; both edited together.
5. **Reveal animations avoid `height: auto`** — proof images are preloaded and animate a fixed numeric height, chained by animation completion, to stay smooth.
6. **All content in locale JSON** — copy, image paths and `cardBg` all live in `locales/*.json`; no separate data layer to keep in sync.
```
