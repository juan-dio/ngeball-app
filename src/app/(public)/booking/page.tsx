"use client";

import { AppNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingCard } from "@/components/booking-card";
import { BOOKINGS } from "@/data/bookings";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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
  const userBookings = BOOKINGS.filter((booking) => booking.userId === "USR-001");

  return (
    <main className="flex min-h-screen flex-col bg-background pt-16">
      <AppNavbar />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-8 px-6 pt-12 pb-22">
        <div className="w-full flex flex-col items-center gap-4">
          {userBookings.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))}
        </div>

        <PaginationNav />
      </div>
      <Footer />
    </main>
  );
}
