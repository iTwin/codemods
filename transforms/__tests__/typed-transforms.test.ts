import { defineTest } from 'jscodeshift/src/testUtils';

describe("parser tests", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/parser');
});

describe("core transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/common');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/backend');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/frontend');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/geometry');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/geometry');
});

describe("ecschema transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/ecschema');
});

describe("presentation transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/presentation-common');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/presentation-backend');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/presentation-frontend');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/presentation-components');
})

describe("ui transforms", () => {
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/ui-core');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/components-react');
  defineTest(__dirname, './typed-transforms', { tsConfigPath: './transforms/__testfixtures__/typed-transforms/tsconfig.json' }, 'typed-transforms/appui-react');
});
