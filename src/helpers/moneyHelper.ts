
export const CurrencyDivisions = {
  gallion: 493,
  mornille: 29,
  noise: 1
} as const;

export const getDivisions = (money: number) => {
  const gallion = Math.floor(money / CurrencyDivisions.gallion);
  const mornille = Math.floor((money % CurrencyDivisions.gallion) / CurrencyDivisions.mornille);
  const noise = money - (gallion * CurrencyDivisions.gallion + mornille * CurrencyDivisions.mornille);
  
  return {
    gallion,
    mornille,
    noise,
  };
};