# Admin Edit Court Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Admin Edit Court page at `src/app/(admin)/admin/courts/[id]/edit/page.tsx` pre-filled with court data based on route ID.

**Architecture:** A client component using Next.js App Router dynamic route parameters (`React.use(params)`), React state for form inputs and image gallery management, dropdown menus for selection, and pre-filling court data from `@/data/courts`.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, shadcn/ui (Card, Input, Button, DropdownMenu).

## Global Constraints

- Package manager: Bun
- No test suite: Verification via `bun run lint` and `bunx tsc --noEmit` and `bun run build`
- Styling: Use Tailwind CSS variables and design tokens (`bg-background`, `border-border`, `bg-primary`, `text-text-primary`, `text-h2`, etc.)
- Use shadcn Button with `nativeButton={false}` and `render={<Link href="..." />}` where appropriate for navigation

---

### Task 1: Create Admin Edit Court Page

**Files:**
- Create: `src/app/(admin)/admin/courts/[id]/edit/page.tsx`

**Interfaces:**
- Consumes: `COURTS`, `DEFAULT_IMAGES` from `@/data/courts`
- Consumes: UI components from `@/components/ui/` (`Card`, `CardContent`, `Input`, `Button`, `DropdownMenu`, etc.)

- [ ] **Step 1: Create the edit court page component**

Create `src/app/(admin)/admin/courts/[id]/edit/page.tsx` with:
- "use client" directive
- Params prop receiving `params: Promise<{ id: string }>` resolved via `React.use(params)`
- `COURTS.find((c) => c.id === id)` with `notFound()` fallback
- React states: `name`, `price`, `selectedSport`, `selectedType`, `description`, `images`
- Reset handler resetting state to `court` fields
- Form JSX following issue specification and design tokens

- [ ] **Step 2: Run linter and typecheck**

Run: `bun run lint` and `bunx tsc --noEmit`

- [ ] **Step 3: Run build check**

Run: `bun run build`
