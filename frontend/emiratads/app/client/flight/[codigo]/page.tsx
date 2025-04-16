"use client";

import useFlightDetail from "./useFlightDetail";
import { use } from "react";
import SeatComponent from "./components/SeatComponent/SeatComponent";
import { maskCurrency } from "@/app/utils/currencyMask";
import Button from "@/app/components/Button/Button";
import ConfirmBookModal from "./components/ConfirmBookModal/ConfirmBookModal";
import Toast from "@/app/components/Toast/Toast";

const FlightDetail = ({ params }: { params: Promise<{ codigo: string }> }) => {
  const { codigo } = use(params);
  const {
    flight,
    sitsQuantity,
    onBookFlight,
    availableSits,
    onSelectSit,
    selectedSits,
    firstHalf,
    secondHalf,
    reservedSeats,
    isConfirmModalOpen,
    openModal,
    closeModal,
    onCancel,
    isToastOpen,
    setIsToastOpen,
    errorMessage,
  } = useFlightDetail(codigo);

  if (!codigo) {
    return <p>Parâmetro "codigo" não encontrado na URL.</p>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row justify-between items-center p-16">
        <h1 className="text-2xl text-slate-300 uppercase">
          Detalhes do voo: {flight?.codigo}
        </h1>
      </div>
      <div>
        <div className="flex flex-col h-full w-full bg-slate-900 rounded-lg p-8">
          <div className="flex items-center h-full w-full px-16 bg-slate-800 rounded-lg p-8">
            <div className="flex flex-col h-full w-1/3">
              <div>
                <h2 className="text-xl text-slate-300 mb-4">
                  Informações do voo
                </h2>
                <div className="flex flex-col w-full h-full gap-4">
                  <p className="text-slate-300">Código: {flight?.codigo}</p>
                  <p className="text-slate-300">
                    Origem: {flight?.aeroporto_origem.cidade}-
                    {flight?.aeroporto_origem.uf}{" "}
                    {flight?.aeroporto_origem.codigo}
                  </p>
                  <p className="text-slate-300">
                    Destino: {flight?.aeroporto_destino.cidade}-
                    {flight?.aeroporto_destino.uf}{" "}
                    {flight?.aeroporto_destino.codigo}
                  </p>
                  <p className="text-slate-300">
                    Data:{" "}
                    {flight?.data
                      ? new Date(flight.data).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "Data não disponível"}
                  </p>{" "}
                  <p className="text-slate-300">
                    Quantidade de assentos disponíveis: {availableSits}
                  </p>
                  <p className="text-slate-300">
                    Assentos selecionados: {sitsQuantity}
                  </p>
                  <p className="text-slate-300">
                    Valor total:{" "}
                    {maskCurrency((flight?.valor_passagem ?? 0) * sitsQuantity)}
                  </p>
                  <div>
                    <Button
                      onClick={openModal}
                      type="PRIMARY"
                      text="Reservar"
                      size="SMALL"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-0.5 bg-indigo-800 h-11/12"></div>
            <div className="flex flex-col flex-1 w-full h-full px-8">
              <div className="flex flex-col h-full w-full">
                <h2 className="text-2xl text-slate-300 mb-4">Assentos</h2>
                <div className="flex w-full justify-center">
                  <div className="grid grid-cols-4 gap-2">
                    {firstHalf.map((index) => (
                      <SeatComponent
                        isActive={selectedSits.includes(index)}
                        isBooked={reservedSeats.includes(index)}
                        key={index}
                        index={index}
                        onClick={() => onSelectSit(index)}
                      />
                    ))}
                  </div>
                  <div className="m-8"></div>
                  <div className="grid grid-cols-4 gap-2">
                    {secondHalf.map((index) => (
                      <SeatComponent
                        isActive={selectedSits.includes(index)}
                        isBooked={reservedSeats.includes(index)}
                        key={index}
                        index={index}
                        onClick={() => onSelectSit(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmBookModal
        isOpen={isConfirmModalOpen}
        onClose={closeModal}
        onConfirm={onBookFlight}
        onCancel={onCancel}
        value={maskCurrency((flight?.valor_passagem ?? 0) * sitsQuantity)}
        quantity={sitsQuantity}
      />
      <Toast
        isOpen={isToastOpen}
        onClose={() => {
          setIsToastOpen(false);
        }}
        message={errorMessage}
        type={"ERROR"}
        duration={3000}
      />
    </div>
  );
};

export default FlightDetail;
