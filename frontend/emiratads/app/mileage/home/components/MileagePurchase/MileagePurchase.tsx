"use client";

import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import React, { useState } from "react";
import useMileagePurchase from "./useMileagePurchase";
import { useAuthContext } from "@/app/contexts/auth";


const MileagePurchase = () => {
  const {calculatePrice, fixedPrice} = useMileagePurchase();
  const [miles, setMiles] = useState(0);
  const [message, setMessage] = useState("");
  const {userData} = useAuthContext;
  var total = calculatePrice(miles);
  
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

  return (
    <div>
      <p>O custo de cada milha é R$ ${fixedPrice}</p>
        <Input type="number" label="Milhas" placeholder="N. de Milhas" />
      <p>Total da sua compra é: R$ ${total}</p>
      <Button text="Comprar Milhas" type="PRIMARY" size="MEDIUM" onclick={realizaCompra} />
    </div>
  );
};

export default MileagePurchase;
