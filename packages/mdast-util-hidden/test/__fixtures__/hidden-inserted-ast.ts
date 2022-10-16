import type { Parent } from 'unist';
import type { Content as MdastContent } from 'mdast';
import type { Hidden } from 'pkgverse/mdast-util-hidden/src';

export function getAst(): Parent<MdastContent | Hidden> {
  return {
    children: [
      {
        hiddenChildren: [
          {
            children: [
              {
                position: {
                  end: {
                    column: 8,
                    line: 2,
                    offset: 8
                  },
                  start: {
                    column: 3,
                    line: 2,
                    offset: 3
                  }
                },
                type: 'text',
                value: 'Hello'
              }
            ],
            depth: 1,
            position: {
              end: {
                column: 8,
                line: 2,
                offset: 8
              },
              start: {
                column: 1,
                line: 2,
                offset: 1
              }
            },
            type: 'heading'
          }
        ],
        type: 'hidden'
      },
      {
        children: [
          {
            position: {
              end: {
                column: 8,
                line: 2,
                offset: 8
              },
              start: {
                column: 3,
                line: 2,
                offset: 3
              }
            },
            type: 'text',
            value: 'Hello'
          }
        ],
        depth: 1,
        position: {
          end: {
            column: 8,
            line: 2,
            offset: 8
          },
          start: {
            column: 1,
            line: 2,
            offset: 1
          }
        },
        type: 'heading'
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
          {
            children: [
              {
                position: {
                  end: {
                    column: 10,
                    line: 6,
                    offset: 65
                  },
                  start: {
                    column: 3,
                    line: 6,
                    offset: 58
                  }
                },
                type: 'text',
                value: 'Goodbye'
              }
            ],
            depth: 1,
            position: {
              end: {
                column: 10,
                line: 6,
                offset: 65
              },
              start: {
                column: 1,
                line: 6,
                offset: 56
              }
            },
            type: 'heading'
          }
        ],
        type: 'hidden'
      },
      {
        children: [
          {
            position: {
              end: {
                column: 10,
                line: 6,
                offset: 65
              },
              start: {
                column: 3,
                line: 6,
                offset: 58
              }
            },
            type: 'text',
            value: 'Goodbye'
          }
        ],
        depth: 1,
        position: {
          end: {
            column: 10,
            line: 6,
            offset: 65
          },
          start: {
            column: 1,
            line: 6,
            offset: 56
          }
        },
        type: 'heading'
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
