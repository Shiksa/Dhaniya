//ticket's detail page

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTicket } from "@/hooks/useTicket";
import { useDeleteTicket } from "@/hooks/useDeleteTicket";
import EditTicketModal from "@/components/tickets/EditTicketModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  ArrowLeft,
  Pencil,
  Trash,
  Calendar,
  User,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function TicketDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: ticket, isLoading, isError } = useTicket(id);
  const deleteTicket = useDeleteTicket();
  const [openEdit, setOpenEdit] = useState(false);
  const handleDelete = () => {
    if (!confirm("Delete this ticket?")) return;

    deleteTicket.mutate(id, {
      onSuccess: () => {
        toast.success("Ticket deleted");
        router.push("/tickets");
      },
      onError: () => {
        toast.error("Failed to delete");
      },
    });
  };

  if (isLoading) {
    return <p className="p-6">Loading ticket...</p>;
  }

  if (isError || !ticket) {
    return <p className="p-6 text-red-500">Failed to load ticket</p>;
  }

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

  const statusColor =
    ticket.status === "open"
      ? "bg-blue-500 text-white"
      : ticket.status === "in_progress"
        ? "bg-yellow-500 text-white"
        : "bg-[#00C950] text-white";

  return (
    <div className="w-full mx-auto px-10 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold">
          Ticket Details
        </h1>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-5">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-semibold leading-tight">
                  {ticket.title}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusColor}`}
                >
                  {ticket.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOpenEdit(true)}
              >
                <Pencil className="w-4 h-4" />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={handleDelete}
                disabled={deleteTicket.isPending}
              >
                <Trash className="w-4 h-4" />
              </Button>

            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">

            <span className="flex items-center gap-1">
              <AlertCircle
                className={`w-3.5 h-3.5 ${getPriorityColor(
                  ticket.priority
                )}`}
              />
              Priority {ticket.priority}
            </span>

            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {ticket.assignee || "Unassigned"}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(ticket.createdAt), "MMM d, yyyy")}
            </span>
          </div>

          <div>
            <h3 className="font-medium mb-1">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ticket.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium capitalize">
                {ticket.status.replace("_", " ")}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Priority</p>
              <p className="font-medium">
                Level {ticket.priority}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Assignee</p>
              <p className="font-medium">
                {ticket.assignee || "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {format(new Date(ticket.updatedAt), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTicketModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        ticket={ticket}
      />

    </div>
  );
}