import { roll } from './roll';

export const rollDice = (): number => {
  const numberOfDiceRolls = 4;

  const diceRolls = Array.from({ length: numberOfDiceRolls }, () => roll());

  const concatenatedResult = diceRolls.join('');

  console.log(concatenatedResult);

  return parseInt(concatenatedResult);
};
