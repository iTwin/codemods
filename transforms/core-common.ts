import { API, ASTPath, FileInfo, StringLiteral, ImportDeclaration, TSTypeAnnotation, Options } from "jscodeshift";
import * as typescriptEstree from "@typescript-eslint/typescript-estree";
import { TypeChecker } from "typescript";
import { Parser } from "./Parser";

export default function transformer(file: FileInfo, api: API, options: Options) {
  if (!options.tsConfigPath)
    throw new Error("Please specify path to tsconfig.json with --tsConfigPath=\'tsconfig.json\'");

  // const tsAst = Parser.Parse(file.source);
  const j = api.jscodeshift;
  const { ast, services: { program, esTreeNodeToTSNodeMap } } = Parser.ParseWithServices(j, file, options.tsConfigPath);
  const typeChecker: TypeChecker = program.getTypeChecker();
  const esTreeNodeToTSNode = ({ esNode }) => esTreeNodeToTSNodeMap.get(esNode);
  
  ast.find(j.Identifier)
    .forEach(( { value } ) => {
      const esNode = value;
      const val = typeChecker.getTypeAtLocation(esTreeNodeToTSNodeMap[0]);
      const tsNode = esTreeNodeToTSNode({esNode});
      // const type = typeChecker.getSignatureFromDeclaration(esTreeNodeToTSNode(esNode));
      tsNode;
    });
  
  return ast.toSource();
}

// module.exports.parser = {
//   parse: Parser.Parse
// }
// // export const parser = { Parser.Parse };
