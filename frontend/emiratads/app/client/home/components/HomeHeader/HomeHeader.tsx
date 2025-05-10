"use client";
import React from "react";
import Link from "next/link";
import useHomeHeader from "./useHomeHeader";

const HomeHeader = () => {
  const { username, milescore } = useHomeHeader();
  return (
    <div className="flex mx-10 py-10 border-b border-indigo-800">
      <div className="flex w-3/4 flex-col  p-4">
        <h1 className="text-xl font-bold text-slate-300">
          Bem-vindo ao Emiratads, {username}
        </h1>
        <p className="text-slate-300">
          Aqui você pode gerenciar suas reservas e e encontrar as melhores
          ofertas!
        </p>
      </div>
      <div className="flex flex-col justify-center items-end flex-1">
        <h1 className="text-xl font-bold text-slate-300">
          Seu saldo em milhas: {milescore}
        </h1>
        <Link
          href={`/mileage/home`}
          className="text-xs text-indigo-400 underline">
          Comprar milhas
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;
