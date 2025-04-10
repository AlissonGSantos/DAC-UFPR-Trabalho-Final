"use client";
import React from "react";
import DataTable from "@/app/components/DataTable/DataTable";
import useFlightTable from "./useFlightTable";

const FlightTable: React.FC = () => {
  const { data, columns, controls } = useFlightTable();

  return (
    <div>
      <DataTable data={data} columns={columns} controls={controls} />
    </div>
  );
};

export default FlightTable;