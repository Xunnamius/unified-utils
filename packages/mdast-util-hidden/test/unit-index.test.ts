import * as mdastUtilHidden from 'pkgverse/mdast-util-hidden/src/index';
import * as unistUtilVisit from 'unist-util-visit';
import { CONTINUE, SKIP, visit } from 'unist-util-visit';

import {
  getInitialAst,
  getMultiInitialAst,
  removePositionDataFrom
} from 'pkgverse/mdast-util-hidden/test/helpers';

import {
  createHiddenNode,
  hide,
  reveal,
  visitAndReveal
} from 'pkgverse/mdast-util-hidden/src/index';

import { getAst as getInsertedAst } from './fixtures/hidden-inserted-ast';
import { getAst as getMultiReplacedAst } from './fixtures/hidden-multi-replaced-ast';
import { getAst as getReplacedAst } from './fixtures/hidden-replaced-ast';

const node = createHiddenNode([]);
const index = 10;
const parent = { type: 'root', children: [node] };

describe('::hide', () => {
  it('replaces a child node at the given index with a Hidden node by default', async () => {
    expect.hasAssertions();

    const dummyInitialAst = getInitialAst();

    visit(dummyInitialAst, 'heading', (node, index, parent) => {
      if (index !== undefined && parent !== undefined) {
        hide({ nodes: [node], index, parent });
        return [SKIP, index + 1];
      }
    });

    expect(dummyInitialAst).toStrictEqual(getReplacedAst());
  });

  it('replaces multiple child nodes at the given index with a Hidden node by default', async () => {
    expect.hasAssertions();

    const dummyInitialAst = getInitialAst();

    visit(dummyInitialAst, 'heading', (_, index, parent) => {
      if (index !== undefined && parent !== undefined) {
        hide({
          nodes: [
            { type: 'text', value: 'Hello' },
            { type: 'text', value: 'to the' },
            { type: 'text', value: 'world!' }
          ],
          index,
          parent
        });
        return [SKIP, index + 1];
      }
    });

    expect(dummyInitialAst).toStrictEqual(getMultiReplacedAst());
  });

  it('only inserts a Hidden node at the given index if replaceChildAtIndex falsily defined', async () => {
    expect.hasAssertions();

    const dummyInitialAst = getInitialAst();

    visit(dummyInitialAst, 'heading', (node, index, parent) => {
      if (index !== undefined && parent !== undefined) {
        hide({ nodes: [node], index, parent, replaceChildAtIndex: false });
        return [SKIP, index + 2];
      }
    });

    expect(dummyInitialAst).toStrictEqual(getInsertedAst());
  });
});

describe('::reveal', () => {
  it('replaces a child node at the given index with the position-less hidden children of a passed Hidden node', async () => {
    expect.hasAssertions();

    const dummyReplacedAst = getReplacedAst();

    visit(dummyReplacedAst, 'hidden', (node, index, parent) => {
      if (index !== undefined && parent !== undefined) {
        reveal({ nodes: [node], index, parent });
        return [SKIP, index];
      }
    });

    expect(dummyReplacedAst).toStrictEqual(
      removePositionDataFrom('heading', getInitialAst())
    );
  });

  it('replaces a child node at the given index with the position-less hidden children of multiple passed Hidden nodes', async () => {
    expect.hasAssertions();

    const dummyReplacedAst = getReplacedAst();

    visit(dummyReplacedAst, 'hidden', (_, index, parent) => {
      if (index !== undefined && parent !== undefined) {
        reveal({
          nodes: [
            createHiddenNode([{ type: 'text', value: 'Hello' }]),
            createHiddenNode([{ type: 'text', value: 'to the' }]),
            createHiddenNode([{ type: 'text', value: 'world!' }])
          ],
          index,
          parent
        });
        return [SKIP, index];
      }
    });

    expect(dummyReplacedAst).toStrictEqual(getMultiInitialAst());
  });
});

