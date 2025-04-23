export function validateBoardCode(code: string): boolean {
    if (!code || code.length !== 6) {
      return false;
    }
  
    const firstThree = code.slice(0, 3);
    if (!/^[A-Za-z]{3}$/.test(firstThree)) {
      return false;
    }

    const lastThree = code.slice(3, 6);
    if (!/^[0-9]{3}$/.test(lastThree)) {
      return false;
    }
  
    return true;
}