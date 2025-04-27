import React from "react";
import Modal from "@/app/components/Modal/Modal";
import Button from "@/app/components/Button/Button";
import { Booking } from "@/app/types/BookingTypes";

interface CheckinModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CheckinModal: React.FC<CheckinModalProps> = ({
  booking,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !booking) return null;

  const flightDate = new Date(booking.voo.data).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmação de Check-in">
      <div className="p-4 flex flex-col gap-4">
        <div className="bg-slate-800 p-4 rounded-lg">
          <h3 className="text-slate-300 text-lg mb-2">Detalhes do Voo</h3>
          <p className="text-slate-400">
            <strong>Código do Voo:</strong> {booking.voo.codigo}
          </p>
          <p className="text-slate-400">
            <strong>Data/Hora:</strong> {flightDate}
          </p>
          <p className="text-slate-400">
            <strong>Origem:</strong>{" "}
            {`${booking.voo.aeroporto_origem.codigo} - ${booking.voo.aeroporto_origem.cidade}-${booking.voo.aeroporto_origem.uf}`}
          </p>
          <p className="text-slate-400">
            <strong>Destino:</strong>{" "}
            {`${booking.voo.aeroporto_destino.codigo} - ${booking.voo.aeroporto_destino.cidade}-${booking.voo.aeroporto_destino.uf}`}
          </p>
          <p className="text-slate-400">
            <strong>Código da Reserva:</strong> {booking.codigo}
          </p>
        </div>

        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-slate-300">
            <strong>Importante:</strong> Ao realizar o check-in, você confirma que estará presente para o embarque. 
            Compareça ao aeroporto com no mínimo 2 horas de antecedência ao horário do voo.
          </p>
        </div>

        <div className="border-t border-slate-700 pt-4 mt-2 flex justify-between gap-4">
          <Button
            text="Cancelar"
            type="SECONDARY"
            size="MEDIUM"
            onClick={onClose}
          />
          <Button
            text="Confirmar Check-in"
            type="PRIMARY"
            size="MEDIUM"
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CheckinModal;