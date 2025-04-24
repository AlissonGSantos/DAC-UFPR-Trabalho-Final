import { ButtonProps } from "@/app/components/Button/Button";
import { useAuthContext } from "@/app/contexts/auth";
import useBookingContext from "@/app/contexts/booking";
import { Booking, statusBookingEnum } from "@/app/types/BookingTypes";
import { statusFlightEnum } from "@/app/types/FlightTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useMemo, useEffect } from "react";

const useCheckinTable = () => {
  // CÓDIGO REAL PARA QUANDO A API ESTIVER PRONTA
  // const { bookingList, setBookingList } = useBookingContext();
  // const { userData } = useAuthContext();
  
  // MOCK TEMPORÁRIO DE DADOS
  const getDateInFuture = (hoursFromNow: number): string => {
    const date = new Date();
    date.setHours(date.getHours() + hoursFromNow);
    return date.toISOString();
  };
  
  const mockBookings: Booking[] = [
    {
      codigo: "RES345",
      data: getDateInFuture(1),
      valor: 750.0,
      milhas_utilizadas: 0,
      quantidade_poltronas: 1,
      codigo_cliente: 1,
      estado: statusBookingEnum.CRIADA,
      voo: {
        codigo: "EMII1293",
        data: getDateInFuture(3),
        valor_passagem: 750.0,
        quantidade_poltronas_total: 180,
        quantidade_poltronas_ocupadas: 120,
        estado: statusFlightEnum.CONFIRMADO,
        aeroporto_origem: {
          codigo: "CWB",
          nome: "Aeroporto Internacional Afonso Pena",
          cidade: "Curitiba",
          uf: "PR"
        },
        aeroporto_destino: {
          codigo: "GRU",
          nome: "Aeroporto Internacional de Guarulhos",
          cidade: "São Paulo",
          uf: "SP"
        }
      }
    },
    {
      codigo: "RES690",
      data: getDateInFuture(2),
      valor: 1200.0,
      milhas_utilizadas: 5000,
      quantidade_poltronas: 1,
      codigo_cliente: 1,
      estado: statusBookingEnum.CRIADA,
      voo: {
        codigo: "EIJJ0456",
        data: getDateInFuture(12),
        valor_passagem: 1200.0,
        quantidade_poltronas_total: 220,
        quantidade_poltronas_ocupadas: 180,
        estado: statusFlightEnum.CONFIRMADO,
        aeroporto_origem: {
          codigo: "GRU",
          nome: "Aeroporto Internacional de Guarulhos",
          cidade: "São Paulo",
          uf: "SP"
        },
        aeroporto_destino: {
          codigo: "BSB",
          nome: "Aeroporto Internacional de Brasília",
          cidade: "Brasília",
          uf: "DF"
        }
      }
    },
    {
      codigo: "RES460",
      data: getDateInFuture(6),
      valor: 2100.0,
      milhas_utilizadas: 10000,
      quantidade_poltronas: 2,
      codigo_cliente: 1,
      estado: statusBookingEnum.CRIADA,
      voo: {
        codigo: "EMJI78O9",
        data: getDateInFuture(24),
        valor_passagem: 1050.0,
        quantidade_poltronas_total: 160,
        quantidade_poltronas_ocupadas: 140,
        estado: statusFlightEnum.CONFIRMADO,
        aeroporto_origem: {
          codigo: "BSB",
          nome: "Aeroporto Internacional de Brasília",
          cidade: "Brasília",
          uf: "DF"
        },
        aeroporto_destino: {
          codigo: "SSA",
          nome: "Aeroporto Internacional de Salvador",
          cidade: "Salvador",
          uf: "BA"
        }
      }
    },
    {
      codigo: "RES359",
      data: getDateInFuture(12),
      valor: 1800.0,
      milhas_utilizadas: 0,
      quantidade_poltronas: 1,
      codigo_cliente: 1,
      estado: statusBookingEnum.CRIADA,
      voo: {
        codigo: "EMIK0101",
        data: getDateInFuture(36),
        valor_passagem: 1800.0,
        quantidade_poltronas_total: 200,
        quantidade_poltronas_ocupadas: 150,
        estado: statusFlightEnum.CONFIRMADO,
        aeroporto_origem: {
          codigo: "SSA",
          nome: "Aeroporto Internacional de Salvador",
          cidade: "Salvador",
          uf: "BA"
        },
        aeroporto_destino: {
          codigo: "REC",
          nome: "Aeroporto Internacional do Recife",
          cidade: "Recife",
          uf: "PE"
        }
      }
    },
    {
      codigo: "RES531",
      data: getDateInFuture(8), 
      valor: 920.0,
      milhas_utilizadas: 0,
      quantidade_poltronas: 1,
      codigo_cliente: 1,
      estado: statusBookingEnum.CHECK_IN,
      voo: {
        codigo: "EMIJ6202",
        data: getDateInFuture(10),
        valor_passagem: 920.0,
        quantidade_poltronas_total: 180,
        quantidade_poltronas_ocupadas: 100,
        estado: statusFlightEnum.CONFIRMADO,
        aeroporto_origem: {
          codigo: "CWB",
          nome: "Aeroporto Internacional Afonso Pena",
          cidade: "Curitiba",
          uf: "PR"
        },
        aeroporto_destino: {
          codigo: "POA",
          nome: "Aeroporto Internacional Salgado Filho",
          cidade: "Porto Alegre",
          uf: "RS"
        }
      }
    }
  ];
  
  const [bookingList, setBookingList] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const eligibleBookings = useMemo(() => {
    const now = new Date();
    const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    
    return bookingList.filter((booking) => {
      const bookingDate = new Date(booking.voo.data);
      return (
        booking.estado === statusBookingEnum.CRIADA &&
        bookingDate >= now &&
        bookingDate <= in48Hours
      );
    });
  }, [bookingList]);

  const onDismissCheckinModal = () => {
    setIsCheckinModalOpen(false);
    setSelectedBooking(null);
  };

  const onOpenCheckinModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCheckinModalOpen(true);
  };

  const onDismissSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const onPerformCheckin = (booking: Booking) => {
    if (booking.estado !== statusBookingEnum.CRIADA) {
      alert("Apenas reservas no estado CRIADA podem receber check-in.");
      return;
    }

    const newBookingList = bookingList.map((b) => {
      if (b.codigo === booking.codigo) {
        return { ...b, estado: statusBookingEnum.CHECK_IN };
      }
      return b;
    });
    
    // CÓDIGO PARA QUANDO A API ESTIVER PRONTA
    // setBookingList(newBookingList); // Atualiza o contexto global
    
    // PARA O MOCK:
    setBookingList(newBookingList); // Atualiza apenas o estado local
    
    setIsCheckinModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "voo.data",
      header: "Data/Hora do Voo",
      cell: ({ row }) =>
        new Date(row.original.voo.data).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      accessorKey: "voo.codigo",
      header: "Código do Voo",
      cell: ({ row }) => row.original.voo.codigo,
    },
    {
      accessorKey: "voo.aeroporto_origem.codigo",
      header: "Origem",
      cell: ({ row }) =>
        `${row.original.voo.aeroporto_origem.codigo} - ${row.original.voo.aeroporto_origem.cidade}-${row.original.voo.aeroporto_origem.uf}`,
    },
    {
      accessorKey: "voo.aeroporto_destino.codigo",
      header: "Destino",
      cell: ({ row }) =>
        `${row.original.voo.aeroporto_destino.codigo} - ${row.original.voo.aeroporto_destino.cidade}-${row.original.voo.aeroporto_destino.uf}`,
    },
    {
      accessorKey: "estado",
      header: "Status",
      cell: ({ row }) => row.getValue("estado"),
    }
  ];

  const controls: (booking: Booking) => ButtonProps[] = (booking) => [
    {
      text: "Fazer Check-in",
      type: booking.estado === statusBookingEnum.CRIADA ? "PRIMARY" : "DISABLED",
      onClick: (row: Booking) => {
        onOpenCheckinModal(row);
      },
      size: "SMALL",
      disabled: booking.estado !== statusBookingEnum.CRIADA,
    }
  ];

  return {
    eligibleBookings,
    columns,
    controls,
    selectedBooking,
    isCheckinModalOpen,
    isSuccessModalOpen,
    onDismissCheckinModal,
    onDismissSuccessModal,
    onPerformCheckin,
  };
};

export default useCheckinTable;