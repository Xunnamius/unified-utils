// * These tests ensure the exported interfaces under test function as expected.

import remarkLintFencedCodeFlagCase from 'universe+remark-lint-fenced-code-flag-case';
import { getFixtureVFile } from 'testverse+remark-lint-fenced-code-flag-case:helpers.ts';
import { remark } from 'remark';

describe('::default', () => {
  it('warns when fenced code flags are not lowercase by default', async () => {
    expect.hasAssertions();

    const runner = remark().use(remarkLintFencedCodeFlagCase);
    const okMissing = await runner.process(await getFixtureVFile('ok-missing'));
    const okLower = await runner.process(await getFixtureVFile('ok-lower'));
    const noOkMixed = await runner.process(await getFixtureVFile('not-ok-mixed'));
    const notOkUpper = await runner.process(await getFixtureVFile('not-ok-upper'));

    expect(okMissing.messages).toStrictEqual([]);
    expect(okLower.messages).toStrictEqual([]);

    expect(noOkMixed.messages).toStrictEqual([
      expect.objectContaining({ message: 'Code fence flag "Js" should be "js"' }),
      expect.objectContaining({
        message: 'Code fence flag "JavaScript" should be "javascript"'
      })
    ]);

    expect(notOkUpper.messages).toStrictEqual([
      expect.objectContaining({ message: 'Code fence flag "JS" should be "js"' }),
      expect.objectContaining({
        message: 'Code fence flag "JAVASCRIPT" should be "javascript"'
      })
    ]);
  });

  it('warns about fenced code flags with respect to "upper" case option', async () => {
    expect.hasAssertions();

    const runner = remark().use(remarkLintFencedCodeFlagCase, { case: 'upper' });

    const okMissing = await runner.process(await getFixtureVFile('ok-missing'));
    const okLower = await runner.process(await getFixtureVFile('ok-lower'));
    const noOkMixed = await runner.process(await getFixtureVFile('not-ok-mixed'));
    const notOkUpper = await runner.process(await getFixtureVFile('not-ok-upper'));

    expect(okMissing.messages).toStrictEqual([]);
    expect(notOkUpper.messages).toStrictEqual([]);

    expect(noOkMixed.messages).toStrictEqual([
      expect.objectContaining({
        message: 'Code fence flag "Js" should be "JS"'
      }),
      expect.objectContaining({
        message: 'Code fence flag "JavaScript" should be "JAVASCRIPT"'
      })
    ]);

    expect(okLower.messages).toStrictEqual([
      expect.objectContaining({ message: 'Code fence flag "js" should be "JS"' }),
      expect.objectContaining({
        message: 'Code fence flag "javascript" should be "JAVASCRIPT"'
      })
    ]);
  });

  it('warns about fenced code flags with respect to "capitalize" case option', async () => {
    expect.hasAssertions();

    const runner = remark().use(remarkLintFencedCodeFlagCase, { case: 'capitalize' });

    const okMissing = await runner.process(await getFixtureVFile('ok-missing'));
    const okLower = await runner.process(await getFixtureVFile('ok-lower'));
    const noOkMixed = await runner.process(await getFixtureVFile('not-ok-mixed'));
    const notOkUpper = await runner.process(await getFixtureVFile('not-ok-upper'));

    expect(okMissing.messages).toStrictEqual([]);

    expect(noOkMixed.messages).toStrictEqual([
      expect.objectContaining({
        message: 'Code fence flag "JavaScript" should be "Javascript"'
      })
    ]);

    expect(okLower.messages).toStrictEqual([
      expect.objectContaining({ message: 'Code fence flag "js" should be "Js"' }),
      expect.objectContaining({
        message: 'Code fence flag "javascript" should be "Javascript"'
      })
    ]);

    expect(notOkUpper.messages).toStrictEqual([
      expect.objectContaining({ message: 'Code fence flag "JS" should be "Js"' }),
      expect.objectContaining({
        message: 'Code fence flag "JAVASCRIPT" should be "Javascript"'
      })
    ]);
  });

  it('error over bad configuration', async () => {
    expect.hasAssertions();

    await expect(
      remark()
        //@ts-expect-error: bad configuration
        .use(remarkLintFencedCodeFlagCase, 'upper')
        .process(await getFixtureVFile('ok-lower'))
    ).resolves.toHaveProperty('messages.0.message', 'Error: Bad configuration');

    await expect(
      remark()
        //@ts-expect-error: bad configuration
        .use(remarkLintFencedCodeFlagCase, { case: 'bad' })
        .process(await getFixtureVFile('ok-lower'))
    ).resolves.toHaveProperty(
      'messages.0.message',
      expect.stringContaining('Bad configuration case value "bad"')
    );
  });
});
