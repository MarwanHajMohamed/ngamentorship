import express from "express";
import {
  authUser,
  getUserProfile,
  getUsersByRole,
  logoutUser,
  registerUser,
  updateUserDetails,
} from "../controllers/userController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/").get(protect, admin, getUsersByRole);
router.route("/profile").get(protect, getUserProfile);
router.route("/details").put(protect, updateUserDetails);

export default router;
