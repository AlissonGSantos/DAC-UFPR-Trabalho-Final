import React from "react";

import { Armchair } from "phosphor-react";

interface SeatComponentProps {
  index: number;
  isActive: boolean;
  isBooked?: boolean;
  onClick: (index: number) => void;
}
const SeatComponent: React.FC<SeatComponentProps> = ({
  index,
  isActive,
  onClick,
  isBooked,
}) => {
  let buttonClass = "bg-slate-700 hover:bg-slate-400 text-slate-300";

  if (isActive) {
    buttonClass = "bg-sky-300 hover:bg-sky-500 text-slate-800";
  } else if (isBooked) {
    buttonClass = "bg-red-500 text-slate-300 cursor-not-allowed";
  }

  return (
    <button
      key={index}
      className={`${buttonClass} flex text-center items-center gap-2 justify-center cursor-pointer p-2 rounded-lg`}
      disabled={isBooked}
      onClick={() => {
        onClick(index);
      }}
    >
      <Armchair size={16} />
      <p className={`text-xs font-bold`}>{index + 1}</p>
    </button>
  );
};

export default SeatComponent;
