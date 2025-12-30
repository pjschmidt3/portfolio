import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './'
})

const config: Config = {
  // coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '@piducancore/fonts-andale-mono':
      '<rootDir>/lib/test-utils/mocks/font-mock.ts'
  }
  // modulePaths: ['<rootDir>'],
  // testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // collectCoverageFrom: [
  //   'app/**/*.{js,jsx,ts,tsx}',
  //   'components/**/*.{js,jsx,ts,tsx}',
  //   '!**/*.d.ts',
  //   '!**/node_modules/**',
  //   '!**/.next/**'
  // ]
}

export default createJestConfig(config)
