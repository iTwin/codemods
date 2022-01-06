#! /bin/sh

# Designed for use on Macs. May work on other *nix OSes.

if [ "$#" -ne 3 ]; then
  echo Usage:
  echo "    run-codemods.sh PACKAGE.JSON_PATH TSCONFIG_PATH SRC_PATH"
  exit 1
fi
root="$(dirname $(realpath $0))"
"${root}/node_modules/.bin/jscodeshift" -t "${root}/transforms/typed-transforms.ts" --extensions=ts,tsx "--tsConfigPath=$2" "$3"
"${root}/node_modules/.bin/jscodeshift" -t "${root}/transforms/itwin-codemods.ts" --extensions=js,ts --parser=ts "$3"
"${root}/node_modules/.bin/jscodeshift" -t "${root}/transforms/itwin-codemods.ts" --extensions=jsx,tsx --parser=tsx "$3"
node "${root}/transforms/update-packagejson.js" "$1"
