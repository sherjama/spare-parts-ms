import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Parts } from "../models/parts.models.js";

const addPart = asyncHandler((req, res) => {
  const { partNumber, partName, shelf, MRP, Qty } = req.body;

  if (
    [partName, partNumber, shelf, MRP, Qty].some((val) => val?.trim() === "")
  ) {
    throw new ApiError(401, "All feilds are required");
  }

  // const part =
});
