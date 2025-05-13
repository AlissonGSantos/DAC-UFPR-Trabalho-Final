"use client";

import React from "react";
import Modal from "@/app/components/Modal/Modal";
import Button from "@/app/components/Button/Button";
export interface FinishFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const FinishFlightModal: React.FC<FinishFlightModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Finalizar Voo">
      <div>
        <p className="text-slate-300 font-semibold">
          Deseja confirmar que este voo foi realizado? Reservas no estado
          EMBARCADO serão marcadas como REALIZADA. As demais como NÃO REALIZADA.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            text="Voltar"
            type="SECONDARY"
            size="SMALL"
            onClick={onClose}
            extraClass=""
          />
          <Button
            text="Confirmar Realização"
            type="SUCCESS"
            size="SMALL"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            extraClass=""
          />
        </div>
      </div>
    </Modal>
  );
};

export default FinishFlightModal;
