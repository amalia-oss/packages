# eslint-plugin

[![version](https://img.shields.io/npm/v/@amalia-oss/eslint-plugin?style=for-the-badge&logo=npm&label=)](https://www.npmjs.com/package/@amalia-oss/eslint-plugin)

Custom ESLint rules.

## Install

```
npm install --save-dev @amalia-oss/eslint-plugin
```

## Setup

Add `@amalia-oss` to your list of plugins in your ESLint configuration, and configure the rules you want.

```json5
{
  plugins: ['@amalia-oss'],

  rules: {
    '@amalia-oss/object-property-newline': [
      'warn',
      { allowAllPropertiesOnSameLine: false },
    ],
  },
}
```

## Rules

| Rule name                             | Description                                                                                                                                                                                                                                                                                              | Default configuration                       |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `@amalia-oss/object-property-newline` | A replacement for ESLint's native [`object-property-newline`](https://eslint.org/docs/latest/rules/object-property-newline) rule, but taking the brackets into account for the [`allowAllPropertiesOnSameLine`](https://eslint.org/docs/latest/rules/object-property-newline#optional-exception) option. | `{ "allowAllPropertiesOnSameLine": false }` |
