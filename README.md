# ngeBall

Web app for booking sports courts — futsal, basketball, tennis, and padel.

## About

ngeBall is a court booking platform for sports venues. Instead of asking around over chat or messaging a venue admin to find out which court is free and to reserve a slot, players open the app, browse the courts, pick a date on a calendar, and book directly.

The app has two sides:

- **Public** — the site anyone can visit: landing page, court list, court details, and the booking flow.
- **Admin** — a back office for venue staff to manage everything: create and edit courts, manage sports and court types, review bookings, and manage users.

## Features

**Public**
- Landing page with hero, sport highlights, and easy-booking call to action
- Court list with sport filtering
- Court detail page with image carousel, court info, and booking entry point
- Booking flow with an interactive 30-day calendar
- Booking list filtered to the current user
- Login and register pages

**Admin**
- Dashboard with activity charts and summary stats
- Bookings management (status, timeline, filters)
- Courts management — list, create, view, edit
- Sports management
- Court types management
- Users management

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19.2 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui v4 (built on Base UI) |
| Charts | Recharts |
| Icons | lucide-react |
| Package manager | Bun |

React Compiler is enabled. Fonts are Inter, loaded through `next/font`.

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
bun run build      # production build
bun run start      # serve the production build
bun run lint       # eslint
bunx tsc --noEmit  # type check
```

Bun only. Do not use `npm`, `yarn`, or `pnpm`.

## Project Structure

```
src/
├── app/
│   ├── (public)/     # landing, courts, booking, login, register
│   └── (admin)/      # dashboard + CRUD, wrapped in AdminShell
├── components/
│   ├── ui/           # shadcn/ui components — never edit these
│   ├── admin/        # admin-specific components
│   ├── icons/        # Logo, SportIcon, custom SVG icons
│   └── *.tsx         # shared components (Navbar, Calendar, CourtCard, ...)
├── data/             # mock data + types (bookings, courts, sports)
├── hooks/            # use-auth (stub), use-mobile
└── lib/              # utilities (cn helper)
```

Design tokens — colors, typography, spacing — are defined in `src/app/globals.css` and documented in [AGENTS.md](./AGENTS.md).

## Project Status

The app is still in the UI/prototype phase:

- **Data is mocked.** Everything lives in `src/data/` and is imported directly. There is no backend, database, or API layer yet.
- **Auth is not wired.** `useAuth()` in `src/hooks/use-auth.ts` is a stub returning `{ isAuthenticated: false }`. No sessions, no route protection.
- **Court types** are managed on their own admin page but have no dedicated data file; court type is a free-text field on `Court`.

## Contributing

Feature specs and implementation plans live in [`docs/superpowers/`](./docs/superpowers/) — `specs/` holds design documents, `plans/` holds step-by-step implementation plans.

Before writing code, read [AGENTS.md](./AGENTS.md) for the project conventions: package manager rules, design token system, component rules, and coding standards.
