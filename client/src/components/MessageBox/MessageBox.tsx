import React from "react";
import "./messagebox.css";

interface MessageBoxProps {
  message: string;
  type: "error" | "success";
}

export default function MessageBox({ message, type }: MessageBoxProps) {
  return (
    <div
      className={`message-box ${type === "error" ? "error" : "success"} ${
        message ? "show" : ""
      }`}
    >
      {message}
    </div>
  );
}
