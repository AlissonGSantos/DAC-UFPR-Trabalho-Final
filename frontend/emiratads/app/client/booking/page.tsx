import React from "react";
import CheckReservationForm from "./components/CheckReservationForm/CheckReservationForm";

const Booking = () => {
  return (
    <div className="flex w-full p-4">
      <div className="flex justify-center flex-col mx-auto">
        
        <div
          className={`flex flex-col bg-sky min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-indigo-900`}
        >
          <CheckReservationForm></CheckReservationForm>          
        </div>
      </div>
    </div>
  );
};

export default Booking;