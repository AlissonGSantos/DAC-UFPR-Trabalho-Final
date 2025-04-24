import React from "react";
import Modal from "@/app/components/Modal/Modal";
import Button from "@/app/components/Button/Button";
import { CheckCircle } from "phosphor-react";

interface CheckinSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  subtitle?: string;
}

const CheckinSuccessModal: React.FC<CheckinSuccessModalProps> = ({
  isOpen,
  onClose,
  message,
  subtitle,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Check-in Realizado">
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold text-slate-300 text-center">{message}</h3>
        <CheckCircle size={32} weight="fill" className="text-green-400" />
      </div>
      {subtitle && <p className="text-slate-400 text-center">{subtitle}</p>}

        
        <div className="mt-6 w-full">
          <Button
            text="Fechar"
            type="PRIMARY"
            size="MEDIUM"
            onClick={onClose}
            extraClass="w-full"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CheckinSuccessModal;