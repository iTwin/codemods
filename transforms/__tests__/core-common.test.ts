import { defineTest } from 'jscodeshift/src/testUtils';

describe("core-common", () => {
  defineTest(__dirname, './core-common', { tsConfigPath: './testAssets/tsconfig.json' }, 'core-common/basic', { parser: 'ts' });
});
