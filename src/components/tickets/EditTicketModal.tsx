//modal for editing the ticket

"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTicketSchema, UpdateTicketFormData } from "@/lib/validations/ticket.schema";
import { useUpdateTicket } from "@/hooks/useUpdateTicket";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  ticket: any;
};

export default function EditTicketModal({
  open,
  onClose,
  ticket,
}: Props) {
  const updateTicket = useUpdateTicket(ticket.id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<UpdateTicketFormData>({
    resolver: zodResolver(updateTicketSchema),
    defaultValues: ticket,
  });

  useEffect(() => {
    reset(ticket);
  }, [ticket, reset]);

  const onSubmit: SubmitHandler<UpdateTicketFormData> = (data) => {
    updateTicket.mutate(data, {
      onSuccess: () => {
        toast.success("Ticket updated");
        onClose();
      },
      onError: () => {
        toast.error("Update failed");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" w-[95vw] max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto px-4 sm:px-6 py-6rounded-xl ">

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Edit Ticket</h2>
          <p className="text-sm text-muted-foreground">
            Update the ticket details below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">

          <div>
            <Label className="mb-1 block">Title</Label>
            <Input
              {...register("title")}
              className="bg-[#F3F3F5] border-none focus-visible:ring-0"
              placeholder="Enter ticket title"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Provide a clear and concise title (5–80 characters)
            </p>
          </div>

          <div>
            <Label className="mb-1 block">Description</Label>
            <Textarea
              {...register("description")}
              className="bg-[#F3F3F5] border-none focus-visible:ring-0 min-h-25"
              placeholder="Describe the issue in detail"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Provide detailed information about the issue (min 20 characters)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <Label className="mb-1 block">Status</Label>
              <Select
                defaultValue={ticket.status}
                onValueChange={(val) =>
                  setValue("status", val as any)
                }
              >
                <SelectTrigger className="bg-[#F3F3F5] border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 block">Priority</Label>
              <Select
                defaultValue={String(ticket.priority)}
                onValueChange={(val) =>
                  setValue("priority", Number(val))
                }
              >
                <SelectTrigger className="bg-[#F3F3F5] border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Low</SelectItem>
                  <SelectItem value="2">2 - Normal</SelectItem>
                  <SelectItem value="3">3 - Medium</SelectItem>
                  <SelectItem value="4">4 - High</SelectItem>
                  <SelectItem value="5">5 - Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-1 block">
              Assignee (Optional)
            </Label>
            <Input
              {...register("assignee")}
              className="bg-[#F3F3F5] border-none focus-visible:ring-0"
              placeholder="Assign to team member"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty if not assigned yet
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="bg-black text-white hover:bg-black/90"
              disabled={updateTicket.isPending}
            >
              {updateTicket.isPending ? "Updating..." : "Update Ticket"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}