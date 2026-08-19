"use client";

import { AppNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { type Booking, BookingCard } from "@/components/booking-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const bookings: Booking[] = [
  {
    id: "JPX-123123",
    sport: "Futsal",
    courtName: "Futsal Court A",
    price: "300.000,00",
    status: "Paid",
    date: "14 April 2025",
    duration: "60 Minutes",
    time: "10:00 - 11:00",
    timeline: [
      { label: "Booking placed", date: "11 April 2025 | 16:30" },
      { label: "Payment", date: "11 April 2025 | 17:00" },
      { label: "Confirmed", date: "11 April 2025 | 17:05" },
    ],
  },
  {
    id: "JPX-123123",
    sport: "Futsal",
    courtName: "Futsal Court A",
    price: "300.000,00",
    status: "Paid",
    date: "14 April 2025",
    duration: "60 Minutes",
    time: "10:00 - 11:00",
    timeline: [
      { label: "Booking placed", date: "11 April 2025 | 16:30" },
      { label: "Payment", date: "11 April 2025 | 17:00" },
      { label: "Confirmed", date: "11 April 2025 | 17:05" },
    ],
  },
  {
    id: "JPX-123123",
    sport: "Futsal",
    courtName: "Futsal Court A",
    price: "300.000,00",
    status: "Paid",
    date: "14 April 2025",
    duration: "60 Minutes",
    time: "10:00 - 11:00",
    timeline: [
      { label: "Booking placed", date: "11 April 2025 | 16:30" },
      { label: "Payment", date: "11 April 2025 | 17:00" },
      { label: "Confirmed", date: "11 April 2025 | 17:05" },
    ],
  },
];

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

export default function BookingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background pt-16">
      <AppNavbar />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-8 px-6 pt-12 pb-22">
        <div className="w-full flex flex-col items-center gap-4">
          {bookings.map((booking, index) => (
            <BookingCard key={index} {...booking} />
          ))}
        </div>

        <PaginationNav />
      </div>
      <Footer />
    </main>
  );
}
