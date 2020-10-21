module.exports = {
  cacheDirectory: '../.jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
      tsConfig: 'tsconfig.dev.json',
    },
  },
  testRegex: '.test.ts?$',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/test/**',
    '!**/.coverage/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: [
    'text',
    'html',
    'text-summary',
  ],
  coverageDirectory: '.coverage',
  rootDir: './',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/src/index.ts', '.d.ts'],
};
