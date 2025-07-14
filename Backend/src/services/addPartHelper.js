import { Parts } from "../models/parts.models.js";
import { ApiError } from "../utils/ApiError.js";

export const addQtyHelper = async (partNumber, Qty, userId) => {
  const part = await Parts.findOne({ partNumber, CreatedBy: userId });

  console.log(partNumber, Qty, userId);

  if (!part) {
    throw new ApiError(401, "Part with this part number is not Exist");
  }

  const addedQuantity = part.Qty + Qty;

  console.log("add ....", addedQuantity);

  const updatedPart = await Parts.findByIdAndUpdate(
    part._id,
    {
      $set: {
        Qty: addedQuantity,
      },
    },
    { new: true }
  );

  return updatedPart;
};
