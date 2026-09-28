"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { AppNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TablePagination } from "@/components/table-pagination";
import { CourtCard } from "@/components/court-card";
import { COURTS } from "@/data/courts";
import { usePagination } from "@/hooks/use-pagination";

const ITEMS_PER_PAGE = 6;

function ToolbarDropdown({
  value,
  onChange,
  items,
  widthClass,
}: {
  value: string;
  onChange: (val: string) => void;
  items: string[];
  widthClass: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex h-10 max-w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left ${widthClass}`}
      >
        <span className="text-small font-normal text-text-primary truncate">
          {value}
        </span>
        <ChevronDown className="size-5 shrink-0 text-text-secondary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
            onClick={() => onChange(item)}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function CourtsPage() {
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
      selectedType === "All Types" ||
      court.type.toLowerCase().includes(selectedType.toLowerCase());
    return matchSearch && matchSport && matchType;
  });

  const {
    items: paginatedCourts,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredCourts, ITEMS_PER_PAGE);

  return (
    <main className="flex min-h-screen flex-col bg-background pt-16">
      <AppNavbar />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-8 px-6 pt-12 pb-22">
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:justify-center md:gap-2">
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
          <div className="flex w-full items-stretch gap-2 md:w-auto md:max-w-103">
            <ToolbarDropdown
              value={selectedSport}
              onChange={(val) => {
                setSelectedSport(val);
                setCurrentPage(1);
              }}
              items={["All Sports", "Futsal", "Basketball", "Tennis", "Padel"]}
              widthClass="w-2/5 md:w-[144px]"
            />
            <ToolbarDropdown
              value={selectedType}
              onChange={(val) => {
                setSelectedType(val);
                setCurrentPage(1);
              }}
              items={[
                "All Types",
                "Synthetic Grass",
                "Interlock",
                "Vynil",
                "Indoor",
              ]}
              widthClass="w-3/5 md:w-[254px]"
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fill,360px)] md:justify-center">
          {paginatedCourts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-small text-text-secondary font-light">
              No courts found.
            </div>
          ) : (
            paginatedCourts.map((court, index) => (
              <CourtCard key={court.id} court={court} priority={index === 0} />
            ))
          )}
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="pt-10"
          activeClassName="bg-white"
        />
      </div>

      <Footer />
    </main>
  );
}
