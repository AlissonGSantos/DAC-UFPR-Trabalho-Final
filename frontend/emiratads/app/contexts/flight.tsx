"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Aeroporto, Flight } from "../types/FlightTypes";
import flightServices from "../services/flightServices";
import { useAuthContext } from "./auth";

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
  const [flightList, setFlightList] = useState<Flight[]>([]);
  const [flightListLoading, setFlightListLoading] = useState<boolean>(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [aeroportos, setAeroportos] = useState<Aeroporto[]>([]);

  const { userData } = useAuthContext();

  const fetchInformation = async () => {
    try {
      if (!userData?.usuario.codigo) return;
      setFlightListLoading(true);
      const airports = await flightServices.getAirports();
      setAeroportos(airports);

      const flights = await flightServices.getFlights();
      console.log("Flights:", flights);
      setFlightList(flights);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setFlightListLoading(false);
    }
  };

  useEffect(() => {
    fetchInformation();
  }, [userData?.usuario.codigo]);

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
