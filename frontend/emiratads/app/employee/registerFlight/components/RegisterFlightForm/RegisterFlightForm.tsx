"use client";
import React from "react";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import useRegisterFlightForm from "./useRegisterFlightForm";
import { maskCurrency } from "@/app/utils/currencyMask";
import { robotoFont } from "@/app/assets/fontsSetup";
import SelectInput from "@/app/components/SelectInput/SelectInput";
import Toast from "@/app/components/Toast/Toast";

const RegisterFlightForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSuccess,
    originOptions,
    destinationOptions,
  } = useRegisterFlightForm();

  return (
    <div className="flex flex-col w-full justify-center py-8">
      <h1
        className={`text-5xl font-semibold ${robotoFont.className} my-12 tracking-widest text-indigo-600 mx-auto`}
      >
        CADASTRO DE VOO
      </h1>
      <div className="flex w-3/4 flex-row mx-auto justify-center">
        <Toast
          message={"Ocorreu um erro inesperado, tente novamente mais tarde."}
          type={"ERROR"}
          isOpen={false}
          onClose={() => {}}
          duration={3000}
        />
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row justify-around gap-4">
            <SelectInput
              options={originOptions}
              label="Aeroporto de Origem:"
              {...register("OriginAirport")}
              error={errors.OriginAirport ? errors.OriginAirport.message : ""}
            />
            <SelectInput
              options={destinationOptions}
              label="Aeroporto de Destino:"
              {...register("DestinationAirport")}
              error={
                errors.DestinationAirport
                  ? errors.DestinationAirport.message
                  : ""
              }
            />
          </div>

          <div className="flex flex-row justify-around gap-4">
            <Input
              type="datetime-local"
              label="Data e Hora do Voo:"
              {...register("dateTimeFlight")}
              error={
                errors.dateTimeFlight
                  ? [
                      {
                        hasError: true,
                        message: errors.dateTimeFlight.message ?? "",
                      },
                    ]
                  : []
              }
              extraClasses="flex-1"
            />
            <Input
              type="number"
              label="Quantidade de Poltronas:"
              {...register("seatsQuantity")}
              error={
                errors.seatsQuantity
                  ? [
                      {
                        hasError: true,
                        message: errors.seatsQuantity.message ?? "",
                      },
                    ]
                  : []
              }
              extraClasses="flex-1"
            />
          </div>

          <div className="flex flex-row justify-around gap-4">
            <Input
              type="text"
              step="0.01"
              label="Valor da Passagem (R$):"
              {...register("ticketValue", {
                onChange: (e) => {
                  e.target.value = maskCurrency(e.target.value);
                },
              })}
              extraClasses="flex-1"
            />
            <Input
              type="number"
              label="Equivalente em Milhas:"
              {...register("miles")}
              error={
                errors.seatsQuantity
                  ? [
                      {
                        hasError: true,
                        message: errors.seatsQuantity.message ?? "",
                      },
                    ]
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
      {showSuccess && (
        <p className="text-green-600 mt-4 text-center font-medium">
          VOO CADASTRADO COM SUCESSO!
        </p>
      )}
    </div>
  );
};

export default RegisterFlightForm;
