import React from "react";
import FlightTable from "./components/FlightTable/FlightTable";

const Home = () => {   
  return (
    <div className="flex flex-col items-start min-h-screen bg-gray-900 px-16">
      <div className="w-full flex flex-col mx-auto mt-16">
        <h1 className="text-slate-300 ml-4 text-3xl font-semibold mb-4">Próximos voos (48h)</h1>
        <FlightTable />
      </div>
    </div>
  );
}

export default Home;