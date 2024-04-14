import { wordMap } from './wordlist/wordMap';

export const getWordByNumber = (num: number): string => {
  try {
    const wordList = wordMap;

    const word = wordList.get(num);

    if (!word) {
      throw new Error(`No word found for number: ${num}`);
    }

    return word;
  } catch (error) {
    console.error('Error retrieving the word:', error);

    throw error;
  }
};
