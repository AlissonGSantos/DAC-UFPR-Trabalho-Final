"use client";
import React from "react";
import DataTable from "@/app/components/DataTable/DataTable";
import useFlightTable from "./useFlightTable";
import CancelFlightModal from "../CancelModal/CancelFlightModal";
import { Flight, statusFlightEnum } from "@/app/types/FlightTypes";

const FlightTable: React.FC = () => {
  const { data, columns, controls, cancelFlight, setIsCancelModalOpen, isCancelModalOpen, selectedFlight } = useFlightTable();

  return (
    <div>
      <DataTable data={data} columns={columns} controls={controls} />
      <CancelFlightModal flight={selectedFlight ?? {} as Flight} isOpen={isCancelModalOpen} onClose={() => {
        setIsCancelModalOpen(false);
      } } 
      onDelete={cancelFlight} />
    </div>
  );
};

export default FlightTable;