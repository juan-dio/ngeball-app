# Sport Form Card Reusable Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the shared form card layout and fields used across `src/app/(admin)/admin/sports/new/page.tsx`, `src/app/(admin)/admin/sports/[id]/page.tsx`, and `src/app/(admin)/admin/sports/[id]/edit/page.tsx` into a reusable component located at `src/components/admin/sport-form-card.tsx`.

**Architecture:** Create a flexible `<SportFormCard />` component that supports 3 modes (`"create"`, `"detail"`, `"edit"`). It handles name, color hex input with color swatch preview, icon SVG code textarea, validation error display, and configurable action buttons.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, shadcn/ui primitives (`Card`, `Field`, `Input`, `Textarea`, `Button`).

**Spec:** User request to extract sport form card into a reusable component.

## Global Constraints

- Use Bun exclusively for commands (`bun run build`, `bun run lint`, `bunx tsc --noEmit`).
- Follow project color tokens (`bg-primary`, `text-text-primary`, `border-border`, etc.) and typography classes (`text-body`, `text-h2`, `text-small`).
- Use kebab-case for filenames, PascalCase for component functions.
- Keep changes minimal, modular, and consistent with existing patterns.

## Review Focus

- **Form State Sync:** Ensure mode-specific default states (`create` empty, `detail` readOnly, `edit` prefilled) correctly pass through props.
- **Validation Accessibility:** Retain `aria-invalid`, `aria-describedby`, and field error integration across all three pages.
- **Color Swatch Logic:** Ensure color swatch correctly handles live updates and hex normalization on blur/change.

---

## Tasks

### Task 1: Create reusable `<SportFormCard />` component

**Files:**
- Create: `src/components/admin/sport-form-card.tsx`

**Interfaces:**
- Consumes: `FormErrors` from `@/lib/form-validation`
- Produces: `SportFormCard` component accepting props:
  - `title`: string
  - `mode`: `"create" | "detail" | "edit"`
  - `values`: `{ name: string; colorHex: string; iconSvg: string }`
  - `onChange`?: `{ name?: (v: string) => void; colorHex?: (v: string) => void; iconSvg?: (v: string) => void }`
  - `onColorBlur`?: () => void
  - `errors`?: `FormErrors<"name" | "color" | "icon">`
  - `clearError`?: `(field: "name" | "color" | "icon") => void`
  - `onSubmit`?: (e: React.FormEvent<HTMLFormElement>) => void
  - `headerAction`?: React.ReactNode
  - `actionButtons`?: React.ReactNode

- [ ] **Step 1: Write `src/components/admin/sport-form-card.tsx`**

```tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type FormErrors } from "@/lib/form-validation";

const DEFAULT_COLOR = "#285A48";
const HEX_PATTERN = /^#[0-9A-F]{6}$/;

const LABEL_CLASS = "text-body font-normal text-text-primary leading-tight";
const ERROR_CLASS = "text-small text-danger";

function asHex(value: string) {
  const trimmed = value.trim().toUpperCase();
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

export interface SportFormCardValues {
  name: string;
  colorHex: string;
  iconSvg: string;
}

export interface SportFormCardProps {
  title: string;
  mode: "create" | "detail" | "edit";
  values: SportFormCardValues;
  onChange?: {
    name?: (value: string) => void;
    colorHex?: (value: string) => void;
    iconSvg?: (value: string) => void;
  };
  onColorBlur?: () => void;
  errors?: FormErrors<"name" | "color" | "icon">;
  clearError?: (field: "name" | "color" | "icon") => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  headerAction?: React.ReactNode;
  actionButtons?: React.ReactNode;
}

export function SportFormCard({
  title,
  mode,
  values,
  onChange,
  onColorBlur,
  errors = {},
  clearError,
  onSubmit,
  headerAction,
  actionButtons,
}: SportFormCardProps) {
  const isReadOnly = mode === "detail";

  const rawHex = asHex(values.colorHex);
  const swatchColor = HEX_PATTERN.test(rawHex) ? rawHex : DEFAULT_COLOR;

  const content = (
    <div className="flex flex-col gap-6">
      {/* Header & Optional Header Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-h2 text-text-primary">{title}</h1>
        {headerAction}
      </div>

      {/* Name & Color */}
      <div className="grid gap-4 md:grid-cols-2">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel className={LABEL_CLASS} htmlFor="sport-name">
            Name
          </FieldLabel>
          <Input
            id="sport-name"
            readOnly={isReadOnly}
            value={values.name}
            onChange={(e) => {
              onChange?.name?.(e.target.value);
              clearError?.("name");
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "sport-name-error" : undefined}
            className={`h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body text-text-primary ${
              isReadOnly
                ? "focus-visible:ring-0"
                : "placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            }`}
            placeholder={isReadOnly ? undefined : "eg. Futsal"}
          />
          {!isReadOnly && (
            <FieldError id="sport-name-error" className={ERROR_CLASS}>
              {errors.name}
            </FieldError>
          )}
        </Field>

        <Field data-invalid={Boolean(errors.color)}>
          <FieldLabel className={LABEL_CLASS} htmlFor="sport-color">
            Color
          </FieldLabel>
          {isReadOnly ? (
            <div
              id="sport-color"
              className="flex h-10 w-full items-center gap-2 rounded-[6px] border border-border bg-white px-3 text-body text-text-primary"
            >
              <span
                aria-hidden="true"
                className="block size-6 shrink-0 rounded-[8px] border border-border"
                style={{ backgroundColor: swatchColor }}
              />
              {rawHex.replace("#", "")}
            </div>
          ) : (
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1.5"
              >
                <span
                  className="block size-6 rounded-[6px] border border-border"
                  style={{ backgroundColor: swatchColor }}
                />
              </span>
              <Input
                id="sport-color"
                value={values.colorHex}
                onChange={(e) => {
                  onChange?.colorHex?.(e.target.value);
                  clearError?.("color");
                }}
                onBlur={onColorBlur}
                aria-invalid={Boolean(errors.color)}
                aria-describedby={errors.color ? "sport-color-error" : undefined}
                className="h-10 w-full rounded-[6px] border-border bg-white pl-10 text-body md:text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="eg. 285A48"
              />
            </div>
          )}
          {!isReadOnly && (
            <FieldError id="sport-color-error" className={ERROR_CLASS}>
              {errors.color}
            </FieldError>
          )}
        </Field>
      </div>

      {/* Icon (SVG Code) */}
      <Field data-invalid={Boolean(errors.icon)}>
        <FieldLabel className={LABEL_CLASS} htmlFor="sport-icon">
          Icon (SVG Code)
        </FieldLabel>
        {isReadOnly ? (
          <div
            id="sport-icon"
            className="h-36 w-full overflow-y-auto rounded-[6px] border border-border bg-white p-3 text-body text-text-primary break-all whitespace-pre-wrap"
          >
            {values.iconSvg}
          </div>
        ) : (
          <Textarea
            id="sport-icon"
            value={values.iconSvg}
            onChange={(e) => {
              onChange?.iconSvg?.(e.target.value);
              clearError?.("icon");
            }}
            aria-invalid={Boolean(errors.icon)}
            aria-describedby={errors.icon ? "sport-icon-error" : undefined}
            className="h-36 w-full resize-none rounded-[6px] border border-border bg-white p-3 text-body md:text-body text-text-primary placeholder:text-text-secondary outline-none transition-colors focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            placeholder="eg. <svg></svg>"
          />
        )}
        {!isReadOnly && (
          <FieldError id="sport-icon-error" className={ERROR_CLASS}>
            {errors.icon}
          </FieldError>
        )}
      </Field>

      {/* Action Buttons */}
      {actionButtons && (
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          {actionButtons}
        </div>
      )}
    </div>
  );

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="p-0">
          {onSubmit && !isReadOnly ? (
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              {content}
            </form>
          ) : (
            content
          )}
        </CardContent>
      </Card>
    </section>
  );
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `bunx tsc --noEmit`
Expected: Success.

---

### Task 2: Refactor `NewSportPage` to use `<SportFormCard />`

**Files:**
- Modify: `src/app/(admin)/admin/sports/new/page.tsx`

- [ ] **Step 1: Replace implementation in `src/app/(admin)/admin/sports/new/page.tsx`**

Use `SportFormCard` with `mode="create"`.

- [ ] **Step 2: Verify build and typecheck**

Run: `bunx tsc --noEmit`
Expected: PASS

---

### Task 3: Refactor `SportDetailPage` to use `<SportFormCard />`

**Files:**
- Modify: `src/app/(admin)/admin/sports/[id]/page.tsx`

- [ ] **Step 1: Replace implementation in `src/app/(admin)/admin/sports/[id]/page.tsx`**

Use `SportFormCard` with `mode="detail"`, passing `headerAction` for Edit/Delete buttons.

- [ ] **Step 2: Verify build and typecheck**

Run: `bunx tsc --noEmit`
Expected: PASS

---

### Task 4: Refactor `EditSportPage` to use `<SportFormCard />`

**Files:**
- Modify: `src/app/(admin)/admin/sports/[id]/edit/page.tsx`

- [ ] **Step 1: Replace implementation in `src/app/(admin)/admin/sports/[id]/edit/page.tsx`**

Use `SportFormCard` with `mode="edit"`.

- [ ] **Step 2: Final verification**

Run: `bun run build`, `bun run lint`, and `bunx tsc --noEmit`
Expected: PASS
