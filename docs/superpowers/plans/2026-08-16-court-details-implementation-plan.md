# Court Details Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Goal
Implement the Court Details page (`/courts/futsal-court-a`) with interactive calendar, duration selection, schedule slots, and dynamic booking summary, using shadcn/ui components and Next.js App Router.

## Architecture
The page at `src/app/courts/futsal-court-a/page.tsx` will be a client component with state management for selected date (with min/max limits), selected duration, selected time slot, and overlay state for the carousel. All components will use design tokens from globals.css (no hardcoded hex colors) and shadcn/ui primitives (carousel, calendar primitives built locally, duration pills, summary card).

## Tech Stack
- Next.js (App Router)
- shadcn/ui: button, card, input, dropdown-menu, pagination, separator, and carousel (to be installed)
- lucide-react: ChevronLeft, ChevronRight, Calendar, Clock, X
- Custom components: SportIcon from @/components/icons/sport-icon
- Tailwind CSS v4 with design tokens

## Global Constraints (from spec)
- Page wrapped in `<main className="flex min-h-screen flex-col bg-background pt-16">`
- Content container: `mx-auto w-full max-w-300 px-6 pt-12 pb-22`
- Use AppNavbar and Footer from existing components
- No inline styles; all Tailwind classes
- No hardcoded hex colors - use design tokens: --primary, --text-primary, --text-secondary, --border, --background
- No manual useMemo/useCallback (React Compiler enabled)
- React 19 with inert={!open} pattern for menus
- Dark mode support via .dark variant

---

# Task Plan

## Task 1: Install shadcn carousel component
- [ ] Run: `bunx --bun shadcn@latest add carousel`
- [ ] Verify new file `src/components/ui/carousel.tsx` is created
- [ ] Verify Tailwind config updated (should auto-include)

**Files:**
- `src/components/ui/carousel.tsx` (created by shadcn)

---

## Task 2: Create page file structure and state hooks
- [ ] Create `src/app/courts/futsal-court-a/page.tsx`
- [ ] Add `"use client"` directive at top
- [ ] Initialize React state:
  - `selectedDate` (Date) - default to today, min: today, max: today + 30 days
  - `currentMonth` (Date) - for calendar navigation display
  - `selectedDuration` (number) - default 60 (minutes)
  - `selectedTimeSlot` (string) - default "10:00 - 11:00"
  - `isOverlayOpen` (boolean) - default false
- [ ] Add utility function to format date to "d MMMM yyyy" (e.g., "14 April 2025") without date-fns

**Files:**
- `src/app/courts/futsal-court-a/page.tsx` (created)

---

## Task 3: Implement CarouselSection component (inside page.tsx)
- [ ] Create local function `CarouselSection` (non-exported, under main component)
- [ ] Render 3 CarouselItems with next/image:
  - `/images/futsal1.jpg`
  - `/images/carousel2.jpg`
  - `/images/carousel3.jpg`
- [ ] Each slide wrapper: `rounded-[16px] border border-border bg-white h-[312px] overflow-hidden`
- [ ] Add click handler on slide that toggles `isOverlayOpen`
- [ ] Implement overlay modal when `isOverlayOpen` is true:
  - Fixed backdrop: `fixed inset-0 bg-black/70 backdrop-blur-sm z-50`
  - Centered carousel container: `max-w-[972px] max-h-[546px] mx-auto my-auto`
  - Overflow hidden on body when overlay open: `document.body.style.overflow = isOverlayOpen ? "hidden" : void 0` (use effect)
  - Close button in top-right: rounded-full `bg-[#6A7282] border-[1.71429px] border-white w-4 h-4 rounded-full`, with ChevronLeft/ChevronRight icons rotated
  - Navigation buttons (Prev/Next) inside overlay with same styling
- [ ] Carousel navigation buttons (CarouselPrevious/CarouselNext) customized at call site:
  - `bg-[#6A7282]/80 text-white rounded-full size-7`

**Files:**
- `src/app/courts/futsal-court-a/page.tsx` (modified - add CarouselSection)

---

## Task 4: Implement CourtInfoSection component (inside page.tsx)
- [ ] Create local function `CourtInfoSection`
- [ ] Court title: "Futsal Court A" with `text-[40px] font-medium text-text-primary`
- [ ] Sport badge: `border-2 border-green bg-green/10 rounded-full px-3 py-1 flex items-center gap-1`, SportIcon `h-5 w-5 text-green`, text "Futsal"
- [ ] Court type: "Synthetic Grass Futsal Court" with `text-h3 text-text-secondary`
- [ ] Price: "Rp **300.000,00** /hour" with nominal in `text-h2 text-primary`, label "Rp" and "/hour" in `text-text-secondary`
- [ ] Description heading: "Description" `text-h3 text-text-secondary`
- [ ] Description paragraph: static lorem ipsum `text-body text-text-secondary`

**Files:**
- `src/app/courts/futsal-court-a/page.tsx` (modified - add CourtInfoSection)

---

