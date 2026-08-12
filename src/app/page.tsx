import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  CreditCard,
  Zap,
} from "lucide-react";

import { AppNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FutsalIcon } from "@/components/icons/futsal-icon";
import { BasketballIcon } from "@/components/icons/basketball-icon";
import { TennisIcon } from "@/components/icons/tennis-icon";
import { PadelIcon } from "@/components/icons/padel-icon";
import { FieldIcon } from "@/components/icons/field-icon";
import { DatetimeIcon } from "@/components/icons/datetime-icon";
import { PayIcon } from "@/components/icons/pay-icon";

const STEPS = [
  { label: "Select court", icon: FieldIcon },
  { label: "Select time", icon: DatetimeIcon },
  { label: "Pay", icon: PayIcon },
  { label: "Success", icon: CircleCheck },
];

const SPORTS = [
  { label: "Futsal", icon: FutsalIcon, color: "text-green" },
  { label: "Basketball", icon: BasketballIcon, color: "text-orange" },
  { label: "Tennis", icon: TennisIcon, color: "text-red" },
  { label: "Padel", icon: PadelIcon, color: "text-blue" },
];

const COURT_TYPES = [
  {
    title: "Synthetic Grass Futsal Court",
    image: "/images/synthetic-grass1.png",
    description:
      "This court features high-quality artificial turf with rubber infill, providing a soft cushioned surface that reduces impact on joints and minimizes skin abrasions during hard falls.",
  },
  {
    title: "Interlock Futsal Court",
    image: "/images/interlock1.jpg",
    description:
      "Constructed from modular polypropylene tiles, this surface offers durable shock absorption and resistance, while its highly perforated design ensures a non-slip grip and consistent ball bounce.",
  },
  {
    title: "Vynil Futsal Court",
    image: "/images/vynil1.jpg",
    description:
      "A professional-grade surface made of high-density PVC layers, this durable material offers superior shock absorption and maximum traction for very quick directional changes during fast play.",
  },
  {
    title: "Indoor Basketball Court",
    image: "/images/indoor-basket1.jpg",
    description:
      "An enclosed facility featuring a polished hardwood or high-performance synthetic floor, this controlled environment eliminates weather variables for a consistent ball bounce and stable playing temperature.",
  },
  {
    title: "Indoor Tennis Court",
    image: "/images/indoor-tennis1.jpg",
    description:
      "A controlled environment with a hard-court or carpet surface designed to eliminate wind and sun interference, providing reliable, predictable ball trajectories and a consistently stable pace.",
  },
  {
    title: "Padel Court",
    image: "/images/padel1.jpg",
    description:
      "A specialized court enclosed by glass and mesh walls, one-third the size of a tennis court, where rebounds off the walls reward strategy over raw power.",
  },
];

