import { API, ASTPath, CallExpression, ExpressionStatement, FileInfo, FunctionDeclaration, Identifier, ImportDeclaration, importDeclaration, ImportSpecifier, MemberExpression, StringLiteral, TSTypeAnnotation, TSTypeReference } from 'jscodeshift';
import { getTypeNameFromTypeAnnotation } from './Utils';

// TODO: Redo this type support

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Delete import declaration if ClientRequestContext is only import
  // TODO: If this is the first import, file comments are not properly preserved.
  root.find(ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const packageName = (path.value.source as StringLiteral).value;
      if (packageName !== "@itwin/core-bentley")
        return false;
   
      const imports = path.value.specifiers as ImportSpecifier[];
      if (!imports || imports.length !== 1)
        return false;

      const importSpecifier = imports[0];
      return (importSpecifier.imported as Identifier).name === "ClientRequestContext";
    })
    .remove();

  // Remove ClientRequestContext from @itwin/core-bentley imports
  root.find(ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      return (path.value.source as StringLiteral).value === "@itwin/core-bentley";
    })
    .replaceWith((path: ASTPath<ImportDeclaration>) => {
      path.value.specifiers = (path.value.specifiers as ImportSpecifier[]).filter((specifier: ImportSpecifier) => {
        return specifier.imported.name !== "ClientRequestContext";
      });
      return path.node;
    });

  // Delete all ClientRequestContext references from function params
  root.find(FunctionDeclaration)
    .replaceWith((path: ASTPath<FunctionDeclaration>) => {
      path.value.params = path.value.params.filter((param) => {
        const type = getTypeNameFromTypeAnnotation((param as Identifier).typeAnnotation as TSTypeAnnotation);
        return type !== "ClientRequestContext";
      });

      return path.node;
    });

  // Delete all calls to "requestContext.enter()"
  root.find(j.CallExpression)
    .filter((path: ASTPath<CallExpression>) => {
      const expression = path.value.callee as MemberExpression; 
      const object = expression?.object as Identifier;
      const property = expression?.property as Identifier;
      if (!object || !property)
        return false;
    
      return object.name === "requestContext" && property.name === "enter";
    })
    .remove();

  return root.toSource();
}

module.exports.parser = "ts";
