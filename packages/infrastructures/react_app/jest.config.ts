import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/vendor/**"],
  transform: {
    ".(ts|tsx)": "ts-jest",
  },

  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],

  moduleNameMapper: {
    "@pokemon/domain": "<rootDir>/../../domain/src",
    "@pokemon/web-adapters": "<rootDir>/../../adapters/src",
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  testEnvironment: "jsdom",

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setup-jest.ts",
    "index.tsx",
  ],
};

export default config;
