"use client";

const useMileagePurchase = () => {
  const fixedPrice = 5.00;
  
  const calculatePrice = (amount: number) => {
    return amount * fixedPrice;
  };
  
  return {calculatePrice,fixedPrice}
};

export default useMileagePurchase;
