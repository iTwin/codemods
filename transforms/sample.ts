import { AST, parse, parseAndGenerateServices } from '@typescript-eslint/typescript-estree';
import { API, ASTPath, FileInfo, StringLiteral, ImportDeclaration, TSTypeAnnotation, Identifier } from 'jscodeshift';

export default function transform({ source, path }, { j }, { tsConfigPath }) {
  const { ast, services: { program, esTreeNodeToTSNodeMap } } = parseWithServices(j, source, path, tsConfigPath);

  const typeChecker = program.getTypeChecker();
  const esTreeNodeToTSNode = ({ original }) => esTreeNodeToTSNodeMap.get(original);

  function getReturnTypeFromString(typeString: string) {
    let ret;
    j(`function foo(): ${typeString} { }`)
      .find(j.FunctionDeclaration)
      .some(({ value: { returnType } }) => ret = returnType);
    return ret;
  }

  function getReturnType(node) {
    return getReturnTypeFromString(
      typeChecker.typeToString(
          typeChecker.getReturnTypeOfSignature(
            typeChecker.getSignatureFromDeclaration(node)
          )
        )
    );
  }

  ast
    .find(j.FunctionDeclaration)
    .forEach(({ value }) => {
      if (value.returnType === null)
        value.returnType = getReturnType(esTreeNodeToTSNode(value));
    });
  ast
    .find(j.MethodDefinition, { kind: 'method' })
    .forEach(({ value }) => {
      if (value.value.returnType === null)
        value.value.returnType = getReturnType(esTreeNodeToTSNode(value));
    });
  return ast.toSource();
}

const parserState = {};

function parseWithServices(j, source, path, projectPath) {
  parserState.options = { filePath: path, project: projectPath };
  return {
    ast: j(source),
    services: parserState.services
  };
}

export const parser = {
  parse(source): AST<any> {
    if (parserState.options !== undefined) {
      const options = parserState.options;
      delete parserState.options;
      const { ast, services } = parseAndGenerateServices(source, options);
      parserState.services = services;
      return ast;
    }
    return parse(source);
  }
};