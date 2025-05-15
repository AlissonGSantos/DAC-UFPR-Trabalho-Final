"use client";

import { useForm } from "react-hook-form";
import { CheckReservationSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Booking } from "@/app/types/BookingTypes";
import bookingService from "@/app/client/services/bookingService";
import { useAuthContext } from "@/app/contexts/auth";

type CheckReservationFormData = z.infer<typeof CheckReservationSchema>;

const useCheckReservationForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const { userData, updateMilesBalance } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckReservationFormData>({
    resolver: zodResolver(CheckReservationSchema),
    defaultValues: {
      CodeReservation: "",
    },
  });

  const onSubmit = async (data: CheckReservationFormData) => {
    try {
      setLoading(true);
      const booking = await bookingService.getBooking(data.CodeReservation);
      setSelectedBooking(booking);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error fetching booking:", error);
      alert("Erro ao buscar reserva. Verifique o código e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = async () => {
    if (!selectedBooking) return;

    try {
      setLoading(true);
      const cancelResponse = await bookingService.cancelBooking(selectedBooking.codigo);

      if (!cancelResponse) {
        alert("Erro ao cancelar reserva. Tente novamente mais tarde.");
        return;
      }

      alert(`Reserva ${selectedBooking.codigo} cancelada com sucesso!`);
      updateMilesBalance(cancelResponse.saldo_cliente);
      setSelectedBooking(null);
      setShowSuccess(false);
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Erro ao cancelar reserva. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSuccess,
    setShowSuccess,
    selectedBooking,
    loading,
    onCancel,
  };
};

export default useCheckReservationForm;
