import Link from "next/link";
import { User } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Sports", href: "#sports" },
  { label: "Courts", href: "#courts" },
  { label: "Booking", href: "#booking" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-white">
      <div className="mx-auto flex h-full w-full max-w-300 items-center justify-between px-6">
        <div className="flex items-center gap-20">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
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

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            aria-label="Account"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-primary transition-colors hover:bg-light"
          >
            <User className="h-5 w-5" />
          </Link>
          <Button
            nativeButton={false}
            render={<Link href="/register" />}
            className="h-auto px-4 py-3 rounded-[12px] bg-primary text-sm font-semibold text-white hover:bg-primary/90"
          >
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
}
