//update,delete api for  ticket

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TicketModel from "@/models/Ticket";
import { updateTicketSchema } from "@/lib/validations/ticket.schema";


export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; // ✅ FIX
    const ticket = await TicketModel.findById(id);
    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(ticket);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();
    const validation = updateTicketSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const updatedTicket = await TicketModel.findByIdAndUpdate(
      id,
      validation.data as any,
      { new: true }
    );
    if (!updatedTicket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; // ✅ FIX
    const deletedTicket = await TicketModel.findByIdAndDelete(id);
    if (!deletedTicket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete ticket" },
      { status: 500 }
    );
  }
}