import mongoose, { Schema } from "mongoose";

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
      lowercase: true,
    },
    partsDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: "PartList",
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

export const Buy = mongoose.model("Buy", buySchema);
