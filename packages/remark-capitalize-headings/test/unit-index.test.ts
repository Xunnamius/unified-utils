import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkCapitalizeHeadings from 'pkgverse/remark-capitalize-headings/src/index';

import {
  getFixtureString,
  getFixtureVFile
} from 'pkgverse/remark-capitalize-headings/test/helpers';

describe('::default', () => {
  it('capitalizes headings using the CMOS by default', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkCapitalizeHeadings)
      .process(await getFixtureVFile('base'));

    expect(result.toString()).toStrictEqual(getFixtureString('default'));
  });

  it('capitalizes headings using the CMOS with respect to excludeHeadingLevel', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkCapitalizeHeadings, {
        // Do not capitalize any H3 and H4 headings
        excludeHeadingLevel: { h3: true, h4: true }
      })
      .process(await getFixtureVFile('base'));

    expect(result.toString()).toStrictEqual(getFixtureString('excludeHeadingLevel'));
  });

  it('capitalizes headings using the CMOS with respect to excludeSectionRegExp', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkCapitalizeHeadings, {
        // Do not capitalize headings with "subsection" in their text, nor any of the
        // headings below them
        excludeSectionRegExp: ['(s|S)ubsection']
      })
      .process(await getFixtureVFile('base'));

    expect(result.toString()).toStrictEqual(getFixtureString('excludeSectionRegExp'));
  });

  it('capitalizes headings using the CMOS with respect to replaceHeadingRegExp', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkCapitalizeHeadings, {
        // Make some last-minute adjustments
        replaceHeadingRegExp: {
          '\\s(_?)(a|A)$': ' $1Y',
          'Has the Rest': 'Has The Rest'
        }
      })
      .process(await getFixtureVFile('base'));

    expect(result.toString()).toStrictEqual(getFixtureString('replaceHeadingRegExp'));
  });

  it('throws when using a replaceHeadingRegExp rule that changes heading length', async () => {
    expect.hasAssertions();

    const runner = remark()
      .use(remarkGfm)
      .use(remarkCapitalizeHeadings, {
        // Make some last-minute adjustments
        replaceHeadingRegExp: {
          'Has the Rest': 'Has The Resting'
        }
      });

    const vFile = await getFixtureVFile('base');

    await expect(runner.process(vFile)).rejects.toThrow(
      'replaceHeadingRegExp option must not change the length of the following header: Section 3 has the rest'
    );
  });
});
