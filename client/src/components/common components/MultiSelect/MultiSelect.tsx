import React from "react";
import { useState } from "react";
import "./multiselect.css";
import { User } from "../../../types/user";

export default function MultiSelect({
  users,
  selected,
  setSelected,
}: {
  users: User[];
  selected: User[];
  setSelected: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  const [input, setInput] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(input.toLowerCase()) &&
      !selected.some((s) => s._id === user._id)
  );

  const addUser = (user: User) => {
    setSelected((prev) => [...prev, user]);
    setInput("");
  };

  const removeUser = (id: string) => {
    setSelected((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div>
      {/* Selected chips */}
      <div className="chip-container">
        {selected.map((user) => (
          <div key={user._id} className="chip">
            {user.firstName}
            <button onClick={() => removeUser(user._id)}>×</button>
          </div>
        ))}

        {/* Input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add member..."
        />
      </div>

      {/* Suggestions */}
      {input && filteredUsers.length > 0 && (
        <ul className="suggestions">
          {filteredUsers.map((user) => (
            <li key={user._id} onClick={() => addUser(user)}>
              {user.firstName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
