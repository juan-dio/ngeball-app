import { SPORTS, type Sport } from "./sports";

export type CourtType = {
  id: string;
  name: string;
  sportId: string;
  sport: Sport;
};

export const COURT_TYPES: CourtType[] = [
  {
    id: "123123123",
    name: "Synthetic Grass Futsal Court",
    sportId: "sport-futsal",
    sport: SPORTS[0],
  },
  {
    id: "123123124",
    name: "Hardcourt Basketball Court",
    sportId: "sport-basketball",
    sport: SPORTS[1],
  },
  {
    id: "123123125",
    name: "Clay Tennis Court",
    sportId: "sport-tennis",
    sport: SPORTS[2],
  },
  {
    id: "123123126",
    name: "Glass Courts Padel",
    sportId: "sport-padel",
    sport: SPORTS[3],
  },
];