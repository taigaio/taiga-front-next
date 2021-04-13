module.exports = {
  testMatch: [
    '**/src/**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['^.+\\.js$'],
};
