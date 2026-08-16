# Design Document: Court Details Page (`/courts/futsal-court-a`)

## Overview
Implement the Court Details page (`/courts/futsal-court-a`) for the ngeBall application using Next.js (App Router), shadcn/ui components, and Tailwind CSS. The page consists of a court carousel with full-screen overlay, court details info, static calendar, duration selection, time schedule slots, and booking summary.

## Component Architecture

### Page Component (`src/app/courts/futsal-court-a/page.tsx`)
- Client Component (`"use client"`) to support overlay toggle state and body scroll locking.
- Layout:
  - `<AppNavbar />` at top (fixed, `pt-16` padding adjustment for page content)
  - Layout Container: `mx-auto w-full max-w-300 px-6 pt-12 pb-22`
  - Top Row (`flex-col lg:flex-row gap-8`):
    - Left (~480px): Carousel section
    - Right: Info Court section
  - Bottom Row (`grid grid-cols-1 lg:grid-cols-3 gap-8`):
    - Left Column: Local Static Calendar component
    - Middle Column: Duration and Schedule UI
    - Right Column: Summary Booking Card
  - `<Footer />` at bottom

### Local Components (inside page.tsx)
1. **CarouselSection**: Renders the image carousel with customized navigation buttons and full-screen backdrop overlay state (`isOpen`).
2. **CourtInfoSection**: Displays court title, sport badge, type, pricing, and description.
3. **StaticCalendar**: Month navigation header, day of week labels, and 40x40px calendar grid items with static active states.
4. **DurationAndSchedule**: Duration option pills (60, 90, 120 mins) and 3-column time slot grid (10:00-11:00, etc.).
5. **SummaryCard**: Court name, date, time slot, pricing, and primary "Book" button.

## Color & Style Mappings (Design Tokens)
- Page Background: `bg-background`
- Card Background: `bg-white border border-border rounded-[16px]`
- Accent & Active States: `bg-primary/15 border-primary text-primary`
- Sport Badge: `border-2 border-green bg-green/10 text-green`
- Primary CTA: `bg-primary text-white rounded-[12px]`
- Muted/Inactive States: `border-border text-muted`

## Dependencies
- Install shadcn carousel: `bunx --bun shadcn@latest add carousel`
- Lucide React Icons: `ChevronLeft`, `ChevronRight`, `Calendar`, `Clock`, `X`
- Custom Icons: `SportIcon` from `@/components/icons/sport-icon`
