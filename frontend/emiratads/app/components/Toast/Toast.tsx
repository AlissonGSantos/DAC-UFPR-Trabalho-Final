import React from "react";
import useToast from "./useToast";

export interface ToastProps {
  message: string;
  type: "SUCCESS" | "ERROR";
  isOpen: boolean;
  onClose: () => void;
  duration: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isOpen,
  onClose,
  duration,
}) => {
  useToast({
    message,
    type,
    isOpen,
    onClose,
    duration,
  });

  return (
    <div
      className={`fixed flex top-1/4  justify-between left-16 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-transform duration-300 ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      } ${
        type === "SUCCESS"
          ? "bg-green-400 border-2 border-green-500"
          : "bg-red-400 border-2 border-red-500"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex text-md uppercase">{message}</div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-3xl cursor-pointer transition mb-2"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
