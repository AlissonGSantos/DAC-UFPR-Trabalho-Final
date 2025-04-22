import Modal from "@/app/components/Modal/Modal";
import React from "react";

interface ConfirmBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  value?: string;
  quantity?: number;
}

const ConfirmBookModal: React.FC<ConfirmBookModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  value,
  quantity,
}) => {
  return (
    <Modal
      title="Confirmar reserva"
      isOpen={isOpen}
      onClose={onClose}
      controls={[
        {
          text: "Cancelar",
          onClick: onCancel,
          type: "SECONDARY",
        },
        {
          text: "Confirmar",
          onClick: onConfirm,
          type: "PRIMARY",
        },
      ]}
    >
      <div className="flex flex-col gap-4 text-slate-300">
        <p>Tem certeza que deseja reservar este voo?</p>
        <p>Valor: {value}</p>
        <p>Quantidade de passagens: {quantity}</p>
      </div>
    </Modal>
  );
};

export default ConfirmBookModal;
