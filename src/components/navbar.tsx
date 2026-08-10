import type { ReactNode } from "react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { AccountDropdown } from "@/components/account-dropdown";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Sports", href: "#sports" },
  { label: "Courts", href: "#courts" },
];

const NAV_LINKS_AUTH: NavLink[] = [
  ...NAV_LINKS,
  { label: "Booking", href: "#booking" },
];

function Navbar({
  navLinks,
  right,
}: {
  navLinks: NavLink[];
  right: ReactNode;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-white">
      <div className="mx-auto flex h-full w-full max-w-300 items-center justify-between px-6">
        <div className="flex items-center gap-20">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-body text-text-primary transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">{right}</div>
      </div>
    </header>
  );
}

function BookNowButton() {
  return (
    <Button
      nativeButton={false}
      render={<Link href="#" />}
      className="h-auto px-4 py-3 rounded-[12px] bg-primary text-sm font-semibold text-white hover:bg-primary/90"
    >
      Book Now
    </Button>
  );
}

export function LandingPageNavbarAuth() {
  return (
    <Navbar
      navLinks={NAV_LINKS_AUTH}
      right={
        <>
          <AccountDropdown />
          <BookNowButton />
        </>
      }
    />
  );
}

export function AppNavbar() {
  return (
    <Navbar
      navLinks={NAV_LINKS_AUTH}
      right={
        <>
          <span className="text-body text-primary">Hello, User</span>
          <AccountDropdown />
        </>
      }
    />
  );
}

export function LandingPageNavbarUnauth() {
  return (
    <Navbar
      navLinks={NAV_LINKS}
      right={
        <>
          <Button
            nativeButton={false}
            render={<Link href="/login" />}
            className="h-auto px-4 py-3 rounded-[12px] border border-border bg-white text-sm font-semibold text-primary hover:bg-white/90 hover:text-primary"
          >
            Log In
          </Button>
          <BookNowButton />
        </>
      }
    />
  );
}
