//to update one ticket

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTicketFormData } from "@/lib/validations/ticket.schema";
import { ticketKeys } from "@/lib/queryKeys";

export function useUpdateTicket(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateTicketFormData) => {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update ticket");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ticketKeys.detail(id) });
      qc.invalidateQueries({ queryKey: ticketKeys.lists() });
    },
  });
}