"use client";

import { useAuthContext } from "@/app/contexts/auth";
import { useState } from "react";

const useMileagePurchase = () => {
  const fixedPrice = 5.00;
  const [miles, setMiles] = useState(0);
  const [message, setMessage] = useState("");
  const { userData } = useAuthContext;

  const calculatePrice = (amount: number) => {
    return amount * fixedPrice;
  };

  const saldo_milhas = userData.saldo_milhas

  const realizaCompra = async () =>{
    try {
      const response = await fetch("/clinte/${id}/milhas", { //wip: confirmar endpoint de compra de milhas
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({quantidade: miles }),
      });

      if (!response.ok) {
        throw new Error("Compra de milhas sem sucesso.");
      }
      
      const data = await response.json();
      setMessage(`Compra realizada com sucesso! Saldo atual: ${data.saldo_milhas}`);
    } catch(error: any) {
      setMessage("Erro ao comprar Milhas");
    }
  };
 
  return {calculatePrice,fixedPrice,miles,message,saldo_milhas,realizaCompra}
};

export default useMileagePurchase;
