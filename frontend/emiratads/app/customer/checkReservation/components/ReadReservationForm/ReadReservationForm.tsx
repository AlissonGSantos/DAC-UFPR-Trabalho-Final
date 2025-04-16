"use client";
import React from "react";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import useReadReservationForm from "./useReadReservationForm";
import { robotoFont } from "@/app/assets/fontsSetup";

const ReadReservationForm = () => {
    const { register, handleSubmit, errors, onSubmit, showSuccess } = useReadReservationForm();
  
    return (
      <div className="flex flex-col w-full justify-center py-8 border-2 border-indigo-900 mt-6 bg-gray-800">
        <div className="flex w-3/4 flex-row mx-auto justify-center">
          <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-around">
              <Input
                type="text"
                label="Código de Reserva:"
                {...register("CodeReservation")}
                error={
                  errors.CodeReservation
                    ? [{ hasError: true, message: errors.CodeReservation.message ?? "" }]
                    : []
                }
                extraClasses="flex-1"
                disabled
              />
              <Input
                type="text"
                label="Data/Hora do Voo:"
                {...register("dateTimeFlight")}
                error={
                  errors.dateTimeFlight
                    ? [{ hasError: true, message: errors.dateTimeFlight.message ?? "" }]
                    : []
                }
                extraClasses="flex-1"
                disabled
              />
            </div>
  
            <div className="flex flex-row justify-around">
              <Input
                type="text"
                label="Origem:"
                {...register("OriginAirport")}
                error={
                  errors.OriginAirport
                    ? [{ hasError: true, message: errors.OriginAirport.message ?? "" }]
                    : []
                }
                extraClasses="flex-1"
                disabled
              />
              <Input
                type="text"
                label="Destino:"
                {...register("DestinationAirport")}
                error={
                  errors.DestinationAirport
                    ? [{ hasError: true, message: errors.DestinationAirport.message ?? "" }]
                    : []
                }
                extraClasses="flex-1"
                disabled
              />
            </div>

            <div className="flex flex-row justify-around">
              <Input
                type="text"
                label="Valor (R$):"
                {...register("ticketValue")}
                error={
                  errors.ticketValue
                    ? [{ hasError: true, message: errors.ticketValue.message ?? "" }]
                    : []
                }
                extraClasses="flex-1"
                disabled
              />
              <Input
                type="text"
                label="Milhas:"
                {...register("miles")}
                error={
                  errors.miles
                    ? [{ hasError: true, message: errors.miles.message ?? "" }]
                    : []
                }
                extraClasses="flex-1"
                disabled
              />
            </div>

            <div className="flex flex-row justify-around">
              <Input
                type="text"
                label="Status do Voo:"
                {...register("flightStatus")}
                error={
                  errors.flightStatus
                    ? [{ hasError: true, message: errors.flightStatus.message ?? "" }]
                    : []
                }
                extraClasses="flex-1"
                disabled
              />
            </div>
  
            <div className="flex flex-row justify-between">
                <div className="flex w-1/3 mx-auto mt-6">
                    <Button
                        text={"Check-in"}
                        extraClass="flex w-full justify-center"
                        typeButton="submit"
                        size="SMALL"
                        type="TERTIARY"
                    />
            </div>
                <div className="flex w-1/3 mx-auto mt-6">
                    <Button
                        text={"Cancelar"}
                        extraClass="flex w-full justify-center"
                        typeButton="submit"
                        size="SMALL"
                        type="DANGER"
                    />
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ReadReservationForm;