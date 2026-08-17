import type { ComponentType } from "react";
import { FutsalIcon } from "@/components/icons/futsal-icon";
import { BasketballIcon } from "@/components/icons/basketball-icon";
import { TennisIcon } from "@/components/icons/tennis-icon";
import { PadelIcon } from "@/components/icons/padel-icon";

export type SportKey = "Futsal" | "Basketball" | "Tennis" | "Padel";

export type SportMeta = {
  icon: ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
  border: string;
};

export const SPORT_META: Record<SportKey, SportMeta> = {
  Futsal: {
    icon: FutsalIcon,
    color: "text-green",
    badgeBg: "bg-green/10",
    border: "border-green",
  },
  Basketball: {
    icon: BasketballIcon,
    color: "text-orange",
    badgeBg: "bg-orange/10",
    border: "border-orange",
  },
  Tennis: {
    icon: TennisIcon,
    color: "text-red",
    badgeBg: "bg-red/10",
    border: "border-red",
  },
  Padel: {
    icon: PadelIcon,
    color: "text-blue",
    badgeBg: "bg-blue/10",
    border: "border-blue",
  },
};

export function SportIcon({ sport }: { sport: SportKey }) {
  const meta = SPORT_META[sport];
  const Icon = meta.icon;

  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-full ${meta.badgeBg}`}
    >
      <Icon className={`h-5 w-5 ${meta.color}`} />
    </span>
  );
}

export function SportIconWithText({ sport }: { sport: SportKey }) {
  const meta = SPORT_META[sport];
  const Icon = meta.icon;

  return (
    <span
      className={`px-4 py-2 flex items-center justify-center rounded-full gap-2 ${meta.badgeBg} border-2 ${meta.border} ${meta.color}`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-small font-semibold">{sport}</span>
    </span>
  );
}
