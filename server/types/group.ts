import { Types } from "mongoose";

export type GroupRole = "ADMIN" | "MENTOR" | "MENTEE";

export interface GroupMember {
  user: Types.ObjectId;
  role: GroupRole;
}

export interface Group {
  groupNumber: number;
  members: GroupMember[];
}
