import Image from "next/image";
import type { ComponentType } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type Court = {
  name: string;
  image: string;
  type: string;
  price: string;
  sport: SportKey;
};

export type SportKey = "Futsal" | "Basketball" | "Tennis" | "Padel";

export type SportMeta = {
  icon: ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
};

type CourtCardProps = {
  court: Court;
  sport: SportMeta;
  priority?: boolean;
};

export function CourtCard({ court, sport, priority }: CourtCardProps) {
  const Icon = sport.icon;

  return (
    <Card className="w-full gap-0 overflow-hidden rounded-[16px] border border-border bg-white py-0 md:w-90">
      <div className="relative h-60 w-full">
        <Image
          src={court.image}
          alt={court.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 360px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-h2 text-text-primary">{court.name}</h3>
          <span
            className={`flex size-9 shrink-0 items-center justify-center rounded-full ${sport.badgeBg}`}
          >
            <Icon className={`h-5 w-5 ${sport.color}`} />
          </span>
        </div>

        <p className="text-body text-text-secondary">{court.type}</p>

        <p className="text-body text-text-secondary">
          <span>Rp </span>
          <span className="text-h3 text-primary">{court.price}</span>
          <span> /hour</span>
        </p>
      </div>
      <Separator className="bg-border" />

      <div className="p-4">
        <Button className="h-10 w-full rounded-[8px] bg-primary text-white cursor-pointer hover:bg-primary/90">
          Select
        </Button>
      </div>
    </Card>
  );
}
