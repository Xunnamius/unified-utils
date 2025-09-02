// * These tests ensure the exported interfaces under test function as expected.

import { remark } from 'remark';

import remarkLintListItemStyle from 'universe+remark-lint-list-item-style';

import { getFixtureVFile } from 'testverse+remark-lint-list-item-style:helpers.ts';

import type { Processor } from 'unified';

it("warns when a list item's punctuation violates the default style", async () => {
  expect.hasAssertions();

  const runner = remark().use(remarkLintListItemStyle);
  let results = await runLinter(runner);

  expect(results.okPunctuation.messages).toStrictEqual([]);
  expect(results.okSpreadEach.messages).toStrictEqual([]);
  expect(results.okSpreadParagraph.messages).toStrictEqual([]);

  expect(results.notOkPunctuation.messages).toStrictEqual([
    expect.objectContaining({ message: '"a" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"a" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"a" is not allowed to punctuate list item' }),
    expect.objectContaining({
      message: 'empty list item without punctuation is not allowed'
    })
  ]);

  expect(results.notOkSpreadEach.messages).toStrictEqual([
    expect.objectContaining({ message: '"o" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"]" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '")" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"d" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"n" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"e" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"s" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"d" is not allowed to punctuate list item' }),
    // * NOTE: the "" contains a zero-width space character
    expect.objectContaining({ message: '"​" is not allowed to punctuate list item' })
  ]);

  expect(results.okSpreadFirstAndFinal.messages).toStrictEqual([
    expect.objectContaining({ message: '"u" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"u" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"u" is not allowed to punctuate list item' })
  ]);

  results = await runLinter(
    runner().use(remarkLintListItemStyle, { checkListSpread: 'first-and-final' })
  );

  expect(results.okPunctuation.messages).toStrictEqual([]);
  expect(results.okSpreadEach.messages).toStrictEqual([]);
  expect(results.okSpreadParagraph.messages).toStrictEqual([]);
  expect(results.okSpreadFirstAndFinal.messages).toStrictEqual([]);

  expect(results.okSpreadFirst.messages).toStrictEqual([
    expect.objectContaining({ message: '"r" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"x" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"x" is not allowed to punctuate list item' })
  ]);

  results = await runLinter(
    runner().use(remarkLintListItemStyle, { checkListSpread: 'first' })
  );

  expect(results.okPunctuation.messages).toStrictEqual([]);
  expect(results.okSpreadEach.messages).toStrictEqual([]);
  expect(results.okSpreadParagraph.messages).toStrictEqual([]);
  expect(results.okSpreadFirst.messages).toStrictEqual([]);

  expect(results.okSpreadFinal.messages).toStrictEqual([
    // * NOTE: the "" contains a zero-width space character
    expect.objectContaining({ message: '"​" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"z" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"x" is not allowed to punctuate list item' })
  ]);

  results = await runLinter(
    runner().use(remarkLintListItemStyle, { checkListSpread: 'final' })
  );

  expect(results.okPunctuation.messages).toStrictEqual([]);
  expect(results.okSpreadEach.messages).toStrictEqual([]);
  expect(results.okSpreadParagraph.messages).toStrictEqual([]);
  expect(results.okSpreadFinal.messages).toStrictEqual([]);

  expect(results.okSpreadFirst.messages).toStrictEqual([
    expect.objectContaining({ message: '"r" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"x" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"x" is not allowed to punctuate list item' })
  ]);
});

it("warns when a list item's first word capitalization violates the default style", async () => {
  expect.hasAssertions();

  const results = await runLinter(remark().use(remarkLintListItemStyle));

  expect(results.okFirstWord.messages).toStrictEqual([]);

  expect(results.notOkFirstWord.messages).toStrictEqual([
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "n" should be "N"'
    })
  ]);

  expect(results.notOkFirstWordSpread.messages).toStrictEqual([
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "b" should be "B"'
    }),
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "q" should be "Q"'
    }),
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "q" should be "Q"'
    })
  ]);
});

it("ignores a list item's first word capitalization if it matches ignoredFirstWords", async () => {
  expect.hasAssertions();

  const results = await runLinter(
    remark().use(remarkLintListItemStyle, {
      checkFirstWord: 'capitalize',
      checkPunctuation: false,
      ignoredFirstWords: [/^n/, '^bar', 'qux']
    })
  );

  expect(results.okFirstWord.messages).toStrictEqual([]);
  expect(results.notOkFirstWord.messages).toStrictEqual([]);

  expect(results.okIgnoredFirstWords.messages).toStrictEqual([
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "i" should be "I"'
    })
  ]);

  expect(results.notOkFirstWordSpread.messages).toStrictEqual([
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "q" should be "Q"'
    })
  ]);

  const results2 = await runLinter(
    remark().use(remarkLintListItemStyle, {
      checkFirstWord: 'capitalize',
      checkPunctuation: false,
      ignoredFirstWords: ['iOS']
    })
  );

  expect(results2.okIgnoredFirstWords.messages).toStrictEqual([]);
});

it("warns when a list item's punctuation violates multi-element checkPunctuation configuration", async () => {
  expect.hasAssertions();

  const results = await runLinter(
    remark().use(remarkLintListItemStyle, { checkPunctuation: ['!', String.raw`\.`] })
  );

  expect(results.okPunctuation.messages).toStrictEqual([
    expect.objectContaining({ message: '"?" is not allowed to punctuate list item' })
  ]);
});

it("warns when a list item's first word capitalization violates checkFirstWord configuration", async () => {
  expect.hasAssertions();

  const results = await runLinter(
    remark().use(remarkLintListItemStyle, { checkFirstWord: 'lowercase' })
  );

  expect(results.okFirstWord.messages).toStrictEqual([
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "M" should be "m"'
    }),
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "E" should be "e"'
    }),
    expect.objectContaining({
      message: 'Inconsistent list item capitalization: "C" should be "c"'
    })
  ]);
});

