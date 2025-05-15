"use client";

import { useForm } from "react-hook-form";
import { ReadReservationSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useCallback } from "react";
import { Booking } from "@/app/types/BookingTypes";
import { maskCurrency } from "@/app/utils/currencyMask";
import bookingService from "@/app/client/services/bookingService";
import useBookingContext from "@/app/contexts/booking";

type ReadReservationFormData = z.infer<typeof ReadReservationSchema>;

interface ReadReservationFormProps {
  reservation: Booking;
}

const useReadReservationForm = ({ reservation }: ReadReservationFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [canCheckIn, setCanCheckIn] = useState(false);
  const [checkinModalOpen, setCheckinModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReadReservationFormData>({
    resolver: zodResolver(ReadReservationSchema),
    defaultValues: {
      CodeReservation: reservation.codigo,
      dateTimeFlight: new Date(reservation.voo.data).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      OriginAirport: reservation.voo.aeroporto_origem.codigo,
      DestinationAirport: reservation.voo.aeroporto_destino.codigo,
      ticketValue: reservation?.valor?.toString() ?? maskCurrency("0"),
      miles: reservation.quantidade_milhas.toString(),
      flightStatus: reservation.voo.estado,
      bookingStatus: reservation.estado,
    },
  });

  const { setBookingList, bookingList } = useBookingContext();

  const onSubmit = async (data: ReadReservationFormData) => {
    if (data.CodeReservation) {
      setCheckinModalOpen(true);
    }
  };

  const onPerformCheckIn = useCallback(async () => {
    try {
      const checkinResponse = await bookingService.checkInBooking(
        reservation.codigo
      );

      if (checkinResponse) {
        setShowSuccess(true);
        setCheckinModalOpen(false);
        setIsSuccessModalOpen(true);

        const updatedBookingList = bookingList.map((booking) => {
          if (booking.codigo === checkinResponse.codigo) {
            return {
              ...checkinResponse,
            };
          }
          return booking;
        });

        setBookingList(updatedBookingList);
      }
    } catch (error) {
      console.error("Error checking in:", error);
    } finally {
      setCheckinModalOpen(false);
    }
  }, [bookingList, reservation.codigo, setBookingList]);

  useEffect(() => {
    const canCheckIn = verifyDateCheckIn(reservation.voo.data) && reservation.estado === "CRIADA";
    setCanCheckIn(canCheckIn);
  }, [reservation]);

  const onDismissSuccessModal = () => {
    setIsSuccessModalOpen(false);
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
    setShowSuccess,
    canCheckIn,
    isCancelModalOpen,
    setIsCancelModalOpen,
    onPerformCheckIn,
    checkinModalOpen,
    setCheckinModalOpen,
    onDismissSuccessModal,
    isSuccessModalOpen,
  };
};

export default useReadReservationForm;
