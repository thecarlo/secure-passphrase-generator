import * as getWordByNumberModule from './getWordByNumber';
import { generatePassphrase } from './index';
import * as rollDiceModule from './rollDice';

jest.mock('./rollDice');

jest.mock('./getWordByNumber');

describe('generatePassphrase', () => {
  const mockedRollDice = jest.mocked(rollDiceModule.rollDice);

  const mockedGetWordByNumber = jest.mocked(
    getWordByNumberModule.getWordByNumber,
  );

  const defaultWord = 'word';

  beforeEach(() => {
    jest.resetAllMocks();

    mockedRollDice.mockReturnValue(1234);

    mockedGetWordByNumber.mockReturnValue(defaultWord);
  });

  it('should generate a passphrase with default configuration', () => {
    mockedGetWordByNumber
      .mockReturnValueOnce('foo')
      .mockReturnValueOnce('bar')
      .mockReturnValueOnce('baz')
      .mockReturnValueOnce('foobar');

    const passphrase = generatePassphrase();

    // ensure there is not a digit number in the passphrase if useNumbers is false
    expect(passphrase).not.toMatch(/\d+/);

    expect(passphrase).toEqual(`foo-bar-baz-foobar`);
  });

  it('should generate a passphrase with a custom separator', () => {
    const customConfig = {
      numberOfWords: 3,
      defaultSeparator: '.',
      useNumbers: false,
    };

    const passphrase = generatePassphrase(customConfig);

    expect(passphrase).toEqual(`${defaultWord}.${defaultWord}.${defaultWord}`);
  });

  it('should generate a passphrase with all mocked words', () => {
    const customConfig = {
      numberOfWords: 2,
      defaultSeparator: '|',
      useNumbers: false,
    };

    mockedGetWordByNumber.mockReturnValueOnce('foo').mockReturnValueOnce('bar');

    const passphrase = generatePassphrase(customConfig);

    expect(passphrase).toEqual(`foo|bar`);
  });

  it('should include numbers in the passphrase when configured and ensure only one word has numbers prefixed', () => {
    const customConfig = {
      numberOfWords: 4,
      defaultSeparator: '-',
      useNumbers: true,
    };

    mockedRollDice
      .mockReturnValueOnce(1234)
      .mockReturnValueOnce(4123)
      .mockReturnValueOnce(234)
      .mockReturnValueOnce(142);

    mockedGetWordByNumber
      .mockReturnValueOnce('apple')
      .mockReturnValueOnce('banana')
      .mockReturnValueOnce('cherry')
      .mockReturnValueOnce('date');

    const passphrase = generatePassphrase(customConfig);

    const match = passphrase.match(/\d+\w+/g);

    expect(match).toHaveLength(1);
  });
});
