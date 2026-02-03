import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types/user";
import { handleLogout } from "../api/userApi";
import { NavigateFunction, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate();

  // Logout method
  const logout = () => {
    handleLogout();
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError("Failed to fetch user details");
        setIsLoading(false);
        logout();
      }
    };

    fetchUserDetails();
  }, []);

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  };

  return {
    user,
    isLoading,
    error,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };
}
