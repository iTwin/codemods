import { defineTest } from 'jscodeshift/src/testUtils';

describe("remove request context", () => {
  defineTest(__dirname, './remove-request-context', null, 'remove-request-context/basic', { parser: 'ts' });
  defineTest(__dirname, './remove-request-context', null, 'remove-request-context/multi-import', { parser: 'ts' });
  defineTest(__dirname, './remove-request-context', null, 'remove-request-context/implements', { parser: 'ts' });
});
