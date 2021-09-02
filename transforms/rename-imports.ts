import { API, ASTPath, FileInfo, StringLiteral, Node, ImportDeclaration } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  
  root.find(ImportDeclaration).find(StringLiteral)
    .filter((path: ASTPath<StringLiteral>) => {
      // Only change packages scoped to @bentley
      // TODO: May need to rename individual packages rather than all packages scoped to @bentley
      if (!path.node.value.startsWith("@bentley/"))
        return false;
      return true;
    })
    .replaceWith((path: ASTPath<StringLiteral>) => {
      path.node.value = path.node.value.replace(/@bentley/, "@itwin")
      return path.node;
    });

  return root.toSource();
}