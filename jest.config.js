module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // Indicates the root directory of your project
  rootDir: '.',
  //   setupFilesAfterEnv: ['@testing-library/jest-native/dist/setup'],

  // The test environment that Jest should use
  testEnvironment: 'node',

  // The file patterns Jest should include for test files
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).js?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],

  // The directories that Jest should search for test files
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],

  // The file extensions that Jest should consider as test files
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // The setup files that Jest should run before running the tests
  setupFiles: [],

  // The transform configuration to specify how to transform different types of files

  // The coverage report settings
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
  ],
  coverageReporters: ['lcov', 'text'],
};
