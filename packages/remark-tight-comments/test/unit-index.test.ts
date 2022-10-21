import { remark } from 'remark';
import remarkTightComments from 'pkgverse/remark-tight-comments/src/index';

import {
  getFixtureString,
  getFixtureVFile
} from 'pkgverse/remark-tight-comments/test/helpers';

describe('::default', () => {
  it('most comments have newlines removed with respect to pipe syntax', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkTightComments)
      .process(await getFixtureVFile('spaced'));

    expect(result.toString()).toStrictEqual(getFixtureString('spaced-transformed'));
  });
});
