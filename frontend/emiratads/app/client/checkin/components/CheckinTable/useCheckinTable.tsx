import { ButtonProps } from "@/app/components/Button/Button";
import useBookingContext from "@/app/contexts/booking";
import { Booking, statusBookingEnum } from "@/app/types/BookingTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useMemo } from "react";

const useCheckinTable = () => {
  const { bookingList, setBookingList } = useBookingContext();

  const [bookingListActive, setBookingListActive] = useState<Booking[]>(bookingList);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const eligibleBookings = useMemo(() => {
    const now = new Date();
    const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    return bookingListActive.filter((booking) => {
      const bookingDate = new Date(booking.voo.data);
      return (
        booking.estado === statusBookingEnum.CRIADA &&
        bookingDate >= now &&
        bookingDate <= in48Hours
      );
    });
  }, [bookingListActive]);

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

    setBookingListActive(newBookingList);
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
