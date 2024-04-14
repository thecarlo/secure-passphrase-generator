import { getWordByNumber } from './getWordByNumber';
import { getWordlist } from './getWordList';

jest.mock('./getWordList', () => ({
  getWordlist: jest.fn(),
}));

describe('getWordByNumber', () => {
  it('should return the correct word for a given number', async () => {
    const mockWordMap = new Map<string, string>([
      ['1234', 'test'],
      ['5678', 'word'],
    ]);

    (getWordlist as jest.Mock).mockResolvedValue(mockWordMap);

    const word = await getWordByNumber('1234');

    expect(word).toEqual('test');
  });

  it('should throw an error if no word is found for the given number', async () => {
    const mockWordMap = new Map<string, string>();

    (getWordlist as jest.Mock).mockResolvedValue(mockWordMap);

    await expect(getWordByNumber('1234')).rejects.toThrow(
      'No word found for number: 1234',
    );
  });

  it('should propagate errors from getWordlist', async () => {
    const errorMessage = 'Failed to fetch word list';

    (getWordlist as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getWordByNumber('1234')).rejects.toThrow(errorMessage);
  });
});
