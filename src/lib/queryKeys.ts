import type { TicketFilters } from "@/types/ticket";

export const ticketKeys = {

  all: ["tickets"] as const,

  lists: () => [...ticketKeys.all, "list"] as const,

  list: (filters: Partial<TicketFilters>) => [...ticketKeys.lists(), filters] as const,

  details: () => [...ticketKeys.all, "detail"] as const,

  detail: (id: string) => [...ticketKeys.details(), id] as const,
}