import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Shelf } from "../models/shelves.models.js";

const createShelf = asyncHandler(async (req, res) => {
  const { shelfName } = req.body;

  if (!shelfName) {
    throw new ApiError(401, "Name of Shelf is required");
  }

  const isShelfExisted = await Shelf.findOne({ shelfName });

  if (isShelfExisted) {
    throw new ApiError(401, "Shelf is already Exist");
  }

  const shelf = await Shelf.create({
    shelfName,
  });

  const createShelf = await Shelf.findById(shelf._id);

  if (!createShelf) {
    throw new ApiError(500, "Something went wrong while creating Shelf");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createShelf, "Shelf is successfully created"));
});

export { createShelf };
