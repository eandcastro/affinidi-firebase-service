module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: 'tsconfig-tests.json',
      isolatedModules: true,
    }
  },
  collectCoverage: true,
  testTimeout: 240000,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'configuration.ts',
    '.mock.ts$',
    '.fixture.ts$',
    '.test.ts$',
    '.module.ts$',
    '.spec.ts$',
  ],
  forceExit: true,
  preset: 'ts-jest',
}
