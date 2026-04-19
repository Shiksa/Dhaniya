//ticket list

"use client";

import { useTickets } from "@/hooks/useTickets";
import type { TicketFilters } from "@/types/ticket";
import TicketCard from "@/components/tickets/TicketCard";

import { useScroll, useMotionValueEvent } from "framer-motion";

export default function TicketList({ filters }: { filters: TicketFilters }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useTickets(filters);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.9 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });
  const tickets = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-6 space-y-3">
        <p className="text-red-500">
          Something went wrong
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {tickets.length === 0 && (
        <div className="text-center py-10 space-y-3">
          <p className="text-muted-foreground">
            No tickets found
          </p>
          <button
            className="text-sm text-white px-4 py-2 bg-red-500 rounded-2xl"
            onClick={() => window.location.reload()}
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 md:gap-5">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      {isFetchingNextPage && (
        <p className="text-center text-muted-foreground">
          Loading more...
        </p>
      )}

      {!hasNextPage && tickets.length > 0 && (
        <p className="text-center text-muted-foreground">
          No more tickets
        </p>
      )}
    </div>
  );
}