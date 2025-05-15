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

export const convertFromMaskToInteger = (value: string): number => {
  const numericValue = parseFloat(value.replace(/\D/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
};
