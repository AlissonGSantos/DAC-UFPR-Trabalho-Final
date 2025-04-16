import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  SearchFlightSchema,
  SearchFlightSchemaFormData,
} from "../../schema/schema";
import { Aeroporto, Flight } from "@/app/types/FlightTypes";
import useFlightContext from "@/app/contexts/flight";

interface UseSearchFormProps {
  onFindFlights: (flights: Flight[]) => void;
}

const useSearchForm = ({ onFindFlights }: UseSearchFormProps) => {
  const [originAirport, setOriginAirport] = useState<Aeroporto>(
    {} as Aeroporto
  );
  const [destinationAirport, setDestinationAirport] = useState<Aeroporto>(
    {} as Aeroporto
  );
  const [flights, setFlights] = useState<Flight[]>([]);

  const { aeroportos, flightList } = useFlightContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchFlightSchemaFormData>({
    resolver: zodResolver(SearchFlightSchema),
    defaultValues: {
      OriginAirport: "",
      DestinationAirport: "",
    },
  });

  const [airportsOptions, setAirportsOptions] = useState<
    { value: string; label: string }[]
  >([
    ...aeroportos.map((airport) => ({
      value: airport.codigo,
      label: airport.nome,
    })),
  ]);

  useEffect(() => {
    setAirportsOptions(
      aeroportos.map((airport) => ({
        value: airport.codigo,
        label: airport.nome,
      }))
    );
  }, [aeroportos]);

  const handleAirportChange = (
    airport: Aeroporto["codigo"],
    type: "ORIGIN" | "DESTINATION"
  ) => {
    if (type === "ORIGIN") {
      setOriginAirport(
        aeroportos.find((a) => a.codigo === airport) || ({} as Aeroporto)
      );
      setValue("OriginAirport", airport);
    } else {
      setDestinationAirport(
        aeroportos.find((a) => a.codigo === airport) || ({} as Aeroporto)
      );
      setValue("DestinationAirport", airport);
    }
  };

  const onSubmit = (data: SearchFlightSchemaFormData) => {
    const selectedFlights = flightList.filter(
      (flight) =>
        flight.aeroporto_origem.codigo === data.OriginAirport &&
        flight.aeroporto_destino.codigo === data.DestinationAirport
    );
    setFlights(selectedFlights);
    onFindFlights(selectedFlights);
  };

  return {
    aeroportos,
    airportsOptions,
    setAirportsOptions,
    originAirport,
    setOriginAirport,
    destinationAirport,
    setDestinationAirport,
    handleAirportChange,
    onSubmit,
    handleSubmit,
    errors,
    register,
    flights,
  };
};

export default useSearchForm;
