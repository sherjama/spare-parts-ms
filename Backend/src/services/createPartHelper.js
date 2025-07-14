import { Parts } from "../models/parts.models.js";
import { Shelf } from "../models/shelves.models.js";
import { ApiError } from "../utils/ApiError.js";

export const createPartHelper = async (part, userId) => {
  const { partNumber, partName, Price, Qty } = part;

  if (
    [partName, partNumber, Price, Qty].some((val) => String(val).trim() === "")
  ) {
    throw new ApiError(401, "All fields are required");
  }

  const isPartExisted = await Parts.findOne({ partNumber, CreatedBy: userId });

  if (isPartExisted) {
    throw new ApiError(401, "Part number already exists");
  }

  const noneShelve = await Shelf.findOne({ CreatedBy: userId });

  const newPart = await Parts.create({
    partName,
    partNumber,
    Price,
    Qty,
    shelf: noneShelve?._id,
    CreatedBy: userId,
  });

  return newPart;
};
