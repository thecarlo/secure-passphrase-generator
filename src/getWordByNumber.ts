import { wordMap } from './wordlist/wordMap';

export const getWordByNumber = (index: number): string => {
  const wordList = wordMap;

  const word = wordList.get(index);

  if (!word) {
    throw new Error(`No word found for number: ${index}`);
  }

  return word;
};
