import mongoose, { Schema, Types } from "mongoose";
import { Group } from "../types/group";

const GroupSchema = new Schema<Group>(
  {
    groupNumber: { type: Number, required: true, unique: true },
    members: [
      {
        user: { type: Types.ObjectId, ref: "User", required: true },
        role: {
          type: String,
          enum: ["ADMIN", "MENTOR", "MENTEE"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Group>("Group", GroupSchema);
