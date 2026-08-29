"use client";

import { useState } from "react";
import { Search, CalendarDays, ChevronDown, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookingStatus } from "@/components/booking-status";
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

type AdminBooking = {
  id: string;
  name: string;
  court: string;
  date: string;
  schedule: string;
  payment: string;
};

const ADMIN_BOOKINGS: AdminBooking[] = [
  {
    id: "#123123123",
    name: "Marcus Rashford",
    court: "Futsal Court A",
    date: "Jan 24, 2026",
    schedule: "19:00 - 21:00",
    payment: "Paid",
  },
  {
    id: "#123123123",
    name: "Marcus Rashford",
    court: "Futsal Court A",
    date: "Jan 24, 2026",
    schedule: "19:00 - 21:00",
    payment: "Paid",
  },
  {
    id: "#123123123",
    name: "Marcus Rashford",
    court: "Futsal Court A",
    date: "Jan 24, 2026",
    schedule: "19:00 - 21:00",
    payment: "Paid",
  },
  {
    id: "#123123123",
    name: "Marcus Rashford",
    court: "Futsal Court A",
    date: "Jan 24, 2026",
    schedule: "19:00 - 21:00",
    payment: "Paid",
  },
  {
    id: "#123123123",
    name: "Marcus Rashford",
    court: "Futsal Court A",
    date: "Jan 24, 2026",
    schedule: "19:00 - 21:00",
    payment: "Paid",
  },
  {
    id: "#123123123",
    name: "Marcus Rashford",
    court: "Futsal Court A",
    date: "Jan 24, 2026",
    schedule: "19:00 - 21:00",
    payment: "Paid",
  },
  {
    id: "#123123123",
    name: "Marcus Rashford",
    court: "Futsal Court A",
    date: "Jan 24, 2026",
    schedule: "19:00 - 21:00",
    payment: "Paid",
  },
];

export default function BookingsPage() {
  const [currentPage, setCurrentPage] = useState(2);

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
                placeholder="Search booking"
              />
            </div>

            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {/* Date Range Selector */}
              <div className="flex h-10 w-full md:w-60 items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-text-primary">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-text-secondary shrink-0" />
                  <span className="text-small font-normal text-text-primary truncate">
                    Jan 20, 2026 - Feb 20, 2026
                  </span>
                </div>
              </div>

              {/* Dropdown Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full md:w-36 cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-small font-normal text-text-primary">
                    Payment
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  <DropdownMenuItem className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary">
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary">
                    Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary">
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary">
                    Rejected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
                    Court
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Date
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Schedule
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Payment
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ADMIN_BOOKINGS.map((booking, index) => {
                  const isEven = index % 2 === 1;
                  return (
                    <TableRow
                      key={`${booking.id}-${index}`}
                      className={`border-0 ${
                        isEven
                          ? "bg-white hover:bg-white/80"
                          : "bg-background hover:bg-background/80"
                      }`}
                    >
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {booking.id}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {booking.name}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {booking.court}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {booking.date}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {booking.schedule}
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        <div className="flex justify-center">
                          <BookingStatus status={booking.payment} />
                        </div>
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-light">
                            <MoreVertical className="size-4 text-text-secondary" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow"
                          >
                            <DropdownMenuItem className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-body text-danger focus:bg-danger/10 focus:text-danger">
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 2}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(2);
                  }}
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 3}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(3);
                  }}
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </section>
  );
}
