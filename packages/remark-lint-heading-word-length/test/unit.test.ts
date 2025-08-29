// * These tests ensure the exported interfaces under test function as expected.

import { remark } from 'remark';

import remarkLintHeadingWordLength from 'universe+remark-lint-heading-word-length';

import { getFixtureVFile } from 'testverse+remark-lint-heading-word-length:helpers.ts';

import type { Processor } from 'unified';

describe('::default', () => {
  it('warns when heading word length violates bounded limit', async () => {
    expect.hasAssertions();

    const results = await runLinter(remark().use(remarkLintHeadingWordLength));

    expect(results.ok.messages).toStrictEqual([]);
    expect(results.notOk.messages).toStrictEqual([
      expect.objectContaining({
        message: 'Heading must have at most 10 words (current length: 11)'
      }),
      expect.objectContaining({
        message: 'Heading must have at least 1 word (current length: 0)'
      })
    ]);
  });

  it('warns when heading word length violates singularly bounded limit', async () => {
    expect.hasAssertions();

    let results = await runLinter(
      remark().use(remarkLintHeadingWordLength, { minimumWords: false })
    );

    expect(results.ok.messages).toStrictEqual([]);
    expect(results.notOk.messages).toStrictEqual([
      expect.objectContaining({
        message: 'Heading must have at most 10 words (current length: 11)'
      })
    ]);

    results = await runLinter(
      remark().use(remarkLintHeadingWordLength, { maximumWords: false })
    );

    expect(results.ok.messages).toStrictEqual([]);
    expect(results.notOk.messages).toStrictEqual([
      expect.objectContaining({
        message: 'Heading must have at least 1 word (current length: 0)'
      })
    ]);
  });

  it('does not warn when bounds are disabled via configuration', async () => {
    expect.hasAssertions();

    let results = await runLinter(
      remark().use(remarkLintHeadingWordLength, {
        minimumWords: false,
        maximumWords: false
      })
    );

    expect(results.ok.messages).toStrictEqual([]);
    expect(results.notOk.messages).toStrictEqual([]);

    results = await runLinter(
      remark().use(remarkLintHeadingWordLength, {
        minimumWords: 0,
        maximumWords: Number.POSITIVE_INFINITY
      })
    );

    expect(results.ok.messages).toStrictEqual([]);
    expect(results.notOk.messages).toStrictEqual([]);
  });

  it('uses proper singular and plural grammar in error messages', async () => {
    expect.hasAssertions();

    const results = await runLinter(
      remark().use(remarkLintHeadingWordLength, { minimumWords: 2, maximumWords: 1 })
    );

    expect(results.ok.messages).toStrictEqual([
      expect.objectContaining({
        message: 'Heading must have at least 2 words (current length: 1)'
      }),
      expect.objectContaining({
        message: 'Heading must have at most 1 word (current length: 10)'
      })
    ]);
  });

  it('error over bad configuration', async () => {
    expect.hasAssertions();

    await expect(
      remark()
        //@ts-expect-error: bad configuration
        .use(remarkLintHeadingWordLength, 10)
        .process(await getFixtureVFile('ok'))
    ).resolves.toHaveProperty('messages.0.message', 'Error: Bad configuration');

    await expect(
      remark()
        //@ts-expect-error: bad configuration
        .use(remarkLintHeadingWordLength, { minimumWords: 'bad' })
        .process(await getFixtureVFile('ok'))
    ).resolves.toHaveProperty(
      'messages.0.message',
      expect.stringContaining('Bad configuration minimumWords value "bad"')
    );

    await expect(
      remark()
        //@ts-expect-error: bad configuration
        .use(remarkLintHeadingWordLength, { maximumWords: 'bad' })
        .process(await getFixtureVFile('ok'))
    ).resolves.toHaveProperty(
      'messages.0.message',
      expect.stringContaining('Bad configuration maximumWords value "bad"')
    );

    await expect(
      remark()
        .use(remarkLintHeadingWordLength, { minimumWords: -1 })
        .process(await getFixtureVFile('ok'))
    ).resolves.toHaveProperty(
      'messages.0.message',
      expect.stringContaining('Bad configuration minimumWords value "-1"')
    );

    await expect(
      remark()
        //@ts-expect-error: bad configuration
        .use(remarkLintHeadingWordLength, { maximumWords: '-100' })
        .process(await getFixtureVFile('ok'))
    ).resolves.toHaveProperty(
      'messages.0.message',
      expect.stringContaining('Bad configuration maximumWords value "-100"')
    );
  });
});

async function runLinter(runner: Processor<any, any, any, any, any>) {
  const ok = await runner.process(await getFixtureVFile('ok'));
  const notOk = await runner.process(await getFixtureVFile('not-ok'));

  return { ok, notOk };
}
