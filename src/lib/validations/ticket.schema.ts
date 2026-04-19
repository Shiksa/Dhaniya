//for zod in react hook form

import { z } from "zod";
const TICKET_STATUSES = ["open", "in_progress", "closed"] as const;
export const createTicketSchema = z.object({

  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(80, { message: "Title must be at most 80 characters" }),

  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),

  status: z.enum(TICKET_STATUSES),

  priority: z
    .number()
    .int()
    .min(1, { message: "Priority must be at least 1" })
    .max(5, { message: "Priority must be at most 5" }),

  assignee: z.string().optional(),
});

export const updateTicketSchema = createTicketSchema.partial();
export type CreateTicketFormData = z.infer<typeof createTicketSchema>;
export type UpdateTicketFormData = z.infer<typeof updateTicketSchema>;