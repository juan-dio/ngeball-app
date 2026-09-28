"use client";

import { useState } from "react";
import { clampPage, getTotalPages } from "@/lib/pagination";

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1);
  const totalPages = getTotalPages(items.length, itemsPerPage);
  const currentPage = clampPage(page, totalPages);
  const start = (currentPage - 1) * itemsPerPage;

  return {
    items: items.slice(start, start + itemsPerPage),
    currentPage,
    setCurrentPage: setPage,
    totalPages,
  };
}
