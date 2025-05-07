import { Aeroporto, Flight, statusFlightEnum } from "@/app/types/FlightTypes";
import { useState } from "react";

const useSearchComponent = (fromHome: boolean) => {
  const [activeFlightList, setActiveFlightList] = useState<Flight[]>([]);
  const [showFlightTable, setShowFlightTable] = useState(false);
  const [originAirport, setOriginAirport] = useState<Aeroporto>(
    {} as Aeroporto
  );
  const [destinationAirport, setDestinationAirport] = useState<Aeroporto>(
    {} as Aeroporto
  );
  const redirectToSearchFlight = () => {
    window.location.href = `/client/searchFlight?origin=${originAirport?.codigo}&destination=${destinationAirport?.codigo}`;
  };

  const onChangeOrigin = (origin: Aeroporto) => {
    setOriginAirport(origin);
  };

  const onChangeDestination = (destination: Aeroporto) => {
    setDestinationAirport(destination);
  };

  const onFindFlights = (flights: Flight[]) => {
    let filteredFlights = flights;

    if (fromHome) {
      filteredFlights = flights.filter(
        (flight) => flight.estado != statusFlightEnum.CONFIRMADO
      );
    }
    setActiveFlightList(filteredFlights);
    setShowFlightTable(true);
  };

  return {
    activeFlightList,
    setActiveFlightList,
    redirectToSearchFlight,
    onChangeDestination,
    onChangeOrigin,
    onFindFlights,
    showFlightTable,
  };
};

export default useSearchComponent;
