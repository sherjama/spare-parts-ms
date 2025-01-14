import mongoose, { Schema } from "mongoose";

const shelvesSchema = new Schema(
  {
    shelfName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Shelf = mongoose.model("Shelf", shelvesSchema);
