"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ButtonProps } from "@/app/components/Button/Button";
import { Flight, statusFlightEnum } from "@/app/types/FlightTypes";
import { AirplaneLanding, Check, X } from "phosphor-react";
import useFlightContext from "@/app/contexts/flight";
import flightServices from "@/app/services/flightServices";
import bookingService from "@/app/client/services/bookingService";
import { statusBookingEnum } from "@/app/types/BookingTypes";

const useFlightTable = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const { flightList, setFlightList } = useFlightContext();
  const [flightListState, setFlightListState] = useState<Flight[]>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [bookingCode, setBookingCode] = useState<string>("");
  const [boardSuccessModalOpen, setBoardSuccessModalOpen] = useState(false);

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
        (1000 * 60 * 60);
      return (
        flight.estado !== statusFlightEnum.CANCELADO &&
        flight.estado !== statusFlightEnum.REALIZADO &&
        hoursDifference <= 48
      );
    });

    console.log(flights);

    console.log("Filtered Flights:", filteredFlights);
    return filteredFlights;
  };

  useEffect(() => {
    setFlightListState(filterRecentFlights(flightList));
  }, [flightList]);

  const cancelFlight = useCallback(async () => {
    try {
      setIsCancelModalOpen(false);
      if (!selectedFlight?.codigo) {
        throw new Error("Código do voo não encontrado");
      }

      const response = await flightServices.cancelFlight(selectedFlight.codigo);
      if (!response) {
        throw new Error("Erro ao cancelar o voo");
      } else {
        const newFlight: Flight = {
          ...response,
        };
        const newFlightList: Flight[] = flightList.map((f) =>
          f.codigo === selectedFlight?.codigo ? newFlight : f
        );
        setFlightList(newFlightList);
      }
    } catch (error) {
      console.error("Error canceling flight:", error);
      setIsToastOpen(true);
    }
  }, [flightList, selectedFlight, setFlightList]);

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

  const confirmBoard = useCallback(
    async (bookingCode: string) => {
      try {
        setIsBoardModalOpen(false);

        if (!selectedFlight?.codigo) {
          throw new Error("Código do voo não encontrado");
        }

        const response = await bookingService.updateBookingStatus(bookingCode, {
          estado: statusBookingEnum.EMBARCADA,
        });

        if (!response) {
          throw new Error("Erro ao embarcar o cliente");
        }

        setBookingCode(bookingCode);

        setBoardSuccessModalOpen(true);
      } catch (error) {
        console.error("Error confirming board:", error);
        setIsToastOpen(true);
      }
    },
    [selectedFlight]
  );

  const confirmFinishFlight = useCallback(async () => {
    try {
      setIsFinishModalOpen(false);

      if (selectedFlight && selectedFlight.codigo) {
        const response = await flightServices.patchFlightState(
          selectedFlight.codigo,
          {
            estado: statusFlightEnum.REALIZADO,
          }
        );

        if (!response) {
          throw new Error("Erro ao finalizar o voo");
        } else {
          const newFlight: Flight = {
            ...response,
          };
          const newFlightList: Flight[] = flightList.map((f) =>
            f.codigo === selectedFlight?.codigo ? newFlight : f
          );

          setFlightList(newFlightList);
        }
      }
    } catch (error) {
      console.error("Error confirming flight:", error);
      setIsToastOpen(true);
    }
  }, [flightList, selectedFlight, setFlightList]);

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

  const onCloseBoardSuccessModal = () => {
    setBoardSuccessModalOpen(false);
    setBookingCode("");
    window.location.reload();
  };

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
    handleConfirmBoard,
    confirmBoard,
    handleFinishFlight,
    setIsToastOpen,
    isToastOpen,
    bookingCode,
    boardSuccessModalOpen,
    onCloseBoardSuccessModal,
  };
};

export default useFlightTable;
