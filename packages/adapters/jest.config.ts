// Jest configuration for the web adapters package
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [ "<rootDir>/src/**/*.spec.ts"],
  moduleNameMapper: {
    "@pokemon/domain": "<rootDir>/../domain/src",
    "@pokemon/web-adapters": "<rootDir>/src",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  coverageDirectory: "coverage",
};

