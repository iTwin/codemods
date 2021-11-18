import { defineTest } from 'jscodeshift/src/testUtils';

describe("parser tests", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/parser');
});

describe("core-common transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/common');
});

describe("core-backend transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/backend');
});

describe.only("core-frontend transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/frontend');
});

describe("core-geometry transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/geometry');
});

describe("ui transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/ui-core');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/components-react');
});
