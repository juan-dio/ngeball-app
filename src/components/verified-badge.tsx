import { Check, X } from "lucide-react";

type VerifiedBadgeProps = {
  verified: boolean;
};

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  const containerClass = verified
    ? "flex size-[2rem] items-center justify-center rounded-full bg-blue/10"
    : "flex size-[2rem] items-center justify-center rounded-full bg-red/10";

  const iconClass = verified ? "w-4 text-blue" : "w-4 text-red";

  return (
    <div className={containerClass}>
      {verified ? <Check className={iconClass} /> : <X className={iconClass} />}
    </div>
  );
}
