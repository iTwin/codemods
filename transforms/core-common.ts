import { API, ASTPath, FileInfo, StringLiteral, ImportDeclaration, TSTypeAnnotation, Identifier } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.Identifier)
    .filter((path: ASTPath<Identifier>) => {
      if (path.value.typeAnnotation)
        return true;
      return false;
        // return (path.value.typeAnnotation?.typeAnnotation?.type === "IModelDb");
    });
  
  return root.toSource();
}
