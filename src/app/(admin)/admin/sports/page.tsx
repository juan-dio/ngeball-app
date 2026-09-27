"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SportIcon, type SportKey } from "@/components/icons/sport-icon";
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
import { SPORTS } from "@/data/sports";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 5;

const SPORT_COLOR_CLASS: Record<SportKey, string> = {
  Futsal: "bg-green",
  Basketball: "bg-orange",
  Tennis: "bg-red",
  Padel: "bg-blue",
};

export default function SportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredSports = SPORTS.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
    item.id.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSports.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedSports = filteredSports.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

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
                placeholder="Search sport"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <Button
              nativeButton={false}
              render={<Link href="/admin/sports/new" />}
              className="h-10 gap-2 rounded-[12px] bg-primary px-4 text-small text-white cursor-pointer hover:bg-primary/90 md:ml-auto"
            >
              <Plus />
              New Sport
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
                    Icon
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Color
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSports.length === 0 ? (
                  <TableRow className="border-0 bg-white">
                    <TableCell
                      colSpan={5}
                      className="p-8 text-center text-small text-text-secondary font-light"
                    >
                      No sports found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedSports.map((sport, index) => {
                    const isEven = index % 2 === 1;
                    return (
                      <TableRow
                        key={`${sport.id}-${index}`}
                        className={`border-0 ${
                          isEven
                            ? "bg-white hover:bg-white/80"
                            : "bg-background hover:bg-background/80"
                        }`}
                      >
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          #{sport.id}
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          {sport.name}
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <div className="flex justify-center">
                            <SportIcon sport={sport.sport} />
                          </div>
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          <div className="flex items-center justify-center gap-2">
                            <span
                              className={cn(
                                "size-4 rounded-full inline-block shrink-0",
                                SPORT_COLOR_CLASS[sport.sport] ?? "bg-primary",
                              )}
                            />
                            <span>{sport.colorHex}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <Link
                            href={`/admin/sports/${sport.id}`}
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
          <Pagination className="pt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (safeCurrentPage > 1) {
                      setCurrentPage(safeCurrentPage - 1);
                    }
                  }}
                  className={
                    safeCurrentPage === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === safeCurrentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
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
                    if (safeCurrentPage < totalPages) {
                      setCurrentPage(safeCurrentPage + 1);
                    }
                  }}
                  className={
                    safeCurrentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </section>
  );
}
