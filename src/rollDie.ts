import { webcrypto } from 'crypto';

export const rollDie = (): number => {
  const array = new Uint8Array(1);

  webcrypto.getRandomValues(array);

  return (array[0] % 6) + 1;
};
