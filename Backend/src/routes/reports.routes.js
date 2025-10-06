import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  getPurcaseBills,
  getSellBills,
} from "../controllers/reports.controller.js";

const router = Router();

router.route("/purchase-bill").get(verifyJWT, getPurcaseBills);
router.route("/sell-bill").get(verifyJWT, getSellBills);

export default router;
