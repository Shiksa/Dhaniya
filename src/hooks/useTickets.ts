//infinite scroll logic with react query to fetch all tickets

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { TicketFilters, TicketsResponse } from "@/types/ticket";

const PAGE_SIZE = 10;

export function useTickets(filters: TicketFilters) {
  return useInfiniteQuery<TicketsResponse>({
    queryKey: ["tickets", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: String(PAGE_SIZE),
        search: filters.search,
        status: filters.status,
        sortOrder: filters.sortOrder,
      });

      const res = await fetch(`/api/tickets?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch tickets");
      }
      return res.json();
    },

    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,

    initialPageParam: 1,
  });
}