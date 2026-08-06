<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:shadcn-setup -->
# Shadcn UI
This project uses shadcn/ui initialized with the command: `bunx --bun shadcn@latest init --preset b4gMogbSK --template next`.
Always use shadcn components from `src/components/ui` when building interfaces.
<!-- END:shadcn-setup -->

---

<!-- BEGIN:project-conventions -->
# Project Conventions for ngeBall

This document defines the **mandatory conventions** for all code written in this project. All AI agents and developers MUST read and follow these rules before writing any code. These rules exist to ensure consistency across the entire codebase.

---

## 1. Package Manager

This project uses **Bun** exclusively.

- Install packages: `bun add <package>`
- Install shadcn components: `bunx --bun shadcn@latest add <component>`
- Run scripts: `bun run dev`, `bun run build`
- **Do NOT use** `npm`, `yarn`, or `pnpm`.

---

## 2. Color System

All colors are defined as CSS custom properties in `src/app/globals.css` and mapped to Tailwind utility classes via `@theme inline`. 

**NEVER use hardcoded hex colors** (e.g., `bg-[#285A48]`, `text-[#0F172B]`). Always use the semantic class names below.

### Available Color Tokens

| Tailwind Class            | CSS Variable        | Hex Value   | Usage                                  |
|---------------------------|---------------------|-------------|----------------------------------------|
| `bg-primary` / `text-primary` | `--primary`    | `#285a48`   | Main CTA buttons, active states, logo accent |
| `bg-accent` / `text-accent`   | `--accent`     | `#408a71`   | Hover states, accent highlights        |
| `bg-background`           | `--background`      | `#f1f5f9`   | Page/screen background                 |
| `bg-white` / `text-white` | `--white`           | `#ffffff`   | Card backgrounds, button text on dark  |
| `text-text-primary`       | `--text-primary`    | `#0f172b`   | Main body text, headings, labels       |
| `text-text-secondary`     | `--text-secondary`  | `#6a7282`   | Placeholder, caption, secondary text   |
| `text-secondary`          | `--secondary`       | `#4c8ce4`   | Links, secondary actions               |
| `border-border`           | `--border`          | `#e6e6e6`   | All borders, dividers, input outlines  |
| `bg-muted` / `text-muted` | `--muted`           | `#d1d5dc`   | Disabled states, muted backgrounds     |
| `bg-dark` / `text-dark`   | `--dark`            | `#091413`   | Dark backgrounds                       |
| `text-danger` / `bg-danger` | `--danger`        | `#e7000b`   | Error messages, destructive actions    |
| `text-success` / `bg-success` | `--success`     | `#00a63e`   | Success states, confirmations          |
| `text-warning` / `bg-warning` | `--warning`     | `#d08700`   | Warning states                         |
| `text-blue` / `bg-blue`   | `--blue`            | `#1447e6`   | Informational elements                 |
| `text-green` / `bg-green` | `--green`           | `#008236`   | Alternative success                    |
| `text-red` / `bg-red`     | `--red`             | `#c10007`   | Alternative danger/error               |
| `text-orange` / `bg-orange` | `--orange`        | `#ca3500`   | Warning/alert variant                  |
| `bg-light` / `text-light` | `--light`           | `#f9f9f9`   | Light backgrounds, hover on white      |
| `text-black` / `bg-black` | `--black`           | `#000000`   | Pure black (use sparingly)             |

> **Note:** `bg-primary`, `text-primary`, `bg-secondary`, `text-secondary`, `bg-accent`, `text-accent`, `bg-muted`, `text-muted`, `border-border` are also wired into shadcn/ui's internal variable system. Using them ensures shadcn components render consistently with the design system.

---

## 3. Typography System

Custom typography utility classes are defined in `src/app/globals.css` using Tailwind v4's `@utility` directive. The font is **Inter** (applied globally).

**NEVER use ad-hoc font size classes** (e.g., `text-2xl`, `text-base`, `font-semibold`) for UI text that maps to a Figma text style. Use the semantic classes below instead.

| Class        | Font Size | Font Weight | Line Height | Usage                                  |
|--------------|-----------|-------------|-------------|----------------------------------------|
| `text-h1`    | 48px      | 600 (SemiBold) | auto     | Hero headings, landing page titles     |
| `text-h2`    | 24px      | 500 (Medium)   | auto     | Card titles, section headings          |
| `text-h3`    | 20px      | 500 (Medium)   | auto     | Sub-section headings                   |
| `text-body`  | 16px      | 400 (Regular)  | auto     | Body text, form labels, descriptions   |
| `text-small` | 14px      | 300 (Light)    | auto     | Captions, helper text, divider labels  |

