import { Router } from "express";
import {
  createShelf,
  changeShelfName,
  deleteShelf,
} from "../controllers/shelf.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-shelf").post(verifyJWT, upload.none(), createShelf);
router.route("/update-shelf-name").patch(upload.none(), changeShelfName);
router.route("/delete-shelf").delete(upload.none(), deleteShelf);

export default router;
