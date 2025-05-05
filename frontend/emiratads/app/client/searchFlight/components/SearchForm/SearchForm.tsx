"use client";
import Button from "@/app/components/Button/Button";
import SelectInput from "@/app/components/SelectInput/SelectInput";
import React from "react";
import useSearchForm from "./useSearchForm";
import { Aeroporto, Flight } from "@/app/types/FlightTypes";
import { useSearchParams } from "next/navigation";
import { AirplaneInFlight, MagnifyingGlass } from "phosphor-react";

interface SearchFormProps {
  onFindFlights: (flights: Flight[]) => void;
  onRedirect?: () => void;
  onChangeDestination?: (destination: Aeroporto) => void;
  onChangeOrigin?: (origin: Aeroporto) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onFindFlights,
  onChangeDestination,
  onChangeOrigin,
  onRedirect,
}) => {
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin") ?? undefined;
  const destination = searchParams.get("destination") ?? undefined;

  const {
    handleAirportChange,
    airportsOptions,
    errors,
    register,
    handleSubmit,
    onSubmit,
  } = useSearchForm({
    onFindFlights,
    onChangeDestination,
    onChangeOrigin,
    origin,
    destination,
    onRedirect,
  });

  return (
    <form
      className="flex flex-col md:flex-row items-center w-full bg-slate-800 rounded-lg p-4 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 w-full">
        <div className="w-full md:w-5/12">
          <SelectInput
            options={airportsOptions}
            label="Aeroporto de Origem"
            error={errors.OriginAirport?.message}
            {...register("OriginAirport", {
              onChange: (e) => handleAirportChange(e.target.value, "ORIGIN"),
            })}
          />
        </div>
        <div className="flex items-center justify-center mx-1">
          <AirplaneInFlight
            size={24}
            weight="fill"
            className="text-indigo-500"
          />
        </div>
        <div className="w-full md:w-5/12">
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
        <div className="w-full md:w-2/12 mt-4 md:mt-0 md:ml-2">
          <Button
            text="Buscar"
            typeButton="submit"
            size="SMALL"
            iconPosition="RIGHT"
            children={<MagnifyingGlass size={18} weight="bold"/>}
            extraClass="w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
