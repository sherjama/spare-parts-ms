import { Router } from "express";
import { createShelf } from "../controllers/shelf.controller.js";

const router = Router();

router.route("/create-shelf").post(createShelf);

export default router;
