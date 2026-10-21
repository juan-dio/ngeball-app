"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SearchInput } from "@/components/search-input";
import { TablePagination } from "@/components/table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { USERS } from "@/data/users";
import { usePagination } from "@/hooks/use-pagination";
import { VerifiedBadge } from "@/components/verified-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ITEMS_PER_PAGE = 5;

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = USERS.filter(
    (user) =>
      user.email.toLowerCase().includes(search.trim().toLowerCase()) ||
      user.firstName.toLowerCase().includes(search.trim().toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const {
    items: paginatedUsers,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredUsers, ITEMS_PER_PAGE);

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="p-0 flex flex-col gap-6">
          {/* Toolbar */}
          <div className="flex items-center gap-4">
            <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            placeholder="Search user"
            className="w-full md:w-[320px]"
          />
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto rounded-[8px]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border bg-white hover:bg-white">
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    ID
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Email
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    First Name
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Last Name
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Verified
                  </TableHead>
                  <TableHead className="py-4 px-2 text-center text-text-primary text-body font-normal">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow className="border-0 bg-white">
                    <TableCell
                      colSpan={6}
                      className="p-8 text-center text-small text-text-secondary font-light"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user, index) => {
                    const isEven = index % 2 === 1;
                    return (
                      <TableRow
                        key={`${user.id}-${index}`}
                        className={`border-0 ${
                          isEven
                            ? "bg-white hover:bg-white/80"
                            : "bg-background hover:bg-background/80"
                        }`}
                      >
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          #{user.id}
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          {user.email}
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          {user.firstName}
                        </TableCell>
                        <TableCell className="p-2 text-center text-small text-text-primary font-light">
                          {user.lastName}
                        </TableCell>
                        <TableCell className="p-2 text-center flex justify-center">
                          <VerifiedBadge verified={user.verified} />
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-light">
                              <MoreVertical className="size-4 text-text-secondary" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-[6px] border border-border bg-white p-1 text-text-primary shadow"
                            >
                              <DropdownMenuItem className="cursor-pointer text-danger focus:bg-danger/10 focus:text-danger">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="pt-4"
          />
        </CardContent>
      </Card>
    </section>
  );
}
