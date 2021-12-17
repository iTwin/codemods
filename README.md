# @itwin/codemods

This repo provides a tool that runs a collection of codemods to help update projects for the 3.0 release of the [itwinjs-core](https://github.com/iTwin/itwinjs-core/) packages using the [jscodeshift](https://github.com/facebook/jscodeshift) toolkit.

The full list of completed and planned codemods can be found in [transforms.md](./transforms.md).

## Usage

1. Clone this repo into the same parent directory as the repo you wish to transform

2. `npm install --production`

3. In the root of your project's repo, run codemods with:

    - Windows
        ```bat
        ../codemods/run-codemods.bat PACKAGE.JSON_PATH TSCONFIG_PATH SRC_PATH
        ```

    - MacOs
        ```sh
        ../codemods/run-codemods.sh PACKAGE.JSON_PATH TSCONFIG_PATH SRC_PATH
        ```

    > PACKAGE.JSON_PATH is the path to your project's package.json

    > TSCONFIG_PATH is the path to your project's tsconfig.json file

    > SRC_PATH is the path to your src directory
