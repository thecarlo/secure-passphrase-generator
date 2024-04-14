import { getWordByNumber } from './getWordByNumber';

describe('getWordByNumber', () => {
  it('should return the correct word for a given number', () => {
    const word = getWordByNumber(3366);

    expect(word).toEqual('happiness');
  });

  it('should throw an error if no word is found for the given number', () => {
    expect(() => getWordByNumber(9999)).toThrow(
      'No word found for number: 9999',
    );
  });

  it('should propagate errors correctly', () => {
    const errorMessage = 'No word found for number: 7777';

    expect(() => getWordByNumber(7777)).toThrow(errorMessage);
  });
});
