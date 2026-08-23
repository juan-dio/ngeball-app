# Design Doc: Reusable Booking Status Component

## Overview

Extract booking status badge into a reusable component `BookingStatus` supporting `Paid`, `Pending`, and `Rejected` variants based on Figma specs.

## Component Specifications

- **File:** `src/components/booking-status.tsx`
- **Variants:**
  - Paid: `bg-success/10 border-2 border-success text-success`
  - Pending: `bg-warning/10 border-2 border-warning text-warning`
  - Rejected: `bg-danger/10 border-2 border-danger text-danger`
- **Typography & Layout:** `px-6 py-2 rounded-[24px] text-small font-medium leading-tight`

## Integration

- Update `src/components/booking-card.tsx` to use `<BookingStatus status={status} />`.
