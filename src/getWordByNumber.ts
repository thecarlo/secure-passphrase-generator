import { getWordlist } from './getWordList';

export const getWordByNumber = async (number: string): Promise<string> => {
  try {
    const wordMap = await getWordlist();

    const word = wordMap.get(number);

    if (!word) {
      throw new Error(`No word found for number: ${number}`);
    }

    return word;
  } catch (error) {
    console.error('Error retrieving the word:', error);

    throw error;
  }
};
