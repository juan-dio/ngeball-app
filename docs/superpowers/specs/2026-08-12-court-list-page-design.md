# Court List Page (`/courts`) — Design

Date: 2026-08-12
Issue: https://github.com/juan-dio/ngeball-app/issues/8
Branch: `court-list-page`

## Goal

Build the court list page at `/courts` for ngeBall following the Figma design (`public/docs/court_list-desktop.png`). Static UI only — toolbar filters and pagination have no logic. Reuse existing `AppNavbar`, `Footer`, shadcn `Card`/`Button`, and sport icons.

## Approach

One new page (`src/app/courts/page.tsx`, server component) + one reusable component (`src/components/court-card.tsx`). Data array and sport→icon/color mapping are hardcoded inline in the page (matches the landing page pattern where `STEPS`/`SPORTS` arrays live in `page.tsx`).

## Data Model

```ts
type Court = {
  name: string;      // e.g. "Futsal Court A"
  image: string;     // e.g. "/images/futsal1.jpg"
  type: string;      // e.g. "Synthetic Grass Futsal Court"
  price: string;     // Indonesian format, e.g. "200.000,00"
  sport: SportKey;   // "Futsal" | "Basketball" | "Tennis" | "Padel"
};

type SportMeta = {
  icon: ComponentType<{ className?: string }>;
  color: string;     // text color class, e.g. "text-green"
  badgeBg: string;   // badge background, e.g. "bg-green/10"
};
```

`SPORT_META` maps sport → icon + badge colors so the card component never infers sport per item:

| Sport | icon | color | badgeBg |
|-------|------|-------|---------|
| Futsal | `FutsalIcon` | `text-green` | `bg-green/10` |
| Basketball | `BasketballIcon` | `text-orange` | `bg-orange/10` |
| Tennis | `TennisIcon` | `text-red` | `bg-red/10` |
| Padel | `PadelIcon` | `text-blue` | `bg-blue/10` |

## Court Data (10 items)

| name | image | type | price |
|------|-------|------|-------|
| Futsal Court A | `/images/futsal1.jpg` | Synthetic Grass Futsal Court | 200.000,00 |
| Futsal Court B | `/images/futsal3.jpg` | Interlock Futsal Court | 250.000,00 |
| Basketball Court B | `/images/basket1.jpg` | Indoor Basketball Court | 220.000,00 |
| Padel Court B | `/images/padel1.jpg` | Padel Court | 300.000,00 |
| Futsal Court C | `/images/futsal2.jpg` | Interlock Futsal Court | 270.000,00 |
| Tennis Court A | `/images/indoor-tennis1.jpg` | Indoor Tennis Court | 300.000,00 |
| Basketball Court A | `/images/indoor-basket1.jpg` | Indoor Basketball Court | 300.000,00 |
| Padel Court A | `/images/padel2.jpg` | Padel Court | 330.000,00 |
| Basketball Court C | `/images/basket2.jpg` | Indoor Basketball Court | 320.000,00 |
| Tennis Court B | `/images/tennis1.jpg` | Indoor Tennis Court | 400.000,00 |

All image paths verified to exist in `public/images/`.

## Components

### `CourtCard` — `src/components/court-card.tsx`

- Named export `CourtCard`, props `{ court: Court; sport: SportMeta }`.
- Base: shadcn `<Card>` from `@/components/ui/card`. Override at call site: `w-full md:w-90` (full-width mobile, fixed 360px from `md:` up), `border border-border rounded-[16px] bg-white py-0 gap-0` (kills default ring/padding/gap, keeps `overflow-hidden`).
- Image: relative `h-60` wrapper + `next/image fill object-cover`, `sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 360px"`.
- Body: `p-4 flex flex-col gap-3 flex-1`:
  - Title row: name `text-h2 text-text-primary` + sport badge (36px circle `size-9`, `badgeBg`, icon `h-5 w-5` + `color`).
  - Type: `text-body text-text-secondary`.
  - Price row: `Rp ` + nominal `text-h3 text-primary` + ` /hour`. `Rp` and `/hour` use `text-body text-text-secondary`.
  - Divider: `<Separator className="bg-border" />`.
  - Select button: `<Button className="h-10 w-full rounded-[8px] bg-primary text-white hover:bg-primary/90">Select</Button>`.

### Page — `src/app/courts/page.tsx`

- Server component. Layout:
  ```
  <main className="flex min-h-screen flex-col bg-background pt-16">
    <AppNavbar />
    <div className="mx-auto flex w-full max-w-300 flex-col px-6">…content…</div>
    <Footer />
  </main>
  ```
- **Toolbar** (static): `flex flex-wrap gap-2`:
  - Search: relative wrapper, `Input`/`input` `h-10 w-[320px] max-w-full pl-10`, `bg-white border border-border rounded-[6px]`, `Search` icon absolute-left (`text-text-secondary`), placeholder `Search court`.
  - Two dropdowns: `h-10`, `bg-white border border-border rounded-[6px]`, label `text-body text-text-primary`, `ChevronDown` right. Widths `w-[144px]` and `w-[254px]`, both `max-w-full`.
- **Grid**: `grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fill,360px)] md:justify-center`, mapping `COURTS`. Auto-fill fixed 360px tracks keep cards unstretched and never overflow — columns naturally reflow (1→2→3) instead of colliding.
- **Pagination** (static): `flex flex-wrap items-center gap-2`, items `Previous | 1 | 2 | 3 | … | Next`; active "2" boxed `bg-white border border-border rounded-[6px]`, others plain text.

## Out of Scope

- Navbar anchor links (`Courts` → `#courts`, `Sports` → `#sports`) are dead on `/courts` — pre-existing behavior, navbar reused as-is per issue.
- Filter/sort/pagination logic — static UI only.

## Conventions Followed

- Design tokens from `AGENTS.md` (`bg-background`, `border-border`, `text-text-primary`, `text-text-secondary`, `text-h1/2/3`, `text-body`, sport colors). No hardcoded hex.
- No edits to `src/components/ui/`. All overrides at call site.
- `@/` path aliases, named exports, no inline styles.
- Responsive via Tailwind breakpoints only.

## Verification

- `bun run lint`
- `bunx tsc --noEmit`
- `bun run build`
- Manual viewport check: 320px, 375px, 768px, 1440px against `public/docs/court_list-desktop.png`.
