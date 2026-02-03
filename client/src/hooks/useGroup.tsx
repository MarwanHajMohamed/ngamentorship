import { useEffect, useMemo, useState } from "react";
import { getGroupById } from "../api/groupApi";
import { Group } from "../types/group";
import { User } from "../types/user";

export const useGroup = (groupId?: string) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroup = async () => {
    if (!groupId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getGroupById(groupId);
      setGroup(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch group");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [groupId]);

  const mentors: User[] = useMemo(() => {
    return (
      group?.members.filter((m) => m.role === "MENTOR").map((m) => m.user) ?? []
    );
  }, [group]);

  const mentees: User[] = useMemo(() => {
    if (!group) return [];
    return (
      group.members.filter((m) => m.role === "MENTEE").map((m) => m.user) ?? []
    );
  }, [group]);

  return {
    group,
    mentors,
    mentees,
    loading,
    error,
    refetchGroup: fetchGroup,
  };
};
