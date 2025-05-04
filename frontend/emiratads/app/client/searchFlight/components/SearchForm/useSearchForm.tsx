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
  onChangeDestination?: (destination: Aeroporto) => void;
  onChangeOrigin?: (origin: Aeroporto) => void;
  destination?: Aeroporto["codigo"];
  origin?: Aeroporto["codigo"];
  onRedirect?: () => void;
}

const useSearchForm = ({
  onFindFlights,
  onChangeDestination,
  onChangeOrigin,
  destination,
  origin,
  onRedirect,
}: UseSearchFormProps) => {
  const { aeroportos, flightList } = useFlightContext();

  const getAirportsByParams = () => {
    const destinationSelected = aeroportos.find(
      (aeroporto) => aeroporto.codigo === destination
    );

    const originSelected = aeroportos.find(
      (aeroporto) => aeroporto.codigo === origin
    );

    return {
      destinationSelected: destinationSelected || null,
      originSelected: originSelected || null,
    };
  };

  const [originAirport, setOriginAirport] = useState<Aeroporto | null>(
    origin ? getAirportsByParams().originSelected : null
  );
  const [destinationAirport, setDestinationAirport] =
    useState<Aeroporto | null>(
      destination ? getAirportsByParams().destinationSelected : null
    );
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    if (!origin && !destination) {
      onChangeDestination?.(destinationAirport as Aeroporto);
      onChangeOrigin?.(originAirport as Aeroporto);
    }

    if (origin && destination) {
      onSubmit({
        OriginAirport: origin,
        DestinationAirport: destination,
      });
    }
  }, [originAirport, destinationAirport, origin, destination]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchFlightSchemaFormData>({
    resolver: zodResolver(SearchFlightSchema),
    defaultValues: {
      OriginAirport: originAirport?.codigo ?? "",
      DestinationAirport: destinationAirport?.codigo ?? "",
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
      setOriginAirport(aeroportos.find((a) => a.codigo === airport) || null);
      setValue("OriginAirport", airport);
    } else {
      setDestinationAirport(
        aeroportos.find((a) => a.codigo === airport) || null
      );
      setValue("DestinationAirport", airport);
    }
  };

  const onSubmit = (data: SearchFlightSchemaFormData) => {
    if (onRedirect) {
      return onRedirect();
    }
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
