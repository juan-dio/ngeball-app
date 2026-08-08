import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck, CreditCard, Zap } from "lucide-react";

import { Navbar } from "@/components/navbar";
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

      <div className="relative z-10 mx-auto flex w-full max-w-300 flex-col items-center gap-8 px-6 py-24 text-center">
        <h1 className="max-w-190 text-[56px] font-semibold leading-tight text-white">
          The best
          <br />
          sports court rental in town.
        </h1>

        <div className="flex items-center">
          {STEPS.map((step, index) => (
            <div key={step.label} className="flex items-center">
              <div className="flex w-32 flex-col items-center gap-1">
                <step.icon className="h-18 w-auto text-white" />
                <span className="text-[20px] font-semibold text-white">
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <ArrowRight className="h-16 w-auto text-white" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button
            nativeButton={false}
            render={<Link href="/register" />}
            variant="outline"
            className="h-14 px-8 rounded-[12px] border border-white bg-white font-semibold text-primary hover:bg-white/90 hover:text-primary"
          >
            Sign Up
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="#courts" />}
            className="h-14 px-8 rounded-[12px] bg-primary font-semibold text-white hover:bg-primary/90"
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
      <div className="mx-auto flex w-full max-w-300 flex-col items-center gap-12 px-24">
        <h2 className="text-h1 text-primary">Choose Your Sport!</h2>

        <div className="flex w-full items-start">
          {SPORTS.map((sport) => (
            <div
              key={sport.label}
              className="flex w-full flex-col items-center gap-4"
            >
              <sport.icon className={`h-20 w-auto ${sport.color}`} />
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
      className={`flex h-54 w-190 overflow-hidden rounded-[16px] border border-border bg-white ${alignRight ? "self-end flex-row-reverse" : "self-start flex-row"}`}
    >
      <div className="relative h-full w-80 shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="320px"
          className="object-cover"
        />
      </div>
      <div className="h-full flex flex-1 flex-col justify-between p-6">
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
      <div className="mx-auto flex w-full max-w-300 flex-col items-center gap-10 px-26">
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
          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-4 px-10 pt-24 pb-12 w-full relative overflow-hidden rounded-[24px]">
              <Image
                src="/images/basketball.jpg"
                alt="Multiple Sport Options"
                fill
                sizes="(max-width: 1200px) 50vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-brightness-80"></div>
              <div className="w-fit p-6 rounded-2xl bg-orange relative z-10">
                <BasketballIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-medium text-white relative z-10">
                Multiple Sport Options
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 rounded-[24px] bg-[#FFDF20] p-12">
              <Zap className="h-26 w-auto text-[#BB4D00]" />
              <h3 className="text-3xl font-semibold text-[#BB4D00] truncate">
                Easy Booking
              </h3>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-col justify-between items-start gap-10 rounded-[24px] bg-secondary p-12">
              <CreditCard className="h-20 w-auto text-white" />
              <h3 className="text-3xl font-semibold text-white truncate">
                Simple Payment
              </h3>
            </div>
            <div className="relative w-full flex justify-end items-center p-10 overflow-hidden rounded-[24px]">
              <Image
                src="/images/street-football.jpg"
                alt="Community Support"
                fill
                sizes="(max-width: 1200px) 50vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-brightness-80"></div>
              <h3 className="relative z-10 text-3xl font-medium text-white">
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
      <div className="mx-auto flex w-full max-w-300 items-center justify-between gap-8 px-6">
        <h2 className="text-5xl font-medium text-white">
          Ready to play your game?
        </h2>
        <Button
          nativeButton={false}
          render={<Link href="/register" />}
          variant="outline"
          className="h-14 px-8 rounded-[12px] border border-white bg-white font-semibold text-primary hover:bg-white/90 hover:text-primary"
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
      <Navbar />
      <Hero />
      <Sports />
      <CourtSelection />
      <Benefit />
      <Cta />
      <Footer />
    </main>
  );
}
