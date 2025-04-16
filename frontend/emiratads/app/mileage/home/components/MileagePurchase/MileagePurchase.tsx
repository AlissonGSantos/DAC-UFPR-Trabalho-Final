"use client";
import React from "react";
import useMileagePurchase from "./useMileagePurchase";

const MileagePurchase = () => {
  const {calculatePrice, fixedPrice} = useMileagePurchase();
  var total = calculatePrice(userInput)
  return (
    <div>
      <p>O custo de cada milha é R$ ${fixedPrice}</p>
      <p>Total da sua compra é: R$ ${total}</p>
    </div>
  );
};

export default MileagePurchase;
