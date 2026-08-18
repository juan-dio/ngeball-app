"use client";

import * as React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AppNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SelectButton } from "@/components/select-button";
import { Calendar } from "@/components/calendar";
import { SportIconWithText } from "@/components/icons/sport-icon";
import { COURTS } from "@/data/courts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const TIME_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
  "22:00 - 23:00",
];

const DURATIONS = [60, 90, 120];

function startOfDay(d: Date) {
  const res = new Date(d);
  res.setHours(0, 0, 0, 0);
  return res;
}

export default function CourtDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const court = COURTS.find((c) => c.id === resolvedParams.id);

  if (!court) {
    notFound();
  }

  const carouselImages = court.images ?? [
    court.image,
    "/images/carousel2.jpg",
    "/images/carousel3.jpg",
  ];

  const numericPrice = parseFloat(court.price.replace(/\./g, "").replace(",", "."));

  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = React.useState<Date>(today);
  const [selectedDuration, setSelectedDuration] = React.useState<number>(60);
  const [selectedTimeSlot, setSelectedTimeSlot] =
    React.useState<string>("10:00 - 11:00");
  const [isOverlayOpen, setIsOverlayOpen] = React.useState<boolean>(false);
  const [overlayImageIndex, setOverlayImageIndex] = React.useState<number>(0);
  const [overlayCarouselApi, setOverlayCarouselApi] =
    React.useState<CarouselApi | null>(null);
  const [overlayCurrentIndex, setOverlayCurrentIndex] =
    React.useState<number>(0);
  const overlayFocusRef = React.useRef<HTMLElement | null>(null);
  const overlayRootRef = React.useRef<HTMLDivElement>(null);

  // Sync overlay carousel index with carousel API
  React.useEffect(() => {
    if (!overlayCarouselApi) return;
    const onSelect = () => {
      const idx = overlayCarouselApi.selectedScrollSnap();
      setOverlayCurrentIndex(idx);
    };
    overlayCarouselApi.on("select", onSelect);
    return () => {
      overlayCarouselApi.off("select", onSelect);
    };
  }, [overlayCarouselApi]);

  // Lock body scroll on overlay open
  React.useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  // Focus management for overlay modal
  React.useEffect(() => {
    if (!isOverlayOpen) {
      overlayFocusRef.current?.focus();
      overlayFocusRef.current = null;
      return;
    }
    overlayFocusRef.current = document.activeElement as HTMLElement;
    const focusableElements = overlayRootRef.current?.querySelectorAll(
      "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
    );
    const firstFocusable = focusableElements?.[0] as HTMLElement | null;
    const lastFocusable = focusableElements?.[
      focusableElements.length - 1
    ] as HTMLElement | null;

    if (firstFocusable) firstFocusable.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOverlayOpen]);

  const formattedDateDisplay = selectedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalPrice = numericPrice * (selectedDuration / 60);

  return (
    <main className="flex min-h-screen flex-col bg-background pt-16">
      <AppNavbar />

      <div className="mx-auto flex w-full max-w-300 flex-col gap-8 px-6 pt-12 pb-22">
        {/* Top Row: Left Carousel + Right Court Info */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Carousel */}
          <div className="w-full shrink-0 lg:w-120">
            <Carousel className="relative w-full overflow-hidden rounded-[16px]">
              <CarouselContent>
                {carouselImages.map((src, index) => (
                  <CarouselItem
                    key={src}
                    className="lg:cursor-pointer"
                    onClick={() => {
                      if (!window.matchMedia("(min-width: 1024px)").matches)
                        return;
                      setOverlayImageIndex(index);
                      setOverlayCurrentIndex(index);
                      setIsOverlayOpen(true);
                    }}
                  >
                    <div className="relative aspect-3/2 w-full">
                      <Image
                        src={src}
                        alt={`Court image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 480px"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-3 size-7 rounded-full border border-white bg-[#6A7282]/80 text-white cursor-pointer hover:bg-[#6A7282] hover:text-white" />
              <CarouselNext className="absolute right-3 size-7 rounded-full border border-white bg-[#6A7282]/80 text-white cursor-pointer hover:bg-[#6A7282] hover:text-white" />
            </Carousel>
          </div>

          {/* Court Info */}
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-h1 font-medium text-text-primary leading-tight">
                {court.name}
              </h1>
              <div className="flex items-center gap-4">
                <SportIconWithText sport={court.sport} />
                <p className="text-h3 font-normal text-text-secondary">
                  {court.type}
                </p>
              </div>
            </div>
            <p className="text-h2 text-text-secondary leading-tight">
              <span>Rp </span>
              <span className="text-primary">{court.price}</span>
              <span className="text-h3"> /hour</span>
            </p>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-h3 text-text-secondary leading-tight">
                Description
              </h3>
              <p className="text-body text-text-secondary leading-tight">
                {court.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row: Calendar + Schedule/Duration + Summary Card */}
        <div className="grid grid-cols-1 justify-center gap-6 lg:grid-cols-[max-content_max-content_1fr]">
          {/* Left: Interactive Calendar */}
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          {/* Middle: Duration and Schedule */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="mb-3 text-h2 text-text-primary leading-tight">
                Duration
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {DURATIONS.map((duration) => {
                  return (
                    <SelectButton
                      key={duration}
                      text={`${duration} Minutes`}
                      status={
                        selectedDuration === duration ? "active" : "default"
                      }
                      onClick={() => setSelectedDuration(duration)}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-h2 text-text-primary leading-tight">
                Schedule
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  return (
                    <SelectButton
                      key={slot}
                      text={slot}
                      status={
                        slot === "08:00 - 09:00" || slot === "09:00 - 10:00"
                          ? "disabled"
                          : slot === selectedTimeSlot
                            ? "active"
                            : "default"
                      }
                      onClick={() => setSelectedTimeSlot(slot)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Summary Card */}
          <div className="flex flex-col rounded-[16px] border border-border bg-white p-6 gap-6 h-fit">
            <h2 className="text-h2 text-text-primary text-center leading-tight">
              Summary
            </h2>

            <div className="flex flex-col gap-3">
              <h3 className="text-h3 text-text-primary">{court.name}</h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-text-secondary">
                  <CalendarIcon className="size-5 text-text-secondary" />
                  <span className="text-body">{formattedDateDisplay}</span>
                </div>
                <div className="flex items-center gap-1 text-text-secondary">
                  <Clock className="size-5 text-text-secondary" />
                  <span className="text-body">
                    {selectedDuration} Minutes | {selectedTimeSlot}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-small text-text-secondary">
                Total Price
              </span>
              <span className="text-h2 text-primary leading-tight">
                <span className="text-text-secondary">Rp </span>
                {totalPrice.toLocaleString("id-ID")},00
              </span>
              <span className="text-small text-text-secondary">
                Tax included
              </span>
            </div>

            <Button className="h-auto w-full rounded-[12px] bg-primary py-3 text-body font-medium text-white cursor-pointer hover:bg-primary/90">
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Image Overlay */}
      {isOverlayOpen && (
        <div
          ref={overlayRootRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setIsOverlayOpen(false)}
            className="absolute top-6 right-6 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#6A7282]/80 text-white hover:bg-[#6A7282] cursor-pointer transition"
            aria-label="Close modal"
          >
            <X className="size-6" />
          </button>
          <div className="flex w-full max-w-240 items-center justify-center gap-4">
            {/* Left Nav Button */}
            <button
              type="button"
              aria-label="Previous image"
              disabled={overlayCurrentIndex === 0}
              className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#6A7282]/80 text-white hover:bg-[#6A7282] cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => {
                overlayCarouselApi?.scrollPrev();
              }}
            >
              <ChevronLeft className="size-8" />
            </button>
            {/* Carousel */}
            <Carousel
              opts={{ startIndex: overlayImageIndex }}
              setApi={setOverlayCarouselApi}
              className="min-w-0 flex-1"
            >
              <CarouselContent>
                {carouselImages.map((src, index) => (
                  <CarouselItem key={src} className="basis-full">
                    <div className="relative aspect-3/2 w-full overflow-hidden rounded-[16px] border border-border bg-white">
                      <Image
                        src={src}
                        alt={`Court image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1199px) 90vw, 812px"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Right Nav Button */}
            <button
              type="button"
              aria-label="Next image"
              disabled={overlayCurrentIndex >= carouselImages.length - 1}
              className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#6A7282]/80 text-white hover:bg-[#6A7282] cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => {
                overlayCarouselApi?.scrollNext();
              }}
            >
              <ChevronRight className="size-8" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
