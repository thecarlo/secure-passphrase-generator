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

  it('should generate a passphrase with default configuration', async () => {
    mockedGetWordByNumber
      .mockReturnValueOnce('foo')
      .mockReturnValueOnce('bar')
      .mockReturnValueOnce('baz')
      .mockReturnValueOnce('foobar');

    const passphrase = await generatePassphrase();

    // ensure there is not a 5 digit number in the passphrase if useNumbers is false
    expect(passphrase).not.toMatch(/\d{5}/);

    expect(passphrase).toEqual(`foo-bar-baz-foobar`);
  });

  it('should generate a passphrase with a custom separator', async () => {
    const customConfig = {
      numberOfWords: 3,
      defaultSeparator: '.',
      useNumbers: false,
    };

    const passphrase = await generatePassphrase(customConfig);

    expect(passphrase).toEqual(`${defaultWord}.${defaultWord}.${defaultWord}`);
  });

  it('should include numbers in the passphrase when configured', async () => {
    const customConfig = {
      numberOfWords: 4,
      defaultSeparator: '-',
      useNumbers: true,
    };

    mockedRollDice
      .mockReturnValueOnce(1234)
      .mockReturnValueOnce(4123)
      .mockReturnValueOnce(5135)
      .mockReturnValueOnce(1525);

    mockedGetWordByNumber
      .mockReturnValueOnce('foo')
      .mockReturnValueOnce('bar')
      .mockReturnValueOnce('baz')
      .mockReturnValueOnce('foobar');

    const passphrase = await generatePassphrase(customConfig);

    // check if there is a five digit number in the passphrase
    expect(passphrase).toMatch(/\d{5}/);
  });

  it('should generate a passphrase with all mocked words', async () => {
    const customConfig = {
      numberOfWords: 2,
      defaultSeparator: '|',
      useNumbers: false,
    };

    mockedGetWordByNumber.mockReturnValueOnce('foo').mockReturnValueOnce('bar');

    const passphrase = await generatePassphrase(customConfig);

    expect(passphrase).toEqual(`foo|bar`);
  });
});
