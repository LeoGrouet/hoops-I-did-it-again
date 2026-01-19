import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommended: true,
});

export default [
  {
    ignores: [
      'node_modules/**',
      'babel.config.js',
      'metro.config.js',
      'expo-env.d.ts',
    ],
  },
  ...compat.extends('expo'),
];
