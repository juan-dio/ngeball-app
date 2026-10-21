"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SportIconWithText } from "@/components/icons/sport-icon";
import { SearchInput } from "@/components/search-input";
import { FilterDropdown } from "@/components/filter-dropdown";
import { TablePagination } from "@/components/table-pagination";
import { formatPrice } from "@/lib/formatter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COURTS } from "@/data/courts";
import { usePagination } from "@/hooks/use-pagination";

const ITEMS_PER_PAGE = 5;

export default function CourtsPage() {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedType, setSelectedType] = useState("All Types");

  const filteredCourts = COURTS.filter((court) => {
    const matchSearch = court.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchSport =
      selectedSport === "All Sports" || court.sport.sport === selectedSport;
    const matchType =
      selectedType === "All Types" || court.courtType.name.includes(selectedType);
    return matchSearch && matchSport && matchType;
  });

  const {
    items: paginatedCourts,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredCourts, ITEMS_PER_PAGE);

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="p-0 flex flex-col gap-6">
          {/* Toolbar / Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            placeholder="Search court"
            className="w-full md:w-[320px]"
          />

            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <FilterDropdown
                value={selectedSport}
                onChange={(val) => {
                  setSelectedSport(val);
                  setCurrentPage(1);
                }}
                items={[
                  "All Sports",
                  ...Array.from(new Set(COURTS.map((c) => c.sport.sport))),
                ]}
                className="w-full md:w-36"
              />

              <FilterDropdown
                value={selectedType}
                onChange={(val) => {
                  setSelectedType(val);
                  setCurrentPage(1);
                }}
                items={[
                  "All Types",
                  ...Array.from(new Set(COURTS.map((c) => c.courtType.name))),
                ]}
                className="w-full md:w-60"
              />
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
                {paginatedCourts.length === 0 ? (
                  <TableRow className="border-0 bg-white">
                    <TableCell
                      colSpan={6}
                      className="p-8 text-center text-small text-text-secondary font-light"
                    >
                      No courts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCourts.map((court, index) => {
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
                          <SportIconWithText sport={court.sport.sport} />
                        </div>
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {court.courtType.name}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        Rp {formatPrice(court.price)}
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        <Link
                          href={`/admin/courts/${court.id}`}
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
