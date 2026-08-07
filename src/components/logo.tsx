import * as React from "react";
import { Volleyball } from "lucide-react";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  variant?: "default" | "light";
}

export function Logo({
  className = "",
  iconClassName = "",
  textClassName = "",
  variant = "default",
}: LogoProps) {
  const isLight = variant === "light";
  return (
    <div className={`flex items-center gap-1 select-none ${className}`}>
      <Volleyball
        className={`h-6 w-6 ${isLight ? "text-white" : "text-text-primary"} stroke-[2.5] ${iconClassName}`}
      />
      <div className={`flex text-2xl font-semibold tracking-tight ${textClassName}`}>
        <span className={isLight ? "text-white" : "text-text-primary"}>nge</span>
        <span className={isLight ? "text-white" : "text-primary"}>Ball</span>
      </div>
    </div>
  );
}
