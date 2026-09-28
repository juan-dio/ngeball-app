"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { clampPage, getVisiblePages } from "@/lib/pagination";

type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblings?: number;
};

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  siblings = 1,
}: TablePaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  if (safeTotalPages <= 1) return null;

  const safeCurrentPage = clampPage(currentPage, safeTotalPages);
  const visiblePages = getVisiblePages(
    safeCurrentPage,
    safeTotalPages,
    siblings,
  );
  const firstVisiblePage = visiblePages[0];
  const lastVisiblePage = visiblePages[visiblePages.length - 1];

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (safeCurrentPage > 1) {
                onPageChange(safeCurrentPage - 1);
              }
            }}
            className={
              safeCurrentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {firstVisiblePage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === safeCurrentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {lastVisiblePage < safeTotalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (safeCurrentPage < safeTotalPages) {
                onPageChange(safeCurrentPage + 1);
              }
            }}
            className={
              safeCurrentPage === safeTotalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
