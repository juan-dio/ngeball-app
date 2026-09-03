# Admin Courts Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Admin Courts listing page at `/admin/courts` with toolbar, table, and pagination using shadcn/ui and mock data.

**Architecture:** Single `"use client"` page component following the exact same pattern as `src/app/(admin)/admin/bookings/page.tsx`. State managed via `useState` for search, filters, and pagination. Data source is the static `COURTS` array.

**Tech Stack:** Next.js App Router, shadcn/ui (Card, Input, Table, Pagination, DropdownMenu, Select), lucide-react icons, `SportIconWithText` from `@/components/icons/sport-icon`, `COURTS` from `@/data/courts`.

## Global Constraints
- Bun exclusively. No npm/yarn/pnpm.
- Tailwind v4 tokens: use `bg-background`, `text-text-primary`, `text-body`, `text-small`, `bg-primary`, `text-white`, `border-border`, `text-blue`, `bg-white`, `bg-light`, `text-text-secondary`, `bg-green/10`, `bg-orange/10`, etc.
- Never modify `src/components/ui/*`. Override styles via `className` at call site.
- React Compiler enabled: no manual `useMemo`/`useCallback`.
- Files/folders: `kebab-case`. Component functions: `PascalCase` with named exports.
- `"use client"` only when using React state/effects/browser APIs.
- Imports use `@/` path alias. No inline `style` prop.

---

### Task 1: Implement Courts Page Structure with Toolbar and Table

**Files:**
- Modify: `src/app/(admin)/admin/courts/page.tsx`

**Interfaces:**
- Consumes: `COURTS` from `@/data/courts` (type `Court[]`), `SportIconWithText` from `@/components/icons/sport-icon`
- Produces: Default export `CourtsPage` component

- [ ] **Step 1: Write the full page implementation**

Replace contents of `src/app/(admin)/admin/courts/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Search, Plus, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SportIconWithText, type SportKey } from "@/components/icons/sport-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COURTS } from "@/data/courts";

const SPORTS: SportKey[] = ["Futsal", "Basketball", "Tennis", "Padel"];
const TYPES = ["All Types", "Indoor", "Outdoor", "Synthetic Grass", "Interlock"];
const ITEMS_PER_PAGE = 5;

export default function CourtsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSport, setSelectedSport] = useState<string>("All Sports");
  const [selectedType, setSelectedType] = useState<string>("All Types");

  const filteredCourts = COURTS.filter((court) => {
    const matchSport = selectedSport === "All Sports" || court.sport === selectedSport;
    const matchType = selectedType === "All Types" || court.type.includes(selectedType);
    return matchSport && matchType;
  });

  const totalPages = Math.ceil(filteredCourts.length / ITEMS_PER_PAGE);
  const paginatedCourts = filteredCourts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="flex flex-col gap-6">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="p-0 flex flex-col gap-6">
          {/* Toolbar / Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative w-full md:w-[320px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
                <Search className="h-4 w-4" />
              </div>
              <Input
                className="h-10 w-full rounded-[6px] border-border bg-white pl-10 text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="Search court"
              />
            </div>

            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full md:w-36 cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-small font-normal text-text-primary">
                    {selectedSport}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  <DropdownMenuItem
                    className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                    onClick={() => { setSelectedSport("All Sports"); setCurrentPage(1); }}
                  >
                    All Sports
                  </DropdownMenuItem>
                  {SPORTS.map((sport) => (
                    <DropdownMenuItem
                      key={sport}
                      className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                      onClick={() => { setSelectedSport(sport); setCurrentPage(1); }}
                    >
                      {sport}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full md:w-36 cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-small font-normal text-text-primary">
                    {selectedType}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  {TYPES.map((type) => (
                    <DropdownMenuItem
                      key={type}
                      className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                      onClick={() => { setSelectedType(type); setCurrentPage(1); }}
                    >
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-primary px-4 text-small font-medium text-white hover:bg-accent md:ml-auto">
              <Plus className="h-4 w-4" />
              Add Court
            </button>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto rounded-[8px]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border bg-white hover:bg-white">
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    ID
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Name
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Sport
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Type
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Price
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourts.map((court, index) => {
                  const isEven = index % 2 === 1;
                  return (
                    <TableRow
                      key={`${court.id}-${index}`}
                      className={`border-0 ${
                        isEven
                          ? "bg-white hover:bg-white/80"
                          : "bg-background hover:bg-background/80"
                      }`}
                    >
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        #{court.id}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {court.name}
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        <div className="flex justify-center">
                          <SportIconWithText sport={court.sport} />
                        </div>
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {court.type}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        Rp {court.price}
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        <a href="#" className="text-small font-medium text-blue underline hover:text-secondary">
                          Details
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      className="text-small"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
```

- [ ] **Step 2: Run lint**

```bash
bun run lint
```

- [ ] **Step 3: Run typecheck**

```bash
bunx tsc --noEmit
```

- [ ] **Step 4: Run build**

```bash
bun run build
```

- [ ] **Step 5: Commit**

```bash
git add src/app/\(admin\)/admin/courts/page.tsx
git commit -m "feat: implement admin courts listing page with toolbar, table, and pagination"
```
