// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import typescriptParser from '@typescript-eslint/parser'; 
import globals from 'globals';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules/**','dist/**'], // Ignore node_modules by default
    languageOptions: {
      parser: typescriptParser, // Use the TypeScript parser
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
      },
      globals: {
       // ...globals.browser, // Add browser globals like `window` and `document`
       ...Object.fromEntries(
        Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
      ),
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': typescriptEslint,
    },
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
      'import/resolver': {
        node: {
          paths: ['src'], // Allow resolving imports from the `src` folder
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules, // Include ESLint's recommended rules
      ...react.configs.recommended.rules, // React recommended rules
      ...reactHooks.configs.recommended.rules, // React hooks recommended rules
      ...importPlugin.configs.recommended.rules, // Import recommended rules
      ...jsxA11y.configs.recommended.rules, // Accessibility rules
      ...typescriptEslint.configs.recommended.rules, // TypeScript recommended rules
      ...prettierConfig.rules, // Prettier config for formatting

      // Custom rules
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_', // Ignore unused variables starting with "_"
        },
      ],
      'react/react-in-jsx-scope': 'off', // Disable React in scope rule for React 17+
    },
  },
];
