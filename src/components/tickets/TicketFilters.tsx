//ticket filter logic

"use client";

import { useState, useEffect } from "react";
import type { TicketFilters } from "@/types/ticket";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

type Props = {
  onChange: (filters: TicketFilters) => void;
};

export default function TicketFiltersComponent({ onChange }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TicketFilters["status"]>("all");
  const [sortOrder, setSortOrder] =
    useState<TicketFilters["sortOrder"]>("desc");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    onChange({
      search: debouncedSearch,
      status,
      sortOrder,
    });
  }, [debouncedSearch, status, sortOrder, onChange]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 mb-6">

      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 pl-9"
        />
      </div>

      <Select
        value={status}
        onValueChange={(value: TicketFilters["status"]) =>
          setStatus(value)
        }
      >
        <SelectTrigger className="w-full md:w-40 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortOrder}
        onValueChange={(value: TicketFilters["sortOrder"]) =>
          setSortOrder(value)
        }
      >
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Newest First" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Newest First</SelectItem>
          <SelectItem value="asc">Oldest First</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}