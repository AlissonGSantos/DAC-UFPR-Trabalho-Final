"use client";

import React from "react";
import Modal from "@/app/components/Modal/Modal";
import Button from "@/app/components/Button/Button";
import { Booking } from "@/app/types/BookingTypes";

export interface CancelModalProps {
  booking?: Booking;
  isOpen: boolean;
  onClose: () => void;
  onCancel: (booking: Booking) => void;
}

const CancelBookingModal: React.FC<CancelModalProps> = ({
  booking,
  isOpen,
  onClose,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Cancelar Reserva ${booking?.codigo}`}
    >
      <div>
        <p className="text-slate-300 font-semibold">
          Você tem certeza que deseja cancelar a reserva do voo{" "}
          <span className="font-bold">{booking?.voo?.codigo}</span>?
          <br />
          <span className="text-sm">{`Origem: ${booking?.voo?.aeroporto_origem.nome} `}</span>
          <br />
          <span className="text-sm">
            {`Destino: ${booking?.voo?.aeroporto_destino.nome}`}
          </span>{" "}
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            text="Cancelar"
            type="SECONDARY"
            size="SMALL"
            onClick={onClose}
            extraClass=""
          />
          <Button
            text={"Confirmar"}
            type={"DANGER"}
            size="SMALL"
            onClick={() => {
              onCancel(booking as Booking);
            }}
            extraClass=""
          />
        </div>
      </div>
    </Modal>
  );
};

export default CancelBookingModal;
