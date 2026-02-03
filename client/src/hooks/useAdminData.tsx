import { useEffect, useState } from "react";
import { getUsersByRole } from "../api/userApi";
import { getAllGroups } from "../api/groupApi";
import { User } from "../types/user";
import { Group } from "../types/group";

export const useAdminData = () => {
  const [mentors, setMentors] = useState<User[]>([]);
  const [mentees, setMentees] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const [mentorData, menteeData, groupData] = await Promise.all([
          getUsersByRole("MENTOR"),
          getUsersByRole("MENTEE"),
          getAllGroups(),
        ]);

        setMentors(mentorData);
        setMentees(menteeData);
        setGroups(groupData);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return {
    mentors,
    mentees,
    groups,
    loading,
    error,
  };
};
