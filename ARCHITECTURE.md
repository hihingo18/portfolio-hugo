# Portfolio Hugo — Architecture Overview

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 + inline `clamp()` for fluid sizing |
| Animation | Framer Motion 12 |
| Language | TypeScript 5.7 (strict) |
| Utilities | `clsx` + `tailwind-merge` (via `lib/cn.ts`) |

---

## Project Structure

```
portfolio-hugo/
├── app/
│   ├── layout.tsx                  # Root layout — sets <html lang>, global font
│   └── [locale]/
│       ├── layout.tsx              # Locale layout (Server Component) — loads dict, wraps with LocaleProvider
│       ├── page.tsx                # Page entry — renders PageContent
│       └── error.tsx               # Error boundary for locale segment
├── components/
│   ├── page-layout/
│   │   └── PageContent.tsx         # Main layout shell — sidebar + scrollable main
│   ├── sidebar/
│   │   └── Sidebar.tsx             # Fixed left panel: nav, language switcher, social links
│   ├── hero/
│   │   └── HeroSection.tsx         # Landing hero with animated headline
│   ├── projects/
│   │   ├── ProjectsSection.tsx     # Projects grid section
│   │   └── ProjectCard.tsx         # Individual project card
│   ├── testimonials/
│   │   ├── TestimonialsSection.tsx # Testimonials carousel/grid
│   │   └── TestimonialCard.tsx     # Individual testimonial card
│   ├── about/
│   │   └── AboutSection.tsx        # About me section
│   ├── contact/
│   │   └── ContactPanel.tsx        # Slide-in contact form panel
│   ├── footer/
│   │   └── Footer.tsx              # Page footer
│   ├── icons/
│   │   ├── NavIcons.tsx            # Home, Projects, About icons
│   │   ├── SocialIcons.tsx         # Instagram, LinkedIn, TikTok, Behance icons
│   │   └── UIIcons.tsx             # Star and other decorative icons
│   └── ui/
│       ├── Button.tsx              # Primary button component
│       ├── Input.tsx               # Text input component
│       ├── Textarea.tsx            # Textarea component
│       └── index.ts                # Re-exports
├── context/
│   └── LocaleContext.tsx           # React context + useLocale() hook
├── hooks/
│   └── useScrollSpy.ts             # IntersectionObserver-based active section tracker
├── lib/
│   ├── cn.ts                       # clsx + twMerge utility
│   ├── constants.ts                # SOCIAL_LINKS, FORM_CONSTRAINTS, LOCALE_PREFIX_PATTERN
│   ├── fonts.ts                    # Next.js font definitions
│   ├── i18n.ts                     # Dictionary type, locale list, getDictionary()
│   ├── theme.ts                    # COLORS and SHADOWS design tokens
│   └── icons/
│       └── tech-icons-registry.tsx # SVG tech stack icon components
├── locales/
│   ├── en.json                     # English copy — nav, hero, projects, testimonials, about, contact
│   └── vn.json                     # Vietnamese copy (same schema as en.json)
├── types/
│   └── index.ts                    # Shared TypeScript types
└── middleware.ts                   # Locale redirect middleware
```

---

## i18n Architecture

The internationalisation flow is intentionally simple — no third-party i18n library.

```
Request: /about
        │
        ▼
middleware.ts
  - Reads "locale" cookie (default: "en")
  - Redirects → /en/about
        │
        ▼
app/[locale]/layout.tsx   (Server Component)
  - Awaits params.locale
  - Calls getDictionary(locale) — dynamic import of locales/en.json or locales/vn.json
  - Wraps children in <LocaleProvider dict={dict} locale={locale}>
        │
        ▼
context/LocaleContext.tsx  (Client Component boundary)
  - Holds dict + locale in React context
  - Exposes useLocale() hook to any client component
        │
        ▼
Any client component
  const { dict, locale } = useLocale();
```

**Language switching** (in `Sidebar.tsx`):
1. Write `locale=xx` cookie via `document.cookie`
2. Navigate with `window.location.href` — hard navigation ensures Server Component re-runs fresh (bypasses Next.js 15 Router Cache)

**Type safety**: `Dictionary` type is inferred directly from `en.json` via `typeof en` — no manual type maintenance needed.

---

## Page Layout

