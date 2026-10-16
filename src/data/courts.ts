// SportKey removed; sport is dynamic string
import { SPORTS, type Sport } from "@/data/sports";
import { COURT_TYPES, type CourtType } from "@/data/court-types";

export type Court = {
  id: string;
  name: string;
  image: string;
  images?: string[];
  courtTypeId: string;
  courtType: CourtType;
  sportId: string;
  sport: Sport;
  price: number;
  description: string;
};

export const DEFAULT_IMAGES = [
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
    courtTypeId: "123123123",
    courtType: COURT_TYPES[0],
    sportId: "sport-futsal",
    sport: SPORTS[0],
    price: 200000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "futsal-court-b",
    name: "Futsal Court B",
    image: "/images/futsal3.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123123",
    courtType: COURT_TYPES[0],
    sportId: "sport-futsal",
    sport: SPORTS[0],
    price: 250000,
    description:
      "Interlock flooring futsal court providing excellent grip and high-speed gameplay suitable for competitive matches and training sessions.",
  },
  {
    id: "basketball-court-b",
    name: "Basketball Court B",
    image: "/images/basket1.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123124",
    courtType: COURT_TYPES[1],
    sportId: "sport-basketball",
    sport: SPORTS[1],
    price: 220000,
    description:
      "Professional indoor basketball court equipped with high-quality flooring, regulation hoops, and optimal lighting for evening games.",
  },
  {
    id: "padel-court-b",
    name: "Padel Court B",
    image: "/images/padel1.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123126",
    courtType: COURT_TYPES[3],
    sportId: "sport-padel",
    sport: SPORTS[3],
    price: 300000,
    description:
      "Modern glass-walled padel court designed for recreational and tournament play with superior artificial turf.",
  },
  {
    id: "futsal-court-c",
    name: "Futsal Court C",
    image: "/images/futsal2.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123123",
    courtType: COURT_TYPES[0],
    sportId: "sport-futsal",
    sport: SPORTS[0],
    price: 270000,
    description:
      "Premium interlock futsal court with excellent shock absorption and ventilation.",
  },
  {
    id: "tennis-court-a",
    name: "Tennis Court A",
    image: "/images/indoor-tennis1.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123125",
    courtType: COURT_TYPES[2],
    sportId: "sport-tennis",
    sport: SPORTS[2],
    price: 300000,
    description:
      "Indoor tennis court shielded from weather elements, featuring championship-grade hard surface.",
  },
  {
    id: "basketball-court-a",
    name: "Basketball Court A",
    image: "/images/indoor-basket1.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123124",
    courtType: COURT_TYPES[1],
    sportId: "sport-basketball",
    sport: SPORTS[1],
    price: 300000,
    description:
      "Top-tier indoor basketball court with electronic scoreboard and comfortable spectator seating.",
  },
  {
    id: "padel-court-a",
    name: "Padel Court A",
    image: "/images/padel2.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123126",
    courtType: COURT_TYPES[3],
    sportId: "sport-padel",
    sport: SPORTS[3],
    price: 330000,
    description:
      "Flagship padel court offering premium glass panels and superb LED lighting.",
  },
  {
    id: "basketball-court-c",
    name: "Basketball Court C",
    image: "/images/basket2.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123124",
    courtType: COURT_TYPES[1],
    sportId: "sport-basketball",
    sport: SPORTS[1],
    price: 320000,
    description:
      "Spacious indoor basketball court ideal for leagues, team practices, and casual games.",
  },
  {
    id: "tennis-court-b",
    name: "Tennis Court B",
    image: "/images/tennis1.jpg",
    images: DEFAULT_IMAGES,
    courtTypeId: "123123125",
    courtType: COURT_TYPES[2],
    sportId: "sport-tennis",
    sport: SPORTS[2],
    price: 400000,
    description:
      "Exclusive indoor tennis court with immaculate court maintenance and professional amenities.",
  },
];
