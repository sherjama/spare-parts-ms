import { Router } from "express";
import {
  createPart,
  updatePart,
  addQty,
  deletePart,
  getAllParts,
} from "../controllers/parts.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-part").post(verifyJWT, upload.none(), createPart);
router.route("/update-part-details").patch(upload.none(), updatePart);
router.route("/add-Qty").patch(upload.none(), addQty);
router.route("/delete-part").delete(upload.none(), deletePart);
router.route("/get-parts").get(verifyJWT, upload.none(), getAllParts);

export default router;