```
┌────────────────────────────────────────────────────┐
│  Fixed Left Panel (22vw, min 280px, max 400px)      │
│  ┌──────────────────────────────────────────────┐  │
│  │  Avatar image                                │  │
│  │  Nav: Home | Projects | About                │  │
│  │  Language: EN / VN                           │  │
│  │  Social: Instagram LinkedIn TikTok Behance   │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  Scrollable Right Panel (flex-1)                   │
│  ┌──────────────────────────────────────────────┐  │
│  │  #home      — HeroSection                   │  │
│  │  #projects  — ProjectsSection               │  │
│  │  #trust     — TestimonialsSection           │  │
│  │  #about     — AboutSection                  │  │
│  │             — Footer                        │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  Overlay: ContactPanel (slide-in)                  │
└────────────────────────────────────────────────────┘
```

`PageContent.tsx` is the top-level client component that composes the layout. It:
- Tracks `activeSection` via `useScrollSpy`
- Passes `activeSection` and `onNavClick` down to `Sidebar`
- Manages `showContact` state to toggle `ContactPanel`

---

## Scroll Spy

`useScrollSpy` uses the native `IntersectionObserver` API to detect which section is currently in view.

```ts
// hooks/useScrollSpy.ts
new IntersectionObserver(callback, {
  threshold: 0,                        // Fire as soon as any pixel enters viewport
  rootMargin: "-120px 0px -70% 0px",  // Shrinks observation zone: 120px from top, 70% from bottom
})
```

The rootMargin creates a narrow horizontal "trigger band" near the top of the viewport. The section with the highest `intersectionRatio` within that band is the active one.

**SectionId vs NavId**: Sections include `"trust"` (testimonials) which has no nav item. The sidebar only highlights `"home" | "projects" | "about"` — when `"trust"` is active, `"projects"` remains highlighted (intentional, no nav item for testimonials).

---

## Data Flow — Projects

All project data lives in the locale JSON files. No separate data files.

```json
// locales/en.json
{
  "projects": {
    "sectionTitle": "My Projects",
    "items": {
      "project-1": {
        "name": "...",
        "type": "...",
        "image": "/images/...",
        "cardBg": "#f0f0f0",
        "role": "...",
        "stack": "...",
        "description": "..."
      }
    }
  }
}
```

`ProjectsSection` maps `Object.entries(p.items)` → `Project[]` and renders a card per project.

---

## Design Tokens

All design values are centralised in `lib/theme.ts`:

```ts
COLORS = {
  primary: "#020073",        // Navy blue — brand color
  primaryDark: "rgb(0,0,54)",
  background: "#f6f9f7",     // Light green-tinted off-white
  text: "#1A1A1A",
  textSecondary: "#757575",
  error: "#CC2927",
  ...
}

SHADOWS = {
  inset: "inset 2px 0 0 #020073",   // Active nav indicator
}
```

Fluid typography and spacing use CSS `clamp()` inline (e.g., `clamp(14px, 1.1vw, 20px)`) rather than Tailwind breakpoints, keeping responsive behaviour in one place per component.

---

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `PageContent` | Layout shell, scroll spy state, contact panel toggle |
| `Sidebar` | Navigation, locale switch, social links |
| `HeroSection` | Animated headline, CTA button |
| `ProjectsSection` | Grid of project cards from locale data |
| `ProjectCard` | Single project display with hover effects |
| `TestimonialsSection` | Social proof section with quote cards |
| `TestimonialCard` | Single testimonial — name, role, quote |
| `AboutSection` | Bio, skills, tech stack |
| `ContactPanel` | Slide-in overlay form with validation |
| `Footer` | Copyright, links |

---

## Key Design Decisions

**1. No i18n library** — Locale loading is a simple dynamic `import()` of JSON. The dictionary shape is type-safe via `typeof en`. Zero runtime overhead compared to i18n libraries.

**2. Server Component loads data, Client Context distributes it** — `app/[locale]/layout.tsx` is async (server), fetches the dictionary, passes it to `<LocaleProvider>` (client). Client components use `useLocale()` — no client-side fetching, no waterfalls.

**3. Animation variants inline, not in separate files** — Each component defines its own `*_VARIANTS` constant at the top of the file. No `lib/animations/` abstraction because each variant is used by only one component.

**4. Hard navigation for locale switch** — `window.location.href` instead of `router.push` ensures the Server Component always re-runs with the new locale, bypassing Next.js 15 Router Cache which can serve stale RSC payloads on soft navigation.

**5. All project content in locale JSON** — `name`, `image`, `cardBg` and copy all live in `locales/*.json`. No separate data files to keep in sync.
