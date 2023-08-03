import { name, version } from '../package.json';

import { objectPropertyNewlineRule } from './lib/rules/object-property-newline';
import { Rule } from 'eslint';

export const meta = {
  name,
  version,
};

export const rules: Record<string, Rule.RuleModule> = {
  'object-property-newline': objectPropertyNewlineRule,
};
