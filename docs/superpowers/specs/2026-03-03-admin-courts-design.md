# Design Spec: Admin Courts Page (`/admin/courts`)

## Overview
Implement the Admin Courts page (`/admin/courts`) for the ngeBall application, matching Figma design specs and using existing shadcn/ui components, data from `src/data/courts.ts`, and project conventions.

## Components & Layout
- **Container**: Card with `border border-border rounded-[16px] bg-white p-6 shadow-none`.
- **Toolbar (Top)**:
  - Search input: Placeholder `"Search court"`, max width `320px`, height `40px`, with `Search` icon.
  - Dropdown Filter 1 (Sport): Width `144px`, height `40px`.
  - Dropdown Filter 2 (Type): Width `254px`, height `40px`.
  - Add Court Button: Primary background (`bg-primary`), `rounded-[12px]`, white text, `Plus` icon, label `"Add Court"`.
- **Table (Center)**:
  - Headers (`ID`, `Name`, `Sport`, `Type`, `Price`, `Actions`), centered, `text-text-primary`.
  - Rows alternate between `bg-white` and `bg-background`.
  - `Sport` column: Uses `<SportIconWithText sport={court.sport} />`.
  - `Price` column: Formatted as `Rp 200.000,00` etc.
  - `Actions` column: `"Details"` link with underline in `text-blue`.
- **Pagination (Bottom)**:
  - Shadcn `Pagination` component with Previous, Page numbers, and Next.
