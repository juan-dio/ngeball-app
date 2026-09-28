import { SPORT_ICONS } from "@/data/sports";

interface SportIconProps {
  className?: string;
}

export function TennisIcon({ className = "" }: SportIconProps) {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      dangerouslySetInnerHTML={{ __html: SPORT_ICONS.Tennis }}
    />
  );
}