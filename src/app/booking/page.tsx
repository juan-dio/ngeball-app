"use client"

import { AppNavbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookingCard } from "@/components/booking-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

export default function BookingPage() {
  const bookings = [
    {
      id: "JPX-123123",
      sport: "Futsal",
      courtName: "Futsal Court A",
      price: "Rp 300.000,00",
      status: "Paid",
      date: "14 April 2025",
      duration: "60 Minutes",
      time: "10:00 - 11:00",
      timeline: [
        { label: "Booking placed", date: "11 April 2025 | 16:30" },
        { label: "Payment", date: "11 April 2025 | 17:00" },
        { label: "Confirmed", date: "11 April 2025 | 17:05" },
      ],
      defaultExpanded: false,
    },
    {
      id: "JPX-123123",
      sport: "Futsal",
      courtName: "Futsal Court A",
      price: "Rp 300.000,00",
      status: "Paid",
      date: "14 April 2025",
      duration: "60 Minutes",
      time: "10:00 - 11:00",
      timeline: [
        { label: "Booking placed", date: "11 April 2025 | 16:30" },
        { label: "Payment", date: "11 April 2025 | 17:00" },
        { label: "Confirmed", date: "11 April 2025 | 17:05" },
      ],
      defaultExpanded: true,
    },
    {
      id: "JPX-123123",
      sport: "Futsal",
      courtName: "Futsal Court A",
      price: "Rp 300.000,00",
      status: "Paid",
      date: "14 April 2025",
      duration: "60 Minutes",
      time: "10:00 - 11:00",
      timeline: [
        { label: "Booking placed", date: "11 April 2025 | 16:30" },
        { label: "Payment", date: "11 April 2025 | 17:00" },
        { label: "Confirmed", date: "11 April 2025 | 17:05" },
      ],
      defaultExpanded: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppNavbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto flex w-full max-w-300 px-6 flex-col items-center py-12 gap-8">
          <div className="w-full max-w-[832px] flex flex-col gap-4">
            <h1 className="text-h1 text-text-primary">My Bookings</h1>
          </div>

          <div className="w-full flex flex-col items-center gap-4">
            {bookings.map((booking, index) => (
              <BookingCard key={index} {...booking} />
            ))}
          </div>

          <div className="w-full max-w-[832px] pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
