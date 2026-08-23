"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SportIcon } from "@/components/icons/sport-icon";
import { type Booking } from "@/data/bookings";

type BookingCardProps = {
  booking: Booking;
  defaultExpanded?: boolean;
};

export function BookingCard({
  booking,
  defaultExpanded = false,
}: BookingCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { id, sport, courtName, price, status, date, duration, time, timeline } = booking;

  return (
    <Card className="border border-border rounded-[16px] py-0 gap-0 bg-white w-full max-w-200 overflow-hidden shadow-none">
      <div className="p-6 flex flex-col gap-4">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SportIcon sport={sport} />
            <span className="text-h2 text-text-primary">{id}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-body text-text-secondary">
              <span>Rp </span>
              <span className="text-h3 text-primary">{price}</span>
            </p>
            <span className="px-6 py-2 bg-success/10 border-2 border-success rounded-[24px] text-success text-small font-medium leading-tight">
              {status}
            </span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-text-secondary text-body">
          <span className="text-h3 text-text-secondary">{courtName}</span>

          <div className="flex items-center gap-2 flex-wrap text-body text-text-secondary">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>{duration}</span>
              <span>|</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button Container */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full border-t border-border px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-light/50 transition-colors text-left"
        aria-label="Toggle details"
        aria-expanded={isExpanded}
      >
        <span className="text-body font-medium text-text-primary">
          {isExpanded ? "Hide details" : "Expand details"}
        </span>
        <div className="p-1 rounded-full">
          <ChevronDown
            className={`w-5 h-5 text-text-primary transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Details Wrapper with Smooth Height & Opacity Transition */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pt-4 pb-6 flex flex-col gap-4 border-t border-border">
          <h3 className="text-h3 text-text-primary">Details</h3>

          <div className="flex flex-col gap-3">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-body text-text-secondary leading-tight"
              >
                <span>{item.label}</span>
                <span>{item.date}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-h2 text-text-primary">{id}</span>
            <div className="w-63 h-14 bg-muted/30 border border-border rounded-[8px] flex items-center justify-center text-small text-text-secondary">
              [Barcode / QR Placeholder]
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
