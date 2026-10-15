"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SportIconWithText } from "@/components/icons/sport-icon";
import { TablePagination } from "@/components/table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COURT_TYPES } from "@/data/court-types";
import { usePagination } from "@/hooks/use-pagination";

const ITEMS_PER_PAGE = 5;

export default function CourtTypesPage() {
  const [search, setSearch] = useState("");

  const filteredCourtTypes = COURT_TYPES.filter(
    (item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.id.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const {
    items: paginatedCourtTypes,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredCourtTypes, ITEMS_PER_PAGE);

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="p-0 flex flex-col gap-6">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative w-full md:w-[320px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
                <Search className="h-4 w-4" />
              </div>
              <Input
                className="h-10 w-full rounded-[6px] border-border bg-white pl-10 text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="Search court type"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <Button
              nativeButton={false}
              render={<Link href="/admin/court-types/new" />}
              className="h-10 gap-2 rounded-[12px] bg-primary px-4 text-small text-white cursor-pointer hover:bg-primary/90 md:ml-auto"
            >
              <Plus />
              New Court Type
            </Button>
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
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourtTypes.length === 0 ? (
                  <TableRow className="border-0 bg-white">
                    <TableCell
                      colSpan={4}
                      className="p-8 text-center text-small text-text-secondary font-light"
                    >
                      No court types found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCourtTypes.map((courtType, index) => {
                    const isEven = index % 2 === 1;
                    return (
                      <TableRow
                        key={`${courtType.id}-${index}`}
                        className={`border-0 ${
                          isEven
                            ? "bg-white hover:bg-white/80"
                            : "bg-background hover:bg-background/80"
                        }`}
                      >
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          #{courtType.id}
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          {courtType.name}
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary">
                          <div className="flex justify-center">
                            <SportIconWithText sport={courtType.sport} />
                          </div>
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <Link
                            href={`/admin/court-types/${courtType.id}`}
                            className="text-small font-light text-blue underline hover:text-secondary"
                          >
                            Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="pt-4"
          />
        </CardContent>
      </Card>
    </section>
  );
}