"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { AccountDropdown } from "@/components/account-dropdown";
import { MenuContext, type MenuId } from "@/components/menu-context";

type NavLink = {
  label: string;
  href: string;
};

type NavbarProps = {
  navLinks: NavLink[];
  right?: ReactNode;
  icon?: ReactNode;
  drawer?: ReactNode;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courts", href: "/courts" },
];

const NAV_LINKS_AUTH: NavLink[] = [
  ...NAV_LINKS,
  { label: "Booking", href: "/booking" },
];

function Navbar({ navLinks, right, icon, drawer }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const open = openMenu !== null;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const toggleMenu = (menu: MenuId) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const menuContext = {
    openMenu,
    toggleMenu,
    close: () => setOpenMenu(null),
  };

  return (
    <MenuContext.Provider value={menuContext}>
      <div ref={containerRef}>
        <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-white">
        <div className="mx-auto flex h-full w-full max-w-300 items-center justify-between px-6">
          <div className="flex items-center gap-20">
            <Link href="/" className="shrink-0">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
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

          <div className="flex items-center gap-4">
            {right && (
              <div className="hidden items-center gap-4 md:flex">{right}</div>
            )}
            {icon}
            <button
              type="button"
              aria-label={openMenu === "drawer" ? "Close menu" : "Open menu"}
              aria-expanded={openMenu === "drawer"}
              aria-controls="mobile-drawer"
              onClick={() => toggleMenu("drawer")}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:bg-light md:hidden"
            >
              {openMenu === "drawer" ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        </header>

        <div
          className="fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-hidden pointer-events-none md:hidden"
          aria-hidden={openMenu !== "drawer"}
        >
          <div
            id="mobile-drawer"
            inert={openMenu !== "drawer"}
            className={cn(
              "bg-white transition-transform duration-300 ease-in-out pointer-events-auto",
              openMenu === "drawer" ? "translate-y-0" : "-translate-y-full",
            )}
          >
            <div className="border-b border-border">
              <nav className="flex flex-col gap-1 px-6 py-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpenMenu(null)}
                    className="rounded-md px-2 py-2 text-body text-text-primary transition-colors hover:bg-light"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {drawer && (
                <div className="flex flex-col gap-3 px-6 pb-6" onClick={() => setOpenMenu(null)}>
                  {drawer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MenuContext.Provider>
  );
}

function BookNowButton({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      render={<Link href="#" />}
      className={cn(
        "h-auto px-4 py-3 rounded-[12px] bg-primary text-sm font-semibold text-white hover:bg-primary/90",
        className,
      )}
    >
      Book Now
    </Button>
  );
}

function LogInButton({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      render={<Link href="/login" />}
      className={cn(
        "h-auto px-4 py-3 rounded-[12px] border border-border bg-white text-sm font-semibold text-primary hover:bg-light hover:text-primary",
        className,
      )}
    >
      Log In
    </Button>
  );
}

export function LandingPageNavbarAuth() {
  return (
    <Navbar
      navLinks={NAV_LINKS_AUTH}
      right={<BookNowButton />}
      icon={<AccountDropdown />}
      drawer={<BookNowButton className="w-full" />}
    />
  );
}

export function AppNavbar() {
  return (
    <Navbar
      navLinks={NAV_LINKS_AUTH}
      right={<span className="text-body text-primary">Hello, User</span>}
      icon={<AccountDropdown />}
    />
  );
}

export function LandingPageNavbarUnauth() {
  return (
    <Navbar
      navLinks={NAV_LINKS}
      right={
        <>
          <LogInButton />
          <BookNowButton />
        </>
      }
      drawer={
        <>
          <LogInButton className="w-full" />
          <BookNowButton className="w-full" />
        </>
      }
    />
  );
}
