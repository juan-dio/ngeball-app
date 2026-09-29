import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Registers the custom typography utilities from `globals.css` so tailwind-merge
// treats them as font sizes instead of text colors. Without this, a call site
// like `className="text-body text-text-primary"` loses `text-body` inside any
// shadcn component that runs `cn()`, because `text-body` is read as a color and
// `text-text-primary` overrides it.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["h1", "h2", "h3", "body", "small"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
