import { USERS, type User } from "@/data/users";
import { COURTS, type Court } from "@/data/courts";

export type TimelineItem = {
  id: number;
  bookingId: string;
  status: string;
  created_at: string;
};

export type Booking = {
  id: string;
  userId: string;
  user: User;
  courtId: string;
  court: Court;
  totalPrice: number;
  status: string;
  date: string;
  duration: string;
  time: string;
  timeline: TimelineItem[];
};

export const BOOKINGS: Booking[] = [
  {
    id: "123123123",
    userId: "USR-001",
    user: USERS[0],
    courtId: "futsal-court-a",
    court: COURTS[0],
    totalPrice: 200000,
    status: "Pending",
    date: "Jan 24, 2026",
    duration: "60 Minutes",
    time: "19:00 - 20:00",
    timeline: [
      { id: 1, bookingId: "123123123", status: "Booking placed", created_at: "Jan 20, 2026 16:30" },
      { id: 2, bookingId: "123123123", status: "Payment", created_at: "Jan 20, 2026 17:00" },
    ],
  },
  {
    id: "123123124",
    userId: "USR-001",
    user: USERS[0],
    courtId: "basketball-court-b",
    court: COURTS[2],
    totalPrice: 250000,
    status: "Paid",
    date: "Jan 25, 2026",
    duration: "120 Minutes",
    time: "15:00 - 17:00",
    timeline: [
      { id: 1, bookingId: "123123124", status: "Booking placed", created_at: "Jan 21, 2026 10:00" },
      { id: 2, bookingId: "123123124", status: "Payment", created_at: "Jan 21, 2026 10:15" },
      { id: 3, bookingId: "123123124", status: "Confirmed", created_at: "Jan 21, 2026 10:20" },
    ],
  },
  {
    id: "123123125",
    userId: "USR-001",
    user: USERS[0],
    courtId: "tennis-court-a",
    court: COURTS[5],
    totalPrice: 400000,
    status: "Rejected",
    date: "Feb 01, 2026",
    duration: "60 Minutes",
    time: "08:00 - 09:00",
    timeline: [
      { id: 1, bookingId: "123123125", status: "Booking placed", created_at: "Jan 22, 2026 09:00" },
      { id: 2, bookingId: "123123125", status: "Payment", created_at: "Jan 22, 2026 09:30" },
      { id: 3, bookingId: "123123125", status: "Rejected", created_at: "Jan 22, 2026 11:00" },
    ],
  },
  {
    id: "123123126",
    userId: "USR-002",
    user: USERS[1],
    courtId: "futsal-court-b",
    court: COURTS[1],
    totalPrice: 150000,
    status: "Paid",
    date: "Jan 26, 2026",
    duration: "120 Minutes",
    time: "18:00 - 20:00",
    timeline: [
      { id: 1, bookingId: "123123126", status: "Booking placed", created_at: "Jan 22, 2026 14:00" },
      { id: 2, bookingId: "123123126", status: "Payment", created_at: "Jan 22, 2026 14:10" },
      { id: 3, bookingId: "123123126", status: "Confirmed", created_at: "Jan 22, 2026 14:15" },
    ],
  },
  {
    id: "123123127",
    userId: "USR-002",
    user: USERS[1],
    courtId: "padel-court-b",
    court: COURTS[3],
    totalPrice: 350000,
    status: "Pending",
    date: "Jan 28, 2026",
    duration: "60 Minutes",
    time: "20:00 - 21:00",
    timeline: [
      { id: 1, bookingId: "123123127", status: "Booking placed", created_at: "Jan 23, 2026 11:00" },
    ],
  },
  {
    id: "123123128",
    userId: "USR-003",
    user: USERS[2],
    courtId: "basketball-court-a",
    court: COURTS[6],
    totalPrice: 500000,
    status: "Paid",
    date: "Jan 29, 2026",
    duration: "120 Minutes",
    time: "16:00 - 18:00",
    timeline: [
      { id: 1, bookingId: "123123128", status: "Booking placed", created_at: "Jan 23, 2026 08:30" },
      { id: 2, bookingId: "123123128", status: "Payment", created_at: "Jan 23, 2026 08:45" },
      { id: 3, bookingId: "123123128", status: "Confirmed", created_at: "Jan 23, 2026 09:00" },
    ],
  },
  {
    id: "123123129",
    userId: "USR-003",
    user: USERS[2],
    courtId: "tennis-court-b",
    court: COURTS[9],
    totalPrice: 200000,
    status: "Rejected",
    date: "Feb 02, 2026",
    duration: "60 Minutes",
    time: "10:00 - 11:00",
    timeline: [
      { id: 1, bookingId: "123123129", status: "Booking placed", created_at: "Jan 24, 2026 12:00" },
      { id: 2, bookingId: "123123129", status: "Rejected", created_at: "Jan 24, 2026 13:00" },
    ],
  },
];
