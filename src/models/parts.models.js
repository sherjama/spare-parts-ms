import mongoose, { Schema } from "mongoose";

const partsSchema = new Schema(
  {
    partNumber: {
      type: String,
      unique: true,
      required: true,
    },
    partName: {
      type: String,
      required: true,
    },
    shelf: {
      type: Schema.Types.ObjectId,
      ref: "Shelf",
    },
    MRP: {
      type: Number,
      required: true,
    },
    Qty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Parts = mongoose.model("Parts", partsSchema);
