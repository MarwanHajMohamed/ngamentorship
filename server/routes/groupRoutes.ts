import express from "express";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
  updateGroupMembers,
} from "../controllers/groupController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(protect, createGroup);
router.route("/").get(protect, getAllGroups);
router.route("/:id").get(protect, getGroupById);
router.put("/:id", protect, updateGroupMembers);
router.delete("/:id", protect, deleteGroup);

export default router;
