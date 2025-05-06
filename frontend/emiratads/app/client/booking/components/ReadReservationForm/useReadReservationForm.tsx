"use client";

import { useForm } from "react-hook-form";
import { ReadReservationSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Booking } from "@/app/types/BookingTypes";

type ReadReservationFormData = z.infer<typeof ReadReservationSchema>;

interface ReadReservationFormProps {
  reservation: Booking;
}

const useReadReservationForm = ({ reservation }: ReadReservationFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReadReservationFormData>({
    resolver: zodResolver(ReadReservationSchema),
    defaultValues: {
      CodeReservation: reservation.codigo,
      dateTimeFlight: new Date(reservation.data).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      OriginAirport: reservation.voo.aeroporto_origem.codigo,
      DestinationAirport: reservation.voo.aeroporto_destino.codigo,
      ticketValue: reservation.valor.toString(),
      miles: reservation.milhas_utilizadas.toString(),
      flightStatus: reservation.voo.estado,
    },
  });

  const onSubmit = (data: ReadReservationFormData) => {
    console.log("Form", data);
    alert("Reserva check-in realizada com sucesso!");
  };

  useEffect(() => {
    const canCheckIn = verifyDateCheckIn(reservation.data);
    setCanCheckIn(canCheckIn);
  }, [reservation]);

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
    setShowSuccess,
    canCheckIn,
    isCancelModalOpen, 
    setIsCancelModalOpen
  };
};

export default useReadReservationForm;
