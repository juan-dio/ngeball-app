import { Badge } from "@/components/ui/badge";

type BookingStatusProps = {
  status: string;
};

export function BookingStatus({ status }: BookingStatusProps) {
  const normalized = status.toLowerCase();

  let variantClasses = "bg-success/10 border-2 border-success text-success";
  if (normalized === "pending") {
    variantClasses = "bg-warning/10 border-2 border-warning text-warning";
  } else if (normalized === "rejected" || normalized === "reject") {
    variantClasses = "bg-danger/10 border-2 border-danger text-danger";
  }

  return (
    <Badge
      variant="outline"
      className={`px-6 py-2 rounded-[24px] text-small font-medium leading-tight ${variantClasses}`}
    >
      {status}
    </Badge>
  );
}
