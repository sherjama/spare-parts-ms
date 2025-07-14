import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Parts } from "../models/parts.models.js";
import { Shelf } from "../models/shelves.models.js";
import { Buy } from "../models/buyReceipt.models.js";
import { createPartHelper } from "../services/createPartHelper.js";
import { addQtyHelper } from "../services/addPartHelper.js";

const buyParts = asyncHandler(async (req, res) => {
  const { vendorBillNo, vendorName, parts, date } = req.body;

  if (!vendorBillNo || !vendorName || !parts || !Array.isArray(parts)) {
    throw new ApiError(400, "Invalid request data");
  }

  const partIds = [];

  for (const part of parts) {
    let existingPart = await Parts.findOne({ partNumber: part.partNumber });

    if (!existingPart) {
      const newPart = await createPartHelper(part, req.user._id);
      partIds.push(newPart._id);
    } else {
      await addQtyHelper(part.partNumber, part.Qty, req.user._id);
      partIds.push(existingPart._id);
    }
  }

  try {
    const createReceipt = await Buy.create({
      vendorBillNo,
      vendorName,
      parts: partIds,
      buyer: req.user._id,
      buyDate: date,
    });

    if (!createReceipt) {
      throw new ApiError(501, "Something went wrong while generating invoice");
    }
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      throw new ApiError(
        400,
        `Duplicate value: '${value}' already exists for '${field}'`
      );
    }
    throw err;
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, createReceipt, "Invoice generated successfully")
    );
});

const createPart = asyncHandler(async (req, res) => {
  const { partNumber, partName, Price, Qty } = req.body;

  if (
    [partName, partNumber, Price, Qty].some((val) => String(val).trim() === "")
  ) {
    throw new ApiError(401, "All feilds are required");
  }

  const isPartExisted = await Parts.findOne({
    partNumber,
    CreatedBy: req.user?._id,
  });

  if (isPartExisted) {
    throw new ApiError(401, "Part number is already Existed");
  }

  const noneShelve = await Shelf.findOne({ CreatedBy: req.user?._id });

  const part = await Parts.create({
    partName,
    partNumber,
    Price,
    Qty,
    shelf: noneShelve?._id,
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
  const { partNumber, partName, shelf, Price } = req.body;

  if (
    [partNumber, partName, shelf, Price].some(
      (val) => String(val).trim() === ""
    )
  ) {
    throw new ApiError(401, "All feilds are required");
  }

  const updatedPart = await Parts.findOneAndUpdate(
    { partNumber, CreatedBy: req.user?._id },
    {
      partName,
      shelf,
      Price,
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

  const addedQuantity = part.Qty + Qty;

  const updatedPart = await Parts.findByIdAndUpdate(
    part._id,
    {
      $set: {
        addedQuantity,
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
  const { userId } = req.query;

  console.log("backend", userId);

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
  const { shelfName } = req.query;

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
  buyParts,
  createPart,
  updatePart,
  addQty,
  deletePart,
  getAllParts,
  getPartsOfShelf,
};
