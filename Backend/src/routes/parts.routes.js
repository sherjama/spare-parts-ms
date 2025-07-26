import { Router } from "express";
import {
  buyParts,
  createPart,
  updatePart,
  addQty,
  deletePart,
  getAllParts,
  getPartsOfShelf,
  sellParts,
  sellReceipt,
} from "../controllers/parts.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/buy-part").post(verifyJWT, upload.none(), buyParts);

router.route("/sell-part").post(verifyJWT, upload.none(), sellParts);

router.route("/sell-receipt").get(verifyJWT, upload.none(), sellReceipt);

router.route("/create-part").post(verifyJWT, upload.none(), createPart);

router
  .route("/update-part-details")
  .patch(verifyJWT, upload.none(), updatePart);

router.route("/add-Qty").patch(verifyJWT, upload.none(), addQty);

router.route("/delete-part").delete(verifyJWT, upload.none(), deletePart);

router.route("/get-parts").get(verifyJWT, upload.none(), getAllParts);

router.route("/get-shelf-parts").get(verifyJWT, upload.none(), getPartsOfShelf);

export default router;
