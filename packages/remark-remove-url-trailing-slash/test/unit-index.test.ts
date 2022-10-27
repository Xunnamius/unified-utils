import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRemoveUrlTrailingSlash from 'pkgverse/remark-remove-url-trailing-slash/src/index';

import {
  getFixtureString,
  getFixtureVFile
} from 'pkgverse/remark-remove-url-trailing-slash/test/helpers';

describe('::default', () => {
  it('all trailing slashes are removed by default', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkRemoveUrlTrailingSlash)
      .process(await getFixtureVFile('slashes'));

    expect(result.toString()).toStrictEqual(getFixtureString('no-slashes'));
  });

  it('trailing slashes are removed from host-only URLs when using onlyConsiderHostUrls', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkRemoveUrlTrailingSlash, { onlyConsiderHostUrls: true })
      .process(await getFixtureVFile('slashes'));

    expect(result.toString()).toStrictEqual(getFixtureString('some-slashes'));
  });

  it('handles relative URLs', async () => {
    expect.hasAssertions();

    const result = await remark()
      .use(remarkGfm)
      .use(remarkRemoveUrlTrailingSlash)
      .process(await getFixtureVFile('relative-slashes'));

    expect(result.toString()).toStrictEqual(getFixtureString('relative-no-slashes'));
  });
});
