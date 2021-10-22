module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@babel', '@typescript-eslint'],

  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    // Prettier must be last to override other configs
    'prettier',
  ],

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },

  rules: {
    'react/no-direct-mutation-state': 'off',
    'import/no-named-as-default-member': 'off',
  },
};
