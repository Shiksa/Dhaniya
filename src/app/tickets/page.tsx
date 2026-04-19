//home page

"use client";

import { useState } from "react";
import Link from "next/link";
import TicketList from "@/components/tickets/TicketList";
import TicketFiltersComponent from "@/components/tickets/TicketFilters";
import { useTickets } from "@/hooks/useTickets";
import type { TicketFilters } from "@/types/ticket";
import { Button } from "@/components/ui/button";

export default function TicketsPage() {
  const [filters, setFilters] = useState<TicketFilters>({
    search: "",
    status: "all",
    sortOrder: "desc",
  });
  const { data } = useTickets(filters);
  const total = data?.pages?.[0]?.total ?? 0;

  return (
    <div className="w-full mx-auto px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Support Tickets
          </h1>
          <p className="text-sm text-muted-foreground">
            {total} Tickets
          </p>
        </div>
        <Link href="/tickets/new">
          <Button className="px-4 py-2">
            + New Ticket
          </Button>
        </Link>
      </div>
      <TicketFiltersComponent onChange={setFilters} />
      <TicketList filters={filters} />
    </div>
  );
}