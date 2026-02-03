export type UserRole = "ADMIN" | "MENTOR" | "MENTEE";

export interface Group {
  _id: string;
  groupNumber: number;
}

export interface User {
  _id: string;
  firstName: string;
  surname: string;
  email: string;
  dob: string;
  city: string;
  role: UserRole;
  group: Group | null;
}

export type RegisterUser = Omit<User, "_id"> & {
  password: string;
};
