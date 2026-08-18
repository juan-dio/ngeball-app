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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CourtCard } from "@/components/court-card";
import { COURTS } from "@/data/courts";

function ToolbarDropdown({
  label,
  items,
  widthClass,
}: {
  label: string;
  items: string[];
  widthClass: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex h-10 max-w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left ${widthClass}`}
      >
        <span className="text-small font-normal text-text-primary">
          {label}
        </span>
        <ChevronDown className="size-5 shrink-0 text-text-secondary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PaginationNav() {
  return (
    <Pagination className="pt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="rounded-[6px] bg-white">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default function CourtsPage() {
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
            />
          </div>
          <div className="flex w-full items-stretch gap-2 md:w-auto md:max-w-103">
            <ToolbarDropdown
              label="Sports"
              items={["All Sports", "Futsal", "Basketball", "Tennis", "Padel"]}
              widthClass="w-2/5 md:w-[144px]"
            />
            <ToolbarDropdown
              label="Type"
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
          {COURTS.map((court, index) => (
            <CourtCard key={court.name} court={court} priority={index === 0} />
          ))}
        </div>

        <PaginationNav />
      </div>

      <Footer />
    </main>
  );
}
