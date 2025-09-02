// * These tests ensure the exported interfaces under test function as expected.

import { remark } from 'remark';
import remarkGfm from 'remark-gfm';

import remarkRemoveUrlTrailingSlash from 'universe+remark-remove-url-trailing-slash';

import {
  getFixtureString,
  getFixtureVFile
} from 'testverse+remark-remove-url-trailing-slash:helpers.ts';

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
