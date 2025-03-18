import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] }, // Ignore the dist folder
  {
    files: ['**/*.{js,jsx}'], // Lint only JS and JSX files
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // Browser globals (e.g., window, document)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: 'module', // Use ES modules
      },
    },
    plugins: {
      'react-hooks': reactHooks, // React Hooks plugin
      'react-refresh': reactRefresh, // React Refresh plugin
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint recommended rules
      ...reactHooks.configs.recommended.rules, // React Hooks recommended rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Custom rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];