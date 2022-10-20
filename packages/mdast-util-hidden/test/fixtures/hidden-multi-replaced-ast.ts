import type { Parent } from 'unist';
import type { Content as MdastContent } from 'mdast';
import type { Hidden } from 'pkgverse/mdast-util-hidden/src';

export function getAst(): Parent<MdastContent | Hidden> {
  return {
    children: [
      {
        hiddenChildren: [
          { type: 'text', value: 'Hello' },
          { type: 'text', value: 'to the' },
          { type: 'text', value: 'world!' }
        ],
        type: 'hidden'
      },
      {
        children: [
          {
            position: {
              end: {
                column: 6,
                line: 4,
                offset: 15
              },
              start: {
                column: 1,
                line: 4,
                offset: 10
              }
            },
            type: 'text',
            value: 'Some '
          },
          {
            children: [
              {
                position: {
                  end: {
                    column: 15,
                    line: 4,
                    offset: 24
                  },
                  start: {
                    column: 7,
                    line: 4,
                    offset: 16
                  }
                },
                type: 'text',
                value: 'emphasis'
              }
            ],
            position: {
              end: {
                column: 16,
                line: 4,
                offset: 25
              },
              start: {
                column: 6,
                line: 4,
                offset: 15
              }
            },
            type: 'emphasis'
          },
          {
            position: {
              end: {
                column: 18,
                line: 4,
                offset: 27
              },
              start: {
                column: 16,
                line: 4,
                offset: 25
              }
            },
            type: 'text',
            value: ', '
          },
          {
            children: [
              {
                position: {
                  end: {
                    column: 30,
                    line: 4,
                    offset: 39
                  },
                  start: {
                    column: 20,
                    line: 4,
                    offset: 29
                  }
                },
                type: 'text',
                value: 'importance'
              }
            ],
            position: {
              end: {
                column: 32,
                line: 4,
                offset: 41
              },
              start: {
                column: 18,
                line: 4,
                offset: 27
              }
            },
            type: 'strong'
          },
          {
            position: {
              end: {
                column: 38,
                line: 4,
                offset: 47
              },
              start: {
                column: 32,
                line: 4,
                offset: 41
              }
            },
            type: 'text',
            value: ', and '
          },
          {
            position: {
              end: {
                column: 44,
                line: 4,
                offset: 53
              },
              start: {
                column: 38,
                line: 4,
                offset: 47
              }
            },
            type: 'inlineCode',
            value: 'code'
          },
          {
            position: {
              end: {
                column: 45,
                line: 4,
                offset: 54
              },
              start: {
                column: 44,
                line: 4,
                offset: 53
              }
            },
            type: 'text',
            value: '.'
          }
        ],
        position: {
          end: {
            column: 45,
            line: 4,
            offset: 54
          },
          start: {
            column: 1,
            line: 4,
            offset: 10
          }
        },
        type: 'paragraph'
      },
      {
        hiddenChildren: [
          { type: 'text', value: 'Hello' },
          { type: 'text', value: 'to the' },
          { type: 'text', value: 'world!' }
        ],
        type: 'hidden'
      }
    ],
    position: {
      end: {
        column: 1,
        line: 7,
        offset: 66
      },
      start: {
        column: 1,
        line: 1,
        offset: 0
      }
    },
    type: 'root'
  };
}
