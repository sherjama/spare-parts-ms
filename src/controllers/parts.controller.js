import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Parts } from "../models/parts.models.js";
import { Shelf } from "../models/shelves.models.js";

const createPart = asyncHandler(async (req, res) => {
  const { partNumber, partName, shelfName, MRP, Qty } = req.body;

  console.log(partName, partNumber, shelfName, MRP, Qty);

  if (
    [partName, partNumber, shelfName, MRP, Qty].some(
      (val) => String(val).trim() === ""
    )
  ) {
    throw new ApiError(401, "All feilds are required");
  }

  const isPartExisted = await Parts.findOne({
    partNumber,
    CreatedBy: req.user?._id,
  });

  const shelf = await Shelf.findOne({ shelfName, CreatedBy: req.user?._id });

  if (!shelf) {
    throw new ApiError(401, "Shelf Name dosn't exist");
  }

  if (isPartExisted) {
    throw new ApiError(401, "Part number is already Existed");
  }

  const part = await Parts.create({
    partName,
    partNumber,
    MRP,
    Qty,
    shelf: shelf?._id,
    CreatedBy: req.user?._id,
  });

  const createdPart = await Parts.findById(part._id);

  if (!createdPart) {
    throw new ApiError(500, "Something went wrong while creating part");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdPart, "Part is successfully created"));
});

const updatePart = asyncHandler(async (req, res) => {
  const { partNumber, partName, shelf, MRP } = req.body;

  if (
    [partNumber, partName, shelf, MRP].some((val) => String(val).trim() === "")
  ) {
    throw new ApiError(401, "All feilds are required");
  }

  const updatedPart = await Parts.findOneAndUpdate(
    { partNumber, CreatedBy: req.user?._id },
    {
      partName,
      shelf,
      MRP,
    },
    {
      new: true,
    }
  );

  if (!updatedPart) {
    throw new ApiError(401, "Something went wrong while Updating part details");
  }

  res
    .status(201)
    .json(new ApiResponse(201, updatedPart, "Part is successfully updated"));
});

const addQty = asyncHandler(async (req, res) => {
  const { partNumber, Qty } = req.body;

  const part = await Parts.findOne({ partNumber, CreatedBy: req.user?._id });

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

const deletePart = asyncHandler(async (req, res) => {
  const { partNumber } = req.body;

  await Parts.findOneAndDelete({ partNumber, CreatedBy: req.user?._id });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        {},
        `Part Number ${partNumber} is Deleted successfully`
      )
    );
});

const getAllParts = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(401, "User Id is required");
  }

  const isValidRequest = userId == req.user?._id;
  if (!isValidRequest) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const partsCreatedByUser = await Parts.aggregate([
    {
      $match: {
        CreatedBy: req.user?._id,
      },
    },
  ]);

  res
    .status(201)
    .json(
      new ApiResponse(201, partsCreatedByUser, `Parts created by ${userId}`)
    );
});

const getPartsOfShelf = asyncHandler(async (req, res) => {
  const { shelfName } = req.body;

  if (!shelfName) {
    throw new ApiError(401, "Shelf name is required");
  }

  const shelf = await Shelf.findOne({
    shelfName,
    CreatedBy: req.user?._id,
  });

  if (!shelf) {
    throw new ApiError(401, "Shelf is not Exist");
  }

  const partsList = await Parts.aggregate([
    {
      $match: {
        shelf: shelf?._id,
      },
    },
  ]);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        partsList,
        `The Parts in ${shelfName} Shelf is fetched successfully `
      )
    );
});

export {
  createPart,
  updatePart,
  addQty,
  deletePart,
  getAllParts,
  getPartsOfShelf,
};