function StepCell({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="h-18 w-auto text-white" />
      <span className="text-[20px] font-semibold text-white">{label}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Sports court"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-col items-center gap-6 px-6 py-16 text-center md:gap-8 md:py-24">
        <h1 className="max-w-190 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[56px]">
          The best
          <br className="hidden sm:block" /> sports court rental in town.
        </h1>

        <div className="grid grid-cols-[8rem_3rem_8rem] grid-rows-[8rem_3rem_8rem] place-items-center md:hidden max-[351px]:grid-cols-[7rem_2.5rem_7rem] max-[351px]:grid-rows-[7rem_2.5rem_7rem] max-[351px]:[&>svg]:h-10 max-[351px]:[&>svg]:w-10">
          <StepCell icon={STEPS[0].icon} label={STEPS[0].label} />
          <ArrowRight className="h-12 w-12 text-white" />
          <StepCell icon={STEPS[1].icon} label={STEPS[1].label} />
          <span />
          <span />
          <ArrowDown className="h-12 w-12 text-white" />
          <StepCell icon={STEPS[3].icon} label={STEPS[3].label} />
          <ArrowLeft className="h-12 w-12 text-white" />
          <StepCell icon={STEPS[2].icon} label={STEPS[2].label} />
        </div>

        <div className="hidden items-center md:flex">
          {STEPS.map((step, index) => (
            <div key={step.label} className="flex items-center">
              <div className="w-32">
                <StepCell icon={step.icon} label={step.label} />
              </div>
              {index < STEPS.length - 1 && (
                <ArrowRight className="h-16 w-auto text-white" />
              )}
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <Button
            nativeButton={false}
            render={<Link href="/register" />}
            variant="outline"
            className="h-14 w-full px-8 rounded-[12px] border border-border bg-white font-semibold text-primary hover:bg-light hover:text-primary md:w-auto"
          >
            Sign Up
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="#courts" />}
            className="h-14 w-full px-8 rounded-[12px] bg-primary font-semibold text-white hover:bg-primary/90 md:w-auto"
          >
            Browse Courts
          </Button>
        </div>
      </div>
    </section>
  );
}

function Sports() {
  return (
    <section id="sports" className="bg-white pt-20 pb-24">
      <div className="mx-auto flex w-full max-w-300 flex-col items-center gap-12 px-6 md:px-24">
        <h2 className="text-h1 text-primary">Choose Your Sport!</h2>

        <div className="grid w-auto grid-cols-2 place-items-center gap-8 p-2 md:grid-cols-4 md:gap-20 md:p-4">
          {SPORTS.map((sport) => (
            <div key={sport.label} className="flex flex-col items-center gap-4">
              <sport.icon className={`h-16 w-auto md:h-20 ${sport.color}`} />
              <span className="text-h2 font-semibold text-text-primary">
                {sport.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FieldTypeCard({
  title,
  image,
  description,
  alignRight,
}: {
  title: string;
  image: string;
  description: string;
  alignRight: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col overflow-hidden rounded-[16px] border border-border bg-white lg:h-54 lg:w-190 lg:flex-row ${alignRight ? "lg:self-end lg:flex-row-reverse" : "lg:self-start"}`}
    >
      <div className="relative h-56 w-full shrink-0 lg:h-full lg:w-80">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 320px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2 p-6 lg:h-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-h2 text-text-primary">{title}</h3>
          <p className="text-body text-text-secondary leading-tight">
            {description}
          </p>
        </div>
        <Link
          href="#"
          className="mt-1 inline-flex items-center gap-1 text-body text-blue underline underline-offset-4"
        >
          View by this type
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function CourtSelection() {
  return (
    <section id="courts" className="py-20">
      <div className="mx-auto flex w-full max-w-300 flex-col items-center gap-10 px-6 md:px-26">
        <h2 className="text-h1 text-primary">Court Selection</h2>

        <div className="flex w-full flex-col gap-4">
          {COURT_TYPES.map((court, index) => (
            <FieldTypeCard
              key={court.title}
              title={court.title}
              image={court.image}
              description={court.description}
              alignRight={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefit() {
  return (
    <section className="bg-white pt-20 pb-24">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-10 px-6">
        <div className="flex items-center justify-center gap-2.5">
          <Logo iconClassName="h-10 w-10" textClassName="text-h1" />
          <h2 className="text-h1 text-primary">Speciality</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex flex-col gap-4 px-6 pt-24 pb-12 w-full relative overflow-hidden rounded-[24px] min-h-72 md:w-2/3 md:px-10">
              <Image
                src="/images/basketball.jpg"
                alt="Multiple Sport Options"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-brightness-80"></div>
              <div className="w-fit p-4 rounded-2xl bg-orange relative z-10">
                <BasketballIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-medium text-white md:text-3xl relative z-10">
                Multiple Sport Options
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 rounded-[24px] bg-[#FFDF20] p-8 md:min-h-72 md:w-1/3 md:p-12">
              <Zap className="h-16 w-auto text-[#BB4D00] md:h-26" />
              <h3 className="text-2xl font-semibold text-[#BB4D00] md:text-3xl">
                Easy Booking
              </h3>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex flex-col justify-between items-start gap-8 rounded-[24px] bg-secondary p-8 md:min-h-56 md:w-1/3 md:p-10">
              <CreditCard className="h-16 w-auto text-white md:h-20" />
              <h3 className="text-2xl font-semibold text-white md:text-3xl">
                Simple Payment
              </h3>
            </div>
            <div className="relative w-full flex justify-end items-center p-8 overflow-hidden rounded-[24px] min-h-56 md:w-2/3 md:p-10">
              <Image
                src="/images/street-football.jpg"
                alt="Community Support"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-brightness-80"></div>
              <h3 className="relative z-10 text-2xl font-medium text-white md:text-3xl">
                Community Support
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="booking" className="bg-primary py-20">
      <div className="mx-auto flex w-full max-w-300 flex-col items-center justify-center gap-8 px-6 md:flex-row md:justify-between">
        <h2 className="text-center text-3xl font-medium text-white md:text-left md:text-5xl">
          Ready to play your game?
        </h2>
        <Button
          nativeButton={false}
          render={<Link href="/register" />}
          variant="outline"
          className="h-14 w-full px-8 rounded-[12px] border border-white bg-white text-lg font-semibold text-primary hover:bg-light hover:text-primary md:w-auto"
        >
          Book Now
        </Button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background pt-16">
      <AppNavbar />
      <Hero />
      <Sports />
      <CourtSelection />
      <Benefit />
      <Cta />
      <Footer />
    </main>
  );
}
