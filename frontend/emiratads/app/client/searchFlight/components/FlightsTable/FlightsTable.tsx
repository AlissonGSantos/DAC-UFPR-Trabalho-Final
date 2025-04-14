import DataTable from "@/app/components/DataTable/DataTable";
import { Flight } from "@/app/types/FlightTypes";
import React from "react";
import useFlightsTable from "./useFlightsTable";

interface FlightsTableProps {
  flights: Flight[];
}

const FlightsTable: React.FC<FlightsTableProps> = ({ flights }) => {
  const { columns } = useFlightsTable();

  return (
    <div>
      <DataTable data={flights} columns={columns} />
    </div>
  );
};

export default FlightsTable;
