"use client";

import {
  Banknote,
  Ticket,
  Users,
  LayoutGrid,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";

const bookingData = [
  { month: "May", bookings: 80 },
  { month: "Jun", bookings: 120 },
  { month: "Jul", bookings: 180 },
  { month: "Aug", bookings: 220 },
  { month: "Sep", bookings: 200 },
  { month: "Oct", bookings: 150 },
  { month: "Nov", bookings: 100 },
  { month: "Dec", bookings: 190 },
  { month: "Jan", bookings: 130 },
  { month: "Feb", bookings: 160 },
  { month: "Mar", bookings: 210 },
  { month: "Apr", bookings: 240 },
];

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "#285A48",
  },
} satisfies ChartConfig;

function getAxisTicks(data: { bookings: number }[]) {
  const max = Math.max(...data.map((d) => d.bookings));
  const step = Math.max(50, Math.ceil(max / 5 / 50) * 50);
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= top; v += step) {
    ticks.push(v);
  }
  return ticks;
}

const axisTicks = getAxisTicks(bookingData);

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-4">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card className="bg-dark border-0 rounded-[16px] p-0">
          <CardContent className="flex md:flex-col justify-start gap-6 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-[8px] bg-primary/80">
              <Banknote className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-body font-medium text-white leading-tight">
                Total Revenue
              </span>
              <span className="text-h3 text-white font-semibold leading-tight">
                Rp 1.000.000,00
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Active Bookings */}
        <Card className="bg-[#E2E8F0] border-0 rounded-[16px] p-0">
          <CardContent className="flex md:flex-col justify-start gap-6 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-[8px] bg-primary/10">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-body font-medium text-text-primary/80 leading-tight">
                Active Bookings
              </span>
              <span className="text-h2 text-text-primary font-semibold leading-tight">
                250
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="bg-[#E2E8F0] border-0 rounded-[16px] p-0">
          <CardContent className="flex md:flex-col justify-start gap-6 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-[8px] bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-body font-medium text-text-primary/80 leading-tight">
                Total Users
              </span>
              <span className="text-h2 text-text-primary font-semibold leading-tight">
                78
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Court Occupancy */}
        <Card className="bg-primary border-0 rounded-[16px] p-0">
          <CardContent className="flex md:flex-col justify-start gap-6 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-[8px] bg-white/20">
              <LayoutGrid className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-body font-medium text-white/80 leading-tight">
                Court Occupancy
              </span>
              <span className="text-h2 text-white font-semibold leading-tight">
                75%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Trends Chart */}
      <Card className="border border-border rounded-[16px]">
        <CardContent className="p-6">
          <h2 className="text-h2 text-text-primary mb-6">Booking Trends</h2>
          <div className="w-full overflow-x-auto">
            <ChartContainer
              config={chartConfig}
              className="min-w-150 w-full h-75"
            >
              <BarChart
                data={bookingData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid stroke="#D1D5DC" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6A7282", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#6A7282", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, axisTicks[axisTicks.length - 1]]}
                  ticks={axisTicks}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="bookings"
                  fill="var(--color-bookings)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(min-content,1fr)_minmax(min-content,1fr)_auto] gap-4">
        {/* Peak Booking Schedule */}
        <Card className="border border-border rounded-[16px] p-0">
          <CardContent className="h-full flex items-center p-6 gap-4">
            <div className="flex shrink-0 h-14 w-14 items-center justify-center rounded-[8px] bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col gap-1 whitespace-nowrap">
              <span className="text-body font-medium text-text-secondary leading-tight">
                Peak Booking Schedule
              </span>
              <span className="text-h2 text-text-primary font-semibold leading-tight">
                09:00 - 10:00
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Court */}
        <Card className="border border-border rounded-[16px] p-0">
          <CardContent className="w-fit h-full flex items-center p-6 gap-4">
            <div className="flex shrink-0 h-14 w-14 items-center justify-center rounded-[8px] bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col gap-1 whitespace-nowrap">
              <span className="text-body font-medium text-text-secondary leading-tight">
                Top Performing Court
              </span>
              <span className="text-h2 text-text-primary font-semibold leading-tight">
                Futsal Court A
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Today's Booking */}
        <Card className="bg-blue border-0 rounded-[16px] p-0">
          <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center gap-1">
            <span className="text-body font-medium text-white leading-tight">
              Today&apos;s Booking
            </span>
            <span className="text-h2 text-white mt-2 font-semibold leading-tight">
              4
            </span>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
