# New Court Admin Page — Design

Implements GitHub issue #30: admin "New Court" create form page.

## Route

`src/app/(admin)/admin/courts/new/page.tsx`, `"use client"`.

Admin shell (sidebar + header) already provided by `src/app/(admin)/layout.tsx` via `<AdminShell />`. This page only renders main form content.

## Architecture

Single white card wrapper mirroring existing `courts/page.tsx` layout:

- Section: `<section className="flex flex-col gap-6">`
- Card: `<Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">`
- Content: `<CardContent className="p-0 flex flex-col gap-6">`
- Header title: "New Court" (`text-h2 text-text-primary`)

## Form Fields

Stacked columns with `grid gap-4 md:grid-cols-2`.

### Name + Price / hour
- `Input`, `h-10 rounded-[6px] border-border`, placeholder `"eg, Futsal Court X"` / `"eg, 100000"`.

### Sport + Court type
- `DropdownMenu` (Base UI, matching courts list style), trigger `h-10 rounded-[6px] border-border`, `ChevronDown` right, `text-text-primary`.
- Sport options: distinct values of `COURTS[].sport`.
- Court type options: distinct values of `COURTS[].type`.

### Description
- `textarea`, `h-[144px] p-3 rounded-[6px] border-border`, placeholder `"eg, Court description"`.

### Picture gallery
- Horizontal scroll: `<div className="flex gap-4 overflow-x-auto">`.
- Upload box: dashed border box (`bg-light`) with image icon + `"Upload Court Picture"` (`text-[12px] font-light text-text-secondary`).
- Preview cards: default images from `DEFAULT_IMAGES`, each with remove button (X icon in black semi-transparent circle).

### Action buttons (bottom-right)
- Cancel: `Button variant="outline"`, `bg-white border-border rounded-[12px] text-primary h-14 px-8`, links to `/admin/courts`.
- Save: `Button`, `bg-primary rounded-[12px] text-white h-14 px-8`.

## Data Layer Changes

- Export `DEFAULT_IMAGES` from `src/data/courts.ts` (currently const, additive change only).

## List Page Wiring

- `courts/page.tsx:154` "New Court" button: point to `/admin/courts/new` via `render={<Link href="/admin/courts/new" />}`.

## Form Behavior

- Client-side React state for field values and selected image list (uncontrolled submit; no backend — mock app).

## Verification

- `bun run lint`, `bunx tsc --noEmit`, `bun run build` all pass.
- Visual match to `public/docs/admin/new_court-desktop.png`.
