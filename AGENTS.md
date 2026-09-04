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

# Project Conventions for ngeBall

## 1. Package Manager & Workflow
- **Bun** exclusively: `bun add <pkg>`, `bunx --bun shadcn@latest add <comp>`, `bun run dev`, `bun run build`. **Do NOT use** `npm`, `yarn`, or `pnpm`.
- **Verification:** No test suite. Run `bun run lint` and `bunx tsc --noEmit`.
- **Git Config:** `user.name` and `user.email` are pre-configured globally — do not override per commit.

## 2. Color System
Defined as CSS custom properties in `src/app/globals.css` mapped via `@theme inline`. Selection priority:
1. **Custom semantic utility** (`bg-primary`, `text-text-primary`)
2. **Default Tailwind utility** (`bg-white`, `text-black`)
3. **Arbitrary value** (`bg-[#285A48]`)

| Tailwind Class | CSS Variable | Hex Value | Usage |
|---|---|---|---|
| `bg-primary` / `text-primary` | `--primary` | `#285a48` | Main CTA, active states, logo accent |
| `bg-accent` / `text-accent` | `--accent` | `#408a71` | Hover states, accents |
| `bg-background` | `--background` | `#f1f5f9` | Page/screen background |
| `bg-white` / `text-white` | `--white` | `#ffffff` | Card backgrounds |
| `text-text-primary` | `--text-primary` | `#0f172b` | Main body text, headings |
| `text-text-secondary` | `--text-secondary` | `#6a7282` | Secondary text, captions |
| `text-secondary` | `--secondary` | `#4c8ce4` | Links, secondary actions |
| `border-border` | `--border` | `#e6e6e6` | All borders, dividers |
| `bg-muted` / `text-muted` | `--muted` | `#d1d5dc` | Disabled states |
| `text-danger` / `bg-danger` | `--danger` | `#e7000b` | Errors, destructive actions |
| `text-success` / `bg-success` | `--success` | `#00a63e` | Success states |
| `text-warning` / `bg-warning` | `--warning` | `#d08700` | Warning states |
| `text-blue` / `bg-blue` | `--blue` | `#1447e6` | Informational |
| `text-green` / `bg-green` | `--green` | `#008236` | Alt success |
| `text-red` / `bg-red` | `--red` | `#c10007` | Alt danger |
| `text-orange` / `bg-orange` | `--orange` | `#ca3500` | Alert variant |
| `bg-light` / `text-light` | `--light` | `#f9f9f9` | Light bg, hover on white |
| `bg-yellow` / `text-yellow` | `--yellow` | `#ffdf20` | "Easy Booking" accent card |
| `bg-burnt-orange` / `text-burnt-orange` | `--burnt-orange` | `#bb4d00` | Icons/text on yellow card |

> **Note:** Semantic tokens map to shadcn internals. Dark mode tokens are under `.dark` (`@custom-variant dark`).

## 3. Typography System
Defined in `src/app/globals.css` via Tailwind v4 `@utility`. Font is **Inter**. Selection priority:
1. **Custom semantic utility** (`text-h1`, `text-body`)
2. **Default Tailwind utility** (`text-lg`, `text-xl`)
3. **Arbitrary value** (`text-[56px]`)

| Class | Font Size | Font Weight | Usage |
|---|---|---|---|
| `text-h1` | 36px | 600 (SemiBold) | Hero headings, landing page titles |
| `text-h2` | 24px | 500 (Medium) | Card titles, section headings |
| `text-h3` | 20px | 500 (Medium) | Sub-section headings |
| `text-body` | 16px | 400 (Regular) | Body text, form labels, descriptions |
| `text-small` | 14px | 300 (Light) | Captions, helper text, divider labels |

## 4. shadcn/ui Components
- **Never modify** files in `src/components/ui/`. Override styles via `className` at the call site.
- **Base UI preset (shadcn v4):** Built on `@base-ui/react`, **not Radix**. `Button` uses `nativeButton={false}` + `render={<Link href="..." />}` instead of `asChild`.
- Install components: `bunx --bun shadcn@latest add <component>`.
- Installed: badge, button, calendar, card, carousel, chart, dropdown-menu, input, label, pagination, popover, separator, sheet, sidebar, skeleton, table, tooltip.
- Use `ChartContainer`/`ChartTooltip` from `@/components/ui/chart` (wraps Recharts).

## 5. Reusable Components & Structure
Check `src/components/` before creating new ones:
- `<Navbar />` (`LandingPageNavbarUnauth`, `LandingPageNavbarAuth`, `AppNavbar`), `<Footer />`
- `<AccountDropdown />` + `useMenu()` / `MenuContext`
- `<Calendar />` (interactive date picker with 30-day window)
- `<CourtCard />`, `<SelectButton />`, `<BookingCard />`, `<BookingStatus />`
- `<AdminShell />` (admin layout shell with sidebar) — nav: Dashboard, Bookings, Courts, Sports, Court Types, Users
- `<Logo />`, custom icons in `src/components/icons/` (`currentColor` fill/stroke)
- `<SportIcon />` / `<SportIconWithText />` — sport badge system with per-sport colors (`src/components/icons/sport-icon.tsx`). `SportKey = "Futsal" | "Basketball" | "Tennis" | "Padel"`. Use `SPORT_META` for icon + color mapping.
- Hooks: `useAuth()` in `src/hooks/use-auth.ts` (stub — returns `{ isAuthenticated: false }`)

### File Structure & Data Layer
```
src/
├── app/          # Next.js App Router (public and admin route groups)
├── components/   # UI components (ui/, admin/, icons/, etc.)
├── data/         # Mock data files (bookings.ts, courts.ts)
├── hooks/        # Custom hooks (use-mobile.ts, use-auth.ts)
└── lib/          # Utility functions (cn helper in utils.ts)
```
- `BOOKINGS` in `src/data/bookings.ts` contains shared items with `userId` and `userName`. Public booking page (`src/app/(public)/booking/page.tsx`) filters by a specific user, while admin bookings page (`src/app/(admin)/admin/bookings/page.tsx`) consumes all items.

## 6. Icons & Inputs
- Use **`lucide-react`** for standard icons.
- Inline icon input pattern: `<div className="relative"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary"><Mail className="h-4 w-4" /></div><Input className="pl-10 ..." placeholder="eg. youremail@gmail.com" /></div>`
- Placeholder example convention: use `eg.` (with period), e.g. `eg. John`.

## 7. Coding Standards
- TypeScript: `.tsx` for JSX, `.ts` for utilities.
- Files/folders: `kebab-case`. Component functions: `PascalCase` with named exports (`export function MyComponent`).
- `"use client"` directive only when component uses React state, effects, or browser APIs.
- Imports: `@/` path alias. No inline `style` prop.
- **React Compiler enabled:** do not add manual `useMemo`/`useCallback`.
- **React 19:** `inert={!open}` for animated hidden disclosure panels.

## 8. Responsive Design
- Mobile-first via Tailwind breakpoints (`sm:`, `md:`, `lg:`, `max-[351px]:`).
- Admin sidebar mobile/desktop breakpoint is **`lg:` (1024px)** — sync with `MOBILE_BREAKPOINT = 1024` in `src/hooks/use-mobile.ts`.
- Page container: `mx-auto flex w-full max-w-300 px-6`.
- **Tailwind v4 spacing scale gotchas:** `max-w-300` (75rem), `max-w-118` (29.5rem), `max-w-190` (47.5rem), `md:pb-18` (4.5rem), `md:px-26` (6.5rem), `min-w-150` (37.5rem), `h-75` (18.75rem) are valid v4 tokens — do not replace with arbitrary values.
