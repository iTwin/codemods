import { defineTest } from 'jscodeshift/src/testUtils';

describe("rename imports", () => {
  defineTest(__dirname, './rename-imports', null, 'rename-imports/basic', { parser: 'ts' });
});
