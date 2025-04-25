"use client";

import { useForm } from "react-hook-form";
import { RegisterFlightSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import useFlightContext from "@/app/contexts/flight";
import { Aeroporto, Flight, statusFlightEnum } from "@/app/types/FlightTypes";
import { convertFromMaskToInteger } from "@/app/utils/currencyMask";

type RegisterFlightFormData = z.infer<typeof RegisterFlightSchema>;

const useRegisterFlightForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [originOptions, setOriginOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [destinationOptions, setDestinationOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const { aeroportos, setFlightList, flightList } = useFlightContext();

  useEffect(() => {
    setOriginOptions(
      aeroportos.map((aeroporto) => ({
        value: aeroporto.codigo,
        label: aeroporto.nome,
      }))
    );

    setDestinationOptions(
      aeroportos.map((aeroporto) => ({
        value: aeroporto.codigo,
        label: aeroporto.nome,
      }))
    );
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFlightFormData>({
    resolver: zodResolver(RegisterFlightSchema),
    defaultValues: {
      OriginAirport: "",
      DestinationAirport: "",
      dateTimeFlight: "",
      seatsQuantity: "",
      ticketValue: "",
      miles: "",
    },
  });

  const ticketValue = watch("ticketValue");

  useEffect(() => {
    const value = convertFromMaskToInteger(ticketValue);

    if (!isNaN(value)) {
      const calculatedMiles = Math.floor(value / 500).toString();
      setValue("miles", calculatedMiles);
    } else {
      setValue("miles", "");
    }
  }, [ticketValue, setValue]);

  useEffect(() => {
    const selectedOrigin = watch("OriginAirport");
    const selectedDestination = watch("DestinationAirport");

    setOriginOptions((prevOptions) =>
      prevOptions.filter((option) => option.value !== selectedDestination)
    );

    setDestinationOptions((prevOptions) =>
      prevOptions.filter((option) => option.value !== selectedOrigin)
    );
  }, [watch("OriginAirport"), watch("DestinationAirport")]);

  const onSubmit = (data: RegisterFlightFormData) => {
    const newFlight: Flight = {
      codigo: Math.random().toString(36).substring(2, 9),
      aeroporto_origem: aeroportos.find(
        (aeroporto) => aeroporto.codigo === data.OriginAirport
      ) as Aeroporto,
      aeroporto_destino: aeroportos.find(
        (aeroporto) => aeroporto.codigo === data.DestinationAirport
      ) as Aeroporto,
      data: data.dateTimeFlight,
      valor_passagem: parseFloat(data.ticketValue),
      quantidade_poltronas_total: parseInt(data.seatsQuantity, 10),
      quantidade_poltronas_ocupadas: 0,
      estado: statusFlightEnum.CONFIRMADO,
    };

    setFlightList([...flightList, newFlight]);

    setShowSuccess(true);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSuccess,
    originOptions,
    destinationOptions,
  };
};

export default useRegisterFlightForm;
