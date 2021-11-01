import { API, ASTPath, FileInfo, StringLiteral, ImportDeclaration, TSTypeAnnotation, Options, Identifier, MemberExpression, ExpressionStatement, CallExpression, ImportSpecifier } from "jscodeshift";
import { AST, parse, parseAndGenerateServices, TSESTreeOptions } from "@typescript-eslint/typescript-estree";
import { TypeChecker } from "typescript";
import { Parser } from "./Parser";
import { ParserServices } from "@typescript-eslint/typescript-estree";
import { getDeclaredTypeName } from "./Utils";
import { Type, finalize } from "ast-types";

interface ClassMember {
  classMember: string;
  isStatic?: boolean;
}

// const renamedClasses = new Map<string, Map<string, string>>([
//   ["@bentley/imodeljs-common", new Map<string, string>([
//     ["AnalysisStyleScalar", "AnalysisStyleThematic"],
//     ["AnalysisStyleScalarProps", "AnalysisStyleThematicProps"],
//   ])],
// ]);

const renamedClasses = new Map<string, string>([
  // core-common
  ["AnalysisStyleScalar", "AnalysisStyleThematic"],
  ["AnalysisStyleScalarProps", "AnalysisStyleThematicProps"],
]);

const renamedProperties = new Map<string, ClassMember>([
  // core-common
  ["AnalysisStyle.scalar", { classMember: "AnalysisStyle.thematic" }],
  ["BriefcaseIdValue.Standalone", { classMember: "BriefcaseIdValue.Unassigned", isStatic: true }],
  ["BriefcaseIdValue.DeprecatedStandalone", { classMember: "BriefcaseIdValue.Unassigned", isStatic: true }],
  ["CodeSpec.specScopeType", { classMember: "CodeSpec.scopeType" }],
  ["DisplayStyleSettings.excludedElements", { classMember: "DisplayStyleSettings.excludedElementIds" }],
  ["DisplayStyleOverridesOptions.includeProjectSpecific", { classMember: "DisplayStyleOverridesOptions.includeITwinSpecific" }],
  // core-backend
  ["IModelDb.changeSetId", { classMember: "IModelDb.changeset.id" }],
  ["SnapshotDb.filePath", { classMember: "SnapshotDb.pathName" }],
  ["StandaloneDb.filePath", { classMember: "StandaloneDb.pathName" }],
  ["TxnChangedEntities.inserted", { classMember: "TxnChangedEntities.inserts" }],
  ["TxnChangedEntities.deleted", { classMember: "TxnChangedEntities.deletes" }],
  ["TxnChangedEntities.updated", { classMember: "TxnChangedEntities.updates" }],  

]);

const renamedFunctions = new Map<string, ClassMember>([
  // core-common
  ["IModelVersion.fromJson", { classMember: "IModelVersion.fromJSON", isStatic: true }],
  // core-backend
  ["IModelDb.clearSqliteStatementCache", { classMember: "IModelDb.clearCaches" }],
  ["IModelDb.clearStatementCache", { classMember: "IModelDb.clearCaches" }],
]);

interface ParserState {
  services?: ParserServices;
  options?: TSESTreeOptions;
}

const parserState: ParserState = {};

function parseWithServices(j, file: FileInfo, projectPath) {
  // Add custom AST node definition for TSClassImplements
  const { def } = Type;
  def("TSInterfaceHeritage")
    .bases("Node");

  def("TSClassImplements")
    .bases("Node");
  
  finalize();

  parserState.options = { 
    filePath: file.path, 
    tsconfigRootDir: process.cwd(), 
    project: projectPath, 
    preserveNodeMaps: true 
  };
  return {
    ast: j(file.source),
    services: parserState.services
  };
}

