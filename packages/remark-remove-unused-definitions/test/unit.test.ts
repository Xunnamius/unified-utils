// * These tests ensure the exported interfaces under test function as expected.

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRemoveUnusedDefs from 'universe+remark-remove-unused-definitions';

import {
  getFixtureString,
  getFixtureVFile
} from 'testverse+remark-remove-unused-definitions:helpers.ts';

describe('::default', () => {
  it('unused definitions are pruned while playing nice with GFM', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkRemoveUnusedDefs)
      .process(await getFixtureVFile('unpruned'));

    expect(result.toString()).toStrictEqual(getFixtureString('pruned'));
  });
});
