# SelectButton Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reusable `SelectButton` component and use it in `CourtDetails` page for duration and schedule selection.

**Architecture:** Functional React component using Tailwind CSS for conditional styling based on a `status` prop.

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide React.

## Global Constraints
- **Path**: `src/components/select-button.tsx`
- **Status Types**: `'default' | 'active' | 'disabled'`
- **Style Priority**: Use semantic Tailwind classes from `globals.css` where possible.

---

### Task 1: Create SelectButton Component

**Files:**
- Create: `src/components/select-button.tsx`

**Interfaces:**
- Produces: `SelectButton` component

- [ ] **Step 1: Write implementation**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectButtonProps {
  text: string;
  status?: "default" | "active" | "disabled";
  onClick?: () => void;
  className?: string;
}

export function SelectButton({
  text,
  status = "default",
  onClick,
  className,
}: SelectButtonProps) {
  const isDisabled = status === "disabled";
  const isActive = status === "active";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-small font-medium transition w-full",
        isActive
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-white text-text-primary hover:bg-light",
        isDisabled && "border-muted text-muted cursor-not-allowed opacity-50 hover:bg-white",
        className
      )}
    >
      {text}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/select-button.tsx
git commit -m "feat: add SelectButton component"
```

---

### Task 2: Refactor CourtDetails Page

**Files:**
- Modify: `src/app/courts/futsal-court-a/page.tsx`

**Interfaces:**
- Consumes: `SelectButton` from `@/components/select-button`

- [ ] **Step 1: Update imports and replace duration buttons**

Replace lines 412-429 with `SelectButton`.

- [ ] **Step 2: Replace schedule buttons**

Replace lines 437-453 with `SelectButton`.

- [ ] **Step 3: Verification**
- Run `bun run lint` and `bunx tsc --noEmit` to ensure no errors.
- Visual check: Ensure buttons look identical to original design but support disabled state.

- [ ] **Step 4: Commit**

```bash
git add src/app/courts/futsal-court-a/page.tsx
git commit -m "refactor: use SelectButton in CourtDetails page"
```
