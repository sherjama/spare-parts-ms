import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Shelf } from "../models/shelves.models.js";
import { Parts } from "../models/parts.models.js";

const createShelf = asyncHandler(async (req, res) => {
  const { shelfName } = req.body;

  if (!shelfName) {
    throw new ApiError(401, "Name of Shelf is required");
  }

  const isShelfExisted = await Shelf.findOne({
    shelfName,
    CreatedBy: req.user?._id,
  });

  if (isShelfExisted) {
    throw new ApiError(401, "Shelf is already Exist");
  }

  const shelf = await Shelf.create({
    shelfName,
    CreatedBy: req.user?._id,
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
    { oldShelfName, CreatedBy: req.user?._id },
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
  const { shelfName, userId } = req.body;

  if (!shelfName || !userId) {
    throw new ApiError(401, "All feilds are required");
  }

  const existedShelf = await Shelf.findOne({
    shelfName,
    CreatedBy: req.user?._id,
  });

  if (existedShelf) {
    const isShelfFilled = await Parts.findOne({
      shelf: existedShelf._id,
    });

    if (isShelfFilled) {
      throw new ApiError(
        401,
        "Please empty this Shelf first and then it will be deleted"
      );
    }
  }

  const isValidRequest = userId == req.user?._id;

  if (!isValidRequest) {
    throw new ApiError(401, "Unauthorized Request");
  }

  await Shelf.findOneAndDelete({
    shelfName,
    CreatedBy: userId,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, {}, `Shelf ${shelfName} is permanently deleted`)
    );
});

const listShelfs = asyncHandler(async (req, res) => {
  const shelfs = await Shelf.aggregate([
    {
      $match: {
        CreatedBy: req.user?._id,
      },
    },
  ]);

  if (!shelfs) {
    throw new ApiError(401, "No shelf is created By user.");
  }

  res
    .status(201)
    .json(new ApiResponse(201, shelfs, "Shelves fetched successfully"));
});

export { createShelf, changeShelfName, deleteShelf, listShelfs };
