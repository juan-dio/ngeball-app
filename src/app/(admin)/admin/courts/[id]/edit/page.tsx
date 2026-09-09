"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { ChevronDown, ImagePlus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COURTS } from "@/data/courts";
import { type SportKey } from "@/components/icons/sport-icon";

const SPORTS = Array.from(new Set(COURTS.map((c) => c.sport)));
const COURT_TYPES = Array.from(new Set(COURTS.map((c) => c.type)));

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditCourtPage({ params }: PageProps) {
  const { id } = use(params);
  const court = COURTS.find((c) => c.id === id);

  if (!court) {
    notFound();
  }

  const initialImages =
    court.images && court.images.length > 0 ? court.images : [court.image];
  const initialPrice = court.price.replace(/[^0-9]/g, "");

  const [name, setName] = useState(court.name);
  const [price, setPrice] = useState(initialPrice);
  const [selectedSport, setSelectedSport] = useState<SportKey>(court.sport);
  const [selectedType, setSelectedType] = useState(court.type);
  const [description, setDescription] = useState(court.description);
  const [images, setImages] = useState<string[]>(initialImages);

  const handleReset = () => {
    setName(court.name);
    setPrice(initialPrice);
    setSelectedSport(court.sport);
    setSelectedType(court.type);
    setDescription(court.description);
    setImages(initialImages);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          <h1 className="text-h2 text-text-primary">Edit Court</h1>

          {/* Name & Price */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                className="text-body text-text-primary leading-tight"
                htmlFor="court-name"
              >
                Name
              </label>
              <Input
                id="court-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="eg. Futsal Court X"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-body text-text-primary leading-tight"
                htmlFor="court-price"
              >
                Price /hour
              </label>
              <Input
                id="court-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-10 w-full rounded-[6px] border-border bg-white text-body md:text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="eg. 100000"
              />
            </div>
          </div>

          {/* Sport & Court type */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-body text-text-primary leading-tight">
                Sport
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-body font-normal text-text-primary truncate">
                    {selectedSport}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  {SPORTS.map((sport) => (
                    <DropdownMenuItem
                      key={sport}
                      onClick={() => setSelectedSport(sport)}
                      className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                    >
                      {sport}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-body text-text-primary leading-tight">
                Court type
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-body font-normal text-text-primary truncate">
                    {selectedType}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  {COURT_TYPES.map((type) => (
                    <DropdownMenuItem
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                    >
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label
              className="text-body text-text-primary leading-tight"
              htmlFor="court-description"
            >
              Description
            </label>
            <textarea
              id="court-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-36 w-full resize-none rounded-[6px] border border-border bg-white p-3 text-body text-text-primary placeholder:text-text-secondary outline-none transition-colors focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              placeholder="eg. Court description"
            />
          </div>

          {/* Picture gallery */}
          <div className="flex flex-col gap-2">
            <label className="text-body text-text-primary leading-tight">
              Picture
            </label>
            <div className="w-full flex gap-4 overflow-x-auto pb-2">
              <label className="flex size-60 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] border border-dashed border-border bg-light">
                <ImagePlus className="size-6 text-text-secondary" />
                <span className="text-[12px] font-light text-text-secondary text-center">
                  Upload Court Picture
                </span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
              {images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative h-60 aspect-3/2 shrink-0 overflow-hidden rounded-[8px] border border-border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`Court image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    aria-label="Remove image"
                    className="absolute right-2 top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-14 px-8 cursor-pointer rounded-[12px] border-border bg-white text-primary font-semibold hover:bg-light"
            >
              Reset
            </Button>
            <Button
              type="button"
              className="h-14 px-8 cursor-pointer rounded-[12px] bg-primary text-white font-semibold hover:bg-primary/90"
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
