import { RuleTester } from 'eslint';

import { objectPropertyNewlineRule } from './object-property-newline';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
});

ruleTester.run(
  '@amalia-oss/object-property-newline',
  objectPropertyNewlineRule,
  {
    valid: [
      /* ObjectExpression. */
      {
        code: 'const a = { a: 1, b: 2, c: 3 };',
        options: [{ allowAllPropertiesOnSameLine: true }],
      },
      {
        code: 'const a = {\n  a: 1,\n  b: 2,\n  c: 3\n};',
        options: [{ allowAllPropertiesOnSameLine: true }],
      },
      {
        code: 'const a = {\n  a: 1,\n  b: 2,\n  c: 3\n};',
        options: [{ allowAllPropertiesOnSameLine: false }],
      },
      /* ImportDeclaration. */
      {
        code: "import { a, b, c } from 'lib';",
        options: [{ allowAllPropertiesOnSameLine: true }],
      },
      {
        code: "import {\n  a,\n  b,\n  c\n} from 'lib';",
        options: [{ allowAllPropertiesOnSameLine: true }],
      },
      {
        code: "import {\n  a,\n  b,\n  c\n} from 'lib';",
        options: [{ allowAllPropertiesOnSameLine: false }],
      },
      /* ObjectPattern. */
      {
        code: 'const { a, b, c } = d;',
        options: [{ allowAllPropertiesOnSameLine: true }],
      },
      {
        code: 'const {\n  a,\n  b,\n  c\n} = d;',
        options: [{ allowAllPropertiesOnSameLine: true }],
      },
      {
        code: 'const {\n  a,\n  b,\n  c\n} = d;',
        options: [{ allowAllPropertiesOnSameLine: false }],
      },
      /* ExportNamedDeclaration. */
      {
        code: 'const a = 1, b = 1, c = 1; export { a, b, c };',
        options: [{ allowAllPropertiesOnSameLine: true }],
      },
      {
        code: 'const a = 1, b = 1, c = 1; export {\n  a,\n  b,\n  c\n};',
        options: [{ allowAllPropertiesOnSameLine: true }],
      },
      {
        code: 'const a = 1, b = 1, c = 1; export {\n  a,\n  b,\n  c\n};',
        options: [{ allowAllPropertiesOnSameLine: false }],
      },
    ],

    invalid: [
      /* ObjectExpression. */
      {
        code: 'const a = {\na: 1, b: 2, c: 3\n};',
        output: 'const a = {\na: 1,\nb: 2,\nc: 3\n};',
        options: [{ allowAllPropertiesOnSameLine: true }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
        ],
      },
      {
        code: 'const a = {\na: 1, b: 2,\nc: 3\n};',
        output: 'const a = {\na: 1,\nb: 2,\nc: 3\n};',
        options: [{ allowAllPropertiesOnSameLine: true }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
        ],
      },
      {
        code: 'const a = { a: 1, b: 2, c: 3 };',
        output: 'const a = { a: 1,\nb: 2,\nc: 3 };',
        options: [{ allowAllPropertiesOnSameLine: false }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
        ],
      },
      {
        code: 'const a = {\na: 1, b: 2,\nc: 3\n};',
        output: 'const a = {\na: 1,\nb: 2,\nc: 3\n};',
        options: [{ allowAllPropertiesOnSameLine: false }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
        ],
      },

      /* ImportDeclaration. */
      {
        code: "import {\na, b, c\n} from 'lib';",
        output: "import {\na,\nb,\nc\n} from 'lib';",
        options: [{ allowAllPropertiesOnSameLine: true }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
        ],
      },
      {
        code: "import {\na, b,\nc\n} from 'lib';",
        output: "import {\na,\nb,\nc\n} from 'lib';",
        options: [{ allowAllPropertiesOnSameLine: true }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
        ],
      },
      {
        code: "import { a, b, c } from 'lib';",
        output: "import { a,\nb,\nc } from 'lib';",
        options: [{ allowAllPropertiesOnSameLine: false }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
        ],
      },
      {
        code: "import {\na, b,\nc\n} from 'lib';",
        output: "import {\na,\nb,\nc\n} from 'lib';",
        options: [{ allowAllPropertiesOnSameLine: false }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
        ],
      },

      /* ObjectPattern. */
      {
        code: 'const {\na, b, c\n} = d;',
        output: 'const {\na,\nb,\nc\n} = d;',
        options: [{ allowAllPropertiesOnSameLine: true }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
        ],
      },
      {
        code: 'const {\na, b,\nc\n} = d;',
        output: 'const {\na,\nb,\nc\n} = d;',
        options: [{ allowAllPropertiesOnSameLine: true }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
        ],
      },
      {
        code: 'const { a, b, c } = d;',
        output: 'const { a,\nb,\nc } = d;',
        options: [{ allowAllPropertiesOnSameLine: false }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
        ],
      },
      {
        code: 'const {\na, b,\nc\n} = d;',
        output: 'const {\na,\nb,\nc\n} = d;',
        options: [{ allowAllPropertiesOnSameLine: false }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
        ],
      },

      /* ExportNamedDeclaration. */
      {
        code: 'const a = 1, b = 1, c = 1;\nexport {\na, b, c\n};',
        output: 'const a = 1, b = 1, c = 1;\nexport {\na,\nb,\nc\n};',
        options: [{ allowAllPropertiesOnSameLine: true }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
        ],
      },
      {
        code: 'const a = 1, b = 1, c = 1;\nexport {\na, b,\nc\n};',
        output: 'const a = 1, b = 1, c = 1;\nexport {\na,\nb,\nc\n};',
        options: [{ allowAllPropertiesOnSameLine: true }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewlineAll,
          },
        ],
      },
      {
        code: 'const a = 1, b = 1, c = 1;\nexport { a, b, c };',
        output: 'const a = 1, b = 1, c = 1;\nexport { a,\nb,\nc };',
        options: [{ allowAllPropertiesOnSameLine: false }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
        ],
      },
      {
        code: 'const a = 1, b = 1, c = 1;\nexport {\na, b,\nc\n};',
        output: 'const a = 1, b = 1, c = 1;\nexport {\na,\nb,\nc\n};',
        options: [{ allowAllPropertiesOnSameLine: false }],
        errors: [
          {
            message:
              objectPropertyNewlineRule.meta.messages.propertiesOnNewline,
          },
        ],
      },
    ],
  }
);
