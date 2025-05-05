"use client";

import useFlightDetail from "./useFlightDetail";
import { use } from "react";
import SeatComponent from "./components/SeatComponent/SeatComponent";
import { maskCurrency } from "@/app/utils/currencyMask";
import Button from "@/app/components/Button/Button";
import ConfirmBookModal from "./components/ConfirmBookModal/ConfirmBookModal";
import Toast from "@/app/components/Toast/Toast";
import Input from "@/app/components/Input/Input";

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
    userMilesBalance,
    milesToUse,
    handleMilesChange,
    totalPrice,
    register,
    errors,
    inputError,
  } = useFlightDetail(codigo);

  if (!codigo) {
    return <p>Parâmetro "codigo" não encontrado na URL.</p>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row justify-between items-center px-16 p-8">
        <h1 className="text-2xl text-slate-300 uppercase">
          Detalhes do voo: {flight?.codigo}
        </h1>
      </div>
      <div>
        <div className="flex flex-col h-full w-full bg-slate-900 rounded-lg px-8 pb-8">
          <div className="flex items-center h-full w-full bg-slate-800 rounded-lg py-8">
            <div className="flex flex-col h-full w-1/3">
              <div className="flex flex-col w-8/10 p-4 bg-slate-850 rounded-lg border border-indigo-700 shadow-md mx-auto">

                <h2 className="text-xl text-slate-300 mb-4">
                  Informações do voo
                </h2>
                
                <div className="border-b-2 border-indigo-700 mb-3"/>

                <div className="flex flex-col w-full h-full gap-4">
                  
                  <p className="text-slate-300 p-1 transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1">Código: </span> 
                    <span className="border-b border-indigo-600 flex-auto border-dashed">{flight?.codigo}</span>
                  </p>

                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1">Origem: </span> 
                    <span className="border-b border-indigo-600 flex-auto border-dashed">
                      {flight?.aeroporto_origem.cidade}{"/"}
                      {flight?.aeroporto_origem.uf}{" - "}
                      {flight?.aeroporto_origem.codigo}
                    </span>
                  </p>

                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1">Destino: </span> 
                    <span className="border-b border-indigo-600 flex-auto border-dashed">
                      {flight?.aeroporto_destino.cidade}{"/"}
                      {flight?.aeroporto_destino.uf}{" - "}
                      {flight?.aeroporto_destino.codigo}
                    </span>
                  </p>

                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1">Data: </span>
                    <span className="border-b border-indigo-600 flex-auto border-dashed">
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
                    </span>
                  </p>

                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1">Assentos disponíveis: </span> 
                    <span className="border-b border-indigo-600 flex-auto border-dashed">{availableSits}</span>
                  </p>

                  <div className="border-b-2 border-indigo-700 "/>

                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1">Assentos selecionados: </span> 
                    <span className="border-b border-indigo-600 flex-auto border-dashed">{sitsQuantity}</span>
                  </p>

                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1">Subtotal: </span>
                    <span className="border-b border-indigo-600 flex-auto border-dashed">{maskCurrency((flight?.valor_passagem ?? 0) * sitsQuantity)}</span>
                  </p>

                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1">Total em milhas: </span>
                    <span className="border-b border-indigo-600 flex-auto border-dashed">{((flight?.valor_passagem ?? 0) * sitsQuantity / 5)}</span>
                  </p>

                  <div className="border-b-2 border-indigo-700"/> 
                  
                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1"> Seu saldo de milhas: </span>
                    <span className="border-b border-indigo-600 flex-auto border-dashed font-semibold">{userMilesBalance}</span>
                  </p>

                  <div className="flex items-baseline text-slate-300 p-1">
                    <span className="font-semibold text-indigo-400 flex-none pe-2">Quantas milhas deseja usar?</span>
                    <Input
                      type={"number"}
                      label={""}
                      {...register("miles", {
                        onChange: (e) => handleMilesChange(Number(e.target.value)),
                        valueAsNumber: true,
                      })}
                      value={milesToUse}
                      placeholder="0"
                      min={0}
                      max={userMilesBalance}
                      extraClasses="w-32"
                      disabled={sitsQuantity === 0}
                      error={
                        (errors.miles || inputError) 
                          ? [
                              {
                                hasError: true,
                                message: errors.miles?.message || inputError || "",
                              },
                            ]
                          : []
                      }
                    />
                  </div>

                  <p className="text-slate-300 p-1 rounded transition-colors flex flex-row">
                    <span className="font-semibold text-indigo-400 flex-none pe-1"> Valor total: </span>
                    <span className="font-semibold text-emerald-500 border-b border-indigo-600 flex-auto border-dashed">
                      {maskCurrency(totalPrice > 0 ? totalPrice : 0)}
                    </span>
                  </p>

                  <div className="border-b-2 border-indigo-700"/> 

                  <div className="mt-2">
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
        value={maskCurrency(totalPrice > 0 ? totalPrice : 0)}
        quantity={sitsQuantity}
        milesUsed={milesToUse}
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
