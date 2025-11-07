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
      type: Schema.Types.Decimal128,
    },
  },
  { timestamps: true }
);

// Automatically calculate totalAmount accurately
partListSchema.pre("save", function (next) {
  const total = this.Qty * this.unitPrice;

  // Convert to Decimal128
  this.totalAmount = mongoose.Types.Decimal128.fromString(total.toString());
  next();
});

export const PartList = mongoose.model("PartList", partListSchema);
