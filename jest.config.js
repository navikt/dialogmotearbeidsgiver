const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

process.env.TZ = 'GMT';

module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    '^.+\\.(css|less)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['node_modules/(?!(nav\\-frontend\\-.*\\-style/)/)'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { ...pathsToModuleNameMapper(compilerOptions.paths), '^.+\\.svg$': 'jest-svg-transformer' },
  setupFilesAfterEnv: ['./js/MVP/scripts/jest.setup.js'],
};
