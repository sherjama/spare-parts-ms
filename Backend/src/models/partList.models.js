import mongoose, { Schema } from "mongoose";

const partListSchema = new Schema(
  {
    partDetails: {
      type: Schema.Types.ObjectId,
      ref: "Parts",
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    Qty: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

partListSchema.pre("save", function (next) {
  this.totalAmount = this.Qty * this.unitPrice;
  next();
});

export const PartList = mongoose.model("PartList", partListSchema);
