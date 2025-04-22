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
  const [canCheckIn, setCanCheckIn] = useState(false);
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
      flightStatus: "",
    },
  });

  const onSubmit = (data: ReadReservationFormData) => {
    console.log("Form", data);
    setValue("CodeReservation", "");
    setValue("dateTimeFlight", "");
    setValue("OriginAirport", "");
    setValue("DestinationAirport", "");
    setValue("ticketValue", "");
    setValue("miles", "");
    setValue("flightStatus", "");
    setShowSuccess(true);
  };

  const verifyDateCheckIn = (bookingDate: string) => {
    const today = new Date();
    const flightDate = new Date(bookingDate);
    const difTime = Math.abs(flightDate.getTime() - today.getTime());
    const difHours = Math.ceil(difTime / (1000 * 3600));
    return difHours < 48;
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
