"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  LayoutDashboard,
  Menu,
  Tags,
  Trophy,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { AccountDropdown } from "@/components/account-dropdown";
import { MenuContext, type MenuId } from "@/components/menu-context";
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
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Courts", href: "/admin/courts", icon: Building2 },
  { label: "Sports", href: "/admin/sports", icon: Trophy },
  { label: "Court Types", href: "/admin/court-types", icon: Tags },
  { label: "Users", href: "/admin/users", icon: Users },
];

function isActivePathname(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function AdminSidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-12 p-6">
      {/* Header / Logo Frame (Frame 177) */}
      <SidebarHeader className="w-full justify-center p-4">
        <Link href="/admin" className="shrink-0">
          <Logo />
        </Link>
      </SidebarHeader>

      {/* Nav Menu List (Frame 173) */}
      <SidebarContent className="p-0">
        <SidebarMenu className="w-full gap-2">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActivePathname(pathname, item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  isActive={active}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-[8px] p-2 text-body font-medium transition-colors",
                    active
                      ? "border border-primary bg-background text-primary hover:bg-background hover:text-primary data-active:border data-active:border-primary data-active:bg-background data-active:text-primary"
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

export function AdminShell({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const open = openMenu !== null;
  const pathname = usePathname();
  const currentSection = ADMIN_NAV_ITEMS.find((item) =>
    isActivePathname(pathname, item.href),
  );

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
      <SidebarProvider
        style={
          {
            "--sidebar-width": "320px",
            "--sidebar-width-mobile": "320px",
          } as React.CSSProperties
        }
      >
        <div
          ref={containerRef}
          className="flex min-h-screen w-full bg-background"
        >
          <Sidebar className="w-[320px] bg-white">
            <AdminSidebarContent />
          </Sidebar>

          <div className="flex w-full lg:w-[calc(100%-320px)] min-h-screen flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="cursor-pointer text-primary hover:bg-light">
                  <Menu className="size-5" />
                </SidebarTrigger>
                <span className="text-h3 text-primary">
                  {currentSection?.label ?? "Admin"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-body text-primary">Hello, User</span>
                <AccountDropdown />
              </div>
            </header>

            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </MenuContext.Provider>
  );
}
