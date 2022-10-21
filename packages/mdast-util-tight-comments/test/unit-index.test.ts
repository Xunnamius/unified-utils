import {
  getFixtureString,
  transformString
} from 'pkgverse/mdast-util-tight-comments/test/helpers';

import { joinTightComments } from 'pkgverse/mdast-util-tight-comments/src/index';

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
