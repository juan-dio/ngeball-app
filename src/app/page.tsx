import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck, CreditCard, Trophy, Zap } from "lucide-react";

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
  { label: "Futsal", icon: FutsalIcon },
  { label: "Basketball", icon: BasketballIcon },
  { label: "Tennis", icon: TennisIcon },
  { label: "Padel", icon: PadelIcon },
];

const COURT_TYPES = [
  {
    title: "Futsal Sintetis",
    image: "/images/synthetic-grass1.png",
    description:
      "Premium synthetic grass surface, perfect for competitive futsal matches and daily training.",
  },
  {
    title: "Futsal Interlock",
    image: "/images/interlock1.jpg",
    description:
      "Durable interlock flooring that provides excellent grip and consistent ball bounce.",
  },
  {
    title: "Futsal Vinyl",
    image: "/images/vynil1.jpg",
    description:
      "High-quality vinyl court designed for comfort, safety, and a professional playing feel.",
  },
  {
    title: "Basket Indoor",
    image: "/images/indoor-basket1.jpg",
    description:
      "Regulation-size indoor basketball court with smooth hardwood surface and pro lighting.",
  },
  {
    title: "Tenis Indoor",
    image: "/images/indoor-tennis1.jpg",
    description:
      "Indoor tennis court with cushioned surface, ideal for playing all year round.",
  },
  {
    title: "Padel",
    image: "/images/padel1.jpg",
    description:
      "Modern padel court with artificial grass turf and tempered glass walls.",
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
    <section id="sports" className="bg-white py-20">
      <div className="mx-auto flex w-full max-w-300 flex-col items-center gap-14 px-6">
        <h2 className="text-h1 text-primary">Choose Your Sport!</h2>

        <div className="flex w-full items-start justify-between">
          {SPORTS.map((sport) => (
            <div key={sport.label} className="flex flex-col items-center gap-6">
              <sport.icon />
              <span className="text-[32px] font-semibold text-text-primary">
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
      className={`flex h-[216px] w-[760px] overflow-hidden rounded-[16px] border border-border bg-white ${alignRight ? "self-end" : "self-start"}`}
    >
      <div className="relative h-[216px] w-[320px] shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="320px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 p-6">
        <h3 className="text-h2 text-text-primary">{title}</h3>
        <p className="text-body text-text-secondary">{description}</p>
        <Link
          href="#"
          className="mt-1 inline-flex items-center gap-1.5 text-body text-blue underline underline-offset-4"
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
      <div className="mx-auto flex w-full max-w-300 flex-col items-center gap-14 px-6">
        <h2 className="text-h1 text-primary">Court Selection</h2>

        <div className="flex w-full flex-col gap-10">
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
    <section className="bg-white py-20">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-12 px-6">
        <div className="flex items-center justify-between">
          <Logo iconClassName="h-12 w-12" textClassName="text-5xl" />
          <h2 className="text-h1 text-primary">Speciality</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative h-[300px] overflow-hidden rounded-[24px]">
            <Image
              src="/images/basketball.jpg"
              alt="Multiple Sport Options"
              fill
              sizes="(max-width: 1200px) 50vw, 560px"
              className="object-cover"
            />
            <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-orange">
              <Trophy className="h-7 w-7 text-white" />
            </div>
            <h3 className="absolute bottom-6 left-6 text-[32px] font-semibold text-white">
              Multiple Sport Options
            </h3>
          </div>

          <div className="flex h-[300px] flex-col items-center justify-center gap-4 rounded-[24px] bg-[#FFDF20]">
            <Zap className="h-16 w-16 text-[#BB4D00]" />
            <h3 className="text-[40px] font-semibold text-[#BB4D00]">
              Easy Booking
            </h3>
          </div>

          <div className="flex h-[300px] flex-col items-center justify-center gap-4 rounded-[24px] bg-secondary">
            <CreditCard className="h-16 w-16 text-white" />
            <h3 className="text-[32px] font-semibold text-white">
              Simple Payment
            </h3>
          </div>

          <div className="relative h-[300px] overflow-hidden rounded-[24px]">
            <Image
              src="/images/street-football.jpg"
              alt="Community Support"
              fill
              sizes="(max-width: 1200px) 50vw, 560px"
              className="object-cover"
            />
            <h3 className="absolute bottom-6 left-6 text-[32px] font-semibold text-white">
              Community Support
            </h3>
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
        <h2 className="text-[48px] font-semibold text-white">
          Ready to play your game?
        </h2>
        <Button
          nativeButton={false}
          render={<Link href="/register" />}
          variant="outline"
          className="h-12 rounded-[12px] border border-white bg-white font-semibold text-primary hover:bg-white/90 hover:text-primary"
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
