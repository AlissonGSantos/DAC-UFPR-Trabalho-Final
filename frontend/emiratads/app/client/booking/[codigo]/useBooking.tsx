import { useState, useEffect } from "react";

// Mock da interface (seu amigo sugeriu)
export interface Booking {
  codigo: string;
  data: string;
  valor: number;
  milhas_utilizadas: number;
  quantidade_poltronas: number;
  codigo_cliente: number;
  estado: string;
  voo: Flight;
}

interface Flight {
  origem: string;
  destino: string;
  // ... outros campos
}

export default function useBooking(codigo: string) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula chamada API
    const fetchBooking = async () => {
      setIsLoading(true);
      // Mock de dados (substitua por uma API real)
      const mockBooking: Booking = {
        codigo,
        data: "2025-04-20T14:30:00Z",
        valor: 1500,
        milhas_utilizadas: 5000,
        quantidade_poltronas: 2,
        codigo_cliente: 1,
        estado: "CONFIRMADA",
        voo: {
          origem: "CWB",
          destino: "GRU",
        },
      };
      
      setTimeout(() => {
        setBooking(mockBooking);
        setIsLoading(false);
      }, 1000); // Simula delay de rede
    };

    fetchBooking();
  }, [codigo]);

  return { booking, isLoading };
}