"use client";

import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ButtonProps } from "@/app/components/Button/Button";
import { Flight, statusFlightEnum } from "@/app/types/FlightTypes";
import { AirplaneLanding, Check, X } from "phosphor-react";
import useFlightContext from "@/app/contexts/flight";

const useFlightTable = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const { flightList, setFlightList } = useFlightContext();
  const [flightListState, setFlightListState] = useState<Flight[]>([]);

  const columns: ColumnDef<Flight>[] = useMemo(
    () => [
      {
        accessorKey: "data",
        header: "Data/Hora",
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleString(),
      },
      {
        accessorKey: "aeroporto_origem.nome",
        header: "Aeroporto de Origem",
        cell: ({ row }) =>
          `${row.original.aeroporto_origem.nome} (${row.original.aeroporto_origem.codigo})`,
      },
      {
        accessorKey: "aeroporto_origem.cidade",
        header: "Origem",
        cell: ({ row }) => row.original.aeroporto_origem.cidade,
      },
      {
        accessorKey: "aeroporto_origem.uf",
        header: "UF Origem",
        cell: ({ row }) => row.original.aeroporto_origem.uf,
      },
      {
        accessorKey: "aeroporto_destino.nome",
        header: "Aeroporto de Destino",
        cell: ({ row }) =>
          `${row.original.aeroporto_destino.nome} (${row.original.aeroporto_destino.codigo})`,
      },
      {
        accessorKey: "aeroporto_destino.cidade",
        header: "Destino",
        cell: ({ row }) => row.original.aeroporto_destino.cidade,
      },
      {
        accessorKey: "aeroporto_destino.uf",
        header: "UF Destino",
        cell: ({ row }) => row.original.aeroporto_destino.uf,
      },
    ],
    []
  );

  const filterRecentFlights = (flights: Flight[]) => {
    const currentDate = new Date();
    const filteredFlights: Flight[] = flights.filter((flight) => {
      const flightDate = new Date(flight.data);

      const hoursDifference =
        Math.abs(flightDate.getTime() - currentDate.getTime()) /
        (1000 * 60 * 60); // Convert milliseconds to hours
      // Filter out flights that are cancelled or completed and are within 24 hours of the current date

      return (
        flight.estado !== statusFlightEnum.CANCELADO &&
        flight.estado !== statusFlightEnum.REALIZADO &&
        hoursDifference <= 48
      );
    });

    console.log("Filtered Flights:", filteredFlights);
    return filteredFlights;
  };

  useEffect(() => {
    setFlightListState(filterRecentFlights(flightList));
  }, [flightList]);

  const cancelFlight = () => {
    setIsCancelModalOpen(false);
    if (!selectedFlight?.codigo) {
      console.error("Selected flight or its codigo is undefined.");
      return;
    }

    const newFlight: Flight = {
      ...selectedFlight,
      estado: statusFlightEnum.CANCELADO,
    };
    const newFlightList: Flight[] = flightList.map((f) =>
      f.codigo === selectedFlight?.codigo ? newFlight : f
    );
    setFlightList(newFlightList);
  };

  const handleCancelFlight = (flight: Flight) => {
    setIsCancelModalOpen(true);
    setSelectedFlight(flight);
  };

  const closeConfirmBoard = () => {
    setIsBoardModalOpen(false);
  };

  const handleConfirmBoard = (flight: Flight) => {
    setIsBoardModalOpen(true);
    setSelectedFlight(flight);
  };

  const handleFinishFlight = (flight: Flight) => {
    setIsFinishModalOpen(true);
    setSelectedFlight(flight);
  };

  const confirmBoard = () => {
    setIsBoardModalOpen(false);
    const newFlight: Flight = {
      ...selectedFlight!,
      estado: statusFlightEnum.CONFIRMADO,
    };
    const newFlightList: Flight[] = flightList.map((f) =>
      f.codigo === selectedFlight?.codigo ? newFlight : f
    );
    setFlightList(newFlightList);
  };

  const confirmFinishFlight = () => {
    setIsFinishModalOpen(false);
    const newFlight: Flight = {
      ...selectedFlight!,
      estado: statusFlightEnum.REALIZADO,
    };
    const newFlightList: Flight[] = flightList.map((f) =>
      f.codigo === selectedFlight?.codigo ? newFlight : f
    );
    setFlightList(newFlightList);
  };

  const controls: ButtonProps[] = useMemo(
    () => [
      {
        text: "Confirmar Embarque",
        onClick: handleConfirmBoard,
        type: "PRIMARY",
        size: "SMALL",
        children: <Check size={24} weight="bold" />,
        extraClass: "text-xs",
      },
      {
        text: "Cancelar Voo",
        onClick: handleCancelFlight,
        type: "DANGER",
        size: "SMALL",
        children: <X size={24} weight="bold" />,
        extraClass: "text-xs",
      },
      {
        text: "Finalizar Voo",
        onClick: handleFinishFlight,
        type: "SUCCESS",
        size: "SMALL",
        children: <AirplaneLanding size={24} weight="bold" />,
        extraClass: "text-xs",
      },
    ],
    []
  );

  return {
    data: flightListState,
    columns,
    controls,
    cancelFlight,
    handleCancelFlight,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isBoardModalOpen,
    closeConfirmBoard,
    selectedFlight,
    setSelectedFlight,
    flightList,
    setFlightList,
    isFinishModalOpen,
    confirmFinishFlight,
    setIsFinishModalOpen,
    onConfirmBoard: confirmBoard,
  };
};

export default useFlightTable;
