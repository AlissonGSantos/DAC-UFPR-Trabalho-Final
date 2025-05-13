import bookingService from "@/app/client/services/bookingService";
import { ButtonProps } from "@/app/components/Button/Button";
import useBookingContext from "@/app/contexts/booking";
import { Booking, statusBookingEnum } from "@/app/types/BookingTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";

const useCheckinTable = () => {
  const { bookingList, setBookingList } = useBookingContext();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [eligibleBookings, setEligibleBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const now = new Date();
    const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const newBookingList = bookingList.filter((booking) => {
      const bookingDateStr = booking?.voo?.data;
      if (!bookingDateStr) return false;
      const bookingDate = new Date(bookingDateStr);

      return (
        booking.estado === statusBookingEnum.CRIADA &&
        bookingDate >= now &&
        bookingDate <= in48Hours
      );
    });

    setEligibleBookings(newBookingList);
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

  useEffect(() => {
    console.log("Booking List:", bookingList);
  }, [bookingList]);

  const onPerformCheckin = async (booking: Booking) => {
    if (booking.estado !== statusBookingEnum.CRIADA) {
      alert("Apenas reservas no estado CRIADA podem receber check-in.");
      return;
    }

    const response = await bookingService.checkInBooking(booking.codigo);

    console.log("Check-in response:", response);

    if (!response) {
      alert("Erro ao realizar check-in. Tente novamente mais tarde.");
      return;
    }

    const newBookingList = bookingList.map((b) => {
      if (b.codigo === response.codigo) {
        return { ...b, estado: statusBookingEnum.CHECK_IN };
      }
      return b;
    });

    setBookingList(newBookingList);

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
    },
  ];

  const controls: (booking: Booking) => ButtonProps[] = (booking) => [
    {
      text: "Fazer Check-in",
      type:
        booking.estado === statusBookingEnum.CRIADA ? "PRIMARY" : "DISABLED",
      onClick: (row: Booking) => {
        onOpenCheckinModal(row);
      },
      size: "SMALL",
      disabled: booking.estado !== statusBookingEnum.CRIADA,
    },
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
