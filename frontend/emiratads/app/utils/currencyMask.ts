export const maskCurrency = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');
  const number = parseFloat(numericValue) / 100;
  return isNaN(number) ? 'R$ 0.00' : `R$ ${number.toFixed(2)}`;
};