## Task 5: Implement StaticCalendar component (inside page.tsx, interactive)
- [ ] Create local function `StaticCalendar`
- [ ] State: `currentMonth` (Date) initially set to month of selectedDate; `selectedDate` from parent
- [ ] Min date: today (normalized), max date: today + 30 days
- [ ] Header: "ChevronLeft" / label "April 2025" (formatted from currentMonth) / "ChevronRight"
  - Disable left chevron if currentMonth <= month of today (can't go earlier)
  - Disable right chevron if currentMonth >= today + 30 days
- [ ] Weekday names row: `Su Mo Tu We Th Fr Sa` each `text-body`
- [ ] Calendar grid: 7 columns, rows as needed for dates in month
  - Each cell: `size-10 rounded-full border ...`
  - Out-of-month dates (before min or after max): `opacity-50 cursor-not-allowed text-muted`
  - Dates outside current month but within range: render with lighter background or just show number with `opacity-70`
  - Today's date: `bg-primary/10 text-primary` maybe? Actually design says selected date is `bg-text-primary text-white rounded-full`, ring date is `border-2 border-primary rounded-full`
  - Selected date (from parent state): `bg-text-primary text-white rounded-full`
  - Dates with ring (border-2 border-primary): indicate active/selected - only one can be selected
  - Other valid dates: `text-text-primary`
- [ ] On cell click: if date is valid (within min/max), update `selectedDate` state from parent via callback
- [ ] Format selected date for display: `formatDate(selectedDate)` -> "14 April 2025"

**Files:**
- `src/app/courts/futsal-court-a/page.tsx` (modified - add StaticCalendar)

---

## Task 6: Implement DurationAndSchedule component (inside page.tsx, interactive)
- [ ] Create local function `DurationAndSchedule`
- [ ] Duration pills section:
  - Heading "Duration" `text-h2`
  - 3 pills:
    - "60 Minutes" - active state: `bg-primary/15 border-primary text-primary` (default selected)
    - "90 Minutes" - `border-text-secondary text-text-secondary`
    - "120 Minutes" - `border-border text-muted`
  - Clicking a pill updates `selectedDuration` state and toggles active class
- [ ] Schedule section:
  - Heading "Schedule" `text-h2`
  - Grid of time slots in 3 columns on desktop (`grid grid-cols-3`), 1 column on mobile
  - Sample slots: "10:00 - 11:00", "11:00 - 12:00", "13:00 - 14:00" (hardcoded per design)
  - Each slot clickable, updates `selectedTimeSlot` state
  - Active slot gets `bg-primary/15 border-primary text-primary`; inactive gets appropriate border state
- [ ] Render currently selected duration and time slot in summary

**Files:**
- `src/app/courts/futsal-court-a/page.tsx` (modified - add DurationAndSchedule)

---

## Task 7: Implement SummaryCard component (inside page.tsx, dynamic)
- [ ] Create local function `SummaryCard`
- [ ] Card wrapper: `rounded-[16px] border border-border bg-white p-6`
- [ ] Title: "Summary" `text-h2 text-text-primary`
- [ ] Court name: "Futsal Court A" `text-h3 text-text-primary`
- [ ] Info lines (flex items-center gap-2):
  - Icon Calendar (lucide) `h-4 w-4 text-text-secondary` + formatted selected date "14 April 2025"
  - Icon Clock (lucide) `h-4 w-4 text-text-secondary` + `${selectedDuration} Minutes | ${selectedTimeSlot}`
- [ ] Total price: "Rp 300.000,00" `text-h2 text-primary`, below "Tax included" `text-small text-text-secondary`
- [ ] CTA Button: `<Button className="w-full bg-primary text-white rounded-[12px]">Book</Button>` (already styled per design)
- [ ] Button onClick should probably just alert or console.log for now (static UI but interactive enough)

**Files:**
- `src/app/courts/futsal-court-a/page.tsx` (modified - add SummaryCard)

---

## Task 8: Wire up main component layout
- [ ] Main export function with layout:
  - `<main className="flex min-h-screen flex-col bg-background pt-16">`
  - `<AppNavbar />` at top
  - Content container: `mx-auto flex w-full max-w-300 flex-col gap-8 pt-12 pb-22`
  - Top row: `flex-col lg:flex-row gap-8`
    - Left: CarouselSection (fixed width ~480px or use `w-full md:w-[480px]`)
    - Right: CourtInfoSection
  - Bottom row: `grid grid-cols-1 lg:grid-cols-3 gap-8`
    - Left: StaticCalendar
    - Middle: DurationAndSchedule
    - Right: SummaryCard
  - `<Footer />` at bottom
- [ ] Add `pt-16` to main already via layout class; ensure content doesn't overlap navbar

**Files:**
- `src/app/courts/futsal-court-a/page.tsx` (final layout assembly)

---

## Task 9: Test and verify
- [ ] Run `bun run dev` and verify page renders at `http://localhost:3000/courts/futsal-court-a`
- [ ] Check at viewports: 320px, 375px, 768px, 1440px
- [ ] Verify interactive behaviors:
  - Calendar navigation limits (can't go before today, can't go beyond today+30)
  - Clicking date selects it and updates summary
  - Clicking duration pills updates selection
  - Clicking schedule slot updates selection
  - Overlay opens when clicking carousel slide, closes with close button
  - Body scroll locks when overlay open
- [ ] Run `bun run lint` - fix any errors
- [ ] Run `bunx tsc --noEmit` - fix any type errors
- [ ] Run `bun run build` - ensure builds successfully

**Files:**
- Run verification commands

---

# No Placeholders Checklist

All tasks contain actual code blocks, not placeholders like "TBD", "TODO", etc. Each step includes concrete code or commands.

---