# SelectButton Component Design
- **Path**: `src/components/select-button.tsx`
- **Purpose**: Reusable button for selecting duration and schedule slots.

## Props
- `text`: `string` (Text displayed inside)
- `status`: `'default' | 'active' | 'disabled'` (Visual and functional state)
- `onClick?`: `() => void` (Click handler)
- `className?`: `string` (Additional Tailwind classes)

## Styles
- **Common**: `rounded-full border px-4 py-2 text-small font-medium transition w-full` (added w-full for grid consistency where needed)
- **Status: Active**: `border-primary bg-primary/15 text-primary`
- **Status: Default**: `border-border bg-white text-text-primary hover:bg-light`
- **Status: Disabled**: `border-muted text-muted cursor-not-allowed opacity-50` (pointer-events-none or disabled attr)

## Implementation Plan
1. Create `src/components/select-button.tsx`.
2. Import and replace buttons in `src/app/courts/futsal-court-a/page.tsx`.
3. Verify styles and interaction.
