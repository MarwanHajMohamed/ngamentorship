import { Model, Document } from "mongoose";

export interface User {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  isMentor?: boolean;
}

export interface UserDocument extends User, Document {
  matchPassword: (password: string) => Promise<Boolean>;
}

export interface UserModel extends Model<UserDocument> {}
