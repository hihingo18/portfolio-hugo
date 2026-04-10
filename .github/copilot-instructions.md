# Copilot Instructions for This Project

## Project Overview

This is a modern landing page portfolio built with:

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript (strict mode)

Copilot should prioritize clean, readable, and well-structured code.

---

## 1. Styling Guidelines

- Use **Tailwind CSS utility-first approach**
- Do NOT create custom CSS unless absolutely necessary
- Avoid using `@apply`
- Keep styles inline in JSX using Tailwind classes
- Follow consistent spacing, sizing, and layout patterns

---

## 2. Responsive Design

- Follow **desktop-first approach**
- Then adapt to smaller screens using Tailwind breakpoints (`lg`, `md`, `sm`)
- Ensure layouts degrade gracefully

---

## 3. Component Structure

- Use **feature-based structure**
- Group components by sections:

```
/components
  /navbar
  /hero
  /about
  /projects
  /contact
  /footer
```

- Keep components small and focused
- One main responsibility per component

---

## 4. Naming Conventions

- Use **PascalCase** for all components:
  - `HeroSection.tsx`
  - `Navbar.tsx`
- Use clear, descriptive names

---

## 5. Code Style

- Prioritize **readability over cleverness**
- Always include:
  - Clear variable names
  - Logical structure
  - Comments when needed
- Avoid overly complex logic inside JSX

---

## 6. TypeScript Rules

- Use **strict typing**
- Avoid `any`
- Prefer interfaces for props and explicit types for functions

```ts
interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

---

## 7. Component Reusability

- Use moderate reusability
- Extract reusable components only when:
  - Used multiple times
  - Improves readability
- Do NOT over-engineer abstractions

---

## 8. UI Components

Build a small internal UI library:

```
/components/ui
  Button.tsx
  Card.tsx
  Container.tsx
```

Keep UI components:

- Simple
- Flexible via props
- Styled with Tailwind only

---

## 9. Animations (Framer Motion)

Use section-based animations:

- `fade-in`
- `slide-up`
- Scroll-triggered animations

Keep animations smooth, subtle, and performance-friendly.

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

---

## 10. Next.js Best Practices

- Use App Router (`/app`)
- Prefer server components when possible
- Use client components only when needed (`"use client"`)

---

## 11. General Rules for Copilot

Copilot **SHOULD**:

- Generate clean, production-ready code
- Follow project structure strictly
- Use Tailwind for styling
- Use TypeScript correctly
- Keep components readable and modular

Copilot **SHOULD NOT**:

- Introduce unnecessary dependencies
- Add inline styles (unless unavoidable)
- Use CSS files
- Overcomplicate logic

---

## 12. Folder Structure Summary

```
/app
/components
  /ui
  /navbar
  /hero
  /about
  /projects
  /footer
/lib
/types
```

---

## Goal

Maintain a clean, scalable, and modern codebase that is:

- Easy to read
- Easy to extend
- Visually polished
- Consistent across all components