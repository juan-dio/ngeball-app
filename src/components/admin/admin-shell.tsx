"use client";

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
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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

function AdminSidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-12 p-6">
      {/* Header / Logo Frame (Frame 177) */}
      <SidebarHeader className="h-[61px] w-[272px] justify-center p-4">
        <Link href="/admin/dashboard" className="shrink-0">
          <Logo />
        </Link>
      </SidebarHeader>

      {/* Nav Menu List (Frame 173) */}
      <SidebarContent className="p-0">
        <SidebarMenu className="w-[272px] gap-2">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActivePathname(pathname, item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  isActive={active}
                  className={cn(
                    "flex h-9 w-[272px] items-center gap-2 rounded-[8px] px-2 py-2 text-body font-medium transition-colors",
                    active
                      ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                      : "bg-white text-text-primary hover:bg-light hover:text-text-primary",
                  )}
                >
                  <span className="flex size-5 items-center justify-center">
                    <Icon className="size-4 shrink-0" />
                  </span>
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </div>
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
  const pathname = usePathname();
  const currentSection = ADMIN_NAV_ITEMS.find((item) =>
    isActivePathname(pathname, item.href),
  );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "320px",
          "--sidebar-width-mobile": "320px",
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="w-[320px] border-r border-border bg-white">
          <AdminSidebarContent />
        </Sidebar>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="cursor-pointer text-text-primary hover:bg-light">
                <Menu className="size-5" />
              </SidebarTrigger>
              <span className="text-h3 font-medium text-text-primary">
                {currentSection?.label ?? "Admin"}
              </span>
            </div>
            <AdminIdentityButton />
          </header>

          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
