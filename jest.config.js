const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.spec.json");

module.exports = {
    preset: "jest-preset-angular",
    roots: ["<rootDir>/src/"],
    testMatch: ["**/+(*.)+(spec).+(ts)"],
    setupFilesAfterEnv: ["<rootDir>/src/test.ts"],
    collectCoverage: true,
    coverageReporters: ["html"],
    coverageDirectory: "coverage/happy-dogs-proto",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: "<rootDir>/",
    }),
    globals: {
      'ts-jest': {
        astTransformers: {
          before: [
            'jest-preset-angular/build/InlineFilesTransformer',
            'jest-preset-angular/build/StripStylesTransformer'
          ],
        },
      }
    }
};
