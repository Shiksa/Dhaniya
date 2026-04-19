//create new ticket

"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTicketSchema,
  CreateTicketFormData,
} from "@/lib/validations/ticket.schema";
import { useCreateTicket } from "@/hooks/useCreateTicket";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateTicketPage() {
  const router = useRouter();
  const createTicket = useCreateTicket();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
      priority: 3,
      assignee: "",
    },
  });

  const onSubmit: SubmitHandler<CreateTicketFormData> = (data) => {
    createTicket.mutate(data, {
      onSuccess: () => {
        toast.success("Ticket created");
        router.push("/tickets");
      },
      onError: () => {
        toast.error("Failed to create ticket");
      },
    });
  };

  return (
    <div className="w-full mx-auto px-10 py-8 space-y-6">

      <div className="flex items-center gap-2">
        <Link href="/tickets" className=" text-sm">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-semibold">Create New Ticket</h1>
      </div>
      <div className="border rounded-xl p-6 space-y-5 bg-white">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="space-y-1">
            <Label>Title</Label>
            <Input {...register("title")} placeholder="Enter ticket title" className="bg-[#F3F3F5] border-0 focus-visible:ring-1 focus-visible:ring-black/20 " />
            <p className="text-xs text-muted-foreground">
              Provide a clear and concise title (5–80 characters)
            </p>
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Describe the issue in detail"
              rows={4} className="bg-[#F3F3F5] border-0 focus-visible:ring-1 focus-visible:ring-black/20"
            />
            <p className="text-xs text-muted-foreground">
              Provide detailed information about the issue (min 20 characters)
            </p>
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">

            <div className="space-y-1 flex-1">
              <Label>Status</Label>
              <Select
                defaultValue="open"
                onValueChange={(val: CreateTicketFormData["status"]) =>
                  setValue("status", val)
                }
              >
                <SelectTrigger className="w-full bg-[#F3F3F5] border-0 h-11">
                  <SelectValue placeholder="Open" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1 flex-1">
              <Label>Priority</Label>
              <Select
                defaultValue="3"
                onValueChange={(val: string) =>
                  setValue("priority", Number(val))
                }
              >
                <SelectTrigger className="w-full bg-[#F3F3F5] border-0 h-11">
                  <SelectValue placeholder="3 - Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Lowest</SelectItem>
                  <SelectItem value="2">2 - Low</SelectItem>
                  <SelectItem value="3">3 - Medium</SelectItem>
                  <SelectItem value="4">4 - High</SelectItem>
                  <SelectItem value="5">5 - Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1 w-full">
            <Label>Assignee (Optional)</Label>
            <Input
              {...register("assignee")}
              placeholder="Assign to team member"
              className="bg-[#F3F3F5] border-0 focus-visible:ring-1 focus-visible:ring-black/20"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty if not assigned yet
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={createTicket.isPending}>
              {createTicket.isPending ? "Creating..." : "Create Ticket"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/tickets")}
            >
              Cancel
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}