import { type AST, type Rule } from 'eslint';
import {
  type ExportNamedDeclaration,
  type ImportDeclaration,
  type ObjectExpression,
  type ObjectPattern,
} from 'estree';

export const objectPropertyNewlineRule = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',

    schema: [
      {
        type: 'object',
        properties: {
          allowAllPropertiesOnSameLine: {
            type: 'boolean',
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],

    messages: {
      propertiesOnNewlineAll:
        "Object properties must go on a new line if they aren't all on the same line as the brackets.",
      propertiesOnNewline: 'Object properties must go on a new line.',
    },
  },

  create: (context) => {
    const sourceCode = context.getSourceCode();

    const allowSameLine: boolean =
      context.options[0]?.allowAllPropertiesOnSameLine;

    const messageId = allowSameLine
      ? 'propertiesOnNewlineAll'
      : 'propertiesOnNewline';

    const check = (
      node: Rule.NodeParentExtension &
        (
          | ExportNamedDeclaration
          | ImportDeclaration
          | ObjectExpression
          | ObjectPattern
        )
    ) => {
      const props = 'properties' in node ? node.properties : node.specifiers;

      if (allowSameLine) {
        if (props.length > 1) {
          const openBrace = sourceCode.getFirstToken(
            node,
            (token) => token.value === '{'
          );

          const firstTokenOfFirstProperty = sourceCode.getFirstToken(props[0]);
          const lastTokenOfLastProperty = sourceCode.getLastToken(
            props[props.length - 1]
          );

          /*
           * If all properties are on the same line as the opening bracket: no error.
           * Closing bracket position should already be handled by object-curly-newline.
           */
          if (
            firstTokenOfFirstProperty.loc.end.line ===
              lastTokenOfLastProperty.loc.start.line &&
            openBrace.loc.end.line === firstTokenOfFirstProperty.loc.start.line
          ) {
            return;
          }
        }
      }

      /*
       * Iterate through properties and report each property on the same line as another one.
       */
      for (let i = 1; i < props.length; i++) {
        const lastTokenOfPrevProperty = sourceCode.getLastToken(props[i - 1]);
        const firstTokenOfCurrentProperty = sourceCode.getFirstToken(props[i]);

        if (
          lastTokenOfPrevProperty.loc.end.line ===
          firstTokenOfCurrentProperty.loc.start.line
        ) {
          context.report({
            node,
            loc: firstTokenOfCurrentProperty.loc,
            messageId,
            fix: (fixer) => {
              const comma = sourceCode.getTokenBefore(
                firstTokenOfCurrentProperty
              );
              if (!comma) {
                return null;
              }

              const rangeAfterComma: AST.Range = [
                comma.range[1],
                firstTokenOfCurrentProperty.range[0],
              ];

              /*
               * Don't perform a fix if there are any comments between
               * the comma and the next property.
               */
              if (
                sourceCode.text
                  .slice(rangeAfterComma[0], rangeAfterComma[1])
                  .trim()
              ) {
                return null;
              }

              return fixer.replaceTextRange(rangeAfterComma, '\n');
            },
          });
        }
      }
    };

    return {
      ObjectExpression: check,
      ObjectPattern: check,
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
    };
  },
} as const satisfies Rule.RuleModule;
