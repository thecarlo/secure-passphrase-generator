// eslint-disable-next-line @typescript-eslint/naming-convention
import Roll from 'roll';

export const rollDice = (): number => {
  const numberOfDiceRolls = 4;

  const roll = new Roll();

  const diceRolls = Array.from(
    { length: numberOfDiceRolls },
    () => roll.roll('d6').result,
  );

  const concatenatedResult = diceRolls.join('');

  console.log(concatenatedResult);

  return parseInt(concatenatedResult);
};
