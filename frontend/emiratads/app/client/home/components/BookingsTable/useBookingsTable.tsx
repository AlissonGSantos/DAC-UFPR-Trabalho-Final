import { ButtonProps } from "@/app/components/Button/Button";
import { useAuthContext } from "@/app/contexts/auth";
import useBookingContext from "@/app/contexts/booking";
import { useRouter } from "next/navigation";
import { Booking, statusBookingEnum } from "@/app/types/BookingTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const useBookingsTable = () => {
  const { bookingList, setBookingList } = useBookingContext();
  const { userData, updateMilesBalance } = useAuthContext();

  const router = useRouter();

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const onDismissCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedBooking(null);
  };

  const onOpenCancelModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCancelModalOpen(true);
  };

  const onCancelBooking = (booking: Booking) => {
    if (!["CRIADA", "CHECK-IN"].includes(booking.estado)) {
      alert(
        "Apenas reservas nos estados CRIADA ou CHECK-IN podem ser canceladas."
      );
      return;
    }

    const newBookingList = bookingList.map((b) => {
      if (b.codigo === booking.codigo) {
        return { ...b, estado: statusBookingEnum.CANCELADA };
      }
      return b;
    });
    setBookingList(newBookingList);

    const updatedMilesBalance =
      (userData?.usuario.saldo_milhas ?? 0) + booking.milhas_utilizadas;

    updateMilesBalance(updatedMilesBalance);

    alert(
      `Reserva ${booking.codigo} cancelada. ${booking.milhas_utilizadas} milhas foram devolvidas ao seu saldo.`
    );

    setIsCancelModalOpen(false);
    setSelectedBooking(null);
  };

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "data",
      header: "Data/Hora",
      cell: ({ row }) =>
        new Date(row.getValue("data")).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      accessorKey: "voo.aeroporto_origem.codigo",
      header: "Aeroporto Origem",
      cell: ({ row }) =>
        `${row.original.voo.aeroporto_origem.codigo} - ${row.original.voo.aeroporto_origem.cidade}-${row.original.voo.aeroporto_origem.uf}`,
    },
    {
      accessorKey: "voo.aeroporto_destino.codigo",
      header: "Aeroporto Destino",
      cell: ({ row }) =>
        `${row.original.voo.aeroporto_destino.codigo} - ${row.original.voo.aeroporto_destino.cidade}-${row.original.voo.aeroporto_destino.uf}`,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => row.getValue("estado"),
    },
  ];

  const controls: (booking: Booking) => ButtonProps[] = (booking) =>
    [
      {
        text: "Ver Reserva",
        type: "PRIMARY",
        onClick: (row: Booking) => {
          router.push(`/client/booking/${row.codigo}`)
        },
        size: "SMALL",
      },
      {
        text: "Cancelar Reserva",
        type: ["CRIADA", "CHECK-IN"].includes(booking.estado)
          ? "DANGER"
          : "DISABLED",
        onClick: (row: Booking) => {
          onOpenCancelModal(row);
        },
        size: "SMALL",
        disabled: !["CRIADA", "CHECK-IN"].includes(booking.estado),
      },
    ].filter(Boolean) as ButtonProps[];

  useEffect(() => {
    const list = bookingList.filter((booking) => booking.estado === "CRIADA");

    setBookings(list.length > 0 ? list : bookingList);
  }, [bookingList]);

  return {
    bookingList,
    columns,
    controls,
    selectedBooking,
    isCancelModalOpen,
    onDismissCancelModal,
    onCancelBooking,
    bookings,
  };
};

export default useBookingsTable;
