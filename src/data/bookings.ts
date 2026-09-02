import { type SportKey } from "@/components/icons/sport-icon";

export type TimelineItem = {
  label: string;
  date: string;
};

export type Booking = {
  id: string;
  sport: SportKey;
  courtName: string;
  price: string;
  status: string;
  date: string;
  duration: string;
  time: string;
  timeline: TimelineItem[];
};

export const BOOKINGS: Booking[] = [
  {
    id: "JPX-123123",
    sport: "Futsal",
    courtName: "Futsal Court A",
    price: "300.000,00",
    status: "Pending",
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
    status: "Rejected",
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

export type AdminBooking = {
  id: string;
  name: string;
  court: string;
  date: string;
  schedule: string;
  payment: string;
};

export const ADMIN_BOOKINGS: AdminBooking[] = [
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
