export const maskNumber = (value: string | number): string => {
  const numericString = value.toString().replace(/\D/g, '');
  
  if (!numericString) return '0';
  
  return numericString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};


export const convertFromNumberMask = (value: string): number => {
  const numericValue = parseInt(value.replace(/\./g, ''), 10);
  return isNaN(numericValue) ? 0 : numericValue;
};