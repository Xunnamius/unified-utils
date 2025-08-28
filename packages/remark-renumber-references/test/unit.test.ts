// * These tests ensure the exported interfaces under test function as expected.

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';

import remarkIgnore from 'universe+remark-ignore';
import remarkRenumberReferences from 'universe+remark-renumber-references';

import {
  getFixtureString,
  getFixtureVFile
} from 'testverse+remark-renumber-references:helpers.ts';

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
