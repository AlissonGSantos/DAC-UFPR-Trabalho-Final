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
    // Voo confirmado, com assentos disponíveis, para teste de reserva
    {
      codigo: "FL001",
      data: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Dentro de 24h
      valor_passagem: 500.0,
      quantidade_poltronas_total: 180,
      quantidade_poltronas_ocupadas: 120,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find((aeroporto) => aeroporto.codigo === "GRU")!,
      aeroporto_destino: aeroportos.find((aeroporto) => aeroporto.codigo === "GIG")!,
    },
    // Voo confirmado, com assentos disponíveis, para teste de check-in
    {
      codigo: "FL002",
      data: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(), // Dentro de 48h
      valor_passagem: 450.0,
      quantidade_poltronas_total: 150,
      quantidade_poltronas_ocupadas: 100,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find((aeroporto) => aeroporto.codigo === "CWB")!,
      aeroporto_destino: aeroportos.find((aeroporto) => aeroporto.codigo === "SSA")!,
    },
    // Voo realizado, para teste de histórico de voos
    {
      codigo: "FL003",
      data: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Já ocorreu
      valor_passagem: 600.0,
      quantidade_poltronas_total: 200,
      quantidade_poltronas_ocupadas: 180,
      estado: statusFlightEnum.REALIZADO,
      aeroporto_origem: aeroportos.find((aeroporto) => aeroporto.codigo === "POA")!,
      aeroporto_destino: aeroportos.find((aeroporto) => aeroporto.codigo === "REC")!,
    },
    // Voo cancelado, para teste de cancelamento de reservas
    {
      codigo: "FL004",
      data: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // Futuro
      valor_passagem: 550.0,
      quantidade_poltronas_total: 170,
      quantidade_poltronas_ocupadas: 150,
      estado: statusFlightEnum.CANCELADO,
      aeroporto_origem: aeroportos.find((aeroporto) => aeroporto.codigo === "SSA")!,
      aeroporto_destino: aeroportos.find((aeroporto) => aeroporto.codigo === "GRU")!,
    },
    // Voo confirmado, com assentos disponíveis, para teste de cadastro de voo
    {
      codigo: "FL005",
      data: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Daqui a 7 dias
      valor_passagem: 700.0,
      quantidade_poltronas_total: 190,
      quantidade_poltronas_ocupadas: 0, // Nenhum assento ocupado
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find((aeroporto) => aeroporto.codigo === "GIG")!,
      aeroporto_destino: aeroportos.find((aeroporto) => aeroporto.codigo === "BSB")!,
    },
    // Voo confirmado, com assentos disponíveis, para teste de embarque
    {
      codigo: "FL006",
      data: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // Dentro de 12h
      valor_passagem: 1500.0,
      quantidade_poltronas_total: 180,
      quantidade_poltronas_ocupadas: 120,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: aeroportos.find((aeroporto) => aeroporto.codigo === "GRU")!,
      aeroporto_destino: aeroportos.find((aeroporto) => aeroporto.codigo === "GIG")!,
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
