#!/usr/bin/env node

const usage = `Usage:
    [node] ./run-codemods.js PACKAGE.JSON_PATH TSCONFIG_PATH SRC_PATH
`;

async function main() {
  const wasScriptRanByNodeExe = /node$/.test(process.argv[0]);
  // trim the optional node exe path and this script's path from the command line to get the positional arguments
  const args = process.argv.slice(wasScriptRanByNodeExe ? 2 : 1);

  if (args.length !== 3) {
    console.log(usage);
    process.exit(1);
  }

  const child_process = require("child_process");
  const fs = require("fs");
  const path = require("path");

  const [packageJsonPath, tsConfigPath, srcPath] = args;
  if (!fs.existsSync(packageJsonPath))
    throw Error("the specified package.json could not be found");
  if (!fs.existsSync(tsConfigPath))
    throw Error("the specified typescript config could not be found");
  if (!fs.existsSync(srcPath))
    throw Error("the specified source directory could not be found");

  const root = __dirname;
  const jsCodeShiftPath = path.join(root, "node_modules/.bin/jscodeshift");

  /**
   * spawn a process from the executable at `execPath` with the arguments `args`
   * return a promise for when it finishes, inheriting stdin/out/err from the parent
   * rejects on non-zero exit
   * @param {string} execPath
   * @param {string[]} args
   * @returns {Promise<void>}
   */
  async function spawnPromise(execPath, args) {
    return new Promise((resolve, reject) => {
      const spawned = child_process.spawn(execPath, args, { stdio: "inherit" });
      spawned.on("exit", (code) =>
        code === 0
          ? resolve()
          : reject(Error(`process exited with non-zero return code of ${code}`))
      );
      spawned.on("error", reject);
    });
  }

  /**
   * spawn a codemod running process from a script
   * @param {string} codemodScriptPath
   * @param {{
   *   extensions: string[];
   *   parser?: string;
   *   tsConfigPath?: string;
   * }} options
   * @returns {Promise<void>}
   */
  async function spawnCodemod(
    codemodScriptPath,
    { extensions = ["js", "ts"], parser, tsConfigPath }
  ) {
    return spawnPromise(jsCodeShiftPath, [
      "-t",
      codemodScriptPath,
      ...(extensions ? [`--extensions=${extensions.join(",")}`] : []),
      ...(parser ? [`--parser=${parser}`] : []),
      ...(tsConfigPath ? [`--tsConfigPath=${tsConfigPath}`] : []),
      srcPath,
    ]);
  }

  try {
    // jscodeshift probably has a programmatic API that should be used instead
    await spawnCodemod(path.join(root, "transforms/typed-transforms.ts"), {
      extensions: ["ts", "tsx"],
      tsConfigPath,
    });
    await spawnCodemod(path.join(root, "transforms/itwin-codemods.ts"), {
      extensions: ["js", "ts"],
      parser: "ts",
    });
    await spawnCodemod(path.join(root, "transforms/itwin-codemods.ts"), {
      extensions: ["jsx", "tsx"],
      parser: "tsx",
    });
    require("./transforms/update-packagejson").run(packageJsonPath);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

if (module === require.main) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
