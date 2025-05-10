"use client";
import React from "react";
import DataTable from "@/app/components/DataTable/DataTable";
import useFlightTable from "./useFlightTable";
import CancelFlightModal from "../CancelFlightModal/CancelFlightModal";
import ConfirmBoardModal from "../ConfirmBoardModal/ConfirmBoardModal";
import { Flight } from "@/app/types/FlightTypes";
import FinishFlightModal from "../FinishFlightModal/FinishFlightModal";

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
  } = useFlightTable();

  return (
    <div className="flex w-full justify-center items-center gap-4">
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
        flight={selectedFlight ?? ({} as Flight)}
        isOpen={isFinishModalOpen}
        onClose={() => {
          setIsFinishModalOpen(false);
        }}
        onConfirm={confirmFinishFlight}
      />
    </div>
  );
};

export default FlightTable;
