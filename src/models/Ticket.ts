//for storing in mongodb

import mongoose, { Schema, Document, Model } from "mongoose";
import { Ticket, TicketStatus, TicketPriority } from "@/types/ticket";

export interface ITicket extends Document {
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
}

const TicketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [80, "Title must be at most 80 characters"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [20, "Description must be at least 20 characters"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"] as TicketStatus[],
      required: [true, "Status is required"],
      default: "open",
    },

    priority: {
      type: Number,
      enum: [1, 2, 3, 4, 5] as TicketPriority[],
      required: [true, "Priority is required"],
      default: 3,
    },

    assignee: {
      type: String,
      trim: true,
      default: undefined,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        const transformed = ret as any;  // ← FIX IS HERE
        transformed.id = transformed._id.toString();
        delete transformed._id;
        delete transformed.__v;
        return transformed;
      },
    },
  }
);

const TicketModel: Model<ITicket> =
  mongoose.models.Ticket ?? mongoose.model<ITicket>("Ticket", TicketSchema);

export default TicketModel;