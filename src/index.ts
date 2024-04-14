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

  const numberIndex = useNumbers
    ? Math.floor(Math.random() * numberOfWords)
    : null;

  const passphrase = words
    .map((word, index) => {
      if (useNumbers && index === numberIndex) {
        const randomNumber = Math.floor(Math.random() * 99) + 1;

        return `${randomNumber}${word}`;
      }

      return word;
    })
    .join(defaultSeparator);

  return passphrase;
};
