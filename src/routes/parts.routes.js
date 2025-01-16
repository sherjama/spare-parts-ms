import { Router } from "express";
import { createPart, addQty } from "../controllers/parts.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-part").post(upload.none(), createPart);
router.route("/add-Qty").patch(upload.none(), addQty);

export default router;
