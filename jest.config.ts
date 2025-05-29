import type {Config} from 'jest';

const config: Config = {
    // All imported modules in your tests should be mocked automatically
    automock: false,

    // Stop running tests after `n` failures
    bail: 0,

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["<rootDir>/packages/**/*.spec.ts"],

    moduleNameMapper: {
        "@pokemon/root": "<rootDir>/packages"
    },

    projects: [
        '<rootDir>/packages/domain/jest.config.ts',
        '<rootDir>/packages/adapters/jest.config.ts',
        '<rootDir>/packages/infrastructures/angular_app/jest.config.ts',
    ]
}

export default config;
