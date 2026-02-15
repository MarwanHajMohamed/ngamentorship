import "./admindashboard.css";
import React, { useEffect, useRef, useState } from "react";
import {
  NavigateFunction,
  Outlet,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { getUsersByRole } from "../../../api/userApi";
import { createGroup } from "../../../api/groupApi";
import { TextField } from "@mui/material";
import MultiSelect from "../../../components/common components/MultiSelect/MultiSelect";
import Modal from "../../../components/common components/Modal/Modal";
import { User } from "../../../types/user";
import { useGroups } from "../../../hooks/useGroups";

type CreateGroupMember = {
  userId: string;
  role: "MENTOR" | "MENTEE";
};

const AdminDahboard = () => {
  const { groups, refetchGroups } = useGroups();

  const navigate: NavigateFunction = useNavigate();
  const isViewingGroup = useMatch("/dashboard/admin/group/:groupId");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mentors, setMentors] = useState<User[]>([]);
  const [mentees, setMentees] = useState<User[]>([]);
  const [groupNumber, setGroupNumber] = useState<number | null>(null);
  const [selectedMentors, setSelectedMentors] = useState<User[]>([]);
  const [selectedMentees, setSelectedMentees] = useState<User[]>([]);
  const groupModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUsersByRole = async (
      role: "MENTOR" | "MENTEE",
      setter: React.Dispatch<React.SetStateAction<User[]>>
    ) => {
      try {
        const data = await getUsersByRole(role);
        setter(data);
      } catch (err: any) {
        console.log(err.response?.data?.message || `Failed to fetch ${role}s`);
      }
    };

    fetchUsersByRole("MENTOR", setMentors);
    fetchUsersByRole("MENTEE", setMentees).then((res) => console.log(res));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        groupModalRef.current &&
        !groupModalRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const submitGroup = async () => {
    if (!groupNumber) return;

    const members: CreateGroupMember[] = [
      ...selectedMentors.map((mentor) => ({
        userId: mentor._id,
        role: "MENTOR" as const,
      })),
      ...selectedMentees.map((mentee) => ({
        userId: mentee._id,
        role: "MENTEE" as const,
      })),
    ];

    try {
      await createGroup({ groupNumber, members });
      await refetchGroups();
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to create group", err);
    }
  };

  const groupModal = () => {
    return (
      <div className="groups-modal-container" ref={groupModalRef}>
        <div>New Group</div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="label">Groups</div>
            <div className="input">
              <TextField
                variant="outlined"
                label="Group"
                type="number"
                value={groupNumber}
                onChange={(e) => setGroupNumber(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="row">
            <div className="label">Mentors</div>
            <div className="input">
              <MultiSelect
                users={mentors}
                selected={selectedMentors}
                setSelected={setSelectedMentors}
              />
            </div>
          </div>
          <div className="row">
            <div className="label">Mentees</div>
            <div className="input">
              <MultiSelect
                users={mentees}
                selected={selectedMentees}
                setSelected={setSelectedMentees}
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={submitGroup}>Create</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="dashboard">
        {!isViewingGroup && (
          <>
            <button onClick={() => setIsOpen(true)} className="new-group">
              + New group
            </button>
            <div className="groups-container">
              <div className="title">Groups</div>
              <div className="groups">
                {groups.map((group) => (
                  <div
                    key={group._id}
                    className="group-container"
                    onClick={() =>
                      navigate(`/dashboard/admin/group/${group._id}`)
                    }
                  >
                    <div className="mentors">
                      {group.members
                        .filter((m) => m.role === "MENTOR")
                        .map((mentor) => (
                          <span className="name" key={mentor.user._id}>
                            {mentor.user.firstName}
                          </span>
                        ))}
                    </div>
                    <div>Group {group.groupNumber}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Outlet />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {groupModal()}
      </Modal>
    </>
  );
};

export default AdminDahboard;
