import { defineTest } from 'jscodeshift/src/testUtils';

describe("core-common", () => {
  defineTest(__dirname, './core-common', null, 'core-common/basic', { parser: 'ts' });
});
