import asyncHandler from "express-async-handler";
import { Request, Response } from "../types/express";
import groupModel from "../models/groupModel";
import userModel from "../models/userModel";
import mongoose, { Types } from "mongoose";
import { User } from "../models";

/**
 * Get all groups
 * @route GET /api/group
 * @access Private (ADMIN)
 */
const getAllGroups = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(403);
    throw new Error("Not authorized");
  }

  const groups = await groupModel.find().sort({ groupNumber: 1 }).populate({
    path: "members.user",
    select: "firstName surname email role",
  });

  groups.forEach((group) => {
    group.members.forEach((member) => {
      if (!member.user) {
        console.log("Broken member ref:", {
          groupId: group._id,
          role: member.role,
        });
      }
    });
  });

  res.status(200).json(groups);
});

/**
 * Get group by id
 * @route GET /api/group/:id
 * @access Private (ADMIN)
 */
const getGroupById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const { id } = req.params;

    const group = await groupModel.findById(id).populate({
      path: "members.user",
      select: "firstName surname email role dob city group",
    });

    if (!group) {
      res.status(404);
      throw new Error("Group not found");
    }

    // Admin can access any group
    if (req.user.role === "ADMIN") {
      res.status(200).json(group);
      return;
    }

    // Normal users can only access their own group
    if (req.user.group?.toString() !== group._id.toString()) {
      console.log(
        "User group: ",
        req.user.group,
        ", group: ",
        group.groupNumber
      );

      res.status(403);
      throw new Error("Not authorized to view this group");
    }

    res.status(200).json(group);
  }
);

/**
 * Create a new group
 * @route POST /api/group
 * @access Private (ADMIN)
 */
const createGroup = asyncHandler(async (req: Request, res: Response) => {
  if (req.user.role !== "ADMIN") {
    res.status(403);
    throw new Error("Not authorized");
  }

  const { groupNumber, members } = req.body;

  if (!groupNumber || !members?.length) {
    res.status(400);
    throw new Error("Group number and members are required");
  }

  const existingGroup = await groupModel.findOne({ groupNumber });
  if (existingGroup) {
    res.status(409);
    throw new Error("Group already exists");
  }

  const finalMembers = [
    ...members.map((m: any) => ({
      user: m.userId,
      role: m.role,
    })),
  ];

  const group = await groupModel.create({
    groupNumber,
    members: finalMembers,
  });

  await userModel.updateMany(
    {
      _id: { $in: members.map((m: any) => m.userId) },
    },
    {
      $set: { group: group._id },
    }
  );

  res.status(201).json(group);
});

/**
 * Update group members
 * @route PUT /api/group/:id
 * @access Private (ADMIN)
 */
const updateGroupMembers = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(403);
    throw new Error("Not authorized");
  }

  const { id } = req.params;
  const { members, role, userIds } = req.body;

  const group = await groupModel.findById(id);
  if (!group) {
    res.status(404);
    throw new Error("Group not found");
  }

  if (Array.isArray(members)) {
    group.set(
      "members",
      members.map((m) => ({
        user: new mongoose.Types.ObjectId(m.userId),
        role: m.role,
      }))
    );

    await group.save();
    res.status(200).json(group);
    return;
  }

  if (!role || !Array.isArray(userIds)) {
    res.status(400);
    throw new Error("Role and userIds are required");
  }

  userIds.forEach((userId: string) => {
    group.members.push({ user: new mongoose.Types.ObjectId(userId), role });
  });

  await group.save();
  res.status(200).json(group);
});

/**
 * Delete group
 * @route DELETE /api/group/:id
 * @access Private (ADMIN)
 */
const deleteGroup = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(403);
    throw new Error("Not authorized");
  }

  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await User.updateMany(
      { group: id },
      { $set: { group: null } },
      { session }
    );

    const group = await groupModel.findByIdAndDelete(id, { session });

    if (!group) {
      throw new Error("Group not found");
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Group deleted and users updated" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
});

export {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupMembers,
  deleteGroup,
};
