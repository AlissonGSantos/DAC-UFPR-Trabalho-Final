"use client"

import { Booking } from "../useBooking";
import { AirplaneTakeoff } from "phosphor-react";

export default function BookingCard({ booking }: { booking: Booking }) {
  const formattedDate = new Date(booking.data).toLocaleString();

  return (
    <div className="mt-6 p-6 bg-slate-800 rounded-lg text-slate-300">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Reserva #{booking.codigo}</h2>
          <span className={`text-sm px-2 py-1 rounded ${
            booking.estado === "CONFIRMADA" 
              ? "bg-green-500" 
              : "bg-yellow-500"
          }`}>
            {booking.estado}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-75">{formattedDate}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-lg">
        <span>{booking.voo.origem}</span>
        <AirplaneTakeoff size={20} className="text-blue-400" />
        <span>{booking.voo.destino}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm opacity-75">Valor</p>
          <p className="font-bold">R$ {booking.valor.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm opacity-75">Milhas</p>
          <p className="font-bold">{booking.milhas_utilizadas}</p>
        </div>
        <div>
          <p className="text-sm opacity-75">Poltronas</p>
          <p className="font-bold">{booking.quantidade_poltronas}</p>
        </div>
      </div>
    </div>
  );
}