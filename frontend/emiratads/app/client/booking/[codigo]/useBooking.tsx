import { useState, useEffect } from "react";
import { Booking } from "@/app/types/BookingTypes";
import bookingService from "../../services/bookingService";

export default function useBooking(codigo: string) {
  const [booking, setBooking] = useState<Booking>({} as Booking);
  const [loading, setLoading] = useState(true);
  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getBooking(codigo);
      setBooking(response);
    } catch (error) {
      console.error("Error fetching booking:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [codigo]);

  return { booking, loading };
}
