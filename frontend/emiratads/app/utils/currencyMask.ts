export const maskCurrency = (value: string | number): string => {
  const numericValue =
    typeof value === "string"
      ? parseFloat(value.replace(/\D/g, "")) / 100
      : value;

  return isNaN(numericValue)
    ? "R$ 0,00"
    : numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
};

export const convertFromMaskToInteger = (maskedValue: string): number => {
  if (!maskedValue) return 0;
  const onlyNumbers = maskedValue.replace(/\D/g, "");
  return onlyNumbers ? parseFloat(onlyNumbers) / 100 : 0;
};