import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types/user";

const API_URL = "http://localhost:5001";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Logout method
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    window.location.reload();
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
