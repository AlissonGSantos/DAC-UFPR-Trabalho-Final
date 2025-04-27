import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckReservationSchema } from "../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useBookingContext from "@/app/contexts/booking";
import { Booking } from "@/app/types/BookingTypes";

type CheckReservationFormData = z.infer<typeof CheckReservationSchema>;

const useCheckReservationForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { getBookingById } = useBookingContext();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckReservationFormData>({
    resolver: zodResolver(CheckReservationSchema),
    defaultValues: {
      CodeReservation: "",
    },
  });

  const onSubmit = (data: CheckReservationFormData) => {
    try {
      const booking = getBookingById(data.CodeReservation);
      if (!booking) {
        alert("Reserva não encontrada!");
        return;
      }
      setSelectedBooking(booking);
    } catch (error) {
      alert("Erro ao buscar reserva: " + error);
      setHasError(true);
    } finally {
      if (!hasError) {
        setValue("CodeReservation", "");
        setShowSuccess(true);
      }
    }
  };

  const onCancel = () => {
    setShowSuccess(false);
    setValue("CodeReservation", "");
    setSelectedBooking(null);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSuccess,
    selectedBooking,
    onCancel,
  };
};

export default useCheckReservationForm;
