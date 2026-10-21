"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SportIcon } from "@/components/icons/sport-icon";
import { SearchInput } from "@/components/search-input";
import { TablePagination } from "@/components/table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SPORTS } from "@/data/sports";
import { usePagination } from "@/hooks/use-pagination";

const ITEMS_PER_PAGE = 5;

export default function SportsPage() {
  const [search, setSearch] = useState("");

  const filteredSports = SPORTS.filter(
    (item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.id.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const {
    items: paginatedSports,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredSports, ITEMS_PER_PAGE);

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="p-0 flex flex-col gap-6">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            placeholder="Search sport"
            className="w-full md:w-[320px]"
          />

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
                            <SportIcon
                              sport={sport.sport}
                              iconSvg={sport.iconSvg}
                              colorHex={sport.colorHex}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          <div className="flex items-center justify-center gap-2">
                            <span
                              className="size-4 rounded-full inline-block shrink-0"
                              style={{ backgroundColor: sport.colorHex }}
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
