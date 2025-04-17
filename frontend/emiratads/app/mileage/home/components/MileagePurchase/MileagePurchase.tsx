"use client";
import React, { useState } from "react";
import useMileagePurchase from "./useMileagePurchase";

const MileagePurchase = () => {
  const {calculatePrice, fixedPrice} = useMileagePurchase();
  const [miles, setMiles] = useState(0);
  const [message, setMessage] = useState("");
  var total = calculatePrice(miles);
  
  const realizaCompra = async () =>{
    try {
      const response = await fetch("/mileage", {
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

  return (
    <div>
      <p>O custo de cada milha é R$ ${fixedPrice}</p>
      <p>Total da sua compra é: R$ ${total}</p>
    </div>
  );
};

export default MileagePurchase;
