# Booking Status Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract booking status into a reusable component supporting Paid, Pending, and Rejected variants.

**Architecture:** Create `src/components/booking-status.tsx` using shadcn `Badge` and Tailwind tokens, then replace the inline badge in `src/components/booking-card.tsx`.

**Tech Stack:** Next.js, React, Tailwind CSS v4, shadcn/ui Badge.

## Global Constraints

- Use Bun exclusively for package management and building.
- Follow project color tokens (`bg-success/10`, `border-success`, `text-success`, etc.).
- TypeScript strict types.

---

### Task 1: Create BookingStatus Component

**Files:**
- Create: `src/components/booking-status.tsx`

**Interfaces:**
- Consumes: shadcn Badge component from `@/components/ui/badge`
- Produces: `BookingStatus` component supporting status prop: "Paid" | "Pending" | "Rejected"

- [ ] **Step 1: Write BookingStatus component file**

```tsx
import { Badge } from "@/components/ui/badge";

type BookingStatusProps = {
  status: string;
};

export function BookingStatus({ status }: BookingStatusProps) {
  const normalized = status.toLowerCase();

  let variantClasses = "bg-success/10 border-2 border-success text-success";
  if (normalized === "pending") {
    variantClasses = "bg-warning/10 border-2 border-warning text-warning";
  } else if (normalized === "rejected" || normalized === "reject") {
    variantClasses = "bg-danger/10 border-2 border-danger text-danger";
  }

  return (
    <Badge
      variant="outline"
      className={`px-6 py-2 rounded-[24px] text-small font-medium leading-tight ${variantClasses}`}
    >
      {status}
    </Badge>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/booking-status.tsx
git commit -m "feat: add reusable booking status component"
```

### Task 2: Integrate BookingStatus in BookingCard

**Files:**
- Modify: `src/components/booking-card.tsx:35-37`

**Interfaces:**
- Consumes: `BookingStatus` from `@/components/booking-status`

- [ ] **Step 1: Update BookingCard to use BookingStatus**

```tsx
import { BookingStatus } from "@/components/booking-status";
// ...
<BookingStatus status={status} />
```

- [ ] **Step 2: Verify build and lint**

Run: `bun run build`
Expected: Success with no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/booking-card.tsx
git commit -m "refactor: use BookingStatus in BookingCard"
```
