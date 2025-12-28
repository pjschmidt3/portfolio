import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './'
})

const config: Config = {
  // coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
  // moduleNameMapper: {
  //   '@/*': ['<rootDir>/$1'],
  //   '@/app/*': ['<rootDir>/app/$1'],
  //   '@/components/*': ['<rootDir>/components/$1']
  // },
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
