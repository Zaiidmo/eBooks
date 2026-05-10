import type { Config } from 'jest';

const config: Config = {
  // Extensions to look for
  moduleFileExtensions: ['js', 'json', 'ts'],
  
  // Root directory for test discovery
  rootDir: 'src',
  
  // Regex for test file names
  testRegex: '.*\\.spec\\.ts$',
  
  // Transform settings (using ts-jest for TypeScript files)
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  
  // Coverage settings
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s', '!main.ts', '!**/node_modules/**'],
  coverageDirectory: '../coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  
  // Test environment
  testEnvironment: 'node',
  
  // Path aliasing support
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Automatically clear mock calls and instances between tests
  clearMocks: true,
  
  // Configure Jest to detect and handle TypeScript paths
  modulePaths: ['<rootDir>'],
  
  // Optional verbose output
  verbose: true,
};

export default config;
