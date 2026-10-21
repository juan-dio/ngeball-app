"use client";

import { useState } from "react";

import { AppNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SearchInput } from "@/components/search-input";
import { FilterDropdown } from "@/components/filter-dropdown";
import { TablePagination } from "@/components/table-pagination";
import { CourtCard } from "@/components/court-card";
import { COURTS } from "@/data/courts";
import { usePagination } from "@/hooks/use-pagination";

const ITEMS_PER_PAGE = 6;

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
      selectedType === "All Types" ||
      court.courtType.name.toLowerCase().includes(selectedType.toLowerCase());
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
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            placeholder="Search court"
            className="w-full md:w-[320px]"
          />
          <div className="flex w-full items-stretch gap-2 md:w-auto md:max-w-103">
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
              className="w-2/5 md:w-36"
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
              className="w-3/5 md:w-60"
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
