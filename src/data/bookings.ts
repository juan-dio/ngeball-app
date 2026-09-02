import { type SportKey } from "@/components/icons/sport-icon";

export type TimelineItem = {
  label: string;
  date: string;
};

export type Booking = {
  id: string;
  userId: string;
  userName: string;
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
    id: "#123123123",
    userId: "USR-001",
    userName: "Marcus Rashford",
    sport: "Futsal",
    courtName: "Futsal Court A",
    price: "300.000,00",
    status: "Pending",
    date: "Jan 24, 2026",
    duration: "60 Minutes",
    time: "19:00 - 20:00",
    timeline: [
      { label: "Booking placed", date: "Jan 20, 2026 | 16:30" },
      { label: "Payment", date: "Jan 20, 2026 | 17:00" },
    ],
  },
  {
    id: "#123123124",
    userId: "USR-001",
    userName: "Marcus Rashford",
    sport: "Basketball",
    courtName: "Basketball Court B",
    price: "250.000,00",
    status: "Paid",
    date: "Jan 25, 2026",
    duration: "120 Minutes",
    time: "15:00 - 17:00",
    timeline: [
      { label: "Booking placed", date: "Jan 21, 2026 | 10:00" },
      { label: "Payment", date: "Jan 21, 2026 | 10:15" },
      { label: "Confirmed", date: "Jan 21, 2026 | 10:20" },
    ],
  },
  {
    id: "#123123125",
    userId: "USR-001",
    userName: "Marcus Rashford",
    sport: "Tennis",
    courtName: "Tennis Court 1",
    price: "400.000,00",
    status: "Rejected",
    date: "Feb 01, 2026",
    duration: "60 Minutes",
    time: "08:00 - 09:00",
    timeline: [
      { label: "Booking placed", date: "Jan 22, 2026 | 09:00" },
      { label: "Payment", date: "Jan 22, 2026 | 09:30" },
      { label: "Rejected", date: "Jan 22, 2026 | 11:00" },
    ],
  },
  {
    id: "#123123126",
    userId: "USR-002",
    userName: "Bruno Fernandes",
    sport: "Futsal",
    courtName: "Futsal Court B",
    price: "150.000,00",
    status: "Paid",
    date: "Jan 26, 2026",
    duration: "120 Minutes",
    time: "18:00 - 20:00",
    timeline: [
      { label: "Booking placed", date: "Jan 22, 2026 | 14:00" },
      { label: "Payment", date: "Jan 22, 2026 | 14:10" },
      { label: "Confirmed", date: "Jan 22, 2026 | 14:15" },
    ],
  },
  {
    id: "#123123127",
    userId: "USR-002",
    userName: "Bruno Fernandes",
    sport: "Padel",
    courtName: "Padel Arena 2",
    price: "350.000,00",
    status: "Pending",
    date: "Jan 28, 2026",
    duration: "60 Minutes",
    time: "20:00 - 21:00",
    timeline: [{ label: "Booking placed", date: "Jan 23, 2026 | 11:00" }],
  },
  {
    id: "#123123128",
    userId: "USR-003",
    userName: "Kobbie Mainoo",
    sport: "Basketball",
    courtName: "Basketball Court A",
    price: "500.000,00",
    status: "Paid",
    date: "Jan 29, 2026",
    duration: "120 Minutes",
    time: "16:00 - 18:00",
    timeline: [
      { label: "Booking placed", date: "Jan 23, 2026 | 08:30" },
      { label: "Payment", date: "Jan 23, 2026 | 08:45" },
      { label: "Confirmed", date: "Jan 23, 2026 | 09:00" },
    ],
  },
  {
    id: "#123123129",
    userId: "USR-003",
    userName: "Kobbie Mainoo",
    sport: "Tennis",
    courtName: "Tennis Court 2",
    price: "200.000,00",
    status: "Rejected",
    date: "Feb 02, 2026",
    duration: "60 Minutes",
    time: "10:00 - 11:00",
    timeline: [
      { label: "Booking placed", date: "Jan 24, 2026 | 12:00" },
      { label: "Rejected", date: "Jan 24, 2026 | 13:00" },
    ],
  },
];
