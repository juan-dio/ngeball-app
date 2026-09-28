"use client";

import { AppNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingCard } from "@/components/booking-card";
import { TablePagination } from "@/components/table-pagination";
import { BOOKINGS } from "@/data/bookings";
import { usePagination } from "@/hooks/use-pagination";

const ITEMS_PER_PAGE = 5;

export default function BookingPage() {
  const userBookings = BOOKINGS.filter(
    (booking) => booking.userId === "USR-001",
  );

  const {
    items: paginatedBookings,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(userBookings, ITEMS_PER_PAGE);

  return (
    <main className="flex min-h-screen flex-col bg-background pt-16">
      <AppNavbar />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-8 px-6 pt-12 pb-22">
        <div className="w-full flex flex-col items-center gap-4">
          {paginatedBookings.length === 0 ? (
            <div className="py-12 text-center text-small text-text-secondary font-light">
              No bookings found.
            </div>
          ) : (
            paginatedBookings.map((booking, index) => (
              <BookingCard key={index} booking={booking} />
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
