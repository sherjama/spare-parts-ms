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
    Price: {
      type: Number,
      required: true,
    },
    Qty: {
      type: Number,
      required: true,
    },
    CreatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Parts = mongoose.model("Part", partsSchema);
