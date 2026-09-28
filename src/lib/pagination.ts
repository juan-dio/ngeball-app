export function getTotalPages(
  totalItems: number,
  itemsPerPage: number,
): number {
  if (itemsPerPage <= 0) return 1;
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
}

export function clampPage(page: number, totalPages: number): number {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  siblings = 1,
): number[] {
  const total = Math.max(totalPages, 1);
  const windowSize = siblings * 2 + 1;

  if (total <= 3) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const current = clampPage(currentPage, total);
  const start = Math.max(1, Math.min(current - siblings, total - windowSize + 1));

  return Array.from({ length: windowSize }, (_, i) => start + i);
}
