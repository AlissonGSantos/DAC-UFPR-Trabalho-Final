export function validateBoardCode(code: string): boolean {
  if (!code || code.length !== 7) {
    return false;
  }

  const firstThree = code.slice(0, 3);
  if (!/^[A-Za-z]{3}$/.test(firstThree)) {
    return false;
  }

  const lastFour = code.slice(3, 7);
  if (!/^[0-9]{4}$/.test(lastFour)) {
    return false;
  }

  return true;
}
