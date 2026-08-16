# Design Document: Court Details Page (`/courts/futsal-court-a`)

## Overview
Implement the Court Details page (`/courts/futsal-court-a`) for the ngeBall application using Next.js (App Router), shadcn/ui components, and Tailwind CSS. The page consists of a court carousel with full-screen overlay, court details info, interactive calendar with date range limits, duration selection, time schedule slots, and dynamic booking summary.

## Component Architecture

### Page Component (`src/app/courts/futsal-court-a/page.tsx`)
- Client Component (`"use client"`).
- State Management:
  - `selectedDate`: `Date` (default: today)
  - `currentMonth`: `Date` (for calendar view navigation)
  - `selectedDuration`: `number` (60, 90, 120 mins; default: 60)
  - `selectedTimeSlot`: `string` (default: "10:00 - 11:00")
  - `isOverlayOpen`: `boolean` (carousel modal overlay state)
- Layout:
  - `<AppNavbar />` at top (fixed, `pt-16` padding adjustment for page content)
  - Layout Container: `mx-auto w-full max-w-300 px-6 pt-12 pb-22`
  - Top Row (`flex-col lg:flex-row gap-8`):
    - Left (~480px): Carousel section
    - Right: Info Court section
  - Bottom Row (`grid grid-cols-1 lg:grid-cols-3 gap-8`):
    - Left Column: Interactive Calendar
    - Middle Column: Interactive Duration and Schedule UI
    - Right Column: Dynamic Summary Booking Card
  - `<Footer />` at bottom

### Interactive Features

#### 1. Interactive Calendar Component
- Header: Displays current month/year with `<ChevronLeft>` and `<ChevronRight>` navigation.
- Month Navigation Limits: Prevents navigating to months prior to current month or more than 1 month in the future.
- Date Selection Constraints:
  - Minimum Date: Today (`new Date()`, normalized to midnight)
  - Maximum Date: Today + 1 Month
  - Disabled Dates: Dates outside min/max range rendered as disabled (`opacity-50 cursor-not-allowed text-muted`).
- Selection Handling: Clicking a valid date updates `selectedDate` and reflects in Summary.

#### 2. Interactive Duration & Schedule
- **Duration**: 3 options (60 Mins, 90 Mins, 120 Mins). Active duration highlighted (`bg-primary/15 border-primary text-primary`). Clicking updates `selectedDuration`.
- **Schedule Time Slots**: Grid of available slots (e.g. "10:00 - 11:00", "11:00 - 12:00", "13:00 - 14:00", etc.). Clicking updates `selectedTimeSlot`.

#### 3. Dynamic Summary Booking Card
- Displays selected date formatted (e.g. "14 April 2025").
- Displays selected duration and time slot (e.g. "60 Minutes | 10:00 - 11:00").
- Price Calculation: Base rate (Rp 300.000 / hour) * (selectedDuration / 60). Formatted in Indonesian Rupiah format (e.g., "Rp 300.000,00").

## Color & Style Mappings (Design Tokens)
- Page Background: `bg-background`
- Card Background: `bg-white border border-border rounded-[16px]`
- Accent & Active States: `bg-primary/15 border-primary text-primary`
- Disabled States: `text-muted pointer-events-none opacity-50`
- Sport Badge: `border-2 border-green bg-green/10 text-green`
- Primary CTA: `bg-primary text-white rounded-[12px]`

## Dependencies
- Install shadcn carousel: `bunx --bun shadcn@latest add carousel`
- Lucide React Icons: `ChevronLeft`, `ChevronRight`, `Calendar`, `Clock`, `X`
- Custom Icons: `SportIcon` from `@/components/icons/sport-icon`
- `date-fns` (or standard JS Date methods) for date handling
