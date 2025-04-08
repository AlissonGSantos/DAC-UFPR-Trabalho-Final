"use client";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import React from "react";
import useRegisterFlightForm from "./useRegisterFlightForm";
import { maskCurrency } from "@/app/utils/currencyMask";
import { robotoFont } from "@/app/assets/fontsSetup";

const RegisterFlightForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useRegisterFlightForm();

  return(
  <div className="flex flex-col w-full justify-center py-8">
    <h1
      className={`text-5xl font-semibold ${robotoFont.className} my-12 tracking-widest text-indigo-600 mx-auto`}
    >
      CADASTRO DE VOO 
    </h1>
    <div className="flex w-3/4 flex-row mx-auto justify-center">
      <form
            className="flex w-full flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row justify-around">
          <Input
            type={"text"}
            label={"Aeroporto de Origem:"}
            {...register("OriginAirport")}
            error={
              errors.OriginAirport
                ? [{ hasError: true, message: errors.OriginAirport.message ?? "" }]
                : []
            }
            extraClasses="flex-1"
          />
          <Input
            type={"text"}
            label={"Aeroporto de Origem:"}
            {...register("OriginAirport")}
            error={
              errors.OriginAirport
                ? [{ hasError: true, message: errors.OriginAirport.message ?? "" }]
                : []
            }
            extraClasses="flex-1"
          />
        </div>
        <div className="flex flex-row justify-around">
        <Input
            type={"datetime-local"}
            label={"Data e Hora do Voo:"}
            {...register("dateTimeFlight")}
            error={
              errors.dateTimeFlight
                ? [{ hasError: true, message: errors.dateTimeFlight.message ?? "" }]
                : []
            }
            extraClasses="flex-1"
          />
          <Input
            type={"number"}
            label={"Quantidade de Poltronas:"}
            {...register("seatsQuantity")}
            error={
              errors.seatsQuantity
                ? [{ hasError: true, message: errors.seatsQuantity.message ?? "" }]
                : []
            }
            extraClasses="flex-1"
          />
        </div>
        <div className="flex flex-row justify-around">
        <Input
            type={"text"}
            step="0.01"
            label={"Valor da Passagem (R$):"}
            {...register("ticketValue", {
              onChange: (e) => {
                e.target.value = maskCurrency(e.target.value);
              },
            })}
            extraClasses="flex-1"
          />
          <Input
            type={"number"}
            label={"Equivalente em Milhas:"}
            {...register("miles")}
            error={
              errors.seatsQuantity
                ? [{ hasError: true, message: errors.seatsQuantity.message ?? "" }]
                : []
            }
            extraClasses="flex-1"
            disabled
          />
        </div>
        <div className="flex w-1/3 mx-auto mt-6">
            <Button
              text={"Cadastrar Voo"}
              extraClass="flex w-full justify-center"
              typeButton="submit"
              size="SMALL"
            />
          </div>
      </form>
    </div>
  </div>
  )
}

export default RegisterFlightForm;