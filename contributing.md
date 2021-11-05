# Contribution guide

## Currently defined transforms

There are 4 transform files defined in this repo, which can be found in the 'transforms' directory:

- itwin-codemods.ts
  - This was intended to wrap all transforms into a single transform, however due to different parser requirements for each transform this may no longer be possible/needed. Currently this just runs the "rename-imports" transform.

- rename-imports.ts
  - This handles all the package renames, currently it is the only transform which does not require type inference and can use the built in 'ts' and 'tsx' parsers

- remove-request-context.ts
  - This was originally written before type inference was supported in this repo's transforms, and should be re written and merged into the typed-transforms.ts transform file.

- typed-transforms.ts
  - This handles the bulk of the transformations, as it has been set up to use a custom parser ([typescript estree](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/typescript-estree)) which allows for type inference possible within a transform.

## Unit testing

The other subdirectories setup within the 'transforms' directory are '\_\_tests\_\_' and '\_\_testfixtures\_\_', which are part of a required boilerplate that jscodeshift has defined for testing. To understand the jscodeshift process for unit testing, you can see the jscodeshfit readme [here](https://github.com/facebook/jscodeshift).  but the short explanation is that for a given transform definition you wish to test (e.g. my-transform.ts):

1. Define input and output source files which show the original code and the code that should result after applying your transformation, and include them in a subdirectory corresponding to your transform within the '\_\_testfixtures\_\_' dir. Your input and output files must share the same prefix (e.g. 'basic').

2. Add a my-transform.test.ts file to the '\_\_tests\_\_' dir. Your directory structure should look something like this:

```text
/__tests__/my-transform.test.ts
/__testfixtures__/my-transform/basic.input.ts
/__testfixtures__/my-transform/basic.output.ts
```

Note: For transforms which can use one of the built in parsers, your test fixtures can be .ts or .tsx files. If you wish to use a custom parser on typescript code, make sure you use the .js extension as otherwise the jscodeshift testing library extension will not detect the files properly.

You must also include the path to a valid tsconfig.json when using the typescript estree parser, see the tests setup for 'typed-transforms.ts' as a guide.

3. Create test case for your input/output file pair within your 'my-transform.test.ts' file, the following would run our 'basic' test case with the 'ts' parser.

```js
import { defineTest } from 'jscodeshift/src/testUtils';

describe("basic test", () => {
  defineTest(__dirname, './my-transform', null, 'my-transform/basic', { parser: 'ts' });
});
```

4. Run the tests with 'npm run test', or you use the debugger within vscode if you wish to use breakpoints.

## Adding new transform definitions

Note: In this section, the old @bentley scoped package names are used, as the actual 2.x packages are required for type inference to work. The package renames are the last transform ran with the 'run-codemods.bat' script.

Most transform cases described in the 'Removal of previously deprecated APIs' section of [NextVersion.md](https://github.com/iTwin/itwinjs-core/blob/master/docs/changehistory/NextVersion.md) in itwinjs-core are simple renames that I have tried to make as simple as possible to define. You can see the list of already defined transformations at the top of [typed-transforms.ts](./transforms/typed-transforms.ts) defined under "changedImports" and "changedMembers".

The changedImports map should handle the following cases:

- A class was renamed within a package (AnalysisStyleScalar -> AnalysisStyleThematic within the @bentley/imodeljs-core package)

```js
["@bentley/imodeljs-common.AnalysisStyleScalar", "@bentley/imodeljs-common.AnalysisStyleThematic"],
```

- A class was moved from one package to another (UnitSystemKey moved from @bentley/imodeljs-frontend -> @bentley/imodeljs-quantity)

```js
["@bentley/imodeljs-frontend.UnitSystemKey", "@bentley/imodeljs-quantity.UnitSystemKey"],
```

- A class was deprecated and should be deleted (DocumentCarrier from the @bentley/imodeljs-backend package)

```js
["@bentley/imodeljs-backend.DocumentCarrier", ""],
```

The changedMembers map handles cases where class properties or functions were changed currently the following cases are supported:

- A property was renamed

```js
["CodeSpec.specScopeType", "CodeSpec.scopeType" ]
```

- A function was renamed

```js
["CheckpointConnection.open()", "CheckpointConnection.openRemote()"]
```

- A function was changed to a property

```js
["Code.getValue()", "Code.value"]
```

- If the member changed was static (for any of the above cases), such as:

```js
BriefcaseIdValue.Standalone;
// Should become
BriefcaseIdValue.Unassigned;
```

You wrap the class name with [] in the map definition as follows:

```js
["[BriefcaseIdValue].Standalone", "[BriefcaseIdValue].Unassigned"]
```

More advanced transforms are possible and as I work on this I hope to add to the number of supported cases in the transform schema I defined above, though some transforms will have to be defined manually.

The workflow I recommend to add a new package to the list of supported rename transforms would be the following:

1. Create test fixture for package, update typed-transforms.test.ts

2. Define all renames in changedImports and changedMembers maps

If you wish to manually define any transformations, a useful tool for understanding the AST that jscodesfhift is manipulating is:
- https://astexplorer.net/