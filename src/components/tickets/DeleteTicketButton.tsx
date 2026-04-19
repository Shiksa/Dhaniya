//delete Button

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDeleteTicket } from "@/hooks/useDeleteTicket";
import { toast } from "sonner";

export default function DeleteTicketButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteTicket = useDeleteTicket();
  const handleDelete = () => {
    if (!confirm("Delete this ticket?")) return;
    deleteTicket.mutate(id, {
      onSuccess: () => {
        toast.success("Ticket deleted");
        router.push("/tickets");
      },
      onError: () => {
        toast.error("Delete failed");
      },
    });
  };
  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}