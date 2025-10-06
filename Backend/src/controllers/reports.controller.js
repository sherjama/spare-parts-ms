import { Buy } from "../models/buyReceipt.models.js";
import { Sell } from "../models/sellReceipt.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

export { getPurcaseBills, getSellBills };
