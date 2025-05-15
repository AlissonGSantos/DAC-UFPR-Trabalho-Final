"use client";
import React from "react";
import DataTable from "@/app/components/DataTable/DataTable";
import useFlightTable from "./useFlightTable";
import CancelFlightModal from "../CancelFlightModal/CancelFlightModal";
import ConfirmBoardModal from "../ConfirmBoardModal/ConfirmBoardModal";
import { Flight } from "@/app/types/FlightTypes";
import FinishFlightModal from "../FinishFlightModal/FinishFlightModal";
import Toast from "@/app/components/Toast/Toast";
import BoardSuccessModal from "../BoardSuccessModal/BoardSuccessModal";

const FlightTable: React.FC = () => {
  const {
    data,
    columns,
    controls,
    cancelFlight,
    setIsCancelModalOpen,
    isBoardModalOpen,
    isCancelModalOpen,
    closeConfirmBoard,
    selectedFlight,
    isFinishModalOpen,
    setIsFinishModalOpen,
    onConfirmBoard,
    confirmFinishFlight,
    isToastOpen,
    setIsToastOpen,
    bookingCode,
    boardSuccessModalOpen,
    onCloseBoardSuccessModal,
  } = useFlightTable();

  return (
    <div className="flex w-full justify-center items-center gap-4">
      <Toast
        message={"Ocorreu um erro inesperado, tente novamente mais tarde."}
        type={"ERROR"}
        isOpen={isToastOpen}
        onClose={() => {
          setIsToastOpen(false);
        }}
        duration={3000}
      />
      <DataTable data={data} columns={columns} controls={controls} />
      <ConfirmBoardModal
        onClose={closeConfirmBoard}
        isOpen={isBoardModalOpen}
        onConfirm={onConfirmBoard}
      />
      <CancelFlightModal
        flight={selectedFlight ?? ({} as Flight)}
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
        }}
        onDelete={cancelFlight}
      />
      <FinishFlightModal
        isOpen={isFinishModalOpen}
        onClose={() => {
          setIsFinishModalOpen(false);
        }}
        onConfirm={confirmFinishFlight}
      />
      <BoardSuccessModal
        isOpen={boardSuccessModalOpen}
        onClose={onCloseBoardSuccessModal}
      >
        <div className="flex w-full py-4">
          <p className="text-center text-slate-400">
            O seu embarque da reserva <strong>{bookingCode}</strong> foi
            realizado com sucesso.
          </p>
        </div>
      </BoardSuccessModal>
    </div>
  );
};

export default FlightTable;
