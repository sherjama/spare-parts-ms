import { Buy } from "../models/buyReceipt.models.js";
import { Sell } from "../models/sellReceipt.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PartList } from "../models/partList.models.js";
import { Parts } from "../models/parts.models.js";
import mongoose from "mongoose";

const getPurcaseBills = asyncHandler(async (req, res) => {
  const purchase = await Buy.aggregate([
    {
      $match: {
        buyer: req.user?._id,
      },
    },
  ]);

  if (!purchase) {
    throw new ApiError(
      501,
      "Something went wrong while getting purchase bills"
    );
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        purchase,
        "Purchase bill numebers fetched successfully"
      )
    );
});

const getSellBills = asyncHandler(async (req, res) => {
  const sell = await Sell.aggregate([
    {
      $match: {
        seller: req.user?._id,
      },
    },
  ]);

  if (!sell) {
    throw new ApiError(501, "Something went wrong while getting sell bills");
  }

  res
    .status(201)
    .json(new ApiResponse(201, sell, "Sell bill numbers fetched successfully"));
});

// Safe number converter
const toSafeNumber = (value) => {
  try {
    const num = Number(value);
    if (!isFinite(num)) return 0;
    return num;
  } catch {
    return 0;
  }
};

// Safe big sum calculator using BigInt
const safeSum = (values) => {
  let total = 0n;
  for (const val of values) {
    const bigVal = BigInt(Math.floor(toSafeNumber(val)));
    total += bigVal;
  }
  return total.toString();
};

const getTotalSells = asyncHandler(async (req, res) => {
  const userId = req?.user._id;

  const sellBills = await Sell.find({ seller: userId }).select(
    "billNo discount other partDetails"
  );
  if (!sellBills?.length) throw new ApiError(404, "No sell bills found");

  const sellTotals = await Promise.all(
    sellBills.map(async (sell) => {
      const partLists = await PartList.find({
        _id: { $in: sell.partDetails },
      }).select("totalAmount partDetails");

      const partIds = partLists.map((p) => p.partDetails);
      await Parts.find({ _id: { $in: partIds } }).select("_id");

      const subTotal = partLists.reduce(
        (sum, p) => sum + toSafeNumber(p.totalAmount),
        0
      );

      const discountAmount = toSafeNumber(sell.discount);
      const otherAmount = toSafeNumber(sell.other);

      return subTotal + otherAmount - discountAmount;
    })
  );

  const total = safeSum(sellTotals);

  res
    .status(200)
    .json(
      new ApiResponse(200, total, "Total sell amount fetched successfully")
    );
});

const getTotalPurchases = asyncHandler(async (req, res) => {
  const userId = req?.user._id;

  const buyBills = await Buy.find({ buyer: userId }).select(
    "vendorBillNo discount other partsDetails"
  );
  if (!buyBills?.length) throw new ApiError(404, "No purchase bills found");

  const purchaseTotals = await Promise.all(
    buyBills.map(async (buy) => {
      const partLists = await PartList.find({
        _id: { $in: buy.partsDetails },
      }).select("totalAmount partDetails");

      const partIds = partLists.map((p) => p.partDetails);
      await Parts.find({ _id: { $in: partIds } }).select("_id");

      const subTotal = partLists.reduce(
        (sum, p) => sum + toSafeNumber(p.totalAmount),
        0
      );

      const discountAmount = toSafeNumber(buy.discount);
      const otherAmount = toSafeNumber(buy.other);

      return subTotal + otherAmount - discountAmount;
    })
  );

  const total = safeSum(purchaseTotals);

  res
    .status(200)
    .json(
      new ApiResponse(200, total, "Total purchase amount fetched successfully")
    );
});

export { getPurcaseBills, getSellBills, getTotalSells, getTotalPurchases };
