import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectButtonProps {
  text: string;
  status?: "default" | "active" | "disabled";
  onClick?: () => void;
  className?: string;
}

export function SelectButton({
  text,
  status = "default",
  onClick,
  className,
}: SelectButtonProps) {
  const isDisabled = status === "disabled";
  const isActive = status === "active";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-small font-medium transition w-full",
        isActive
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-white text-text-primary hover:bg-light",
        isDisabled && "border-muted text-muted cursor-not-allowed opacity-50 hover:bg-white",
        className
      )}
    >
      {text}
    </button>
  );
}
