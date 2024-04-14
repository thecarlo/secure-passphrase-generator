import { defaultConfiguration } from '@configuration/defaultConfiguration';
import { Configuration } from '@interfaces/configuration';

import { getWordByNumber } from './getWordByNumber';
import { rollDice } from './rollDice';

export const generatePassphrase = (
  configuration: Configuration = defaultConfiguration,
): string => {
  const { defaultSeparator, numberOfWords, useNumbers } = configuration;

  const words = Array.from({ length: numberOfWords }, () => {
    const index = rollDice();

    return getWordByNumber(index);
  });

  const passphrase = words
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map((word, index, originalWords) => {
      if (useNumbers && index === Math.floor(Math.random() * numberOfWords)) {
        const randomNumber = Math.floor(Math.random() * 99) + 1;

        return `${randomNumber}${word}`;
      }

      return word;
    })
    .join(defaultSeparator);

  return passphrase;
};
