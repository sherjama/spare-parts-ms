import mongoose, { Schema } from "mongoose";

const shelvesSchema = Schema(
  {
    shelfName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Shelf = mongoose.model("Shelf", shelvesSchema);
