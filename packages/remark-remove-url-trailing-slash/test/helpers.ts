import { readFileSync as readToString } from 'node:fs';
import { read as readToVFile } from 'to-vfile';

export function getFixtureString(fixture: string, { trim = false } = {}) {
  return readToString(`${__dirname}/fixtures/${fixture}.md`, 'utf8')[
    trim ? 'trim' : 'toString'
  ]();
}

export function getFixtureVFile(fixture: string): ReturnType<typeof readToVFile> {
  return readToVFile(`${__dirname}/fixtures/${fixture}.md`);
}
