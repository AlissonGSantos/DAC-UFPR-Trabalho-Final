"use client";

import { useForm } from "react-hook-form";
import { RegisterFlightSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import registerFlightServices from "@/app/employee/services/registerFlightServices";
import { useState, useEffect } from "react";

type RegisterFlightFormData = z.infer<typeof RegisterFlightSchema>;

const useRegisterFlightForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
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
    const cleanValue = ticketValue.replace(/[^\d,]/g, "").replace(",", ".");
    const numericValue = parseFloat(cleanValue);

    if (!isNaN(numericValue)) {
      const calculatedMiles = (numericValue / 500).toFixed(0); // ou /5 se quiser o inverso
      setValue("miles", calculatedMiles);
    } else {
      setValue("miles", "");
    }
  }, [ticketValue, setValue]);

  const onSubmit = (data: RegisterFlightFormData) => {
    setValue("OriginAirport", "");
    setValue("DestinationAirport", "");
    setValue("dateTimeFlight", "");
    setValue("seatsQuantity", "");
    setValue("ticketValue", "");
    setValue("miles", "");
    setShowSuccess(true);

  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSuccess,
  };
};

export default useRegisterFlightForm;
