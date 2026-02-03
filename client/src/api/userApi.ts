import axios from "axios";
import { RegisterUser, User } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

export type LoginUser = {
  role: "ADMIN" | "MENTOR" | "MENTEE";
  _id: string;
};

// HANDLE REGISTER
export const handleRegister = async (
  user: RegisterUser
): Promise<"success" | "duplicate" | undefined> => {
  try {
    await axios.post(`${API_URL}/api/users`, user);
    return "success";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "User already exists"
        ) {
          console.error("User already exists. Please try a different email.");
          return "duplicate";
        } else {
          console.error(
            `Error: ${error.response.data.message || "Unknown error"}`
          );
        }
      } else if (error.request) {
        console.error("Network error. Please try again later.");
      } else {
        console.error(`Unexpected error: ${error.message}`);
      }
    } else {
      console.error(`Error: ${error}`);
    }
  }
};

export const handleLogin = async (
  email: string,
  password: string
): Promise<LoginUser> => {
  // 1. Login
  const loginRes = await axios.post(
    `${API_URL}/api/users/login`,
    { email, password },
    { withCredentials: true }
  );

  const { token } = loginRes.data;

  if (!token) {
    throw new Error("No token returned");
  }

  localStorage.setItem("authToken", token);

  // 2. Fetch profile
  const profileRes = await axios.get(`${API_URL}/api/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = profileRes.data;

  localStorage.setItem("userRole", user.role);

  return user;
};

// HANDLE LOGOUT
export const handleLogout = async (): Promise<"success" | undefined> => {
  try {
    await axios.post(
      `${API_URL}/api/users/logout`,
      {},
      { withCredentials: true }
    );
    return "success";
  } catch (error) {
    console.error("Error logging out", error);
  }
};

// GET USERS BY ROLE
export const getUsersByRole = async (role: string) => {
  const token = localStorage.getItem("authToken");

  const { data } = await axios.get(`${API_URL}/api/users?role=${role}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
