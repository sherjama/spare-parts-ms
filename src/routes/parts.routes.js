import { Router } from "express";
import { createPart, addQty } from "../controllers/parts.controller.js";

const router = Router();

router.route("/create-part").post(createPart);
router.route("/add-Qty").post(addQty);

export default router;
