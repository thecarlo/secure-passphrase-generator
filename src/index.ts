import { defaultConfiguration } from '@configuration/defaultConfiguration';
import { Configuration } from '@interfaces/configuration';

import { getWordByNumber } from './getWordByNumber';
import { rollDice } from './rollDice';

export const generatePassphrase = (
  configuration: Configuration = defaultConfiguration,
): string => {
  const { defaultSeparator, numberOfWords, useNumbers, capitalize } =
    configuration;

  const indices = Array.from({ length: numberOfWords }, rollDice);

  const words = indices.map(getWordByNumber);

  const numberIndex = useNumbers
    ? Math.floor(Math.random() * numberOfWords)
    : -1;

  const passphrase = words
    .map((word, index) => {
      let modifiedWord = word;

      if (useNumbers && index === numberIndex) {
        const randomNumber = Math.floor(Math.random() * 99) + 1;

        modifiedWord =
          Math.random() < 0.5
            ? `${randomNumber}${modifiedWord}`
            : `${modifiedWord}${randomNumber}`;
      }

      return capitalize
        ? modifiedWord.charAt(0).toUpperCase() + modifiedWord.slice(1)
        : modifiedWord;
    })
    .join(defaultSeparator);

  return passphrase;
};
