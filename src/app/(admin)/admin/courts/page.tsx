"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SportIconWithText } from "@/components/icons/sport-icon";
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

const ITEMS_PER_PAGE = 5;

export default function CourtsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedType, setSelectedType] = useState("All Types");

  const filteredCourts = COURTS.filter((court) => {
    const matchSearch = court.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchSport =
      selectedSport === "All Sports" || court.sport === selectedSport;
    const matchType =
      selectedType === "All Types" || court.type.includes(selectedType);
    return matchSearch && matchSport && matchType;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourts.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedCourts = filteredCourts.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="flex flex-col">
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
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full md:w-36 cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-small font-normal text-text-primary truncate">
                    {selectedSport}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  <DropdownMenuItem
                    className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                    onClick={() => {
                      setSelectedSport("All Sports");
                      setCurrentPage(1);
                    }}
                  >
                    All Sports
                  </DropdownMenuItem>
                  {Array.from(new Set(COURTS.map((c) => c.sport))).map(
                    (sport) => (
                      <DropdownMenuItem
                        key={sport}
                        className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                        onClick={() => {
                          setSelectedSport(sport);
                          setCurrentPage(1);
                        }}
                      >
                        {sport}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full md:w-56 cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-small font-normal text-text-primary truncate">
                    {selectedType}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  <DropdownMenuItem
                    className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                    onClick={() => {
                      setSelectedType("All Types");
                      setCurrentPage(1);
                    }}
                  >
                    All Types
                  </DropdownMenuItem>
                  {Array.from(new Set(COURTS.map((c) => c.type))).map(
                    (type) => (
                      <DropdownMenuItem
                        key={type}
                        className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                        onClick={() => {
                          setSelectedType(type);
                          setCurrentPage(1);
                        }}
                      >
                        {type}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              nativeButton={false}
              render={<Link href="/admin/courts/new" />}
              className="h-10 gap-2 rounded-[12px] bg-primary px-4 text-small text-white cursor-pointer hover:bg-primary/90 md:ml-auto"
            >
              <Plus />
              New Court
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
                        <a
                          href="#"
                          className="text-small font-light text-blue underline hover:text-secondary"
                        >
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
          <Pagination className="pt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (safeCurrentPage > 1)
                      setCurrentPage(safeCurrentPage - 1);
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
                    if (safeCurrentPage < totalPages)
                      setCurrentPage(safeCurrentPage + 1);
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
