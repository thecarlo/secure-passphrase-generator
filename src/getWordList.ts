import fs from 'fs';
import path from 'path';

export const getWordlist = async (): Promise<Map<string, string>> => {
  const filePath = path.join(
    __dirname,
    'wordlist',
    'eff_short_wordlist_2_0.txt',
  );

  try {
    const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' });

    const lines = data.split('\n');

    const map = new Map<string, string>();

    lines.forEach((line) => {
      const [key, value] = line.trim().split(/\s+/);

      map.set(key, value);
    });

    return map;
  } catch (error) {
    console.error('Failed to read or process the file:', error);

    throw error;
  }
};
