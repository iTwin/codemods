# @itwin/codemods

This repo provides a tool that runs a collection of codemods to help update projects for the 3.0 release of the [itwinjs-core](https://github.com/iTwin/itwinjs-core/) packages using the [jscodeshift](https://github.com/facebook/jscodeshift) toolkit.

The full list of completed and planned codemods can be found in [transforms.md](./transforms.md).

## Usage

1. Clone this repo into the same parent directory as the repo you wish to transform

2. `npm install --production`

3. In the root of your project's repo, run codemods with:

    ```sh
    node ../codemods/run-codemods.js PACKAGE.JSON_PATH TSCONFIG_PATH SRC_PATH
    ```

    > PACKAGE.JSON_PATH is the path to your project's package.json

    > TSCONFIG_PATH is the path to your project's tsconfig.json file

    > SRC_PATH is the path to your src directory

## Alternative usage

`npx @itwin/codemods`

These are temporary steps needed before the package is published to the registry:

1. Clone the repository
2. `npm run build`
3. `npm pack`
4. *(Optional)* `npm uninstall @itwin/codemods -g`
5. `npm install itwin-codemods-${packageVersion}.tgz -g`
