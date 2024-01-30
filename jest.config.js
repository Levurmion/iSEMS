/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/src/**/*.test.ts"
  ]
};

export default config