"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { Aeroporto, Flight, statusFlightEnum } from "../types/FlightTypes";

type FlightContextType = {
  flightList: Flight[];
  setFlightList: (flights: Flight[]) => void;
  flightListLoading: boolean;
  setFlightListLoading: (loading: boolean) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
  aeroportos: Aeroporto[];
};

export const FlightContext = createContext<FlightContextType>(
  {} as FlightContextType
);

export const FlightContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const aeroportos: Aeroporto[] = [
    {
      codigo: "GRU",
      nome: "Aeroporto Internacional de São Paulo/Guarulhos",
      cidade: "São Paulo",
      uf: "SP",
    },
    {
      codigo: "GIG",
      nome: "Aeroporto Internacional do Rio de Janeiro/Galeão",
      cidade: "Rio de Janeiro",
      uf: "RJ",
    },
    {
      codigo: "BSB",
      nome: "Aeroporto Internacional de Brasília",
      cidade: "Brasília",
      uf: "DF",
    },
    {
      codigo: "CNF",
      nome: "Aeroporto Internacional de Belo Horizonte/Confins",
      cidade: "Belo Horizonte",
      uf: "MG",
    },
    {
      codigo: "POA",
      nome: "Aeroporto Internacional Salgado Filho",
      cidade: "Porto Alegre",
      uf: "RS",
    },
    {
      codigo: "REC",
      nome: "Aeroporto Internacional do Recife/Guararapes",
      cidade: "Recife",
      uf: "PE",
    },
    {
      codigo: "SSA",
      nome: "Aeroporto Internacional de Salvador",
      cidade: "Salvador",
      uf: "BA",
    },
    {
      codigo: "CWB",
      nome: "Aeroporto Internacional Afonso Pena",
      cidade: "Curitiba",
      uf: "PR",
    },
  ];
  const [flightList, setFlightList] = useState<Flight[]>([
    {
      codigo: "FL001",
      data: "2025-04-15T08:00:00Z",
      valor_passagem: 500.0,
      quantidade_poltronas_total: 180,
      quantidade_poltronas_ocupadas: 120,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GRU"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GIG"
      )!,
    },
    {
      codigo: "FL002",
      data: "2025-04-15T10:00:00Z",
      valor_passagem: 450.0,
      quantidade_poltronas_total: 150,
      quantidade_poltronas_ocupadas: 100,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "BSB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CNF"
      )!,
    },
    {
      codigo: "FL003",
      data: "2025-04-15T12:00:00Z",
      valor_passagem: 600.0,
      quantidade_poltronas_total: 200,
      quantidade_poltronas_ocupadas: 180,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "POA"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "REC"
      )!,
    },
    {
      codigo: "FL004",
      data: "2025-04-15T14:00:00Z",
      valor_passagem: 550.0,
      quantidade_poltronas_total: 170,
      quantidade_poltronas_ocupadas: 150,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "SSA"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GRU"
      )!,
    },
    {
      codigo: "FL005",
      data: "2025-04-15T16:00:00Z",
      valor_passagem: 700.0,
      quantidade_poltronas_total: 190,
      quantidade_poltronas_ocupadas: 170,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GIG"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "BSB"
      )!,
    },
    {
      codigo: "FL006",
      data: "2025-06-15T08:00:00Z",
      valor_passagem: 1500.0,
      quantidade_poltronas_total: 180,
      quantidade_poltronas_ocupadas: 120,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GRU"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GIG"
      )!,
    },
    {
      codigo: "FL007",
      data: "2025-07-01T08:00:00Z",
      valor_passagem: 400.0,
      quantidade_poltronas_total: 180,
      quantidade_poltronas_ocupadas: 100,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GRU"
      )!,
    },
    {
      codigo: "FL008",
      data: "2025-07-02T10:00:00Z",
      valor_passagem: 350.0,
      quantidade_poltronas_total: 150,
      quantidade_poltronas_ocupadas: 80,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GIG"
      )!,
    },
    {
      codigo: "FL009",
      data: "2025-07-03T12:00:00Z",
      valor_passagem: 500.0,
      quantidade_poltronas_total: 200,
      quantidade_poltronas_ocupadas: 150,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "BSB"
      )!,
    },
    {
      codigo: "FL010",
      data: "2025-07-04T14:00:00Z",
      valor_passagem: 450.0,
      quantidade_poltronas_total: 170,
      quantidade_poltronas_ocupadas: 120,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "SSA"
      )!,
    },
    {
      codigo: "FL011",
      data: "2025-07-05T16:00:00Z",
      valor_passagem: 600.0,
      quantidade_poltronas_total: 190,
      quantidade_poltronas_ocupadas: 160,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "REC"
      )!,
    },
    {
      codigo: "FL012",
      data: "2025-07-06T08:00:00Z",
      valor_passagem: 550.0,
      quantidade_poltronas_total: 180,
      quantidade_poltronas_ocupadas: 140,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CNF"
      )!,
    },
    {
      codigo: "FL013",
      data: "2025-07-07T10:00:00Z",
      valor_passagem: 700.0,
      quantidade_poltronas_total: 200,
      quantidade_poltronas_ocupadas: 180,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "POA"
      )!,
    },
    {
      codigo: "FL014",
      data: "2025-07-08T12:00:00Z",
      valor_passagem: 650.0,
      quantidade_poltronas_total: 170,
      quantidade_poltronas_ocupadas: 150,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GRU"
      )!,
    },
    {
      codigo: "FL015",
      data: "2025-07-09T14:00:00Z",
      valor_passagem: 480.0,
      quantidade_poltronas_total: 160,
      quantidade_poltronas_ocupadas: 120,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "GIG"
      )!,
    },
    {
      codigo: "FL016",
      data: "2025-07-10T16:00:00Z",
      valor_passagem: 520.0,
      quantidade_poltronas_total: 180,
      quantidade_poltronas_ocupadas: 130,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "CWB"
      )!,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === "SSA"
      )!,
    },
  ]);
  const [flightListLoading, setFlightListLoading] = useState<boolean>(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const contextValue = useMemo(
    () => ({
      flightList,
      setFlightList,
      flightListLoading,
      setFlightListLoading,
      selectedFlight,
      setSelectedFlight,
      aeroportos,
    }),
    [flightList, flightListLoading, selectedFlight]
  );

  return (
    <FlightContext.Provider value={contextValue}>
      {children}
    </FlightContext.Provider>
  );
};

const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlightContext must be used within a FlightProvider");
  }
  return context;
};

export default useFlightContext;
