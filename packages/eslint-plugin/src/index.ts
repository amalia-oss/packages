import { name, version } from '../package.json';

import { objectPropertyNewlineRule } from './lib/rules/object-property-newline';

export const meta = {
  name,
  version,
};

export const rules = {
  'object-property-newline': objectPropertyNewlineRule,
};