export default function transformer(file: FileInfo, api: API, options?: Options) {
  if (!options?.tsConfigPath)
    throw new Error("Please specify path to tsconfig.json with --tsConfigPath=\'tsconfig.json\'");

  const j = api.jscodeshift;
  const { ast, services } = parseWithServices(j, file, options?.tsConfigPath);
  
  const callExpressions = ast.find(j.CallExpression);

  // Replace all instances of Code.getValue() with Code.value
  callExpressions.filter((path: ASTPath<CallExpression>) => {
      const expression = path.value.callee as MemberExpression;
      const object = expression?.object as Identifier;
      const property = expression?.property as Identifier;
      if (!object || !property)
        return false;
    
      const objectType = getDeclaredTypeName(object, services);
      return objectType === "Code" && property.name === "getValue";
    })
    .replaceWith((path: ASTPath<CallExpression>) => {
      const name = ((path.value.callee as MemberExpression).object as Identifier).name;
      return j.memberExpression(
        j.identifier(name),
        j.identifier("value")
      );
    });

  // Rename class functions
  callExpressions.filter((path: ASTPath<CallExpression>) => {
    const expression = path.value.callee as MemberExpression;
    const object = expression?.object as Identifier;
    const property = expression?.property as Identifier;
    if (!object || !property)
      return false;
  
    const objectType = getDeclaredTypeName(object, services);
    return renamedFunctions.has(`${objectType}.${property.name}`);
  })
  .replaceWith((path: ASTPath<CallExpression>) => {
    const expression = path.value.callee as MemberExpression;
    const object = expression.object as Identifier;
    const property = expression.property as Identifier;
    const objectType = getDeclaredTypeName(object, services);
    const newFunction = renamedFunctions.get(`${objectType}.${property.name}`);
    const objectName = newFunction.isStatic ? newFunction.classMember.split('.')[0] : object.name;
    path.value.callee = j.memberExpression(
      j.identifier(objectName),
      j.identifier(newFunction.classMember.split('.')[1])
    );
    return path.value;
  });

  // Rename class properties
  const memberExpressions = ast.find(j.MemberExpression);
  memberExpressions.filter((path: ASTPath<MemberExpression>) => {
    const object = path.value.object as Identifier;
    const property = path.value.property as Identifier;
    if (!object || !property)
      return false;

    const objectType = getDeclaredTypeName(object, services);
    return renamedProperties.has(`${objectType}.${property.name}`);
  })
  .replaceWith((path: ASTPath<MemberExpression>) => {
    const object = path.value.object as Identifier;
    const property = path.value.property as Identifier;
    const objectType = getDeclaredTypeName(object, services);
    const newProperty = renamedProperties.get(`${objectType}.${property.name}`);
    const parsedMember = newProperty.classMember.split('.');
    
    const objectName = newProperty.isStatic ? parsedMember[0] : object.name;
    const propertyName = parsedMember.slice(1).join('.');
    
    return j.memberExpression(
      j.identifier(objectName),
      j.identifier(propertyName)
    );
  });

  // Rename classes
  const identifiers = ast.find(j.Identifier)
  identifiers.filter((path: ASTPath<Identifier>) => {
    return renamedClasses.has(path.value.name)
  })
  .replaceWith((path: ASTPath<Identifier>) => {
    return j.identifier(renamedClasses.get(path.value.name));
  });

  // Rename imports
  // ast.find(ImportDeclaration)
  //   .filter((path: ASTPath<ImportDeclaration>) => {
  //     return renamedClasses.has((path.value.source as StringLiteral).value);
  //   })
  //   .replaceWith((path: ASTPath<ImportDeclaration>) => {
  //     const packageRenames = renamedClasses.get((path.value.source as StringLiteral).value);
  //     const newImportSpecifiers: ImportSpecifier[] = [];
  //     (path.value.specifiers as ImportSpecifier[]).forEach((specifier: ImportSpecifier) => {
  //       if (packageRenames.has(specifier.imported.name))
  //         newImportSpecifiers.push(j.importSpecifier(j.identifier(packageRenames.get(specifier.imported.name))))
  //       else
  //         newImportSpecifiers.push(specifier);
  //     });
  //     path.value.specifiers = newImportSpecifiers;
  //     return path.node;
  //   });

  return ast.toSource();
}

export const parser = { 
  parse(source): AST<any> {
    if (parserState.options !== undefined) {
      const options = parserState.options;
      delete parserState.options;
      const { ast, services } = parseAndGenerateServices(source, {
        ...options,
        loc: true,
        range: true,
        tokens: true,
        errorOnTypeScriptSyntacticAndSemanticIssues: true,
      });
      parserState.services = services;
      return ast;
    }
    return parse(source);
  }
};