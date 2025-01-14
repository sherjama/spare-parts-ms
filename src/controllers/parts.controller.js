import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Parts } from "../models/parts.models.js";
import mongoose from "mongoose";

const createPart = asyncHandler(async (req, res) => {
  const { partNumber, partName, shelfName, MRP, Qty } = req.body;

  const shelf = new mongoose.Types.ObjectId(shelfName);

  if (
    [partName, partNumber, shelf, MRP, Qty].some(
      (val) => String(val).trim() === ""
    )
  ) {
    throw new ApiError(401, "All feilds are required");
  }

  const isPartExisted = await Parts.findOne({
    $or: [{ partNumber }],
  });

  if (isPartExisted) {
    throw new ApiError(401, "part number is already created");
  }

  const part = await Parts.create({
    partName,
    partNumber,
    MRP,
    Qty,
    shelf,
  });

  const createdPart = await Parts.findById(part._id);

  if (!createdPart) {
    throw new ApiError(500, "Something went wrong while creating part");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdPart, "Part is successfully created"));
});

const addQty = asyncHandler(async (req, res) => {
  const { partNumber, Qty } = req.body;

  const part = await Parts.find({ partNumber });

  if (!part) {
    throw new ApiError(401, "Part with this part number is not Exist");
  }

  const updatedPart = await Parts.findByIdAndUpdate(
    part._id,
    {
      $set: {
        Qty,
      },
    },
    { new: true }
  );

  res
    .status(201)
    .json(new ApiResponse(201, updatedPart, "Qty is successfully add"));
});

export { createPart, addQty };
