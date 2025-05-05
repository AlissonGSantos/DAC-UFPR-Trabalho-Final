"use client";
import React from "react";
import SearchForm from "@/app/client/searchFlight/components/SearchForm/SearchForm";
import useSearchComponent from "./useSearchComponent";
import FlightsTable from "@/app/client/searchFlight/components/FlightsTable/FlightsTable";

interface SearchComponentProps {
  fromHome?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ fromHome }) => {
  const {
    activeFlightList,
    onChangeDestination,
    onChangeOrigin,
    redirectToSearchFlight,
    onFindFlights,
    showFlightTable,
  } = useSearchComponent();

  return (
    <>
      <div className="flex flex-col h-full w-full bg-slate-800 border-1 border-indigo-800 rounded-lg px-2">
        <div className="flex flex-col p-4 rounded-lg gap-4">
          <h1 className="text-2xl font-bold text-slate-300">Buscar Voos</h1>
          <SearchForm
            onChangeDestination={onChangeDestination}
            onChangeOrigin={onChangeOrigin}
            onFindFlights={onFindFlights}
            onRedirect={fromHome ? redirectToSearchFlight : undefined}
          />
        </div>
      </div>
      {showFlightTable && (
        <div className="flex flex-col p-4 rounded-lg gap-6 my-8">
          <h1 className="text-2xl font-bold text-slate-300 uppercase">
            Resultados
          </h1>
          <FlightsTable flights={activeFlightList} />
        </div>
      )}
    </>
  );
};

export default SearchComponent;
