"use client";
import Button from "@/app/components/Button/Button";
import SelectInput from "@/app/components/SelectInput/SelectInput";
import React from "react";
import useSearchForm from "./useSearchForm";
import { Flight } from "@/app/types/FlightTypes";

interface SearchFormProps {
  onFindFlights: (flights: Flight[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onFindFlights }) => {
  const {
    handleAirportChange,
    airportsOptions,
    errors,
    register,
    handleSubmit,
    onSubmit,
  } = useSearchForm({ onFindFlights });

  return (
    <form
      className="flex flex-col h-full w-full bg-slate-800 rounded-lg p-4 gap-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-16 px-8">
        <div className="flex-1">
          <SelectInput
            options={airportsOptions}
            label="Aeroporto de Origem"
            error={errors.OriginAirport?.message}
            {...register("OriginAirport", {
              onChange: (e) => handleAirportChange(e.target.value, "ORIGIN"),
            })}
          />
        </div>
        <div className="flex-1">
          <SelectInput
            options={airportsOptions}
            label="Aeroporto de Destino"
            error={errors.DestinationAirport?.message}
            {...register("DestinationAirport", {
              onChange: (e) =>
                handleAirportChange(e.target.value, "DESTINATION"),
            })}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          text="Buscar"
          typeButton="submit"
          size="SMALL"
          extraClass="w-1/4 mr-8"
        />
      </div>
    </form>
  );
};

export default SearchForm;
