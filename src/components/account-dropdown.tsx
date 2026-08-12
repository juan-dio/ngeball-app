"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

import { useMenu } from "@/components/menu-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AccountDropdown() {
  const router = useRouter();
  const menu = useMenu();
  const open = menu.openMenu === "account";
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const wasOpen = React.useRef(false);

  React.useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const handleLogout = async () => {
    menu.close();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Logout failed but redirect anyway
    }
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative">
      <Button
        ref={triggerRef}
        aria-label="Account"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => menu.toggleMenu("account")}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-primary transition-colors cursor-pointer hover:bg-light"
      >
        <User className="size-5" />
      </Button>

      <div
        inert={!open}
        className={cn(
          "absolute right-0 top-full mt-1 flex origin-top-right flex-col gap-3 rounded-[16px] border border-border bg-white p-3 transition-all duration-200 ease-in-out",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0",
        )}
      >
        <Link
          href="/profile"
          onClick={() => menu.close()}
          className="flex items-center gap-2 rounded-md px-2 py-2 text-body font-medium text-text-primary hover:bg-light"
        >
          <User className="size-5" />
          Profile
        </Link>

        <Separator className="w-full bg-border" />

        <Button
          onClick={handleLogout}
          className="flex h-auto px-8 py-3 items-center justify-center gap-1 rounded-[12px] bg-primary text-sm font-semibold text-white cursor-pointer hover:bg-primary/90"
        >
          <LogOut className="size-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
