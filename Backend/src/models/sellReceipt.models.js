import mongoose, { Schema } from "mongoose";

const sellSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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
    date: {
      type: String,
      required: true,
    },
    partDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: "PartList",
      },
    ],
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    billNo: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Sell = mongoose.model("Sell", sellSchema);
