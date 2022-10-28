declare module 'unist-util-find' {
  export default function (
    parent: import('unist').Parent,
    condition: string | import('unist').Node | ((node: import('unist').Node) => boolean)
  ): import('unist').Node;
}
