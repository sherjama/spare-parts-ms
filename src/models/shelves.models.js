import mongoose, { Schema } from "mongoose";

const shelvesSchema = new Schema(
  {
    shelfName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Shelf = mongoose.model("Shelf", shelvesSchema);
