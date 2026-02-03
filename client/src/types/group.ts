import { User } from "./user";

export interface Group {
  _id: string;
  groupNumber: number;
  members: GroupMember[];
}

export interface GroupMember {
  user: User;
  role: "ADMIN" | "MENTOR" | "MENTEE";
}
