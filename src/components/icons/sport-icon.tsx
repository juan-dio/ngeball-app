import {
  SPORT_COLOR_HEX,
  SPORT_ICONS,
  type SportKey,
} from "@/data/sports";

type SportIconProps = {
  sport: SportKey;
  iconSvg?: string;
  colorHex?: string;
};

function SportGlyph({
  iconSvg,
  className,
}: {
  iconSvg: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      dangerouslySetInnerHTML={{ __html: iconSvg }}
    />
  );
}

export function SportIcon({ sport, iconSvg, colorHex }: SportIconProps) {
  const svg = iconSvg ?? SPORT_ICONS[sport];
  const hex = colorHex ?? SPORT_COLOR_HEX[sport];

  return (
    <span
      className="flex size-9 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: `${hex}1a`, color: hex }}
    >
      <SportGlyph iconSvg={svg} className="h-5 w-5" />
    </span>
  );
}

export function SportIconWithText({ sport, iconSvg, colorHex }: SportIconProps) {
  const svg = iconSvg ?? SPORT_ICONS[sport];
  const hex = colorHex ?? SPORT_COLOR_HEX[sport];

  return (
    <span
      className="px-4 py-2 flex items-center justify-center rounded-full gap-2 border-2"
      style={{ backgroundColor: `${hex}1a`, borderColor: hex, color: hex }}
    >
      <SportGlyph iconSvg={svg} className="h-5 w-5" />
      <span className="text-small font-semibold">{sport}</span>
    </span>
  );
}
