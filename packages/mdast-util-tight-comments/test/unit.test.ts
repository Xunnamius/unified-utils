// * These tests ensure the exported interfaces under test function as expected.

import {
  getFixtureString,
  transformString
} from 'testverse+mdast-util-tight-comments:helpers.ts';

import { joinTightComments } from 'universe+mdast-util-tight-comments';

describe('::joinTightComments', () => {
  it('comments have newlines inserted before and after without joiner', async () => {
    expect.hasAssertions();

    expect(transformString(getFixtureString('clean'))).toStrictEqual(
      getFixtureString('clean-transformed')
    );
  });

  it('most comments have newlines removed with joiner', async () => {
    expect.hasAssertions();

    expect(
      transformString(getFixtureString('tightened'), {
        toMarkdownOptions: joinTightComments()
      })
    ).toStrictEqual(getFixtureString('tightened-transformed'));
  });

  it('joiner respects pipe syntax', async () => {
    expect.hasAssertions();

    expect(
      transformString(getFixtureString('spaced'), {
        toMarkdownOptions: joinTightComments()
      })
    ).toStrictEqual(getFixtureString('spaced-transformed'));
  });
});
