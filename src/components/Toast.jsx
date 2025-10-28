import React from "react";

const Toast = ({ message, type = "success" }) => {
  if (!message) return null;

  const alertType =
    type === "error"
      ? "alert-error"
      : type === "warning"
      ? "alert-warning"
      : "alert-success";

  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${alertType}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
