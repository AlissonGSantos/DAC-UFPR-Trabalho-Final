"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Booking } from "../types/BookingTypes";
import clientService from "../client/services/clientService";
import { useAuthContext } from "./auth";

type BookingContextType = {
  bookingList: Booking[];
  setBookingList: (bookings: Booking[]) => void;
  selectedBooking: Booking | null;
  setSelectedBooking: (booking: Booking) => void;
  getBookingById: (id: string) => Booking | undefined;
};

export const BookingContext = createContext<BookingContextType>(
  {} as BookingContextType
);

export const BookingContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [bookingList, setBookingList] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const getBookingById = (id: string): Booking | undefined => {
    return bookingList.find((booking) => booking.codigo === id);
  };

  const { userData } = useAuthContext();

  const fetchBookings = async () => {
    if (userData?.usuario.codigo && userData?.usuario.tipo === "CLIENTE") {
      try {
        const bookings = await clientService.getBookings(
          userData.usuario.codigo
        );
        setBookingList(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userData?.usuario.codigo, userData?.usuario.tipo]);

  const contextValue = useMemo(
    () => ({
      bookingList,
      setBookingList,
      selectedBooking,
      setSelectedBooking,
      getBookingById,
    }),
    [bookingList, selectedBooking]
  );

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

export default useBookingContext;
