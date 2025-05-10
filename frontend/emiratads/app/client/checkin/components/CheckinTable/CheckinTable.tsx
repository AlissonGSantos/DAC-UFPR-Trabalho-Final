"use client";

import React from "react";
import DataTable from "@/app/components/DataTable/DataTable";
import useCheckinTable from "./useCheckinTable";
import CheckinModal from "../CheckinModal/CheckinModal";
import CheckinSuccessModal from "../CheckinSuccessModal/CheckinSuccessModal";

const CheckinTable: React.FC = () => {
  const {
    eligibleBookings,
    columns,
    controls,
    isCheckinModalOpen,
    isSuccessModalOpen,
    selectedBooking,
    onDismissCheckinModal,
    onDismissSuccessModal,
    onPerformCheckin,
  } = useCheckinTable();

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-slate-300 mb-4">Check-in de Voos</h1>
      <p className="text-slate-400 mb-6">
        Realize o check-in para seus voos das próximas 48 horas
      </p>
      
      {eligibleBookings.length === 0 ? (
        <div className="text-center py-8 bg-slate-800 rounded-lg">
          <p className="text-slate-300">
            Você não possui voos elegíveis para check-in nas próximas 48 horas.
          </p>
        </div>
      ) : (
        <DataTable
          data={eligibleBookings}
          columns={columns}
          controls={controls}
        />
      )}
      
      {selectedBooking && (
        <CheckinModal
          booking={selectedBooking}
          isOpen={isCheckinModalOpen}
          onClose={onDismissCheckinModal}
          onConfirm={() => onPerformCheckin(selectedBooking)}
        />
      )}
      
      <CheckinSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={onDismissSuccessModal}
        message="Check-in realizado com sucesso!"
        subtitle="Seu voo está confirmado."
      />
    </div>
  );
};

export default CheckinTable;