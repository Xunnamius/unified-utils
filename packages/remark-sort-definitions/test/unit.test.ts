// * These tests ensure the exported interfaces under test function as expected.

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkSortDefinitions from 'universe+remark-sort-definitions';

import {
  getFixtureString,
  getFixtureVFile
} from 'testverse+remark-sort-definitions:helpers.ts';

describe('::default', () => {
  it('sorts definitions in default alphanumeric-first order while playing nice with GFM', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkSortDefinitions)
      .process(await getFixtureVFile('unsorted'));

    expect(result.toString()).toStrictEqual(getFixtureString('alpha-first'));
  });

  it('sorts definitions in numeric-first order if so configured', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkSortDefinitions, { algorithm: 'numeric-first' })
      .process(await getFixtureVFile('unsorted'));

    expect(result.toString()).toStrictEqual(getFixtureString('numeric-first'));
  });
});
