"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ReadReservationSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type ReadReservationFormData = z.infer<typeof ReadReservationSchema>;

const useReadReservationForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReadReservationFormData>({
    resolver: zodResolver(ReadReservationSchema),
    defaultValues: {
        CodeReservation: "",
        dateTimeFlight: "",
        OriginAirport: "",
        DestinationAirport: "",
        ticketValue: "",
        miles: "",
        flightStatus: ""
    },
  });


  const onSubmit = (data: ReadReservationFormData) => {
    console.log("Form", data);
    setValue("CodeReservation", "");
    setValue("dateTimeFlight", "");
    setValue("OriginAirport", "");
    setValue("DestinationAirport", "");
    setValue("ticketValue", "");
    setValue("miles","");
    setValue("flightStatus", "");
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

export default useReadReservationForm;