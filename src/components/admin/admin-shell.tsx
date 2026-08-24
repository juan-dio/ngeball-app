"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  Menu,
  Tags,
  Trophy,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

type AdminNavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Courts", href: "/admin/courts", icon: Building2 },
  { label: "Sports", href: "/admin/sports", icon: Trophy },
  { label: "Court Types", href: "/admin/court-types", icon: Tags },
  { label: "Users", href: "/admin/users", icon: Users },
];

function isActivePathname(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function AdminNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {ADMIN_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActivePathname(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-body transition-colors",
              active
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-light hover:text-text-primary",
            )}
          >
            <Icon className="size-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AdminIdentityButton() {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white py-1 pr-3 pl-1 transition-colors hover:bg-light"
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-primary text-small font-semibold text-white">
        A
      </span>
      <span className="text-body font-medium text-text-primary">Admin</span>
      <ChevronDown className="size-4 text-text-secondary" />
    </button>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const currentSection = ADMIN_NAV_ITEMS.find((item) =>
    isActivePathname(pathname, item.href),
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-white px-4 md:hidden">
        <Link href="/admin/dashboard" className="shrink-0">
          <Logo />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          aria-controls="admin-mobile-drawer"
          onClick={() => setDrawerOpen(true)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:bg-light"
        >
          <Menu className="size-5" />
        </button>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          !drawerOpen && "pointer-events-none",
        )}
      >
        <div
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            drawerOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          id="admin-mobile-drawer"
          inert={!drawerOpen}
          className={cn(
            "absolute inset-y-0 left-0 flex w-64 max-w-[80vw] flex-col bg-white transition-transform duration-300 ease-in-out",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:bg-light"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <AdminNavLinks onNavigate={() => setDrawerOpen(false)} />
          </div>
        </aside>
      </div>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-white md:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-border px-6">
          <Link href="/admin/dashboard" className="shrink-0">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <AdminNavLinks />
        </div>
      </aside>

      <div className="flex min-h-screen flex-col md:pl-64">
        <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-border bg-white px-6 md:flex">
          <span className="text-h3 text-text-primary">
            {currentSection?.label ?? "Admin"}
          </span>
          <AdminIdentityButton />
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
