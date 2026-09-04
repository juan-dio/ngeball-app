"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COURTS } from "@/data/courts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourtDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const court = COURTS.find((c) => c.id === id);

  if (!court) {
    notFound();
  }

  const galleryImages =
    court.images && court.images.length > 0 ? court.images : [court.image];

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          {/* Header Card & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-h2 text-text-primary">Court Details</h1>
            <div className="flex items-center gap-2">
              <Button
                nativeButton={false}
                render={<Link href={`/admin/courts/${court.id}/edit`} />}
                className="h-10 px-4 cursor-pointer rounded-[12px] bg-warning text-white! text-small hover:bg-warning/90 gap-2"
              >
                <SquarePen />
                Edit
              </Button>
              <Button className="h-10 px-4 cursor-pointer rounded-[12px] bg-red text-white! text-small hover:bg-red/90 gap-2">
                <Trash2 />
                Delete
              </Button>
            </div>
          </div>

          {/* Picture Gallery */}
          <div className="flex flex-col gap-2">
            <label className="text-body text-text-primary leading-tight">
              Picture
            </label>
            <div className="w-full flex gap-4 overflow-x-auto pb-2">
              {galleryImages.map((imgUrl, index) => (
                <div
                  key={`${imgUrl}-${index}`}
                  className="h-60 aspect-3/2 shrink-0 overflow-hidden rounded-[8px] border border-border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`${court.name} image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Name & Price / hour */}
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
                readOnly
                value={court.name}
                className="h-10 w-full rounded-[6px] border-border bg-white px-3 text-body text-text-primary focus-visible:ring-0"
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
                readOnly
                value={court.price}
                className="h-10 w-full rounded-[6px] border-border bg-white px-3 text-body text-text-primary focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Sport & Court type */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                className="text-body text-text-primary leading-tight"
                htmlFor="court-sport"
              >
                Sport
              </label>
              <div
                id="court-sport"
                className="flex h-10 w-full items-center rounded-[6px] border border-border bg-white px-4 text-body text-text-primary"
              >
                {court.sport}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-body text-text-primary leading-tight"
                htmlFor="court-type"
              >
                Court type
              </label>
              <div
                id="court-type"
                className="flex h-10 w-full items-center rounded-[6px] border border-border bg-white px-4 text-body text-text-primary"
              >
                {court.type}
              </div>
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
            <div
              id="court-description"
              className="h-36 w-full rounded-[6px] border border-border bg-white p-3 text-body text-text-primary overflow-y-auto"
            >
              {court.description}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
