import { robotoFont } from "@/app/assets/fontsSetup";
import React from "react";
import SearchComponent from "./components/SearchComponent/SearchComponent";

const SearchFlight = () => {
  return <div className="flex flex-col">
    <div className="flex flex-col p-10">
      <h1 className={`text-3xl mx-6 font-bold uppercase ${robotoFont.className} text-slate-300`}>VOOS</h1>
      <div className="w-full flex-col px-4 my-4 gap-8">
        <SearchComponent />
      </div>
    </div>
  </div>;
};

export default SearchFlight;
