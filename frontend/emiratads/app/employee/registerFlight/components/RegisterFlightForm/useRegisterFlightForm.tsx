"use client";

import { useForm } from "react-hook-form";
import { RegisterFlightSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useCallback } from "react";
import useFlightContext from "@/app/contexts/flight";
import { Flight } from "@/app/types/FlightTypes";
import { convertFromMaskToInteger } from "@/app/utils/currencyMask";
import flightServices from "@/app/services/flightServices";

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

  const [isToastOpen, setIsToastOpen] = useState(false);

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
  }, [aeroportos]);

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
      const calculatedMiles = Math.floor(value / 5); 
      setValue("miles", calculatedMiles.toString());
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
  }, [watch, watch("OriginAirport"), watch("DestinationAirport")]);

  const onSubmit = useCallback(
    async (data: RegisterFlightFormData) => {
      try {
        const date = new Date(data.dateTimeFlight);
        const isoString = date.toISOString().replace(/\.\d+Z$/, "-03:00");

        const createFlightRequest = {
          data: isoString,
          valor_passagem: convertFromMaskToInteger(ticketValue),
          quantidade_poltronas_total: parseInt(data.seatsQuantity, 10),
          codigo_aeroporto_origem: data.OriginAirport,
          codigo_aeroporto_destino: data.DestinationAirport,
        };

        const response = await flightServices.createFlight(createFlightRequest);

        if (!response) {
          throw new Error("Failed to create flight");
        }

        const updatedFlight: Flight = response;

        const updatedFlightList = [...flightList, updatedFlight];
        setFlightList(updatedFlightList);

        setShowSuccess(true);
      } catch (error) {
        console.error("Error creating flight:", error);
        setIsToastOpen(true);
      }
    },
    [flightList, setFlightList]
  );

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSuccess,
    originOptions,
    destinationOptions,
    isToastOpen,
    setIsToastOpen,
  };
};

export default useRegisterFlightForm;
