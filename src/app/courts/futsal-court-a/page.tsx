"use client";

import * as React from "react";
import Image from "next/image";
import { AppNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SportIcon } from "@/components/icons/sport-icon";
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

const CAROUSEL_IMAGES = [
  "/images/futsal1.jpg",
  "/images/carousel2.jpg",
  "/images/carousel3.jpg",
];

const TIME_SLOTS = [
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
  "22:00 - 23:00",
];

const DURATIONS = [60, 90, 120];
const BASE_HOURLY_PRICE = 300000;

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function startOfDay(d: Date) {
  const res = new Date(d);
  res.setHours(0, 0, 0, 0);
  return res;
}

export default function CourtDetails() {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = React.useState<Date>(today);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    const d = new Date(today);
    d.setDate(1);
    return d;
  });
  const [selectedDuration, setSelectedDuration] = React.useState<number>(60);
  const [selectedTimeSlot, setSelectedTimeSlot] =
    React.useState<string>("10:00 - 11:00");
  const [isOverlayOpen, setIsOverlayOpen] = React.useState<boolean>(false);
  const [overlayImageIndex, setOverlayImageIndex] = React.useState<number>(0);
  const [overlayCarouselApi, setOverlayCarouselApi] =
    React.useState<CarouselApi | null>(null);
  const [overlayCurrentIndex, setOverlayCurrentIndex] =
    React.useState<number>(0);

  // Sync overlay carousel index with carousel API
  React.useEffect(() => {
    if (!overlayCarouselApi) return;
    const onSelect = () => {
      const idx = overlayCarouselApi.selectedScrollSnap();
      setOverlayCurrentIndex(idx);
    };
    overlayCarouselApi.on("select", onSelect);
    // Set initial index
    setOverlayCurrentIndex(overlayCarouselApi.selectedScrollSnap());
    return () => {
      overlayCarouselApi.off("select", onSelect);
    };
  }, [overlayCarouselApi]);

  // Month navigation boundaries: current month of today up to today + 1 month
  const minMonth = React.useMemo(() => {
    const d = new Date(today);
    d.setDate(1);
    return d;
  }, [today]);

  const maxMonth = React.useMemo(() => {
    const d = new Date(today);
    d.setMonth(d.getMonth() + 1, 1);
    return d;
  }, [today]);

  const canPrevMonth =
    currentMonth.getFullYear() > minMonth.getFullYear() ||
    (currentMonth.getFullYear() === minMonth.getFullYear() &&
      currentMonth.getMonth() > minMonth.getMonth());

  const canNextMonth =
    currentMonth.getFullYear() < maxMonth.getFullYear() ||
    (currentMonth.getFullYear() === maxMonth.getFullYear() &&
      currentMonth.getMonth() < maxMonth.getMonth());

  const handlePrevMonth = () => {
    if (!canPrevMonth) return;
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() - 1);
      return next;
    });
  };

  const handleNextMonth = () => {
    if (!canNextMonth) return;
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  };

  // Calendar dates computation
  const calendarDays = React.useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { date: Date; isCurrentMonth: boolean; isDisabled: boolean }[] =
      [];

    // Max selectable date: today + 30 days
    const maxSelectableDate = new Date(today);
    maxSelectableDate.setDate(maxSelectableDate.getDate() + 30);

    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isDisabled: true,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const isPast = d < today;
      const isTooFar = d > maxSelectableDate;
      days.push({
        date: d,
        isCurrentMonth: true,
        isDisabled: isPast || isTooFar,
      });
    }

    // Next month padding to fill 35 or 42 grid slots
    const totalSlots = Math.ceil(days.length / 7) * 7;
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        isCurrentMonth: false,
        isDisabled: true,
      });
    }

    return days;
  }, [currentMonth, today]);

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

  const monthYearDisplay = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const formattedDateDisplay = selectedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalPrice = BASE_HOURLY_PRICE * (selectedDuration / 60);

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
                {CAROUSEL_IMAGES.map((src, index) => (
                  <CarouselItem
                    key={src}
                    className="cursor-pointer"
                    onClick={() => {
                      setOverlayImageIndex(index);
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
          <div className="flex flex-1 flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <h1 className="text-h1 text-text-primary">Futsal Court A</h1>
                <SportIcon sport="Futsal" />
              </div>
              <p className="text-body text-text-secondary">
                Synthetic Grass Futsal Court
              </p>
              <p className="text-h2 text-primary">Rp 300.000,00 /hour</p>
              <div className="flex flex-col gap-2 pt-2">
                <h3 className="text-h3 text-text-secondary">Description</h3>
                <p className="text-body text-text-secondary">
                  Standard synthetic grass futsal field equipped with complete
                  facilities. High-grip turf surface suitable for regular
                  practice and competitive tournament matches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Calendar + Schedule/Duration + Summary Card */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Interactive Calendar */}
          <div className="rounded-[16px] border border-border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-h2 text-text-primary">{monthYearDisplay}</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={!canPrevMonth}
                  aria-label="Previous month"
                  className="flex size-8 items-center justify-center rounded-full border border-border text-text-secondary transition hover:bg-light hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  disabled={!canNextMonth}
                  aria-label="Next month"
                  className="flex size-8 items-center justify-center rounded-full border border-border text-text-secondary transition hover:bg-light hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Days header */}
            <div className="mb-2 grid grid-cols-7 text-center">
              {DAYS_OF_WEEK.map((d) => (
                <span
                  key={d}
                  className="py-1 text-small font-medium text-text-secondary"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-y-2 text-center">
              {calendarDays.map((item, idx) => {
                const isSelected =
                  !item.isDisabled && isSameDay(item.date, selectedDate);

                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center p-1"
                  >
                    <button
                      type="button"
                      disabled={item.isDisabled}
                      onClick={() => setSelectedDate(item.date)}
                      className={`flex size-9 items-center justify-center rounded-full text-small transition ${
                        item.isDisabled
                          ? "cursor-not-allowed text-muted opacity-50"
                          : isSelected
                            ? "border-2 border-primary bg-text-primary font-semibold text-white"
                            : "text-text-primary hover:bg-light"
                      }`}
                    >
                      {item.date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Middle: Duration and Schedule */}
          <div className="flex flex-col gap-6 rounded-[16px] border border-border bg-white p-6">
            <div>
              <h2 className="mb-3 text-h2 text-text-primary">Duration</h2>
              <div className="flex flex-wrap gap-3">
                {DURATIONS.map((duration) => {
                  const isActive = selectedDuration === duration;
                  return (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => setSelectedDuration(duration)}
                      className={`rounded-full border px-4 py-2 text-small font-medium transition ${
                        isActive
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-white text-text-primary hover:bg-light"
                      }`}
                    >
                      {duration} Minutes
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-h2 text-text-primary">Schedule</h2>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isActive = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`rounded-[8px] border px-2 py-2 text-center text-small font-medium transition ${
                        isActive
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-white text-text-primary hover:bg-light"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Summary Card */}
          <div className="flex flex-col justify-between rounded-[16px] border border-border bg-white p-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-h2 text-text-primary">Summary</h2>
              <h3 className="text-h3 font-medium text-text-primary">
                Futsal Court A
              </h3>

              <div className="flex flex-col gap-3 border-y border-border py-4">
                <div className="flex items-center gap-3 text-text-secondary">
                  <CalendarIcon className="size-5 text-text-secondary" />
                  <span className="text-body text-text-primary">
                    {formattedDateDisplay}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Clock className="size-5 text-text-secondary" />
                  <span className="text-body text-text-primary">
                    {selectedDuration} Minutes | {selectedTimeSlot}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-small text-text-secondary">
                  Total Price
                </span>
                <span className="text-h2 font-semibold text-primary">
                  Rp {totalPrice.toLocaleString("id-ID")},00
                </span>
                <span className="text-small text-text-secondary">
                  Tax included
                </span>
              </div>
            </div>

            <Button className="mt-6 h-auto w-full rounded-[12px] bg-primary py-3 text-body font-medium text-white hover:bg-primary/90">
              Book
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Image Overlay */}
      {isOverlayOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setIsOverlayOpen(false)}
            className="absolute top-6 right-6 flex size-10 shrink-0 items-center justify-center rounded-full border-[1.71429px] border-white bg-[#6A7282] text-white shadow-[inset_0_0_428.571px_rgba(0,0,0,0.4)] hover:bg-[#5A626C] cursor-pointer transition"
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
              className="flex size-12 shrink-0 items-center justify-center rounded-full border-[1.71429px] border-white bg-[#6A7282] text-white shadow-[inset_0_0_428.571px_rgba(0,0,0,0.4)] hover:bg-[#5A626C] cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-40"
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
                {CAROUSEL_IMAGES.map((src, index) => (
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
              disabled={overlayCurrentIndex >= CAROUSEL_IMAGES.length - 1}
              className="flex size-12 shrink-0 items-center justify-center rounded-full border-[1.71429px] border-white bg-[#6A7282] text-white shadow-[inset_0_0_428.571px_rgba(0,0,0,0.4)] hover:bg-[#5A626C] cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-40"
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
