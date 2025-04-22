"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Booking, statusBookingEnum } from "../types/BookingTypes";
import { statusFlightEnum } from "../types/FlightTypes";

const bookingListMock: Booking[] = [
  {
    codigo: "BKG001",
    data: "2025-04-15T10:00:00Z",
    valor: 500.0,
    milhas_utilizadas: 1000,
    quantidade_poltronas: 2,
    codigo_cliente: 1,
    estado: statusBookingEnum.CRIADA,
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
    estado: statusBookingEnum.CHECK_IN,
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
  {
    codigo: "BKG003",
    data: "2025-06-10T12:00:00Z",
    valor: 700.0,
    milhas_utilizadas: 1500,
    quantidade_poltronas: 3,
    codigo_cliente: 3,
    estado: statusBookingEnum.CANCELADA,
    voo: {
      codigo: "FL003",
      data: "2025-06-10T10:00:00Z",
      valor_passagem: 700.0,
      quantidade_poltronas_total: 200,
      quantidade_poltronas_ocupadas: 180,
      estado: statusFlightEnum.CANCELADO,
      aeroporto_origem: {
        codigo: "BSB",
        nome: "Aeroporto Internacional de Brasília",
        cidade: "Brasília",
        uf: "DF",
      },
      aeroporto_destino: {
        codigo: "POA",
        nome: "Aeroporto Internacional Salgado Filho",
        cidade: "Porto Alegre",
        uf: "RS",
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
