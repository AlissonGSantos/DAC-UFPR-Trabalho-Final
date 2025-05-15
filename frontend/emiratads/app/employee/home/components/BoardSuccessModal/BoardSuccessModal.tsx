import Modal, { ModalProps } from "@/app/components/Modal/Modal";
import React from "react";

const BoardSuccessModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal
      title="Embarque realizado com sucesso"
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </Modal>
  );
};

export default BoardSuccessModal;
