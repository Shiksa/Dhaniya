//create fetch route

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TicketModel from "@/models/Ticket";
import { createTicketSchema } from "@/lib/validations/ticket.schema";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") ?? "1");
    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status") ?? "all";
    const sortOrder = searchParams.get("sortOrder") ?? "desc";
    const filter: Record<string, unknown> = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (status !== "all") {
      filter.status = status;
    }

    const sortDirection = sortOrder === "asc" ? 1 : -1;
    const total = await TicketModel.countDocuments(filter);
    const tickets = await TicketModel.find(filter)
      .sort({ createdAt: sortDirection })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const totalPages = Math.ceil(total / PAGE_SIZE);
    const nextPage = page < totalPages ? page + 1 : null;

    return NextResponse.json({
      data: tickets,
      nextPage,
      total,
    });
  } catch (error) {
    console.error("GET /api/tickets error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}



export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validation = createTicketSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const validatedData = validation.data
    const ticket = await TicketModel.create(validatedData as any);
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("POST /api/tickets error:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}