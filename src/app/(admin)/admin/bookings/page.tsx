"use client";

import { useState } from "react";
import { Search, CalendarDays, ChevronDown, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { BOOKINGS } from "@/data/bookings";

const ITEMS_PER_PAGE = 6;

export default function BookingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("All");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 20),
    to: new Date(2026, 1, 20),
  });

  const formattedDateRange = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "LLL dd, yyyy")} - ${format(
          dateRange.to,
          "LLL dd, yyyy",
        )}`
      : format(dateRange.from, "LLL dd, yyyy")
    : "Pick a date range";

  const filteredBookings = BOOKINGS.filter((booking) => {
    const matchSearch =
      booking.userName.toLowerCase().includes(search.trim().toLowerCase()) ||
      booking.courtName.toLowerCase().includes(search.trim().toLowerCase()) ||
      booking.id.toLowerCase().includes(search.trim().toLowerCase());
    const matchPayment =
      selectedPayment === "All" ||
      booking.status.toLowerCase() === selectedPayment.toLowerCase();
    return matchSearch && matchPayment;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedBookings = filteredBookings.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
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
                placeholder="Search booking"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {/* Date Range Selector */}
              <Popover>
                <PopoverTrigger className="flex h-10 w-full md:w-60 cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-text-primary hover:bg-light">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <CalendarDays className="h-4 w-4 text-text-secondary shrink-0" />
                    <span className="text-small font-normal text-text-primary truncate">
                      {formattedDateRange}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0 border border-border bg-white shadow-lg">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              {/* Dropdown Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full md:w-36 cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-small font-normal text-text-primary truncate">
                    {selectedPayment}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  {["All", "Paid", "Pending", "Rejected"].map((status) => (
                    <DropdownMenuItem
                      key={status}
                      className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                      onClick={() => {
                        setSelectedPayment(status);
                        setCurrentPage(1);
                      }}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
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
                {paginatedBookings.map((booking, index) => {
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
                        {booking.userName}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {booking.courtName}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {booking.date}
                      </TableCell>
                      <TableCell className="p-2 text-center text-small text-text-primary font-light">
                        {booking.time}
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        <div className="flex justify-center">
                          <BookingStatus status={booking.status} />
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
                            <DropdownMenuItem className="cursor-pointer text-body text-danger focus:bg-danger/10 focus:text-danger">
                              Reject Booking
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
                    if (safeCurrentPage > 1) setCurrentPage(safeCurrentPage - 1);
                  }}
                  className={safeCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                    if (safeCurrentPage < totalPages) setCurrentPage(safeCurrentPage + 1);
                  }}
                  className={safeCurrentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </section>
  );
}
