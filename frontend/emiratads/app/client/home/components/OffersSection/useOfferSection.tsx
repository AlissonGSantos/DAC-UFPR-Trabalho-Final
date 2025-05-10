import { useAuthContext } from "@/app/contexts/auth";
import useFlightContext from "@/app/contexts/flight";
import { Flight } from "@/app/types/FlightTypes";
import { useCallback, useEffect, useState } from "react";

const useOfferSection = () => {
  const { flightList } = useFlightContext();
  const { userData } = useAuthContext();

  const [offers, setOffers] = useState<Flight[]>([]);

  const getOffers = useCallback((): Flight[] => {
    if (!flightList || flightList.length === 0) return [];

    const { cidade, uf } = userData?.usuario?.endereco ?? {};

    const filteredFlights = flightList.filter((flight) => {
      if (
        flight.aeroporto_origem.cidade === cidade &&
        flight.aeroporto_origem.uf === uf
      ) {
        return flight;
      }
    });

    if (filteredFlights.length === 0) return [];

    const offers = filteredFlights
      .filter((flight) => flight.valor_passagem !== undefined)
      .sort((a, b) => (a.valor_passagem || 0) - (b.valor_passagem || 0))
      .slice(0, 4);

    return offers;
  }, [flightList, userData]);

  useEffect(() => {
    const offersList = getOffers();
    setOffers(offersList);
  }, [userData]);

  return { getOffers, offers };
};

export default useOfferSection;
