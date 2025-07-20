import mongoose, { Schema } from "mongoose";
import { Counter } from "./buyReceipt.models.js";
import { User } from "./user.models.js";
import { ApiError } from "../utils/ApiError.js";

const sellSchema = Schema(
  {
    customerName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
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
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    billNo: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    billCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

sellSchema.pre("save", async function (next) {
  const seller = await User.findById(this.seller);
  if (!seller) next(new ApiError(401, "Seller not found"));

  const counter = await Counter.findByIdAndUpdate(
    { _id: "sellBillNo" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.billNo = `${seller.username}-I-${counter.seq}`;
  next();
});

export const Sell = mongoose.model("Sells", sellSchema);
