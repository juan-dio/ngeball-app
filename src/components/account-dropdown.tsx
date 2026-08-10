"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function AccountDropdown() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Logout failed but redirect anyway
    }
    router.push("/");
    router.refresh();
  };

  return (
    <div ref={containerRef} className="relative">
      <Button
        aria-label="Account"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-text-primary transition-colors cursor-pointer hover:bg-light"
      >
        <User className="size-5" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1 flex flex-col gap-3 rounded-[16px] border border-border bg-white p-3">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-body font-medium text-text-primary hover:bg-light"
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
      )}
    </div>
  );
}
