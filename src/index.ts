/* eslint-disable require-await */
import { Configuration } from '@interfaces/configuration';

import { getWordByNumber } from './getWordByNumber';
import { rollDice } from './rollDice';

const defaultConfiguration: Configuration = {
  numberOfWords: 4,
  defaultSeparator: '-',
  useNumbers: false,
};

export const generatePassphrase = async (
  configuration: Configuration = defaultConfiguration,
): Promise<string> => {
  const { defaultSeparator, numberOfWords, useNumbers } = configuration;

  const wordPromises = Array.from({ length: numberOfWords }, async () => {
    const index = rollDice();

    return getWordByNumber(index.toString());
  });

  const words = await Promise.all(wordPromises);

  if (useNumbers) {
    const randomIndex = Math.floor(Math.random() * numberOfWords);

    const randomNumber = Math.floor(Math.random() * 90000) + 10000;

    words[randomIndex] = randomNumber.toString();
  }

  return words.join(defaultSeparator);
};
