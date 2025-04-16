import { Flight } from "@/app/types/FlightTypes";
import { useState } from "react";

const useSearchComponent = () => {
  const [activeFlightList, setActiveFlightList] = useState<Flight[]>([]);

  return {
    activeFlightList,
    setActiveFlightList,
  };
};

export default useSearchComponent;
