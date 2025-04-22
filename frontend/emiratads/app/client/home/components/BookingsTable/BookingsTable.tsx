"use client";

import React from "react";
import DataTable from "@/app/components/DataTable/DataTable";
import useBookingsTable from "./useBookingsTable";
import CancelBookingModal from "../CancelBookingModal/CancelBookingModal";

const BookingTable: React.FC = () => {
  const {
    bookingList,
    columns,
    controls,
    isCancelModalOpen,
    selectedBooking,
    onDismissCancelModal,
    onCancelBooking,
  } = useBookingsTable();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-300">Minhas Reservas</h1>
      <DataTable
        data={bookingList}
        columns={columns}
        controls={controls}
      />
      <CancelBookingModal
        booking={selectedBooking || undefined}
        isOpen={isCancelModalOpen}
        onClose={onDismissCancelModal}
        onCancel={onCancelBooking}
      />
    </div>
  );
};

export default BookingTable;
