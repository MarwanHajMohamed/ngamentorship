import { Model, Document } from "mongoose";

export interface User {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  dob: string;
  city: string;
  role: "ADMIN" | "MENTOR" | "MENTEE";
  group?: number | null;
}

export interface UserDocument extends User, Document {
  matchPassword: (password: string) => Promise<Boolean>;
}

export interface UserModel extends Model<UserDocument> {}