it('does not warn about inconsistent first word capitalization if checkFirstWord is false', async () => {
  expect.hasAssertions();

  const results = await runLinter(
    remark().use(remarkLintListItemStyle, { checkFirstWord: false })
  );

  expect(results.okFirstWord.messages).toStrictEqual([]);
  expect(results.notOkFirstWord.messages).toStrictEqual([]);
});

it('does not warn about inconsistent punctuation if checkPunctuation is false', async () => {
  expect.hasAssertions();

  const results = await runLinter(
    remark().use(remarkLintListItemStyle, { checkPunctuation: false })
  );

  expect(results.okPunctuation.messages).toStrictEqual([]);
  expect(results.notOkPunctuation.messages).toStrictEqual([]);
});

it('warns when any punctuation is used with appropriate checkPunctuation', async () => {
  expect.hasAssertions();

  const results = await runLinter(
    remark().use(remarkLintListItemStyle, { checkPunctuation: [String.raw`\P{P}`] })
  );

  expect(results.notOkSpreadEach.messages).toStrictEqual([
    expect.objectContaining({ message: '"." is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"]" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"." is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"." is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '")" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"." is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"." is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"." is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"." is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"." is not allowed to punctuate list item' })
  ]);
});

it('allows any punctuation to be used with appropriate checkPunctuation', async () => {
  expect.hasAssertions();

  const results = await runLinter(
    remark().use(remarkLintListItemStyle, { checkPunctuation: [String.raw`\p{P}`] })
  );

  expect(results.notOkSpreadEach.messages).toStrictEqual([
    expect.objectContaining({ message: '"o" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"d" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"n" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"e" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"s" is not allowed to punctuate list item' }),
    expect.objectContaining({ message: '"d" is not allowed to punctuate list item' }),
    // * NOTE: the "" contains a zero-width space character
    expect.objectContaining({ message: '"​" is not allowed to punctuate list item' })
  ]);
});

it('error over bad configuration', async () => {
  expect.hasAssertions();

  await expect(
    remark()
      //@ts-expect-error: bad configuration
      .use(remarkLintListItemStyle, 'upper')
      .process(await getFixtureVFile('ok-punctuation'))
  ).resolves.toHaveProperty('messages.0.message', 'Error: Bad configuration');

  await expect(
    remark()
      //@ts-expect-error: bad configuration
      .use(remarkLintListItemStyle, { checkPunctuation: 'bad' })
      .process(await getFixtureVFile('ok-punctuation'))
  ).resolves.toHaveProperty(
    'messages.0.message',
    expect.stringContaining('Bad configuration checkPunctuation value "bad"')
  );

  await expect(
    remark()
      .use(remarkLintListItemStyle, { checkPunctuation: ['.**'] })
      .process(await getFixtureVFile('ok-punctuation'))
  ).resolves.toHaveProperty(
    'messages.0.message',
    expect.stringContaining('Bad configuration checkPunctuation RegExp:')
  );

  await expect(
    remark()
      //@ts-expect-error: bad configuration
      .use(remarkLintListItemStyle, { checkFirstWord: 'bad' })
      .process(await getFixtureVFile('ok-punctuation'))
  ).resolves.toHaveProperty(
    'messages.0.message',
    expect.stringContaining('Bad configuration checkFirstWord value "bad"')
  );

  await expect(
    remark()
      //@ts-expect-error: bad configuration
      .use(remarkLintListItemStyle, { checkListSpread: 'bad' })
      .process(await getFixtureVFile('ok-punctuation'))
  ).resolves.toHaveProperty(
    'messages.0.message',
    expect.stringContaining('Bad configuration checkListSpread value "bad"')
  );
});

it('does not erroneously warn about bold, italic, and struck-through list items', async () => {
  expect.hasAssertions();

  const result = await remark()
    .use(remarkLintListItemStyle, { checkPunctuation: false })
    .process(await getFixtureVFile('issue-134'));

  expect(result.messages).toStrictEqual([]);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runLinter(runner: Processor<any, any, any, any, any>) {
  const notOkFirstWord = await runner.process(
    await getFixtureVFile('not-ok-first-word')
  );
  const notOkFirstWordSpread = await runner.process(
    await getFixtureVFile('not-ok-first-word-spread')
  );
  const notOkPunctuation = await runner.process(
    await getFixtureVFile('not-ok-punctuation')
  );
  const notOkSpreadEach = await runner.process(
    await getFixtureVFile('not-ok-spread-each')
  );

  const okFirstWord = await runner.process(await getFixtureVFile('ok-first-word'));
  const okIgnoredFirstWords = await runner.process(
    await getFixtureVFile('ok-ignored-first-words')
  );
  const okPunctuation = await runner.process(await getFixtureVFile('ok-punctuation'));
  const okSpreadFirst = await runner.process(await getFixtureVFile('ok-spread-first'));
  const okSpreadFirstAndFinal = await runner.process(
    await getFixtureVFile('ok-spread-first-and-final')
  );
  const okSpreadFinal = await runner.process(await getFixtureVFile('ok-spread-final'));
  const okSpreadEach = await runner.process(await getFixtureVFile('ok-spread-each'));
  const okSpreadParagraph = await runner.process(
    await getFixtureVFile('ok-spread-paragraph')
  );

  return {
    notOkFirstWord,
    notOkFirstWordSpread,
    notOkPunctuation,
    notOkSpreadEach,
    okFirstWord,
    okIgnoredFirstWords,
    okPunctuation,
    okSpreadFirst,
    okSpreadFirstAndFinal,
    okSpreadFinal,
    okSpreadEach,
    okSpreadParagraph
  };
}
