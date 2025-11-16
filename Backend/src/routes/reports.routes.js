import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  getPurcaseBills,
  getSellBills,
  getTotalSells,
  getTotalPurchases,
  getMostSoldParts,
} from "../controllers/reports.controller.js";

const router = Router();

router.route("/purchase-bill").get(verifyJWT, getPurcaseBills);
router.route("/sell-bill").get(verifyJWT, getSellBills);
router.route("/get-seles-total").get(verifyJWT, getTotalSells);
router.route("/get-purchse-total").get(verifyJWT, getTotalPurchases);
router.route("/get-most-sold-parts").get(verifyJWT, getMostSoldParts);

export default router;
