//each unique card

"use client";

import Link from "next/link";
import { Ticket } from "@/types/ticket";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, User, AlertCircle } from "lucide-react";

const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 5:
      return "text-red-500";
    case 4:
      return "text-orange-500";
    case 3:
      return "text-yellow-500";
    case 2:
      return "text-blue-500";
    case 1:
      return "text-gray-400";
    default:
      return "text-gray-400";
  }
};

type Props = {
  ticket: Ticket;
};

export default function TicketCard({ ticket }: Props) {
  return (
    <Link href={`/tickets/${ticket.id}`}>
      <Card className="hover:shadow-md transition cursor-pointer border rounded-xl">
        <CardContent className="p-4 space-y-3">

          <div className="flex justify-between items-start gap-2">
            <h2 className="font-medium text-base leading-tight">
              {ticket.title}
            </h2>

            <Badge
              variant={
                ticket.status === "open"
                  ? "default"
                  : ticket.status === "in_progress"
                    ? "secondary"
                    : "outline"
              }
              className={`text-white h-6
                ${ticket.status === "open"
                  ? "bg-blue-700"
                  : ticket.status === "in_progress"
                    ? "bg-[#F0B100]"
                    : "bg-[#00C950]"}
              `}
            >
              {ticket.status.replace("_", " ")}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {ticket.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">

            <span className="flex items-center gap-1">
              <AlertCircle className={`w-3.5 h-3.5 ${getPriorityColor(ticket.priority)}`} />
              Priority {ticket.priority}
            </span>

            {ticket.assignee && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {ticket.assignee}
              </span>
            )}

            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(ticket.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}