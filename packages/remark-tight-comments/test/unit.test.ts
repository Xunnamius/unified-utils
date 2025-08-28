// * These tests ensure the exported interfaces under test function as expected.

import { remark } from 'remark';

import remarkTightComments from 'universe+remark-tight-comments';

import {
  getFixtureString,
  getFixtureVFile
} from 'testverse+remark-tight-comments:helpers.ts';

describe('::default', () => {
  it('most comments have newlines removed with respect to pipe syntax', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkTightComments)
      .process(await getFixtureVFile('spaced'));

    expect(result.toString()).toStrictEqual(getFixtureString('spaced-transformed'));
  });
});
