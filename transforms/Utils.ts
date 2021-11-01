import { ParserServices } from "@typescript-eslint/typescript-estree";
import { Identifier, TSTypeAnnotation, TSTypeReference, VariableDeclarator } from "jscodeshift";

export function getTypeNameFromTypeAnnotation(typeAnnotation: TSTypeAnnotation): string {
  const typeRef = typeAnnotation?.typeAnnotation as TSTypeReference;
  if (!typeRef)
    return "";
  
  const typeIdentifier = typeRef.typeName as Identifier;
  if (!typeIdentifier)
    return "";
  
  return typeIdentifier.name;
}

export function getDeclaredTypeName(node: Identifier, services: ParserServices): string {
  if (node.typeAnnotation)
    return getTypeNameFromTypeAnnotation(node.typeAnnotation as TSTypeAnnotation);

  const { program, esTreeNodeToTSNodeMap } = services;
  const checker = program.getTypeChecker();
  const esTreeNodeToTSNode = (esNode) => esTreeNodeToTSNodeMap.get(esNode);
  
  const tsNode = esTreeNodeToTSNode((node as any).original!);
  const type = checker.getTypeAtLocation(tsNode);

  return type?.symbol?.escapedName.toString() || "";
}

