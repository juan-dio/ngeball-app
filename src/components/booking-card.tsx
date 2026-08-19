"use client"

import { useState } from "react"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { FutsalIcon } from "@/components/icons/futsal-icon"

interface TimelineItem {
  label: string
  date: string
}

interface BookingCardProps {
  id: string
  sport: string
  courtName: string
  price: string
  status: string
  date: string
  duration: string
  time: string
  timeline: TimelineItem[]
  defaultExpanded?: boolean
}

export function BookingCard({
  id,
  sport,
  courtName,
  price,
  status,
  date,
  duration,
  time,
  timeline,
  defaultExpanded = false,
}: BookingCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className="border border-border rounded-[16px] bg-white w-full max-w-[832px] overflow-hidden shadow-none">
      <div className="p-6 flex flex-col gap-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#008236]/10 flex items-center justify-center border border-[#008236]">
              <FutsalIcon className="w-5 h-5 text-[#008236]" />
            </div>
            <span className="text-h2 text-text-primary font-medium">{id}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-h2 text-primary font-semibold">{price}</span>
            <span className="px-3 py-1 bg-[#00c950]/10 border-2 border-[#00a63e] rounded-[24px] text-success text-small font-medium">
              {status}
            </span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-text-secondary text-body">
          <span className="font-medium text-text-secondary">{courtName}</span>
          <div className="flex items-center gap-2 flex-wrap text-small">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <span>•</span>
            <span>{duration}</span>
            <span className="text-muted">|</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="border-t border-border px-6 py-4 flex items-center justify-between">
        <span className="text-body font-medium text-text-primary">
          {isExpanded ? "Hide details" : "Expand details"}
        </span>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-light transition-colors cursor-pointer"
          aria-label="Toggle details"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-text-primary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-primary" />
          )}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border px-8 py-6 bg-light/50 flex flex-col gap-6">
          <h3 className="text-h3 text-text-primary">Details</h3>
          
          <div className="flex flex-col gap-3">
            {timeline.map((item, index) => (
              <div key={index} className="flex justify-between text-body text-text-secondary">
                <span>{item.label}</span>
                <span className="font-medium">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-h2 text-text-primary font-medium">{id}</span>
            <div className="w-[252px] h-[56px] bg-muted/30 border border-border rounded-[8px] flex items-center justify-center text-small text-text-secondary">
              [Barcode / QR Placeholder]
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
