import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  changeLogoImage,
  getCurrentUser,
  updateAccountDetails,
  checkAuth,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("logo"), registerUser);
router.route("/login-user").post(upload.none(), loginUser);
router.route("/logout-user").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/change-password")
  .patch(verifyJWT, upload.none(), changeCurrentPassword);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
router
  .route("/update-user")
  .patch(verifyJWT, upload.none(), updateAccountDetails);
router
  .route("/change-logo")
  .patch(verifyJWT, upload.single("logo"), changeLogoImage);
router.route("/check-auth").get(verifyJWT, upload.none(), checkAuth);

export default router;
