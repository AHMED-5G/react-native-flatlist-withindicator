module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    './jest-setup.js',
    '@testing-library/jest-native/extend-expect',
  ],

  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-native|@react-native|@react-navigation)',
  ],
  fakeTimers: { enableGlobally: true },
  cache: false,
  testPathIgnorePatterns: [
    '<rootDir>/lib/typescript/__tests__/index.test.d.ts',
  ],
};
