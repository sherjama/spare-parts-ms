import { Router } from "express";
import { createShelf } from "../controllers/shelf.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-shelf").post(upload.none(), createShelf);

export default router;
