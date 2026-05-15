//to delete one ticket

"use client";

import { ticketKeys } from "@/lib/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete ticket");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ticketKeys.lists() });
    },
  });
}