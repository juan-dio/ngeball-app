# Design Spec: Admin Edit Court Page

## Summary
Implement the Admin Edit Court page at route `src/app/(admin)/admin/courts/[id]/edit/page.tsx` for the ngeBall application.

## Specifications & Requirements

### 1. Dynamic Route & Parameter Handling
- Route path: `src/app/(admin)/admin/courts/[id]/edit/page.tsx`
- Expects `params: Promise<{ id: string }>` resolved via `React.use(params)`.
- Finds court from `COURTS` array in `@/data/courts`. Calls `notFound()` if not found.

### 2. Form State Management
- `name`: Initialized to `court.name`
- `price`: Initialized to `court.price.replace(/[^0-9]/g, "")`
- `selectedSport`: Initialized to `court.sport`
- `selectedType`: Initialized to `court.type`
- `description`: Initialized to `court.description`
- `images`: Initialized to `court.images && court.images.length > 0 ? court.images : [court.image]`

### 3. Layout & Styling
- Wrapped in `Card` with `border border-border rounded-[16px] bg-white p-6 shadow-none`.
- Title: `h1` with text `"Edit Court"` (`text-h2 text-text-primary`).
- Name & Price /hour: 2-column grid (`grid gap-4 md:grid-cols-2`), input fields height `40px` (`h-10`).
- Sport & Court type: 2-column grid (`grid gap-4 md:grid-cols-2`), dropdown menus with trigger height `40px` (`h-10`).
- Description: Textarea height `144px` (`h-36`), `resize-none`, `p-3`.
- Picture Gallery:
  - First slot: Upload placeholder box (`ImagePlus` icon + "Upload Court Picture", `size-60`, `border-dashed`).
  - Previews: Horizontal scroll (`overflow-x-auto`), each preview `h-60 aspect-3/2`, rounded `[8px]`, with `X` remove button (`absolute right-2 top-2 rounded-full bg-black/50 text-white hover:bg-black/70`).
- Action Buttons:
  - Reset button (`variant="outline"`, `h-14 px-8 rounded-[12px] bg-white text-primary font-semibold hover:bg-light`): Resets state to original court values.
  - Save button (`h-14 px-8 rounded-[12px] bg-primary text-white font-semibold hover:bg-primary/90`): Submits / handles form save.
  - Button container: `flex flex-col-reverse gap-4 sm:flex-row sm:justify-end`.
