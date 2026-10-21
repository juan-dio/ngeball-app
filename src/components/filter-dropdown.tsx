"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  items: string[];
  className?: string;
}

export function FilterDropdown({
  value,
  onChange,
  items,
  className = "w-full md:w-36",
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex h-10 cursor-pointer items-center justify-between gap-2 rounded-[6px] border border-border bg-white px-3 text-left ${className}`}
      >
        <span className="text-small font-normal text-text-primary truncate">
          {value}
        </span>
        <ChevronDown className="size-4 shrink-0 text-text-secondary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow">
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            className="cursor-pointer text-body text-text-primary focus:bg-light focus:text-primary"
            onClick={() => onChange(item)}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}