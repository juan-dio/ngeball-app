import { type SportKey } from "@/components/icons/sport-icon";

export type Court = {
  id: string;
  name: string;
  image: string;
  images?: string[];
  type: string;
  price: string;
  sport: SportKey;
  description: string;
};

const DEFAULT_IMAGES = [
  "/images/futsal1.jpg",
  "/images/carousel2.jpg",
  "/images/carousel3.jpg",
];

export const COURTS: Court[] = [
  {
    id: "futsal-court-a",
    name: "Futsal Court A",
    image: "/images/futsal1.jpg",
    images: DEFAULT_IMAGES,
    type: "Synthetic Grass Futsal Court",
    price: "200.000,00",
    sport: "Futsal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "futsal-court-b",
    name: "Futsal Court B",
    image: "/images/futsal3.jpg",
    images: DEFAULT_IMAGES,
    type: "Interlock Futsal Court",
    price: "250.000,00",
    sport: "Futsal",
    description:
      "Interlock flooring futsal court providing excellent grip and high-speed gameplay suitable for competitive matches and training sessions.",
  },
  {
    id: "basketball-court-b",
    name: "Basketball Court B",
    image: "/images/basket1.jpg",
    images: DEFAULT_IMAGES,
    type: "Indoor Basketball Court",
    price: "220.000,00",
    sport: "Basketball",
    description:
      "Professional indoor basketball court equipped with high-quality flooring, regulation hoops, and optimal lighting for evening games.",
  },
  {
    id: "padel-court-b",
    name: "Padel Court B",
    image: "/images/padel1.jpg",
    images: DEFAULT_IMAGES,
    type: "Padel Court",
    price: "300.000,00",
    sport: "Padel",
    description:
      "Modern glass-walled padel court designed for recreational and tournament play with superior artificial turf.",
  },
  {
    id: "futsal-court-c",
    name: "Futsal Court C",
    image: "/images/futsal2.jpg",
    images: DEFAULT_IMAGES,
    type: "Interlock Futsal Court",
    price: "270.000,00",
    sport: "Futsal",
    description:
      "Premium interlock futsal court with excellent shock absorption and ventilation.",
  },
  {
    id: "tennis-court-a",
    name: "Tennis Court A",
    image: "/images/indoor-tennis1.jpg",
    images: DEFAULT_IMAGES,
    type: "Indoor Tennis Court",
    price: "300.000,00",
    sport: "Tennis",
    description:
      "Indoor tennis court shielded from weather elements, featuring championship-grade hard surface.",
  },
  {
    id: "basketball-court-a",
    name: "Basketball Court A",
    image: "/images/indoor-basket1.jpg",
    images: DEFAULT_IMAGES,
    type: "Indoor Basketball Court",
    price: "300.000,00",
    sport: "Basketball",
    description:
      "Top-tier indoor basketball court with electronic scoreboard and comfortable spectator seating.",
  },
  {
    id: "padel-court-a",
    name: "Padel Court A",
    image: "/images/padel2.jpg",
    images: DEFAULT_IMAGES,
    type: "Padel Court",
    price: "330.000,00",
    sport: "Padel",
    description:
      "Flagship padel court offering premium glass panels and superb LED lighting.",
  },
  {
    id: "basketball-court-c",
    name: "Basketball Court C",
    image: "/images/basket2.jpg",
    images: DEFAULT_IMAGES,
    type: "Indoor Basketball Court",
    price: "320.000,00",
    sport: "Basketball",
    description:
      "Spacious indoor basketball court ideal for leagues, team practices, and casual games.",
  },
  {
    id: "tennis-court-b",
    name: "Tennis Court B",
    image: "/images/tennis1.jpg",
    images: DEFAULT_IMAGES,
    type: "Indoor Tennis Court",
    price: "400.000,00",
    sport: "Tennis",
    description:
      "Exclusive indoor tennis court with immaculate court maintenance and professional amenities.",
  },
];
