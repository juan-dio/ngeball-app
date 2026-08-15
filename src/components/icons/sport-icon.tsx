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
};

export const SPORT_META: Record<SportKey, SportMeta> = {
  Futsal: { icon: FutsalIcon, color: "text-green", badgeBg: "bg-green/10" },
  Basketball: {
    icon: BasketballIcon,
    color: "text-orange",
    badgeBg: "bg-orange/10",
  },
  Tennis: { icon: TennisIcon, color: "text-red", badgeBg: "bg-red/10" },
  Padel: { icon: PadelIcon, color: "text-blue", badgeBg: "bg-blue/10" },
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
