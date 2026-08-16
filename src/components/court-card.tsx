import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SportIcon, type SportKey } from "@/components/icons/sport-icon";

export type Court = {
  name: string;
  image: string;
  type: string;
  price: string;
  sport: SportKey;
};

type CourtCardProps = {
  court: Court;
  priority?: boolean;
};

export function CourtCard({ court, priority }: CourtCardProps) {
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
          <SportIcon sport={court.sport} />
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
