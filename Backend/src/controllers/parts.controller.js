import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Parts } from "../models/parts.models.js";
import { Counter } from "../models/counter.models.js";
import { Shelf } from "../models/shelves.models.js";
import { Buy } from "../models/buyReceipt.models.js";
import { Sell } from "../models/sellReceipt.models.js";
import { PartList } from "../models/partList.models.js";
import { createPartHelper } from "../services/createPartHelper.js";
import { addQtyHelper } from "../services/addPartHelper.js";
import ejs from "ejs";
import { User } from "../models/user.models.js";

const buyParts = asyncHandler(async (req, res) => {
  const { vendorBillNo, vendorName, parts, date } = req.body;

  console.log(req.user._id);

  if (
    !vendorBillNo ||
    !vendorName ||
    !parts ||
    !date ||
    !Array.isArray(parts)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const partIds = [];

  for (const part of parts) {
    let existingPart = await Parts.findOne({
      partNumber: part.partNumber,
      CreatedBy: req.user?._id,
    });

    if (!existingPart) {
      // create part if not exist
      const newPart = await createPartHelper(part, req.user._id);

      const PartDetails = await PartList.create({
        partDetails: newPart._id,
        Qty: part.Qty,
        unitPrice: part.Price,
      });

      if (!PartDetails) {
        throw new ApiError(
          401,
          "Something went wrong while getting part details"
        );
      }

      partIds.push(PartDetails._id);
    } else {
      // add qty if already exist
      await addQtyHelper(part.partNumber, part.Qty, part.Price, req.user._id);

      const PartDetails = await PartList.create({
        partDetails: existingPart._id,
        Qty: part.Qty,
        unitPrice: part.Price,
      });

      if (!PartDetails) {
        throw new ApiError(
          401,
          "Something went wrong while getting part details"
        );
      }

      partIds.push(PartDetails._id);
    }
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { user: req.user._id, counterType: "purchase" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const billNo = `${req.user.username}-P-${counter.seq}`;

    const createReceipt = await Buy.create({
      vendorBillNo,
      vendorName,
      partsDetails: partIds,
      buyer: req.user._id,
      buyDate: date,
      billNo,
    });

    if (!createReceipt) {
      throw new ApiError(501, "Something went wrong while generating invoice");
    }

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          createReceipt,
          "Purchase invoice generated successfully"
        )
      );
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
});

const sellParts = asyncHandler(async (req, res) => {
  const { customerName, address, mobileNumber, parts, date, discount, other } =
    req.body;

  if (
    !customerName?.trim() ||
    !address?.trim() ||
    !mobileNumber?.trim() ||
    !date ||
    !Array.isArray(parts) ||
    parts.length === 0 ||
    discount === undefined ||
    discount === null ||
    other === undefined ||
    other === null
  ) {
    throw new ApiError(401, "All fields are required");
  }

  const partIds = [];

  try {
    for (const part of parts) {
      const sellPart = await Parts.findOne({
        partNumber: part.partNumber,
        CreatedBy: req.user?._id,
      });

      if (!sellPart || sellPart.Qty <= 0) {
        throw new ApiError(
          401,
          `Part number: ${part.partNumber} is not available in inventory`
        );
      }

      if (part.Qty > sellPart.Qty) {
        throw new ApiError(
          401,
          `Current Available Quantity in Inventory for Part Number ${part.partNumber} is : ${sellPart.Qty}. So, Quantity cannot be entered more than the Available Quantity`
        );
      }
      const PartDetails = await PartList.create({
        partDetails: sellPart._id,
        Qty: part.Qty,
        unitPrice: part.Price,
      });

      partIds.push(PartDetails._id);

      const finalQty = sellPart.Qty - part.Qty;
      const updateQty = await sellPart.updateOne({ Qty: finalQty });

      if (!updateQty) {
        throw new ApiError(401, "There is a problem while updating part Qty");
      }
    }

    const counter = await Counter.findOneAndUpdate(
      { user: req.user?._id, counterType: "sell" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (!counter) throw new ApiError(401, "Counter problem");

    const sellReceipt = await Sell.create({
      customerName,
      address,
      mobileNumber,
      date,
      discount,
      other,
      partDetails: partIds,
      seller: req.user?._id,
      billNo: `${req.user.username}-S-${counter.seq}`,
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, sellReceipt, "Sell receipt generated successfully")
      );
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
});

const getUpdatedPartDetails = async (partIds) => {
  // Fetch all PartList documents concurrently
  const parts = await Promise.all(partIds.map((id) => PartList.findById(id)));

  if (parts.some((p) => !p)) {
    throw new ApiError(500, "Failed to fetch part details from PartList");
  }

  // Fetch all Parts documents concurrently
  const partDetails = await Promise.all(
    parts.map((part) => Parts.findById(part.partDetails))
  );

  if (partDetails.some((p) => !p)) {
    throw new ApiError(
      500,
      "Failed to fetch part details from Parts collection"
    );
  }

  // Merge PartList and Parts info
  return parts.map((partDoc) => {
    const part = partDoc._doc || partDoc;
    const partInfo = partDetails.find(
      (info) => info._id.toString() === part.partDetails.toString()
    );
    return {
      ...part,
      partInfo: partInfo || null,
    };
  });
};

const calculateTotals = (partDetails, discount = 0, otherAmount = 0) => {
  const subTotal = partDetails.reduce((sum, part) => {
    const val = Number(part?.totalAmount);
    return isNaN(val) ? sum : sum + val;
  }, 0);

  const total = subTotal + Number(otherAmount || 0) - Number(discount || 0);

  return {
    subTotal,
    discountAmount: Number(discount || 0),
    otherAmount: Number(otherAmount || 0),
    Total: total,
  };
};

const purchaseReceipt = asyncHandler(async (req, res) => {
  const { billNo } = req.query;

  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(401, "User not found");

  const purchase = await Buy.findOne({ billNo });
  if (!purchase) throw new ApiError(404, "Purchase bill not found");

  const updatedPartDetails = await getUpdatedPartDetails(purchase.partsDetails);

  const Total = updatedPartDetails.reduce((sum, part) => {
    return sum + Number(part.totalAmount || 0);
  }, 0);

  const formatAmount = (value) =>
    isNaN(Number(value)) ? "0.00" : Number(value).toFixed(2);

  const html = await ejs.renderFile("src/views/purchaseInvoice.ejs", {
    purchase,
    partDetails: updatedPartDetails,
    user,
    Total,
    formatAmount,
  });

  res.send(html);
});

const sellReceipt = asyncHandler(async (req, res) => {
  const { billNo } = req.query;

  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(401, "User not found");

  const sell = await Sell.findOne({ billNo });
  if (!sell) throw new ApiError(404, "Sell bill not found");

  const updatedPartDetails = await getUpdatedPartDetails(sell.partDetails);

  const { discount, other } = sell;
  const totals = calculateTotals(updatedPartDetails, discount, other);

  const formatAmount = (value) =>
    isNaN(Number(value)) ? "0.00" : Number(value).toFixed(2);

  const html = await ejs.renderFile("src/views/sellInvoice.ejs", {
    sell,
    partDetails: updatedPartDetails,
    user,
    sellerName: user.username,
    ...totals,
    formatAmount,
  });

  res.send(html);
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

  if (!partNumber) {
    throw new ApiError(400, "Part number is required");
  }

  const existingPart = await Parts.findOne({
    partNumber,
    CreatedBy: req.user?._id,
  });

  if (!existingPart) {
    throw new ApiError(404, "Part not found");
  }

  const updatedData = {
    partName: partName?.trim() || existingPart.partName,
    shelf: shelf?.trim() || existingPart.shelf,
    Price: Price ?? existingPart.Price,
  };

  const updatedPart = await Parts.findOneAndUpdate(
    { partNumber, CreatedBy: req.user?._id },
    { $set: updatedData },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedPart, "Part details updated successfully")
    );
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
  sellParts,
  purchaseReceipt,
  sellReceipt,
  createPart,
  updatePart,
  addQty,
  deletePart,
  getAllParts,
  getPartsOfShelf,
};
