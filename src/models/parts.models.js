import mongoose, { Schema } from "mongoose";

const partsSchema = Schema(
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
  },
  { timestamps: true }
);

export const Parts = mongoose.model("Parts", partsSchema);
