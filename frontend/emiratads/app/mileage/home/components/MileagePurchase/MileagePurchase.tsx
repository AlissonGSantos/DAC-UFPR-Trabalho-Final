"use client";

import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import useMileagePurchase from "./useMileagePurchase";
import { maskCurrency } from "@/app/utils/currencyMask";


const MileagePurchase = () => {
  const {calculatePrice, fixedPrice, miles, message, saldo_milhas,realizaCompra} = useMileagePurchase();
  var total = calculatePrice(miles);
  
  return (
    <div>
      <p>O custo de cada milha é R$ ${maskCurrency(fixedPrice.toString())}</p>
        <Input type="number" label="Milhas" placeholder="N. de Milhas" />
      <p>Total da sua compra é: R$ ${total}</p>
      <Button text="Comprar Milhas" type="PRIMARY" size="MEDIUM" onClick={realizaCompra} />
      <p>${message}</p>
      <p>Seu saldo atual de milhas é: ${saldo_milhas}</p>
    </div>
  );
};

export default MileagePurchase;
