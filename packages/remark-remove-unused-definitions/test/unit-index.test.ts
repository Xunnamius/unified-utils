import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRemoveUnusedDefs from 'pkgverse/remark-remove-unused-definitions/src/index';

import {
  getFixtureString,
  getFixtureVFile
} from 'pkgverse/remark-remove-unused-definitions/test/helpers';

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
