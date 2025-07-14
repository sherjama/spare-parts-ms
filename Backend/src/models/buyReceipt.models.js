import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";

const buySchema = new Schema(
  {
    vendorBillNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    vendorName: {
      type: String,
      required: true,
      trim: true,
    },
    parts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Parts",
      },
    ],
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyDate: {
      type: String,
      required: true,
      trim: true,
    },
    billNo: {
      type: String,
      trim: true,
    },
    billNumberCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const counterSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model("Counter", counterSchema);

buySchema.pre("save", async function (next) {
  const buyer = await User.findById(this.buyer);
  if (!buyer) return next(new Error("Buyer not found"));

  const counter = await Counter.findByIdAndUpdate(
    { _id: "billNo" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.billNo = `${buyer.username}-p-${counter.seq}`;
  next();
});

export const Buy = mongoose.model("buys", buySchema);
