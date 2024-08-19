"use client";

import "./style.scss";

type AlertBoxProps = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
};

function AlertBox({ message, type = "info", onClose }: AlertBoxProps) {
  return (
    <div className={`alert-box alert-${type}`}>
      <span className="alert-message">{message}</span>
      <button
        className="alert-close"
        onClick={() => {
          onClose && onClose();
        }}
      >
        &times;
      </button>
    </div>
  );
}

export default AlertBox;
