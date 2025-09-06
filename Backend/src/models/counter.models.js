import mongoose, { Schema } from "mongoose";

const counterSchema = new Schema({
  counterType: {
    type: String,
    enum: ["purchase", "sell"],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

counterSchema.index({ user: 1, counterType: 1 }, { unique: true });

export const Counter = mongoose.model("Counter", counterSchema);
