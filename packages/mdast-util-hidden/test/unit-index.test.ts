import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit, SKIP, CONTINUE } from 'unist-util-visit';
import { removePosition } from 'unist-util-remove-position';
import * as unistUtilVisit from 'unist-util-visit';
import * as mdastUtilHidden from 'pkgverse/mdast-util-hidden/src/index';

import {
  createHiddenNode,
  hide,
  reveal,
  visitAndReveal
} from 'pkgverse/mdast-util-hidden/src/index';

import { getAst as getInsertedAst } from './__fixtures__/hidden-inserted-ast';
import { getAst as getReplacedAst } from './__fixtures__/hidden-replaced-ast';
import { getAst as getMultiReplacedAst } from './__fixtures__/hidden-multi-replaced-ast';

import type { Test } from 'unist-util-visit';
import type { Node, Data } from 'unist';

const dummyMarkdown = `
# Hello

Some *emphasis*, **importance**, and \`code\`.

# Goodbye
`;

const getInitialAst = () => {
  return unified().use(remarkParse).parse(dummyMarkdown);
};

const removePositionDataFrom = (test: Test, tree: Node<Data>) => {
  visit(tree, test, (node, index, parent) => {
    if (index !== null && parent !== null) {
      removePosition(node);
      return [SKIP, index + 1];
    }
  });

  return tree;
};

const getMultiInitialAst = () => {
  const tree = getInitialAst();

  visit(tree, 'heading', (_, index, parent) => {
    if (index !== null && parent !== null) {
      parent.children.splice(
        index,
        1,
        { type: 'text', value: 'Hello', position: undefined },
        { type: 'text', value: 'to the', position: undefined },
        { type: 'text', value: 'world!', position: undefined }
      );
      return [SKIP, index + 3];
    }
  });

  return tree;
};

const node = createHiddenNode([]);
const index = 10;
const parent = { type: 'root', children: [node] };

describe('::hide', () => {
  it('replaces a child node at the given index with a Hidden node by default', async () => {
    expect.hasAssertions();

    const dummyInitialAst = getInitialAst();

    visit(dummyInitialAst, 'heading', (node, index, parent) => {
      if (index !== null && parent !== null) {
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
      if (index !== null && parent !== null) {
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
      if (index !== null && parent !== null) {
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
      if (index !== null && parent !== null) {
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
      if (index !== null && parent !== null) {
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
    let expectedRetVal: unknown = [SKIP, index];

    jest.spyOn(unistUtilVisit, 'visit').mockImplementation(((
      _tree,
      _test,
      visitor,
      _reverse
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(visitor?.(node as any, index, parent as any)).toStrictEqual(expectedRetVal);
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
    expectedRetVal = 0;

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
    expectedRetVal = [CONTINUE, 5];

    visitAndReveal({
      tree: getInitialAst(),
      visitor: () => {
        calledOutsideVisitor = true;
        return [CONTINUE, 5];
      }
    });

    expect(revealSpy).toHaveBeenNthCalledWith(4, { nodes: [node], index, parent });
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
      visitor(node as any, null, parent as any);
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
      visitor(node as any, index, null as any);
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
      visitor({ type: 'hidden' } as any, index, parent as any);
    }) as typeof visit);

    expect(() =>
      visitAndReveal({
        tree: getInitialAst()
      })
    ).toThrow(/node is malformed/);
  });
});

test('readme examples work', async () => {
  expect.hasAssertions();

  const tree = getInitialAst();

  visit(tree, 'heading', (node, index, parent) => {
    if (index !== null && parent !== null) {
      hide({ nodes: [node], index, parent });
      return [SKIP, index + 1];
    }
  });

  expect(tree).toStrictEqual(getReplacedAst());

  visitAndReveal({ tree });

  expect(tree).toStrictEqual(removePositionDataFrom('heading', getInitialAst()));
});