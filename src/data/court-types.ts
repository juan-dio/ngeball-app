import { SportKey } from "./sports";

export type CourtType = {
  id: string;
  name: string;
  sport: SportKey;
};

export const COURT_TYPES: CourtType[] = [
  {
    id: "123123123",
    name: "Synthetic Grass Futsal Court",
    sport: "Futsal",
  },
  {
    id: "123123124",
    name: "Hardcourt Basketball Court",
    sport: "Basketball",
  },
  {
    id: "123123125",
    name: "Clay Tennis Court",
    sport: "Tennis",
  },
  {
    id: "123123126",
    name: "Glass Courts Padel",
    sport: "Padel",
  },
];