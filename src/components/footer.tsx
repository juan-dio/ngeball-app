import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Logo } from "@/components/logo";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courts", href: "#courts" },
  { label: "Sports", href: "#sports" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto flex w-full max-w-300 flex-col px-6">
        <div className="flex flex-col gap-10 pt-16 pb-12 md:flex-row md:items-start md:pt-24 md:pb-18">
          <div className="flex flex-col gap-2 md:flex-1">
            <Logo variant="light" />
            <p className="text-body text-white/80">
              Best sports court rental in town
            </p>
          </div>

          <div className="flex flex-col gap-8 md:flex-1 md:flex-row md:gap-36">
            <div className="flex flex-col gap-4">
              <h3 className="text-h3 text-white">Links</h3>
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-h3 text-white">Contacts</h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2 text-body text-white/80">
                  <Mail className="h-4 w-4 shrink-0" />
                  ngeball@email.com
                </li>
                <li className="flex items-center gap-2 text-body text-white/80">
                  <Phone className="h-4 w-4 shrink-0" />
                  +62123456789
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/25" />

        <p className="text-small text-white/80 pt-8 pb-14">
          &copy; 2026 ngeBall. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
