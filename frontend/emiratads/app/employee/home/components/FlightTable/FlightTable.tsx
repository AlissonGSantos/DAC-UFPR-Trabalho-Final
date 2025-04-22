"use client";
import React from "react";
import DataTable from "@/app/components/DataTable/DataTable";
import useFlightTable from "./useFlightTable";
import CancelFlightModal from "../CancelFlightModal/CancelFlightModal";
import ConfirmBoardModal from "../ConfirmBoardModal/ConfirmBoardModal";
import { Flight } from "@/app/types/FlightTypes";

const FlightTable: React.FC = () => {
  const { data, columns, controls, cancelFlight, setIsCancelModalOpen, isBoardModalOpen, isCancelModalOpen, closeConfirmBoard, selectedFlight } = useFlightTable();

  return (
    <div>
      <DataTable data={data} columns={columns} controls={controls} />
      <ConfirmBoardModal onClose={closeConfirmBoard} isOpen={isBoardModalOpen} onConfirm={() => {}} />
      <CancelFlightModal flight={selectedFlight ?? {} as Flight} isOpen={isCancelModalOpen} onClose={() => {
        setIsCancelModalOpen(false);
      } } 
      onDelete={cancelFlight} />
    </div>
  );
};

export default FlightTable;