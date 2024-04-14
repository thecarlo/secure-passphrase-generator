import { getWordlist } from './getWordList';

describe('getWordlist', () => {
  it('should return a Map object', async () => {
    const wordlist = await getWordlist();

    expect(wordlist).toBeInstanceOf(Map);
  });

  it('should contain key-value pairs', async () => {
    const wordlist = await getWordlist();

    expect(wordlist.size).toBeGreaterThan(0);
  });
});
