"use client";

import { useState } from "react";
import Link from "next/link";
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
import { COURTS, DEFAULT_IMAGES } from "@/data/courts";

const SPORTS = Array.from(new Set(COURTS.map((c) => c.sport)));
const COURT_TYPES = Array.from(new Set(COURTS.map((c) => c.type)));

export default function NewCourtPage() {
  const [images, setImages] = useState<string[]>([...DEFAULT_IMAGES]);

  const removeImage = (image: string) => {
    setImages((prev) => prev.filter((img) => img !== image));
  };

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          <h1 className="text-h2 text-text-primary">New Court</h1>

          {/* Name & Price */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                className="text-body text-text-primary"
                htmlFor="court-name"
              >
                Name
              </label>
              <Input
                id="court-name"
                className="h-10 w-full rounded-[6px] border-border bg-white text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="eg, Futsal Court X"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-body text-text-primary"
                htmlFor="court-price"
              >
                Price per hour
              </label>
              <Input
                id="court-price"
                className="h-10 w-full rounded-[6px] border-border bg-white text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                placeholder="eg, 100000"
              />
            </div>
          </div>

          {/* Sport & Court type */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-body text-text-primary">Sport</label>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-body font-normal text-text-primary truncate">
                    Select sport
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  {SPORTS.map((sport) => (
                    <DropdownMenuItem
                      key={sport}
                      className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
                    >
                      {sport}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-body text-text-primary">Court type</label>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left">
                  <span className="text-body font-normal text-text-primary truncate">
                    Select type
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-text-secondary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
                  {COURT_TYPES.map((type) => (
                    <DropdownMenuItem
                      key={type}
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
              className="text-body text-text-primary"
              htmlFor="court-description"
            >
              Description
            </label>
            <textarea
              id="court-description"
              className="h-[144px] w-full resize-none rounded-[6px] border border-border bg-white p-3 text-body text-text-primary placeholder:text-text-secondary outline-none transition-colors focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              placeholder="eg, Court description"
            />
          </div>

          {/* Picture gallery */}
          <div className="flex flex-col gap-2">
            <label className="text-body text-text-primary">Picture</label>
            <div className="w-full flex gap-4 overflow-x-auto">
              <label className="flex size-60 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[6px] border border-dashed border-border bg-light">
                <ImagePlus className="size-6 text-text-secondary" />
                <span className="text-[12px] font-light text-text-secondary text-center">
                  Upload Court Picture
                </span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
              {images.map((image) => (
                <div
                  key={image}
                  className="relative h-60 aspect-3/2 shrink-0 overflow-hidden rounded-[6px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
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
              nativeButton={false}
              variant="outline"
              render={<Link href="/admin/courts" />}
              className="h-14 px-8 cursor-pointer rounded-[12px] border-border bg-white text-primary font-semibold hover:bg-light"
            >
              Cancel
            </Button>
            <Button className="h-14 px-8 cursor-pointer rounded-[12px] bg-primary text-white font-semibold hover:bg-primary/90">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
