import React, { ReactNode } from "react";

export interface OfferCardProps {
  code: string;
  description: string | ReactNode;
  valor: string;
  data: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  code,
  description,
  valor,
  data,
}) => {
  return (
    <a
      key={code}
      className="p-4 border-2 border-indigo-600 w-80 bg-slate-800 flex-col gap-4 rounded-md shadow-md"
      href={`/client/flight/${code}`}
      target="_blank"
    >
      <h3 className="text-xl font-semibold text-indigo-600">{description}</h3>
      <p className="text-slate-300 my-4">Valor: {valor}</p>
      <p className="text-slate-300">Data: {data}</p>
    </a>
  );
};

export default OfferCard;
