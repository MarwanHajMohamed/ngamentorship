import { useEffect, useState } from "react";
import { getAllGroups } from "../api/groupApi";
import { Group } from "../types/group";

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllGroups(); // GET /api/group
      setGroups(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return {
    groups,
    loading,
    error,
    refetchGroups: fetchGroups,
  };
};
