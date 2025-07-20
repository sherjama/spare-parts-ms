import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";
import { ApiError } from "../utils/ApiError.js";

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
  },
  { timestamps: true }
);

const counterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  seq: {
    type: Number,
    default: 0,
  },
});

export const Counter = mongoose.model("Counter", counterSchema);

buySchema.pre("save", async function (next) {
  const buyer = await User.findById(this.buyer);
  if (!buyer) return next(new ApiError(401, "Buyer not found"));

  const counter = await Counter.findOneAndUpdate(
    { user: buyer._id },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.billNo = `${buyer.username}-p-${counter.seq}`;
  next();
});

export const Buy = mongoose.model("buys", buySchema);
