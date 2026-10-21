"use client";

import { useState } from "react";
import { CalendarDays, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";
import { BookingStatus } from "@/components/booking-status";
import { TablePagination } from "@/components/table-pagination";
import { SearchInput } from "@/components/search-input";
import { FilterDropdown } from "@/components/filter-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { usePagination } from "@/hooks/use-pagination";

const ITEMS_PER_PAGE = 6;

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("All Payment");
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
      `${booking.user.firstName} ${booking.user.lastName}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()) ||
      booking.court.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      booking.id.toLowerCase().includes(search.trim().toLowerCase());
    const matchPayment =
      selectedPayment === "All Payment" ||
      booking.status.toLowerCase() === selectedPayment.toLowerCase();
    return matchSearch && matchPayment;
  });

  const {
    items: paginatedBookings,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredBookings, ITEMS_PER_PAGE);

  return (
    <section className="flex flex-col gap-6">
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
            placeholder="Search booking"
            className="w-full md:w-[320px]"
          />

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
                <PopoverContent
                  align="start"
                  className="w-auto p-0 border border-border bg-white shadow-lg"
                >
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
              <FilterDropdown
                value={selectedPayment}
                onChange={(val) => {
                  setSelectedPayment(val);
                  setCurrentPage(1);
                }}
                items={["All Payment", "Paid", "Pending", "Rejected"]}
                className="w-full md:w-36"
              />
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
                {paginatedBookings.length === 0 ? (
                  <TableRow className="border-0 bg-white">
                    <TableCell
                      colSpan={7}
                      className="p-8 text-center text-small text-text-secondary font-light"
                    >
                      No bookings found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBookings.map((booking, index) => {
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
                          {booking.user.firstName} {booking.user.lastName}
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          {booking.court.name}
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
                              <DropdownMenuItem className="cursor-pointer text-danger focus:bg-danger/10 focus:text-danger">
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
