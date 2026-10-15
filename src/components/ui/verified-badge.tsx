import { Check, X } from "lucide-react";

type VerifiedBadgeProps = {
  verified: boolean;
};

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  const containerClass = verified
    ? "flex size-[2.25rem] items-center justify-center rounded-full bg-blue/10"
    : "flex size-[2.25rem] items-center justify-center rounded-full bg-red/10";

  const iconClass = verified
    ? "h-[2.5rem] w-[2.5rem] text-blue"
    : "h-[2.5rem] w-[2.5rem] text-red";

  return (
    <div className={containerClass}>
      {verified ? (
        <Check className={iconClass} />
      ) : (
        <X className={iconClass} />
      )}
    </div>
  );
}