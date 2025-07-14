import mongoose, { Schema } from "mongoose";

const sellSchema = Schema(
  {
    customerName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    parts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Parts",
      },
    ],
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Number: 0,
  },
  { timestamp: true }
);

sellSchema.pre("save", async function (next) {
  const seller = await User.findById(this.seller);
  let number;
  if (!this.Number <= 0) {
    number = 1;
  } else {
    number = this.Number + 1;
  }

  this.billNo = `${seller.username}-I-${number}`;
});

export const Sell = mongoose.model("Sells", sellSchema);
