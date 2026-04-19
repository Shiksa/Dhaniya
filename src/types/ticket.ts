//type declaration globally

export type TicketStatus = "open" | "in_progress" | "resolved";

export type TicketPriority = 1 | 2 | 3 | 4 | 5;

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  assignee?: string;
}

export interface CreateTicketInput {
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee?: string;
}

export interface UpdateTicketInput {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignee?: string;
}

export interface TicketsResponse {
  data: Ticket[];
  nextPage: number | null;
  total: number;
}

export interface TicketFilters {
  search: string;
  status: TicketStatus | "all";
  sortOrder: "asc" | "desc";
}