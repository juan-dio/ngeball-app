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
- Run scripts: `bun run dev`, `bun run build`, `bun run start`
- Lint: `bun run lint` (ESLint flat config in `eslint.config.mjs`)
- There is **no test suite**. Verify changes with lint + `bun run build`; typecheck manually with `bunx tsc --noEmit`.
- **Do NOT use** `npm`, `yarn`, or `pnpm`.
- **Git workflow:** development happens on page-specific feature branches (`landing-page`, `login-page`, `register-page`) that are merged into `main` via PRs.

---

## 2. Color System

All colors are defined as CSS custom properties in `src/app/globals.css` and mapped to Tailwind utility classes via `@theme inline`. 

### Color Selection Priority

When choosing a color class, follow this order:

1. **Custom semantic utility** — use the design tokens below (e.g., `bg-primary`, `text-text-primary`).
2. **Default Tailwind utility** — if no token fits, use Tailwind's built-in color utilities (e.g., `bg-white`, `text-black`).
3. **Arbitrary value** — only as a last resort when neither custom nor default utilities fit (e.g., `bg-[#285A48]`, `text-[#0F172B]`).

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
| `bg-black` / `text-black` | `--black`           | `#000000`   | Pure black (use sparingly)             |
| `bg-yellow` / `text-yellow` | `--yellow`       | `#ffdf20`   | "Easy Booking" accent card background  |
| `bg-burnt-orange` / `text-burnt-orange` | `--burnt-orange` | `#bb4d00` | Icons/text on yellow accent card |

> **Note:** `bg-primary`, `text-primary`, `bg-secondary`, `text-secondary`, `bg-accent`, `text-accent`, `bg-muted`, `text-muted`, `border-border` are also wired into shadcn/ui's internal variable system. Using them ensures shadcn components render consistently with the design system.

---

## 3. Typography System

Custom typography utility classes are defined in `src/app/globals.css` using Tailwind v4's `@utility` directive. The font is **Inter** (applied globally).

### Font Size Selection Priority

When choosing a font size class, follow this order:

1. **Custom semantic utility** — use the typography tokens below (e.g., `text-h1`, `text-body`).
2. **Default Tailwind utility** — if no semantic size matches, use Tailwind's built-in size utilities (e.g., `text-lg`, `text-xl`, `text-2xl`).
3. **Arbitrary value** — only as a last resort when neither semantic nor default utilities fit (e.g., `text-[56px]`).

| Class        | Font Size | Font Weight | Line Height | Usage                                  |
|--------------|-----------|-------------|-------------|----------------------------------------|
| `text-h1`    | 36px      | 600 (SemiBold) | auto     | Hero headings, landing page titles     |
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
4. **Prefer shadcn components for common UI patterns** — before creating a custom component/element, check if shadcn provides a functionally similar component (e.g., `dropdown-menu`, `pagination`, `dialog`, `tabs`, `tooltip`, `select`, `accordion`). If it does, add it via `shadcn add` and customize appearance via `className` at the call site rather than building from scratch. This ensures accessibility, keyboard navigation, and consistent behavior out of the box.

> **Note:** This is the **shadcn v4 preset** — components are built on **Base UI** (`@base-ui/react`), **not Radix**. `Button` supports polymorphism via the `render` + `nativeButton` props instead of Radix's `asChild`:
> ```tsx
> <Button nativeButton={false} render={<Link href="/login" />}>Log In</Button>
> ```

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

- `<Navbar />` — `src/components/navbar.tsx`, `<Footer />` — `src/components/footer.tsx`
  - Navbar has no default export — use one of the variants: `LandingPageNavbarUnauth` (login + book buttons), `LandingPageNavbarAuth` (book button + account dropdown), `AppNavbar` (app shell)
  - Accepts a `drawer` prop for mobile-drawer content; pass buttons with `w-full` so they stretch full-width in the drawer
- `<AccountDropdown />` — `src/components/account-dropdown.tsx` — profile/logout dropdown; must be rendered inside a `<Navbar>` (needs `MenuContext`)
- `useMenu()` / `MenuContext` — `src/components/menu-context.ts` — shared single-open menu state (`"drawer" | "account" | null`); `useMenu()` throws outside a `<Navbar>`
- Icons in `src/components/icons/` — `FutsalIcon`, `BasketballIcon`, `TennisIcon`, `PadelIcon`, `FieldIcon`, `DatetimeIcon`, `PayIcon`

