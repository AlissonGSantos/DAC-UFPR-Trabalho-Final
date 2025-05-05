import Modal from "@/app/components/Modal/Modal";
import Button from "@/app/components/Button/Button";
import React from "react";

interface ConfirmBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  value: string;
  quantity: number;
  milesUsed: number;
}

const ConfirmBookModal: React.FC<ConfirmBookModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  value,
  quantity,
  milesUsed,
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
      <div className="bg-slate-800 px-8 py-2 max-w-md mx-auto">
        <div className="mb-4">
          <p className="text-slate-300 mb-2">
            Você está prestes a reservar <strong>{quantity}</strong>{" "}
            {quantity > 1 ? "assentos" : "assento"}.
          </p>
          <p className="text-slate-300">
            Valor total da reserva: <strong>{value}</strong>
          </p>
          {milesUsed > 0 && (
            <p className="text-slate-300 mt-2">
              Utilizando <strong>{milesUsed}</strong> milhas para esta reserva.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmBookModal;
