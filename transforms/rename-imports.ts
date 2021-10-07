import { API, ASTPath, FileInfo, StringLiteral, ImportDeclaration } from 'jscodeshift';

// Manually populate all changed package names with format:
// "original-package-name": "new-package-name"
const changedPackages = {
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
  "@bentley/imodelhub-client-tests": "@itwin/imodelhub-client-tests"
}

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  
  return j(file.source)
    .find(ImportDeclaration)
    .find(StringLiteral)
    .filter((path: ASTPath<StringLiteral>) => { return changedPackages[path.node.value]; })
    .replaceWith((path: ASTPath<StringLiteral>) => {
      path.node.value = changedPackages[path.node.value];
      return path.node;
    })
    .toSource();
}
