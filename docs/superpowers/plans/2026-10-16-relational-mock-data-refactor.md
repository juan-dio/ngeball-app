# Relational Mock Data & Dynamic Sport Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor all mock data files (`src/data/sports.ts`, `src/data/court-types.ts`, `src/data/users.ts`, `src/data/courts.ts`, `src/data/bookings.ts`) to be fully relational with nested populated objects (like a database query serialized to JSON), and remove the hardcoded `SportKey` union from `sports.ts` so sports become fully dynamic strings.

**Architecture:** Update types to support relational nested payloads and string-based sports. Populate related entities (`Sport`, `CourtType`, `User`, `Court`) directly in data arrays, ensuring backward compatibility with components using `sport: string`.

**Tech Stack:** TypeScript, Next.js, Bun

**Spec:** Relational Mock Data & Dynamic Sport Refactoring

## Global Constraints
- Bun exclusively (`bun add`, `bun run dev`, `bun run build`). No npm, yarn, pnpm.
- Run `bun run lint` and `bunx tsc --noEmit` for verification.
- Keep changes minimal, modular, and consistent with existing patterns.
- Do not add unrequested third-party dependencies.

## Review Focus
1. Component breakage due to `SportKey` removal or missing `sport` string properties.
2. Missing populated nested relationships (`courtType`, `sport`, `user`, `court`, `timeline`).
3. Correct TypeScript types across all mock data files and consuming components.
4. Correct price and ID formats.

---

### Task 1: Refactor `src/data/sports.ts` (Remove SportKey)

**Files:**
- Modify: `src/data/sports.ts`

**Interfaces:**
- Produces: `Sport` type (with `sport: string`), `SPORTS` array, `SPORT_ICONS`, `SPORT_COLOR_HEX`.

- [ ] **Step 1: Update `src/data/sports.ts` to replace `SportKey` union with `string`**

```ts
export type Sport = {
  id: string;
  name: string;
  sport: string;
  colorHex: string;
  iconSvg?: string;
};

export const SPORT_ICONS: Record<string, string> = { ... };
export const SPORT_COLOR_HEX: Record<string, string> = { ... };
export const SPORTS: Sport[] = [ ... ];
```

- [ ] **Step 2: Run type check**

Run: `bunx tsc --noEmit`
Expected: Check for any compilation errors in other files referencing `SportKey`.

---

### Task 2: Refactor `src/data/court-types.ts` (Relational Populate)

**Files:**
- Modify: `src/data/court-types.ts`

**Interfaces:**
- Consumes: `Sport` from `src/data/sports.ts`
- Produces: `CourtType` type with nested `sport` object, `COURT_TYPES` array.

- [ ] **Step 1: Update `src/data/court-types.ts` with nested `sport`**

```ts
import { SPORTS, type Sport } from "./sports";

export type CourtType = {
  id: string;
  name: string;
  sportId: string;
  sport: Sport;
};

export const COURT_TYPES: CourtType[] = [ ... ];
```

---

### Task 3: Refactor `src/data/users.ts` & `src/data/courts.ts` (Relational Populate)

**Files:**
- Create/Modify: `src/data/users.ts`
- Modify: `src/data/courts.ts`

**Interfaces:**
- Consumes: `Sport` and `CourtType`
- Produces: `User` type, `COURTS` array with nested `courtType` and `sport`.

- [ ] **Step 1: Update `src/data/users.ts`**
- [ ] **Step 2: Update `src/data/courts.ts` to include nested `courtType` and `sport`**

---

### Task 4: Refactor `src/data/bookings.ts` (Full Relational Populate)

**Files:**
- Modify: `src/data/bookings.ts`

**Interfaces:**
- Consumes: `User`, `Court`, `Sport`
- Produces: `Booking` type with nested `user`, `court`, `timeline`, and helper fields.

- [ ] **Step 1: Update `src/data/bookings.ts` with fully nested relational objects**

---

### Task 5: Verification

**Files:**
- Test compilation and linting

- [ ] **Step 1: Run type check and linter**

Run: `bunx tsc --noEmit && bun run lint`
Expected: PASS with no errors.
