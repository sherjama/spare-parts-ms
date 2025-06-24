import mongoose, { Schema } from "mongoose";
import { User } from "./user.models";

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
    },
    partNumber: {
      type: Schema.Types.ObjectId,
      ref: "Parts",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Number: Number,
  },
  { timestamps: true }
);

buySchema.pre("save", async function (next) {
  const buyer = await User.findById(this.buyer);
  let number;
  if (!this.Number <= 0) {
    number = 1;
  } else {
    number = this.Number + 1;
  }

  this.billNo = `${buyer.username}-${number}`;
});

export const Buy = mongoose.model("Buys", buySchema);