> **Icon color:** All custom icon components use `currentColor` for fill/stroke, so colors are overridable at the call site with Tailwind utilities (`text-*`, `fill-*`, `stroke-*`).

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
│   ├── globals.css         # Tailwind v4 + design tokens + typography utilities
│   ├── layout.tsx          # Root layout (Inter via --font-sans)
│   ├── page.tsx            # Landing page (navbar, hero, sports, courts, benefits, CTA)
│   ├── login/page.tsx      # Login page (reference implementation)
│   └── register/page.tsx   # Register page (sign up form)
├── components/
│   ├── ui/                 # shadcn/ui components (DO NOT MODIFY)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── separator.tsx
│   ├── icons/              # Icon components (sport, field, datetime, pay)
│   ├── navbar.tsx          # Navbar variants + mobile drawer; owns MenuContext provider
│   ├── account-dropdown.tsx# Profile/logout dropdown (consumes useMenu)
│   ├── menu-context.ts     # MenuContext + useMenu (shared single-open menu state)
│   ├── footer.tsx
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

Custom icon components in `src/components/icons/` use `currentColor` for fill/stroke so their color is controlled by Tailwind text/fill/stroke utilities at the call site.

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
| `/`         | `src/app/page.tsx`                | ✅ Done   | Landing page (hero, sports, courts, benefits, CTA) |
| `/login`    | `src/app/login/page.tsx`          | ✅ Done   | Login with email/password + Google SSO   |
| `/register` | `src/app/register/page.tsx`       | ✅ Done   | Sign up (names, email, password) + validation |

> **Responsive:** All landing page sections and the footer are fully responsive (see Section 11).

---

## 10. Coding Standards

- **Language:** TypeScript. All new files must use `.tsx` (for JSX) or `.ts` (for utilities).
- **Component pattern:** Use named exports (`export function MyComponent`) — not default exports for reusable components.
- **Client components:** Add `"use client"` directive only when the component uses React state, effects, or browser APIs.
- **Imports:** Use the `@/` path alias for all internal imports (e.g., `@/components/logo`, `@/lib/utils`).
- **No inline styles:** Never use the `style` prop. Always use Tailwind classes.
- **React Compiler** is enabled (`reactCompiler: true` in `next.config.ts`). Don't add manual `useMemo`/`useCallback` optimizations.
- **React 19:** `inert={!open}` boolean props disable closed menu panels (navbar drawer, account dropdown); hidden panels stay mounted for animation, `inert` + `pointer-events-none` blocks interaction.
- **Dark mode:** Tokens are redefined under `.dark` in `globals.css` (`@custom-variant dark`); use semantic classes and they adapt automatically.

---

## 11. Responsive Design

All responsiveness is done with Tailwind breakpoints in JSX — there are **no** `@media` queries in `globals.css` (it only defines tokens + `@utility` typography).

### Conventions

- **Mobile-first:** base classes target mobile; `md:` / `lg:` overrides adjust for desktop.
- **Breakpoints in use:** `sm:` (640px), `md:` (768px), `lg:` (1024px), plus arbitrary `max-[351px]:` for very small viewports.
- **Desktop/mobile swap:** use `hidden md:flex` (desktop element) + `md:hidden` (mobile element). Examples: navbar links vs hamburger drawer, hero steps (3x3 grid mobile, horizontal flex desktop).
- **Full-width CTAs on mobile:** `w-full md:w-auto` (hero buttons, mobile drawer buttons).
- **Grid collapse:** `grid-cols-2 md:grid-cols-4` (sports section).
- **Page container:** `mx-auto flex w-full max-w-300 px-6` (or `flex-col` for stacked layouts).
- **`next/image`:** always set `sizes` with breakpoints, e.g. `sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 320px"`.
- **Navbar mobile drawer:** `md:hidden` + `inert={openMenu !== "drawer"}` + animated `max-h` / `translate-y` (see Section 10 React 19 note).

### Tailwind v4 Spacing Gotcha

Numeric utilities use the v4 spacing scale (`0.25rem` base). Non-obvious values used in this codebase:
`max-w-300` = 75rem, `max-w-118` = 29.5rem, `max-w-190` = 47.5rem, `md:pb-18` = 4.5rem, `md:px-26` = 6.5rem. These are valid — do not replace them with arbitrary values.

### Test Viewports

When making layout changes, check at minimum: 320px (small mobile), 375px (mobile), 768px (tablet), 1440px (desktop). The hero step grid specifically needs a check in the 336–351px range where `max-[351px]:` overrides kick in.

<!-- END:project-conventions -->
