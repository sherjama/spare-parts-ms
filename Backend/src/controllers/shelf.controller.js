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
  if (shelfName.trim().toLowerCase() === "none") {
    throw new ApiError(401, "Default shelf already exist");
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
  const { shelfName } = req.body;

  if (!shelfName) throw new ApiError(400, "Shelf name is required");

  const userId = req.user?._id;
  if (!userId) throw new ApiError(401, "Unauthorized request");

  const normalizedName = shelfName.trim().toLowerCase();
  if (normalizedName === "none") {
    throw new ApiError(400, "Default shelf cannot be deleted");
  }

  const existedShelf = await Shelf.findOne({
    shelfName,
    CreatedBy: userId,
  });

  if (!existedShelf) {
    throw new ApiError(
      404,
      `Shelf "${shelfName}" not found or already deleted`
    );
  }

  // Find default shelf
  const defaultShelf = await Shelf.findOne({
    shelfName: "none",
    CreatedBy: userId,
  });

  if (!defaultShelf) {
    throw new ApiError(
      500,
      "Default shelf not found. Please recreate 'none' shelf manually."
    );
  }

  // Reassign parts (if any)
  const updatedParts = await Parts.updateMany(
    { shelf: existedShelf._id },
    { $set: { shelf: defaultShelf._id } }
  );

  // Verify safe reassignment
  const verifyCount = await Parts.countDocuments({ shelf: existedShelf._id });
  if (verifyCount > 0) {
    throw new ApiError(
      500,
      "Shelf could not be safely emptied. Please try again."
    );
  }

  // Delete shelf
  const deleteResult = await Shelf.deleteOne({ _id: existedShelf._id });
  if (deleteResult.deletedCount === 0) {
    throw new ApiError(500, "Failed to delete the shelf. Please retry.");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, {}, `Shelf "${shelfName}" is permanently deleted`)
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
