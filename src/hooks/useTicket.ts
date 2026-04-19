//to fetch a single ticket

"use client";

import { useQuery } from "@tanstack/react-query";
import { Ticket } from "@/types/ticket";

export function useTicket(id: string) {
  return useQuery<Ticket>({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await fetch(`/api/tickets/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch ticket");
      }
      return res.json();
    },
    enabled: !!id,
  });
}