import React from "react";
import SearchForm from "../SearchForm/SearchForm";

const SearchComponent = () => {
  return (
    <div className="flex flex-col h-full w-full bg-slate-800 border-1 border-indigo-800 rounded-lg p-4">
      <div className="flex flex-col p-4 rounded-lg shadow-md gap-6 mb-8">
        <h1 className="text-3xl font-bold text-slate-300">Buscar Voos</h1>
        <SearchForm />
      </div>
    </div>
  );
};

export default SearchComponent;
