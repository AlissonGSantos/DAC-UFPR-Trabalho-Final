"use client"

import React from "react";
import useBooking from "./useBooking";
import BookingCard from "./components/BookingCard";

export default function BookingPage({
  params,
}: {
  params: { codigo: string }; // Parâmetro da URL
}) {
  const { booking, isLoading } = useBooking(params.codigo);

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-slate-300">DETALHES DA RESERVA</h1>
      {booking && <BookingCard booking={booking} />}
    </div>
  );
}