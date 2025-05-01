"use client";
import React from "react";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import useCheckReservationForm from "./useCheckReservationForm";
import { robotoFont } from "@/app/assets/fontsSetup";
import ReadReservationForm from "../ReadReservationForm/ReadReservationForm";

const CheckReservationForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSuccess,
    selectedBooking,
    onCancel,
  } = useCheckReservationForm();

  return (
    <div className="flex flex-col w-full justify-center py-2">
      <h1
        className={`text-2xl font-semibold ${robotoFont.className} my-6 tracking-widest text-indigo-600 mx-auto`}
      >
        CONSULTAR RESERVA
      </h1>
      <div className="flex w-3/4 flex-row mx-auto justify-center">
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row justify-around">
            <Input
              type="text"
              label="Código de Reserva:"
              {...register("CodeReservation")}
              error={
                errors.CodeReservation
                  ? [
                      {
                        hasError: true,
                        message: errors.CodeReservation.message ?? "",
                      },
                    ]
                  : []
              }
              extraClasses="flex-1"
            />
          </div>

          <div className="flex w-1/3 mx-auto mt-6">
            <Button
              text={"Consultar"}
              extraClass="flex w-full justify-center"
              typeButton="submit"
              size="SMALL"
            />
          </div>
        </form>
      </div>
      {showSuccess && (
        <>
          <div className="flex w-3/4 mx-auto mt-6">
            <p className="text-green-500">Reserva encontrada com sucesso!</p>
          </div>
          {selectedBooking && (
            <ReadReservationForm
              reservation={selectedBooking}
              onCancel={onCancel}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CheckReservationForm;
