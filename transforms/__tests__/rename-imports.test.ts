import { defineTest } from 'jscodeshift/src/testUtils';

describe("rename imports", () => {
  defineTest(__dirname, './rename-imports', null, 'rename-imports/basic', { parser: 'ts' });
});

describe("parser", () => {
  defineTest(__dirname, './rename-imports', null, 'rename-imports/parser', { parser: 'tsx' });
});
