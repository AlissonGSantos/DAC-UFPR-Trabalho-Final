"use client";
import React from "react";
import useOfferSection from "./useOfferSection";
import { maskCurrency } from "@/app/utils/currencyMask";
import OfferCard from "./components/OfferCard/OfferCard";
import { AirplaneInFlight } from "phosphor-react";

const OffersSection = () => {
  const { offers } = useOfferSection();
  return (
    offers.length > 0 && (
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-slate-300">Ofertas</h1>
        <div className="flex justify-around px-6 gap-4 flex-wrap py-4">
          {offers.map((offer) => (
            <OfferCard
              key={offer.codigo}
              code={offer.codigo}
              description={
                <div className="flex items-center gap-4">
                  <p>{offer.aeroporto_origem.cidade}</p>
                  <AirplaneInFlight
                    size={24}
                    weight="fill"
                    className="text-indigo-500"
                  />
                  <p>{offer.aeroporto_destino.cidade}</p>
                </div>
              }
              valor={maskCurrency(offer.valor_passagem || 0)}
              data={new Date(offer.data).toLocaleDateString("pt-BR")}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default OffersSection;
