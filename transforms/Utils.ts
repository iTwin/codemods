import { resolve } from "path";
import { ParserServices } from "@typescript-eslint/typescript-estree";
import { Identifier, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, TSTypeAnnotation, TSTypeReference } from "jscodeshift";

export type ImportSpecifierKind = ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier;

export class ImportSet extends Set<ImportSpecifierKind> {
  add(other: ImportSpecifierKind): this {

    for (const value of this.values()) {
      if (value.type === other.type) {
        // Multiple namespace or default specifiers are not possible
        if ((value as ImportSpecifier).imported.name === (other as ImportSpecifier).imported.name)
          return this;
      }
    }

    super.add(other);
    return this;
  }
}

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

// Ensure default specifiers are before import specifiers, then sort alphabetically
// Namespace specifiers are always the only import so sorting is not needed
export function sortImports(imports: ImportSpecifierKind[]): ImportSpecifierKind[] {
  return imports.sort((a, b) => {
    if (a.type !== b.type) {
      if (a.type === "ImportDefaultSpecifier")
        return 1;
      if (b.type === "ImportDefaultSpecifier")
        return -1;
    }
    a = a as ImportSpecifier;
    b = b as ImportSpecifier;
    if (a.imported.name.toLowerCase() > b.imported.name.toLowerCase())
      return 1;
    if (a.imported.name.toLowerCase() < b.imported.name.toLowerCase())
      return -1;
    return 0;
  });
}

export interface Definitions {
  changedImports: Map<string, string>;
}

export function parseDefinitions(path: string): Definitions {
  const resolvedPath = resolve(process.cwd(), path);
  const definitionsJson = require(resolvedPath);
  return {
    changedImports: new Map(definitionsJson.changedImports),
  };
}
