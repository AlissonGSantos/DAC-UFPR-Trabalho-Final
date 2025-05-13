"use client";

import { use } from "react";
import useBooking from "./useBooking";
import { robotoFont } from "@/app/assets/fontsSetup";
import BookingCard from "./components/BookingCard";
import { maskCurrency } from "@/app/utils/currencyMask";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";

const BookingDetail = ({ params }: { params: Promise<{ codigo: string }> }) => {
  const { codigo } = use(params);
  const { booking, loading } = useBooking(codigo);

  const router = useRouter();

  if (loading) return <Loader loading />;

  return (
    <div className="flex flex-col p-10 h-full w-full">
      <div className="flex justify-between itens-center mx-6 py-6 mb-4 border-b border-indigo-800">
        <h1
          className={`text-2xl mx font-bold uppercase ${robotoFont.className} text-slate-300`}
        >
          Detalhes da Reserva
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center p-8 bg-slate-900 rounded-lg h-full w-5/6 mx-auto">
        <div className="flex justify-around items-center h-full bg-slate-800 rounded-lg p-8">
          <div className="flex flex-col h-full w-2/3 gap-6">
            <BookingCard
              title="Dados da Reserva"
              items={[
                { label: "Código", value: booking.codigo },
                {
                  label: "Data",
                  value: new Date(booking.data).toLocaleString("pt-BR"),
                },
                {
                  label: "Valor Total",
                  value: maskCurrency(
                    booking.valor ??
                      booking.voo.valor_passagem *
                        booking.poltronas_reservadas.length -
                        booking.quantidade_milhas * 5
                  ),
                },
                {
                  label: "Milhas Utilizadas",
                  value: booking?.quantidade_milhas?.toString() ?? "0",
                },
                {
                  label: "Poltronas",
                  value: booking?.poltronas_reservadas.length.toString() ?? "0",
                },
                { label: "Status", value: booking.estado },
              ]}
            />
          </div>

          <div className="w-0.5 bg-indigo-800 h-11/12 mx-8"></div>

          <div className="flex flex-col h-full w-2/3 gap-6">
            <BookingCard
              title="Dados do Voo"
              items={[
                { label: "Código", value: booking.voo_codigo },
                {
                  label: "Data",
                  value: new Date(booking.voo.data).toLocaleString("pt-BR"),
                },
                {
                  label: "Valor da Passagem",
                  value: maskCurrency(booking.voo.valor_passagem),
                },
                {
                  label: "Assentos Disponíveis",
                  value: `${
                    booking.voo.quantidade_poltronas_total -
                    booking.voo.quantidade_poltronas_ocupadas
                  }/${booking.voo.quantidade_poltronas_total}`,
                },
                {
                  label: "Origem",
                  value: `${booking.voo.aeroporto_origem.codigo} - ${booking.voo.aeroporto_origem.cidade}/${booking.voo.aeroporto_origem.uf}`,
                },
                {
                  label: "Destino",
                  value: `${booking.voo.aeroporto_destino.codigo} - ${booking.voo.aeroporto_destino.cidade}/${booking.voo.aeroporto_destino.uf}`,
                },
                { label: "Status", value: booking.voo.estado },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start items-center py-4 px-6">
        <Button
          onClick={() => router.push("/client/booking")}
          type="PRIMARY"
          text="Voltar para Reservas"
          size="SMALL"
        />
      </div>
    </div>
  );
};

export default BookingDetail;
