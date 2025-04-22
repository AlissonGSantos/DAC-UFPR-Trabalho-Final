"use client";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import useSearchComponent from "./useSearchComponent";
import FlightsTable from "../FlightsTable/FlightsTable";

const SearchComponent = () => {
  const { activeFlightList, setActiveFlightList } = useSearchComponent();

  return (
    <>
      <div className="flex flex-col h-full w-full bg-slate-800 border-1 border-indigo-800 rounded-lg p-4">
        <div className="flex flex-col p-4 rounded-lg  gap-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-300">Buscar Voos</h1>
          <SearchForm
            onFindFlights={(flights) => setActiveFlightList(flights)}
          />
        </div>
      </div>
      {activeFlightList.length > 0 && (
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
