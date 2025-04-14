import { robotoFont } from "@/app/assets/fontsSetup";
import React from "react";
import SearchComponent from "./components/SearchComponent/SearchComponent";

const SearchFlight = () => {
  return <div className="flex flex-col h-full w-full bg-slate-900">
    <div className="flex flex-col p-10">
      <h1 className={`text-3xl mx-6 font-bold uppercase ${robotoFont.className} text-slate-300`}>VOOS</h1>
      <div className="w-full flex px-4 my-4">
        <SearchComponent />
      </div>
    </div>
  </div>;
};

export default SearchFlight;
