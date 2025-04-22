"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Booking } from "../types/BookingTypes";
import { statusFlightEnum } from "../types/FlightTypes";

const bookingListMock: Booking[] = [
  {
    codigo: "BKG001",
    data: "2025-04-15T10:00:00Z",
    valor: 500.0,
    milhas_utilizadas: 1000,
    quantidade_poltronas: 2,
    codigo_cliente: 1,
    estado: statusFlightEnum.CONFIRMADO,
    voo: {
      codigo: "FL001",
      data: "2025-04-15T08:00:00Z",
      valor_passagem: 500.0,
      quantidade_poltronas_total: 180,
      quantidade_poltronas_ocupadas: 120,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: {
        codigo: "GRU",
        nome: "Aeroporto Internacional de São Paulo/Guarulhos",
        cidade: "Guarulhos",
        uf: "SP",
      },
      aeroporto_destino: {
        codigo: "GIG",
        nome: "Aeroporto Internacional do Rio de Janeiro/Galeão",
        cidade: "Rio de Janeiro",
        uf: "RJ",
      },
    },
  },
  {
    codigo: "BKG002",
    data: "2025-05-20T15:30:00Z",
    valor: 300.0,
    milhas_utilizadas: 500,
    quantidade_poltronas: 1,
    codigo_cliente: 2,
    estado: "PENDENTE",
    voo: {
      codigo: "FL002",
      data: "2025-05-20T13:00:00Z",
      valor_passagem: 300.0,
      quantidade_poltronas_total: 150,
      quantidade_poltronas_ocupadas: 50,
      estado: statusFlightEnum.CONFIRMADO,
      aeroporto_origem: {
        codigo: "CWB",
        nome: "Aeroporto Internacional Afonso Pena",
        cidade: "Curitiba",
        uf: "PR",
      },
      aeroporto_destino: {
        codigo: "SSA",
        nome: "Aeroporto Internacional de Salvador",
        cidade: "Salvador",
        uf: "BA",
      },
    },
  },
];

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
  const [bookingList, setBookingList] = useState<Booking[]>(bookingListMock);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const getBookingById = (id: string): Booking | undefined => {
    return bookingList.find((booking) => booking.codigo === id);
  };

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
