import { useEffect } from "react";
import { ToastProps } from "./Toast";

const useToast = ({ isOpen, onClose, duration }: ToastProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  
};
export default useToast;
