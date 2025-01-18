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
    createdBy: req.user?._id,
  });

  const createShelf = await Shelf.findById(shelf._id);

  if (!createShelf) {
    throw new ApiError(500, "Something went wrong while creating Shelf");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createShelf, "Shelf is successfully created"));
});

const changeShelfName = asyncHandler(async (req, res) => {
  const { oldShelfName, newShelfName } = req.body;

  if ([oldShelfName, newShelfName].some()) {
  }

  const UpdatedShelf = await Shelf.findOneAndUpdate(
    { oldShelfName },
    {
      shelfName: newShelfName,
    },
    {
      new: true,
    }
  );

  if (!UpdatedShelf) {
    throw new ApiError(
      401,
      "Something went wrong , please check your Old shelf name"
    );
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, UpdatedShelf, "Shelf Name is successfully updated")
    );
});

const deleteShelf = asyncHandler(async (req, res) => {
  const { shelfName } = req.body;
  await Shelf.findOneAndDelete({ shelfName });

  res
    .status(201)
    .json(
      new ApiResponse(201, {}, `Shelf ${shelfName} is permanently deleted`)
    );
});

export { createShelf, changeShelfName, deleteShelf };
