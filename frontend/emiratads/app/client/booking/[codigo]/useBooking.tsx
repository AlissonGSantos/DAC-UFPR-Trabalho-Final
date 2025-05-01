import { useState, useEffect } from "react";
import { Booking, statusBookingEnum } from "@/app/types/BookingTypes";
import { statusFlightEnum } from "@/app/types/FlightTypes";

export default function useBooking(codigo: string) {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const mockBooking: Booking = {
        codigo,
        data: "2025-04-20T14:30:00Z",
        valor: 1500,
        milhas_utilizadas: 5000,
        quantidade_poltronas: 2,
        codigo_cliente: 1,
        estado: statusBookingEnum.EMBARCADA,
        voo: {
          codigo: "TADS0001",
          data: "2025-04-20T14:30:00Z",
          valor_passagem: 1500,
          quantidade_poltronas_total: 200,
          quantidade_poltronas_ocupadas: 50,
          estado: statusFlightEnum.CONFIRMADO,
          aeroporto_origem: {
            codigo: "GRU",
            nome: "Aeroporto Internacional de São Paulo/Guarulhos",
            cidade: "São Paulo",
            uf: "SP"
          },
          aeroporto_destino: {
            codigo: "JFK",
            nome: "Aeroporto Internacional John F. Kennedy",
            cidade: "Nova Iorque",
            uf: "NY"
          }
        },
      };
      
      setTimeout(() => {
        setBooking(mockBooking);
      });
    };

    fetchBooking();
  }, [codigo]);

  return { booking };
}