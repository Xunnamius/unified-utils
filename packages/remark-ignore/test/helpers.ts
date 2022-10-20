import { readFileSync as readToString } from 'fs';
import { read as readToVFile } from 'to-vfile';

export function getFixtureVFile(fixture: string) {
  return readToVFile(`${__dirname}/fixtures/${fixture}.md`);
}

export function getFixtureString(fixture: string, { trim = true } = {}) {
  return readToString(`${__dirname}/fixtures/${fixture}.md`, 'utf8')[
    trim ? 'trim' : 'toString'
  ]();
}
