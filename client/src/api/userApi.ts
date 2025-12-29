import axios from "axios";
import { User } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

// HANDLE REGISTER
export const handleRegister = async (
  user: User
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

// HANDLE LOGIN
export const handleLogin = async (
  email: string,
  password: string
): Promise<"success" | undefined> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/login`,
      { email, password },
      { withCredentials: true }
    );

    if (response.data) {
      const token = response.data.token;

      if (token) {
        console.log(token);

        localStorage.setItem("authToken", token);
      }
    }

    return "success";
  } catch (error) {
    console.log(error);
  }
};
