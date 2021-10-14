import { API, ASTPath, CallExpression, ExpressionStatement, FileInfo, FunctionDeclaration, Identifier, ImportDeclaration, importDeclaration, ImportSpecifier, MemberExpression, StringLiteral, TSTypeAnnotation, TSTypeReference } from 'jscodeshift';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);
  
  // Delete import declaration if ClientRequestContext is only import
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
        const typeAnnotation = (param as Identifier).typeAnnotation as TSTypeAnnotation;
        if (!typeAnnotation)
          return true;
        
        const typeReference = typeAnnotation.typeAnnotation as TSTypeReference
        if (!typeReference)
          return true;
        
        const typeName = typeReference.typeName as Identifier;
        if (!typeName || typeName.name !== "ClientRequestContext")
          return true;

        return false;
        });

      return path.node;
    });

  // Delete all calls to "requestContext.enter()"
  root.find(ExpressionStatement)
    .filter((path: ASTPath<ExpressionStatement>) => {
      const expression = (path.value.expression as CallExpression).callee as MemberExpression;
      if (!expression)
        return false;
      
      const object = expression.object as Identifier;
      const property = expression.property as Identifier;
        
      if (!object || !property)
        return false;
    
      if (object.name !== "requestContext" && property.name !== "enter")
        return false;
      
      return true;
    })
    .remove();

  return root.toSource();
}
