"use strict";

const OFFICIAL_RELEASE_3 = "^3.0.0";
const LATEST = "latest";

const corePackages = {
  "@bentley/imodeljs-backend": "@itwin/core-backend",
  "@bentley/imodeljs-common": "@itwin/core-common",
  "@bentley/imodeljs-frontend": "@itwin/core-frontend",
  "@bentley/geometry-core": "@itwin/core-geometry",
  "@bentley/ecschema-metadata": "@itwin/ecschema-metadata",
  "@bentley/ecschema-locaters": "@itwin/ecschema-locaters",
  "@bentley/ecschema-editing": "@itwin/ecschema-editing",
  "@bentley/bentleyjs-core": "@itwin/core-bentley",
  "@bentley/orbitgt-core": "@itwin/core-orbitgt",
  "@bentley/frontend-devtools": "@itwin/frontend-devtools",
  "@bentley/webgl-compatibility": "@itwin/webgl-compatibility",
  "@bentley/imodeljs-transformer": "@itwin/core-transformer",
  "@bentley/imodeljs-markup": "@itwin/core-markup",
  "@bentley/imodeljs-editor-common": "@itwin/editor-common",
  "@bentley/imodeljs-editor-backend": "@itwin/editor-backend",
  "@bentley/imodeljs-editor-frontend": "@itwin/editor-frontend",
  "@bentley/analytical-backend": "@itwin/analytical-backend",
  "@bentley/linear-referencing-backend": "@itwin/linear-referencing-backend",
  "@bentley/linear-referencing-common": "@itwin/linear-referencing-common",
  "@bentley/physical-material-backend": "@itwin/physical-material-backend",
  "@bentley/presentation-backend": "@itwin/presentation-backend",
  "@bentley/presentation-common": "@itwin/presentation-common",
  "@bentley/presentation-frontend": "@itwin/presentation-frontend",
  "@bentley/presentation-components": "@itwin/presentation-components",
  "@bentley/presentation-testing": "@itwin/presentation-testing",
  "@bentley/ui-abstract": "@itwin/appui-abstract",
  "@bentley/ui-components": "@itwin/components-react",
  "@bentley/ui-core": "@itwin/core-react",
  "@bentley/ui-imodel-components": "@itwin/imodel-components-react",
  "@bentley/ui-ninezone": "@itwin/appui-layout-react",
  "@bentley/ui-framework": "@itwin/appui-react",
  "@bentley/ecschema2ts": "@itwin/ecschema2ts",
  "@bentley/webpack-tools-core": "@itwin/core-webpack-tools",
  "@bentley/backend-webpack-tools": "@itwin/backend-webpack-tools",
  "@bentley/build-tools": "@itwin/build-tools",
  "@bentley/eslint-plugin": "@itwin/eslint-plugin",
  "@bentley/imodeljs-quantity": "@itwin/core-quantity",
  "@bentley/imodeljs-i18n": "@itwin/core-i18n",
  "@bentley/hypermodeling-frontend": "@itwin/hypermodeling-frontend",
  "@bentley/electron-manager": "@itwin/core-electron",
  "@bentley/mobile-manager": "@itwin/core-mobile",
  "@bentley/express-server": "@itwin/express-server",
  "@bentley/ecschema-rpcinterface-common": "@itwin/ecschema-rpcinterface-common",
  "@bentley/ecschema-rpcinterface-impl": "@itwin/ecschema-rpcinterface-impl",
  "@bentley/ecschema-rpcinterface-tests": "@itwin/ecschema-rpcinterface-tests",
  "@bentley/certa": "@itwin/certa",
  "@bentley/perf-tools": "@itwin/perf-tools",
  "@bentley/oidc-signin-tool": "@itwin/oidc-signin-tool",
  "@bentley/geonames-extension": "@itwin/geonames-extension",
  "@bentley/map-layers": "@itwin/map-layers",
  "@bentley/rpcinterface-full-stack-tests": "@itwin/rpcinterface-full-stack-tests",
  "@bentley/imodelhub-client-tests": "@itwin/imodelhub-client-tests",
};

/**
 * @param {string} packageFile path to the package.json file
 */
exports.run = function(packageFile) {
  // Packages outside itwinjs-core, versioned separetely
  const externalPackages = {
    "@bentley/frontend-authorization-client": "@itwin/browser-authorization",
    "@bentley/reality-data-client": "@itwin/reality-data-client",
  };

  console.log("Updating " + packageFile);

  const fs = require("fs");
  if (!fs.existsSync(packageFile)) {
    throw Error(`No file found at path '${packageFile}'`);
  }

  const rawData = fs.readFileSync(packageFile, { encoding: 'utf8' });
  const packageData = JSON.parse(rawData);

  for (const section in packageData) {
    const newPackages = { };
    if (section.toLowerCase().includes("dependencies")) {
      for (const pkg in packageData[section])
        if (corePackages[pkg])
          newPackages[corePackages[pkg]] = OFFICIAL_RELEASE_3;
        else if (externalPackages[pkg])
          newPackages[externalPackages[pkg]] = LATEST;
        else
          newPackages[pkg] = packageData[section][pkg];
      packageData[section] = newPackages;
    }
  }

  fs.writeFileSync(packageFile, JSON.stringify(packageData, null, 2) + "\n");
}

if (module === require.main) {
  if (process.argv.length !== 3) {
    console.log("Bad arguments provided, exiting...");
    process.exit(1);
  }

  try {
    const packageFile = process.argv[2]
    exports.run(packageFile);
    console.log(`'${packageFile} updated successfully.`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}
