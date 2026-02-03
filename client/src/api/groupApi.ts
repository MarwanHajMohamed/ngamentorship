import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

export interface CreateGroupPayload {
  groupNumber: number;
  members: {
    userId: string;
    role: "MENTOR" | "MENTEE";
  }[];
}

// GET ALL GROUPS
export const getAllGroups = async () => {
  const token = localStorage.getItem("authToken");

  const response = await axios.get(`${API_URL}/api/group`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// GET GROUP BY ID
export const getGroupById = async (groupId: string) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.get(`${API_URL}/api/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// CREATE NEW GROUP
export const createGroup = async (data: CreateGroupPayload) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.post(`${API_URL}/api/group`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};

// UPDATE GROUP
export const updateGroup = async (
  groupId: string,
  data: Partial<CreateGroupPayload>
) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.put(`${API_URL}/api/group/${groupId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};

// DELETE GROUP
export const deleteGroup = async (groupId: string) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.delete(`${API_URL}/api/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
