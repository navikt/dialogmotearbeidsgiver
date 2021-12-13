const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

process.env.TZ = 'GMT';

module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    '^.+\\.(css|less)$': 'jest-transform-stub',
    '\\.svg$': 'svg-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(nav-frontend-chevron-style|nav-frontend-typografi-style|nav-frontend-lenker-style|nav-frontend-alertstriper-style|nav-frontend-skjema-style|nav-frontend-veileder-style|nav-frontend-knapper-style)/)',
  ],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { ...pathsToModuleNameMapper(compilerOptions.paths) },
  setupFilesAfterEnv: ['./js/MVP/test/jest.setup.js'],
};
