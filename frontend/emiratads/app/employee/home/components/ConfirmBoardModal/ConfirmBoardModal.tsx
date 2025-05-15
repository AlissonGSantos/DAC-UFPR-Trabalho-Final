"use client";
import Modal from "@/app/components/Modal/Modal";
import React from "react";
import ConfirmBoardForm from "../ConfirmBoardForm/ConfirmBoardForm";

export interface ConfirmFlightModalProps {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: (bookingCode: string) => void;
}

const ConfirmFlightModal: React.FC<ConfirmFlightModalProps> = ({
  onClose,
  isOpen,
  onConfirm,
}) => {
  return (
    <Modal
      title="Confirmar Embarque do Passageiro"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-10 w-full px-2 py-4 justify-center items-center">
        <div className="flex flex-1 justify-end w-full gap-8 px-8">
          <ConfirmBoardForm onSubmit={onConfirm} onClose={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmFlightModal;