describe('::visitAndReveal', () => {
  it('replaces all Hidden nodes in a tree with their children', async () => {
    expect.hasAssertions();

    const tree = getReplacedAst();

    visitAndReveal({ tree });

    expect(tree).toStrictEqual(removePositionDataFrom('heading', getInitialAst()));
  });

  it('is a noop on trees without Hidden nodes', async () => {
    expect.hasAssertions();

    const tree = getInitialAst();

    visitAndReveal({ tree });

    expect(tree).toStrictEqual(getInitialAst());
  });

  it('calls reveal and returns SKIP automatically iff undefined is returned after invoking visitor', async () => {
    expect.hasAssertions();

    const revealSpy = jest
      .spyOn(mdastUtilHidden, 'reveal')
      .mockImplementation(() => undefined);

    let calledOutsideVisitor = false;
    let confirmCalled = false;
    let expectedReturnValue: unknown = [SKIP, index];

    jest.spyOn(unistUtilVisit, 'visit').mockImplementation(((
      _tree,
      _test,
      visitor,
      _reverse
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(visitor?.(node as any, index as any, parent as any)).toStrictEqual(
        expectedReturnValue
      );
      confirmCalled = true;
    }) as typeof visit);

    visitAndReveal({
      tree: getInitialAst(),
      visitor: () => {
        calledOutsideVisitor = true;
        return undefined;
      }
    });

    expect(confirmCalled).toBeTrue();
    expect(calledOutsideVisitor).toBeTrue();
    expect(revealSpy).toHaveBeenNthCalledWith(1, { nodes: [node], index, parent });

    confirmCalled = false;

    visitAndReveal({ tree: getInitialAst() });

    expect(revealSpy).toHaveBeenNthCalledWith(2, { nodes: [node], index, parent });

    confirmCalled = false;
    calledOutsideVisitor = false;
    expectedReturnValue = 0;

    visitAndReveal({
      tree: getInitialAst(),
      visitor: () => {
        calledOutsideVisitor = true;
        return 0;
      }
    });

    expect(revealSpy).toHaveBeenNthCalledWith(3, { nodes: [node], index, parent });

    confirmCalled = false;
    calledOutsideVisitor = false;
    expectedReturnValue = [CONTINUE, 5];

    visitAndReveal({
      tree: getInitialAst(),
      visitor: () => {
        calledOutsideVisitor = true;
        return [CONTINUE, 5];
      }
    });

    expect(revealSpy).toHaveBeenNthCalledWith(4, { nodes: [node], index, parent });
  });

  it('does not call reveal iff false is returned after invoking visitor', async () => {
    expect.hasAssertions();

    const revealSpy = jest
      .spyOn(mdastUtilHidden, 'reveal')
      .mockImplementation(() => undefined);

    let calledOutsideVisitor = false;
    let confirmCalled = false;

    jest.spyOn(unistUtilVisit, 'visit').mockImplementation(((
      _tree,
      _test,
      visitor,
      _reverse
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(visitor?.(node as any, index as any, parent as any)).toBeUndefined();
      confirmCalled = true;
    }) as typeof visit);

    visitAndReveal({
      tree: getInitialAst(),
      visitor: () => {
        calledOutsideVisitor = true;
        return false;
      }
    });

    expect(confirmCalled).toBeTrue();
    expect(calledOutsideVisitor).toBeTrue();
    expect(revealSpy).not.toHaveBeenCalled();
  });

  it('passes through reverse parameter', async () => {
    expect.hasAssertions();

    const visitSpy = jest
      .spyOn(unistUtilVisit, 'visit')
      .mockImplementation(() => undefined);

    visitAndReveal({
      tree: getInitialAst()
    });

    expect(visitSpy).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      expect.anything(),
      expect.anything(),
      false
    );

    visitAndReveal({
      tree: getInitialAst(),
      reverse: true
    });

    expect(visitSpy).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      expect.anything(),
      expect.anything(),
      true
    );
  });

  it('throws when visiting a node without an index', async () => {
    expect.hasAssertions();

    jest.spyOn(unistUtilVisit, 'visit').mockImplementation(((
      _tree,
      _test,
      visitor,
      _reverse
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      visitor(node as any, undefined as any, parent as any);
    }) as typeof visit);

    expect(() =>
      visitAndReveal({
        tree: getInitialAst()
      })
    ).toThrow(/index is missing/);
  });

  it('throws when visiting a node without a parent', async () => {
    expect.hasAssertions();

    jest.spyOn(unistUtilVisit, 'visit').mockImplementation(((
      _tree,
      _test,
      visitor,
      _reverse
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      visitor(node as any, index as any, undefined as any);
    }) as typeof visit);

    expect(() =>
      visitAndReveal({
        tree: getInitialAst()
      })
    ).toThrow(/parent is missing/);
  });

  it('throws when visiting a malformed hidden node', async () => {
    expect.hasAssertions();

    jest.spyOn(unistUtilVisit, 'visit').mockImplementation(((
      _tree,
      _test,
      visitor,
      _reverse
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      visitor({ type: 'hidden' } as any, index as any, parent as any);
    }) as typeof visit);

    expect(() =>
      visitAndReveal({
        tree: getInitialAst()
      })
    ).toThrow(/malformed hidden node/);
  });
});

test('readme examples work', async () => {
  expect.hasAssertions();

  const tree = getInitialAst();

  visit(tree, 'heading', (node, index, parent) => {
    if (index !== undefined && parent !== undefined) {
      hide({ nodes: [node], index, parent });
      return [SKIP, index + 1];
    }
  });

  expect(tree).toStrictEqual(getReplacedAst());

  visitAndReveal({ tree });

  expect(tree).toStrictEqual(removePositionDataFrom('heading', getInitialAst()));
});
