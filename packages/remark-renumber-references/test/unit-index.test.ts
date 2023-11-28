import remarkIgnore from 'pkgverse/remark-ignore/src/index';
import remarkRenumberReferences from 'pkgverse/remark-renumber-references/src/index';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';

import {
  getFixtureString,
  getFixtureVFile
} from 'pkgverse/remark-renumber-references/test/helpers';

describe('::default', () => {
  it('renumbers references and preserves alphanumeric definitions by default while playing nice with GFM', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkRenumberReferences)
      .process(await getFixtureVFile('numbered'));

    expect(result.toString()).toStrictEqual(getFixtureString('renumbered'));
  });

  it('renumbers references without preserving alphanumeric definitions if so configured', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkRenumberReferences, { preserveAlphanumericDefinitions: false })
      .process(await getFixtureVFile('numbered'));

    expect(result.toString()).toStrictEqual(getFixtureString('renumbered-all'));
  });

  it('does not interfere with remark-ignore', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkIgnore)
      .use(remarkGfm)
      .use(remarkRenumberReferences)
      .process(await getFixtureVFile('ignored'));

    expect(result.toString()).toStrictEqual(getFixtureString('ignored-transformed'));
  });
});
