import React, { useEffect, useMemo, useRef, useState } from "react";
import "./managegroup.css";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useGroup } from "../../../../hooks/useGroup";
import Modal from "../../../../components/common components/Modal/Modal";
import MultiSelect from "../../../../components/common components/MultiSelect/MultiSelect";
import { User } from "../../../../types/user";
import { getUsersByRole } from "../../../../api/userApi";
import { deleteGroup, updateGroup } from "../../../../api/groupApi";

const ManageGroup = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate: NavigateFunction = useNavigate();

  const { group, mentors, mentees, loading, error, refetchGroup } =
    useGroup(groupId);

  const [editedMentors, setEditedMentors] = useState<User[]>([]);
  const [editedMentees, setEditedMentees] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingModal, setEditingModal] = useState<"MENTOR" | "MENTEE">();
  const [selectedMentors, setSelectedMentors] = useState<User[]>([]);
  const [selectedMentees, setSelectedMentees] = useState<User[]>([]);
  const [allMentors, setAllMentors] = useState<User[]>([]);
  const [allMentees, setAllMentees] = useState<User[]>([]);

  const menteeModalRef = useRef<HTMLDivElement | null>(null);

  const buildMembers = (mentors: User[], mentees: User[]) => [
    ...mentors.map((u) => ({ userId: u._id, role: "MENTOR" as const })),
    ...mentees.map((u) => ({ userId: u._id, role: "MENTEE" as const })),
  ];

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

    fetchUsersByRole("MENTOR", setAllMentors);
    fetchUsersByRole("MENTEE", setAllMentees);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menteeModalRef.current &&
        !menteeModalRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setEditedMentors(mentors);
  }, [mentors]);

  useEffect(() => {
    setEditedMentees(mentees);
  }, [mentees]);

  const hasChanges = useMemo(() => {
    const originalMembers = buildMembers(mentors, mentees).sort((a, b) =>
      a.userId.localeCompare(b.userId)
    );

    const editedMembers = buildMembers(editedMentors, editedMentees).sort(
      (a, b) => a.userId.localeCompare(b.userId)
    );

    return JSON.stringify(originalMembers) !== JSON.stringify(editedMembers);
  }, [mentors, mentees, editedMentors, editedMentees]);

  const removeMentee = (id: string) => {
    setEditedMentees((prev) => prev.filter((m) => m._id !== id));
  };

  const removeMentor = (id: string) => {
    setEditedMentors((prev) => prev.filter((m) => m._id !== id));
  };

  const handleSave = async () => {
    if (!groupId) return;

    try {
      await updateGroup(groupId, {
        role: editingModal,
        userIds:
          editingModal === "MENTOR"
            ? selectedMentors.map((u) => u._id)
            : selectedMentees.map((u) => u._id),
      });

      setIsOpen(false);

      refetchGroup();
    } catch (err) {
      console.error("Failed to update group", err);
    }
  };

  const handleSaveChanges = async () => {
    if (!groupId) return;

    const members = buildMembers(editedMentors, editedMentees);

    try {
      await updateGroup(groupId, { members });

      refetchGroup();
    } catch (err) {
      console.error("Failed to update group", err);
    }
  };

  const handleDeleteGroup = async () => {
    if (!groupId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this group? This cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteGroup(groupId);

      navigate("/dashboard/admin");
    } catch (err) {
      console.error("Failed to delete group", err);
    }
  };

  const modal = () => {
    return (
      <div className="groups-modal-container" ref={menteeModalRef}>
        <div>Add {editingModal?.toLowerCase()}</div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="label">
              {editingModal?.charAt(0)}
              {editingModal?.slice(1, editingModal.length).toLowerCase()}
            </div>
            <div className="input">
              <MultiSelect
                users={editingModal === "MENTEE" ? allMentees : allMentors}
                selected={
                  editingModal === "MENTEE" ? selectedMentees : selectedMentors
                }
                setSelected={
                  editingModal === "MENTEE"
                    ? setSelectedMentees
                    : setSelectedMentors
                }
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <>
      <div className="manage-group-container">
        <div className="group-header">
          <button>
            <i
              className="fa-solid fa-arrow-left"
              onClick={() => navigate("/dashboard/admin")}
            ></i>
          </button>
          <div>
            Group {group?.groupNumber} -{" "}
            {mentors.map((mentor, ind) => {
              return (
                <span className="name" key={mentor._id}>
                  {mentor.firstName}
                  {ind < mentors.length - 1 && ", "}
                </span>
              );
            })}
            <span className="trash">
              <i
                className="fa-solid fa-trash-can"
                onClick={handleDeleteGroup}
              ></i>
            </span>
          </div>
        </div>
        <div className="group-mentors">
          <div>Mentor</div>
          <div className="edit-mentors">
            <button
              className="new-mentor"
              onClick={() => {
                setIsOpen(true);
                setEditingModal("MENTOR");
              }}
            >
              + New mentor
            </button>
            <div className="mentors">
              {editedMentors.map((mentor) => (
                <div className="mentor" key={mentor._id}>
                  {mentor.firstName}
                  <button>
                    <span onClick={() => removeMentor(mentor._id)}>×</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="group-mentees">
          <div>Mentees</div>
          <div className="edit-mentees">
            <div className="mentees">
              <button
                className="new-mentee"
                onClick={() => {
                  setIsOpen(true);
                  setEditingModal("MENTEE");
                }}
              >
                + New mentee
              </button>
              {editedMentees.map((mentee) => (
                <div className="mentee" key={mentee._id}>
                  {mentee.firstName}
                  <button>
                    <span onClick={() => removeMentee(mentee._id)}>×</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {hasChanges && (
          <div className="save">
            <button
              onClick={() => {
                setEditedMentors(mentors);
                setEditedMentees(mentees);
              }}
            >
              Cancel
            </button>

            <button onClick={handleSaveChanges}>Save</button>
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modal()}
      </Modal>
    </>
  );
};

export default ManageGroup;
