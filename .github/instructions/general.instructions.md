---
applyTo: "**"
---

# General Instructions

General coding rules applied across the entire project.

---

## 1. Code Quality Principles

- Write code that is **readable first**, optimized second
- Follow the **Single Responsibility Principle**: each function and component does one thing
- Keep functions short — if a function exceeds ~30 lines, consider breaking it up
- Avoid deeply nested logic; prefer early returns to reduce nesting
- No dead code, unused imports, or commented-out blocks left in committed files
- Prefer **explicit over implicit** — avoid magic numbers or unexplained values

```ts
// Bad
if (status === 2) { ... }

// Good
const STATUS_ACTIVE = 2;
if (status === STATUS_ACTIVE) { ... }
```

---

## 2. Naming Conventions

### Files & Directories

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `HeroSection.tsx` |
| Utility / helper files | camelCase | `formatDate.ts` |
| Hook files | camelCase, prefix `use` | `useScrollPosition.ts` |
| Type / interface files | camelCase | `project.types.ts` |
| Constants files | camelCase | `siteConfig.ts` |
| Directories | kebab-case | `/hero-section/` |

### Variables & Functions

- **Variables**: `camelCase` — `userProfile`, `isLoading`
- **Constants**: `SCREAMING_SNAKE_CASE` — `MAX_RETRY_COUNT`
- **React components**: `PascalCase` — `ProjectCard`
- **Event handlers**: prefix `handle` — `handleSubmit`, `handleMenuToggle`
- **Boolean variables**: prefix `is`, `has`, `can` — `isOpen`, `hasError`
- **Async functions**: use descriptive verbs — `fetchProjects`, `submitContactForm`

### TypeScript

- **Interfaces**: `PascalCase`, no `I` prefix — `ProjectCardProps`, `ContactFormData`
- **Types**: `PascalCase` — `AnimationVariant`, `ThemeMode`
- **Enums**: `PascalCase` with `PascalCase` members — `enum Status { Active, Inactive }`
- **Generics**: single uppercase letter or descriptive name — `T`, `TData`, `TResponse`

---

## 3. Files and Folders Structure

```
/app                        # Next.js App Router pages and layouts
  layout.tsx
  page.tsx
  globals.css

/components                 # All UI components grouped by feature
  /ui                       # Reusable primitive components
    Button.tsx
    Card.tsx
    Container.tsx
  /navbar
    Navbar.tsx
  /hero
    HeroSection.tsx
  /about
    AboutSection.tsx
  /projects
    ProjectsSection.tsx
    ProjectCard.tsx
  /contact
    ContactSection.tsx
  /footer
    Footer.tsx

/lib                        # Utility functions and shared logic
  formatDate.ts
  cn.ts                     # Tailwind class merging utility

/types                      # Shared TypeScript interfaces and types
  project.types.ts
  contact.types.ts

/public                     # Static assets (images, fonts, icons)
/hooks                      # Custom React hooks
```

### Rules

- Do not mix unrelated concerns in the same file
- Every component lives in its own file — no multi-component files
- Co-locate component-specific types with the component or in `/types`
- Keep `/lib` for pure utility functions with no React dependencies
- Do not put business logic inside component files; extract to `/lib` or `/hooks`

---

## 4. Comments & Documentation

### When to Comment

- Comment **why**, not **what** — the code itself explains what it does
- Add comments for non-obvious logic, workarounds, or external constraints
- Use `// TODO:` for known follow-up work, `// FIXME:` for known bugs

```ts
// TODO: Replace with real API when backend is ready
const projects = MOCK_PROJECTS;

// FIXME: framer-motion layout animation causes flicker on Safari
```

### JSDoc for Shared Utilities

Add JSDoc to functions in `/lib` and `/hooks` that are reused across components:

```ts
/**
 * Merges Tailwind CSS class names, resolving conflicts via clsx + tailwind-merge.
 * @param inputs - One or more class name strings or conditional class objects
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]): string { ... }
```

### What NOT to Comment

- Do not comment self-explanatory code
- Do not leave auto-generated or IDE boilerplate comments
- Do not use block comments (`/* */`) for inline annotation; use `//`

---

## 5. Error Handling

### General Rules

- Never silently swallow errors — always log or surface them appropriately
- Handle errors **at the boundary** closest to the user, not deep inside utilities
- Distinguish between expected errors (user input, not found) and unexpected errors (network failure, runtime crash)

### Client-Side (React / Next.js)

- Use `try/catch` for async data fetching inside hooks or server actions
- Display user-friendly messages — never expose raw error objects to the UI
- Use `error.tsx` (Next.js App Router) for route-level error boundaries

```ts
// hooks/useFetchProjects.ts
try {
  const data = await fetchProjects();
  setProjects(data);
} catch (error) {
  console.error("[useFetchProjects]", error);
  setError("Failed to load projects. Please try again.");
}
```

### TypeScript Error Safety

- Avoid `as unknown as T` casts to suppress errors
- Use narrowing (`instanceof`, `typeof`, type guards) before accessing error properties

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred.";
}
```

### What NOT to Do

- Do not use `console.log` for errors in production paths — use `console.error`
- Do not throw raw strings — always throw `Error` instances
- Do not catch errors just to re-throw without adding context
