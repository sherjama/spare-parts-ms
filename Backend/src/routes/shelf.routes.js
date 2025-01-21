import { Router } from "express";
import {
  createShelf,
  changeShelfName,
  deleteShelf,
  listShelfs,
} from "../controllers/shelf.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-shelf").post(verifyJWT, upload.none(), createShelf);
router
  .route("/update-shelf-name")
  .patch(verifyJWT, upload.none(), changeShelfName);
router.route("/delete-shelf").delete(verifyJWT, upload.none(), deleteShelf);
router.route("/list-shelf").get(verifyJWT, upload.none(), listShelfs);

export default router;
