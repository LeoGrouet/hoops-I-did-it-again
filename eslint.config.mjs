import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import canonical from 'eslint-plugin-canonical'
import pluginJest from 'eslint-plugin-jest'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactNative from 'eslint-plugin-react-native'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  { files: ['**/*.{js,ts,jsx,tsx}'] },
  { // Chore
    languageOptions: {
      globals: { ...globals.node, ...pluginJest.environments.globals.globals },
      parserOptions: {
        parser: tsParser,
        project: ['./tsconfig.json', './babel.config.js'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      canonical,
      'react-hooks': pluginReactHooks,
      'react-native': pluginReactNative,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'off',
      'simple-import-sort/imports': ['error', {
        groups: [['^\\u0000'], ['^node:'], ['^@?\\w'], ['^'], ['^@\\/.*'], ['^\\.']],
      }],
      'simple-import-sort/exports': 'error',
      'canonical/filename-match-exported': [
        'error',
        {
          suffix: '\\.(ios|android)$',
        },
      ],
      'react-native/split-platform-components': 'error',
      'react-native/no-color-literals': 'error',
      'react-native/no-raw-text': 'error',
      'react-native/no-single-element-style-arrays': 'error',
    },
  },
  { // Test
    files: ['**/__tests__/**/*.{js,ts,jsx,tsx}'],
    ...pluginJest.configs['flat/recommended'],
    rules: {
      ...pluginJest.configs['flat/recommended'].rules,
      'jest/no-mocks-import': 'off',
    },
  },
  { // Stylistic
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Indentation and Spacing
      '@stylistic/indent': ['error', 2, {
        ArrayExpression: 1,
        CallExpression: { arguments: 1 },
        flatTernaryExpressions: false,
        FunctionDeclaration: { body: 1, parameters: 1 },
        FunctionExpression: { body: 1, parameters: 1 },
        ignoreComments: false,
        ignoredNodes: [
          'TSUnionType',
          'TSIntersectionType',
          'TSTypeParameterInstantiation',
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        ],
        ImportDeclaration: 1,
        MemberExpression: 1,
        ObjectExpression: 1,
        offsetTernaryExpressions: true,
        outerIIFEBody: 1,
        SwitchCase: 1,
        tabLength: 2,
        VariableDeclarator: 1,
      }],
      '@stylistic/space-before-blocks': ['error', { functions: 'always', keywords: 'always', classes: 'always' }],
      '@stylistic/space-in-parens': 'error',
      '@stylistic/key-spacing': 'error',
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],

      // Comma and Punctuation
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        multilineDetection: 'brackets',
        overrides: {
          interface: {
            multiline: {
              delimiter: 'none',
              requireLast: false,
            },
          },
        },
        singleline: {
          delimiter: 'comma',
        },
      }],

      // Quotes
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/jsx-quotes': 'error',

      // Brackets and Parentheses
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/brace-style': ['error'],
      '@stylistic/type-annotation-spacing': 'error',

      // JSX Specific
      '@stylistic/jsx-child-element-spacing': 'error',
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-tag-spacing': ['error', {
        afterOpening: 'never',
        beforeClosing: 'never',
        beforeSelfClosing: 'always',
        closingSlash: 'never',
      }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        arrow: 'parens-new-line',
        assignment: 'parens-new-line',
        condition: 'parens-new-line',
        declaration: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
        propertyValue: 'parens-new-line',
        return: 'parens-new-line',
      }],

      // Line Spacing
      '@stylistic/eol-last': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

      // Miscellaneous
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/indent-binary-ops': ['error', 2],
    },
  },
  {
    ignores: ['node_modules', '.yarn', '**/*.d.ts'],
  },
]
