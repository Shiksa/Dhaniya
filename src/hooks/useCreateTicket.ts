//custom hooks to create a new ticket

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTicketFormData } from "@/lib/validations/ticket.schema";
import { ticketKeys } from "@/lib/queryKeys";

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTicketFormData) => {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create ticket");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() });
    },
  });
}