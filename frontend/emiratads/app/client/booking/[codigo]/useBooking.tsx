import { useState, useEffect } from "react";
import { Booking } from "@/app/types/BookingTypes";
import bookingService from "../../services/bookingService";
import { Flight } from "@/app/types/FlightTypes";
import flightServices from "@/app/services/flightServices";

export default function useBooking(codigo: string) {
  const [booking, setBooking] = useState<Booking>({} as Booking);
/*   const [flight, setFlight] = useState<Flight>({} as Flight);
 */  const [loading, setLoading] = useState(true);
  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getBooking(codigo);
      setBooking(response);

   /*    const flightResponse = await flightServices.getFlight(
        response.voo_codigo
      );

      setFlight(flightResponse); */
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
