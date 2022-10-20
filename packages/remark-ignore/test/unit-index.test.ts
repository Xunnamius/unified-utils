import { remark } from 'remark';
import remarkReferenceLinks from 'remark-reference-links';
import remarkRemoveComments from 'remark-remove-comments';

import remarkIgnore, { ignoreStart, ignoreEnd } from 'pkgverse/remark-ignore/src/index';
import defaultIgnoreStart from 'pkgverse/remark-ignore/src/start';
import defaultIgnoreEnd from 'pkgverse/remark-ignore/src/end';
import { getFixtureString, getFixtureVFile } from 'pkgverse/remark-ignore/test/helpers';

describe('::default', () => {
  it('is no-op without ignore commands', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkIgnore)
      .use(remarkReferenceLinks)
      .process(await getFixtureVFile('clean'));

    expect(result.toString()).toStrictEqual(getFixtureString('clean-transformed'));
  });

  it('ignores the next node via remark-ignore', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkIgnore)
      .use(remarkReferenceLinks)
      .process(await getFixtureVFile('ignore-next'));

    expect(result.toString()).toStrictEqual(getFixtureString('ignore-next-transformed'));
  });

  it('ignores a range of nodes via remark-ignore-start/end', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkIgnore)
      .use(remarkReferenceLinks)
      .process(await getFixtureVFile('ignore-range'));

    expect(result.toString()).toStrictEqual(getFixtureString('ignore-range-transformed'));
  });

  it('does not malfunction on orphan remark-ignore-end', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkIgnore)
      .use(remarkReferenceLinks)
      .process(await getFixtureVFile('orphan'));

    expect(result.toString()).toStrictEqual(getFixtureString('orphan-transformed'));
  });

  it('does not malfunction on redundant remark-ignore', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkIgnore)
      .use(remarkReferenceLinks)
      .process(await getFixtureVFile('redundant'));

    expect(result.toString()).toStrictEqual(getFixtureString('redundant-transformed'));
  });
});

describe('::ignoreStart & ::ignoreEnd', () => {
  it('only disables transforms that occur between ignoreStart and ignoreEnd', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(ignoreStart)
      .use(remarkReferenceLinks)
      .use(ignoreEnd)
      .use(remarkRemoveComments)
      .process(await getFixtureVFile('ignore-range-2'));

    expect(result.toString()).toStrictEqual(
      getFixtureString('ignore-range-2-transformed')
    );

    const result2 = await remark()
      .use(defaultIgnoreStart)
      .use(remarkReferenceLinks)
      .use(defaultIgnoreEnd)
      .use(remarkRemoveComments)
      .process(await getFixtureVFile('ignore-range-2'));

    expect(result2.toString()).toStrictEqual(
      getFixtureString('ignore-range-2-transformed')
    );
  });
});
