import DataTable from "@/app/components/DataTable/DataTable";
import { Flight } from "@/app/types/FlightTypes";
import React from "react";
import useFlightsTable from "./useFlightsTable";
import { AirplaneTilt } from "phosphor-react";

interface FlightsTableProps {
  flights: Flight[];
}

const FlightsTable: React.FC<FlightsTableProps> = ({ flights }) => {
  const { columns, redirectToFlightDetail } = useFlightsTable();

  return (
    <div>
      <DataTable
        data={flights}
        columns={columns}
        controls={[
          {
            type: "SECONDARY",
            children: <AirplaneTilt size={18} weight="bold" />,
            onClick: redirectToFlightDetail,
          },
        ]}
      />
    </div>
  );
};

export default FlightsTable;
