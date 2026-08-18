"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  className?: string;
}

export function Calendar({
  selectedDate,
  onSelectDate,
  className,
}: CalendarProps) {
  const today = React.useMemo(() => startOfDay(new Date()), []);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    const d = new Date(today);
    d.setDate(1);
    return d;
  });

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

  const calendarDays = React.useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { date: Date; isCurrentMonth: boolean; isDisabled: boolean }[] =
      [];

    const maxSelectableDate = new Date(today);
    maxSelectableDate.setDate(maxSelectableDate.getDate() + 30);

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({ date: d, isCurrentMonth: false, isDisabled: true });
    }

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

    const totalSlots = Math.ceil(days.length / 7) * 7;
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d, isCurrentMonth: false, isDisabled: true });
    }

    return days;
  }, [currentMonth, today]);

  const monthYearDisplay = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h2 className="text-h2 text-text-primary leading-tight">Select Date</h2>
      <div className="rounded-[16px] border border-border bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={!canPrevMonth}
            aria-label="Previous month"
            className="flex size-8 items-center justify-center rounded-full border border-border text-text-secondary transition hover:bg-light hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>
          <h3 className="text-body font-medium text-text-primary">
            {monthYearDisplay}
          </h3>
          <button
            type="button"
            onClick={handleNextMonth}
            disabled={!canNextMonth}
            aria-label="Next month"
            className="flex size-8 items-center justify-center rounded-full border border-border text-text-secondary transition hover:bg-light hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center">
          {DAYS_OF_WEEK.map((d) => (
            <div
              key={d}
              className="size-10 flex items-center justify-center text-body font-medium text-text-secondary"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 text-center">
          {calendarDays.map((item, idx) => {
            const isSelected =
              !item.isDisabled && isSameDay(item.date, selectedDate);
            const isToday = isSameDay(item.date, today);

            return (
              <div key={idx} className="flex items-center justify-center">
                <button
                  type="button"
                  disabled={item.isDisabled}
                  onClick={() => onSelectDate(item.date)}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full text-body transition cursor-pointer",
                    item.isDisabled
                      ? "cursor-not-allowed text-muted opacity-50"
                      : isSelected
                        ? "bg-text-primary text-white"
                        : "text-text-primary hover:bg-light",
                    isToday && "border-2 border-primary",
                  )}
                >
                  {item.date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
