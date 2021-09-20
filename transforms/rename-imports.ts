import { API, ASTPath, FileInfo, StringLiteral, ImportDeclaration } from 'jscodeshift';

// Manually populate all changed package names with format:
// "original-package-name": "new-package-name"
const changedPackages = {
  "@bentley/imodeljs-frontend": "@itwin/core-frontend",
  "@bentley/imodeljs-backend": "@itwin/core-backend",
  "@bentley/imodeljs-common": "@itwin/core-common",
  "@bentley/geometry-core": "@itwin/core-geometry",
  "@bentley/ecschema-metadata": "@itwin/ecschema-metadata",
  "@bentley/ecschema-locaters": "@itwin/ecschema-locaters",
  "@bentley/ecschema-editing": "@itwin/ecschema-editing",
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
  "@bentley/ui-abstract": "@itwin/ui-abstract",
  "@bentley/ui-components": "@itwin/ui-components",
  "@bentley/ui-core": "@itwin/ui-core",
  "@bentley/ui-imodel-components": "@itwin/ui-imodel-components",
  "@bentley/ui-ninezone": "@itwin/ui-ninezone",
  "@bentley/ui-framework": "@itwin/ui-framework",
  "@bentley/ecschema2ts": "@itwin/ecschema2ts",
  "@bentley/webpack-tools-core": "@itwin/core-webpack-tools",
  "@bentley/backend-webpack-tools": "@itwin/backend-webpack-tools"
}

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  
  root.find(ImportDeclaration).find(StringLiteral)
    .filter((path: ASTPath<StringLiteral>) => { return changedPackages[path.node.value]; })
    .replaceWith((path: ASTPath<StringLiteral>) => {
      path.node.value = changedPackages[path.node.value];
      return path.node;
    });

  return root.toSource();
}
