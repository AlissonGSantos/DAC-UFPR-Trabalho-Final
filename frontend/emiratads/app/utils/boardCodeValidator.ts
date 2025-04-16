export function validateBoardCode(code: string): boolean {
    // Verifica se o código tem exatamente 6 caracteres
    if (!code || code.length !== 6) {
      return false;
    }
  
    // Verifica se os 3 primeiros caracteres são letras
    const firstThree = code.slice(0, 3);
    if (!/^[A-Za-z]{3}$/.test(firstThree)) {
      return false;
    }
  
    // Verifica se os 3 últimos caracteres são números
    const lastThree = code.slice(3, 6);
    if (!/^[0-9]{3}$/.test(lastThree)) {
      return false;
    }
  
    return true;
}