**Correct usage example:**
```tsx
<h1 className="text-h1 text-text-primary">Book Your Court</h1>
<p className="text-body text-text-secondary">Select a sport and find available slots.</p>
```

---

## 4. shadcn/ui Components

### Rules
1. **Never modify** files inside `src/components/ui/`. These are managed by shadcn and may be regenerated.
2. All style overrides must be done via `className` props **at the call site**, not inside the component file.
3. When you need a new shadcn component, install it with: `bunx --bun shadcn@latest add <component-name>`

### Already Installed Components
The following shadcn components are already available in `src/components/ui/`:
- `button`
- `card` (+ `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription`)
- `input`
- `label`
- `separator`

### Override Pattern
Override shadcn component styles at the call site using `className`:
```tsx
// ✅ Correct: override at call site
<Button className="bg-primary hover:bg-primary/90 text-white rounded-[12px]">
  Login
</Button>

// ❌ Wrong: modifying src/components/ui/button.tsx
```

---

## 5. Reusable Components

Before creating a new component, always check `src/components/` for existing ones. If a component already exists, import and use it — do not recreate it.

### Currently Available Components

#### `<Logo />` — `src/components/logo.tsx`
The application logo. Renders the Volleyball icon from `lucide-react` alongside the branded "ngeBall" text.

**Props:**
| Prop            | Type     | Default | Description                          |
|-----------------|----------|---------|--------------------------------------|
| `className`     | `string` | `""`    | Wrapper div class overrides          |
| `iconClassName` | `string` | `""`    | Class overrides for the icon         |
| `textClassName` | `string` | `""`    | Class overrides for the text wrapper |

**Usage:**
```tsx
import { Logo } from "@/components/logo";

// Default
<Logo />

// With size override
<Logo className="gap-2" iconClassName="h-8 w-8" />
```

---

## 6. Project File Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── globals.css         # Global styles, CSS variables, typography utilities
│   ├── layout.tsx          # Root layout
│   ├── login/
│   │   └── page.tsx        # Login page (reference implementation)
│   └── register/
│       └── page.tsx        # Register page (sign up form)
├── components/
│   ├── ui/                 # shadcn/ui components (DO NOT MODIFY)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── separator.tsx
│   └── logo.tsx            # Reusable Logo component
└── lib/
    └── utils.ts            # Utility functions (cn helper from shadcn)
```

---

## 7. Icons

This project uses **`lucide-react`** for all icons. Do not add other icon libraries.

```tsx
import { Mail, Lock, Eye, EyeOff, Volleyball, Search } from "lucide-react";
```

---

## 8. Input with Inline Icons Pattern

When a design requires an icon inside an input field, use this pattern:

```tsx
<div className="relative">
  {/* Left icon */}
  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
    <Mail className="h-4 w-4" />
  </div>
  <Input
    className="h-10 pl-10 border-border rounded-[6px] text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
    placeholder="eg. youremail@gmail.com"
  />
  {/* Right icon (optional) */}
  <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary hover:text-text-primary cursor-pointer">
    <EyeOff className="h-5 w-5" />
  </button>
</div>
```

> **Placeholder convention:** Use `eg.` (with a period) for example markers in placeholders — never `eg,`. E.g. `eg. John`, `eg. youremail@gmail.com`.

---

## 9. Implemented Pages (Reference)

| Route       | File                              | Status    | Description                              |
|-------------|-----------------------------------|-----------|------------------------------------------|
| `/login`    | `src/app/login/page.tsx`          | ✅ Done   | Login with email/password + Google SSO   |
| `/register` | `src/app/register/page.tsx`       | ✅ Done   | Sign up (names, email, password) + validation |

---

## 10. Coding Standards

- **Language:** TypeScript. All new files must use `.tsx` (for JSX) or `.ts` (for utilities).
- **Component pattern:** Use named exports (`export function MyComponent`) — not default exports for reusable components.
- **Client components:** Add `"use client"` directive only when the component uses React state, effects, or browser APIs.
- **Imports:** Use the `@/` path alias for all internal imports (e.g., `@/components/logo`, `@/lib/utils`).
- **No inline styles:** Never use the `style` prop. Always use Tailwind classes.
<!-- END:project-conventions -->
