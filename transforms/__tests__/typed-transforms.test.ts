import { defineTest } from 'jscodeshift/src/testUtils';

describe("temp tests", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/test');
});

describe("parser tests", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/parser');
});

describe("core-common transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/common');
});

describe("core-backend transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/backend');
});

describe("core-frontend transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/frontend');
});

describe("core-geometry transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/geometry');
});
