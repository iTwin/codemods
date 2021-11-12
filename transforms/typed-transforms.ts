import { API, ASTPath, FileInfo, StringLiteral, ImportDeclaration, Options, Identifier, MemberExpression, CallExpression, ImportSpecifier } from "jscodeshift";
import { AST, parse, parseAndGenerateServices, TSESTreeOptions } from "@typescript-eslint/typescript-estree";
import { ParserServices } from "@typescript-eslint/typescript-estree";
import { getDeclaredTypeName, ImportSpecifierKind, sortImports } from "./Utils";
import { Type, finalize } from "ast-types";

const changedImports = new Map<string, string>([
  // core-common
  ["@bentley/imodeljs-common.AnalysisStyleScalar", "@bentley/imodeljs-common.AnalysisStyleThematic"],
  ["@bentley/imodeljs-common.AnalysisStyleScalarProps", "@bentley/imodeljs-common.AnalysisStyleThematicProps"],
  
  // core-backend
  ["@bentley/imodeljs-backend.AutoPush", ""],
  ["@bentley/imodeljs-backend.BriefcaseIdValue", "@bentley/imodeljs-common.BriefcaseIdValue"],
  ["@bentley/imodeljs-backend.DocumentCarrier", ""],
  ["@bentley/imodeljs-backend.InformationCarrierElement", ""],
  ["@bentley/imodeljs-backend.Platform", "@bentley/bentleyjs-core.ProcessDetector"],
  ["@bentley/imodeljs-backend.TxnAction", "@bentley/imodeljs-common.TxnAction"],

  // core-frontend
  ["@bentley/imodeljs-frontend.AppearanceOverrideProps", "@bentley/imodeljs-common.AppearanceOverrideProps"],
  ["@bentley/imodeljs-frontend.AsyncMethodsOf", "@bentley/bentleyjs-core.AsyncMethodsOf"],
  ["@bentley/imodeljs-frontend.AsyncFunction", "@bentley/bentleyjs-core.AsyncFunction"],
  ["@bentley/imodeljs-frontend.EmphasizeElementsProps", "@bentley/imodeljs-common.EmphasizeElementsProps"],
  ["@bentley/imodeljs-frontend.PromiseReturnType", "@bentley/bentleyjs-core.PromiseReturnType"],
  ["@bentley/imodeljs-frontend.FeatureOverrideType", "@bentley/imodeljs-common.FeatureOverrideType"],
  ["@bentley/imodeljs-frontend.UnitSystemKey", "@bentley/imodeljs-quantity.UnitSystemKey"],
  ["@bentley/imodeljs-frontend.RemoteBriefcaseConnection", "@bentley/imodeljs-frontend.CheckpointConnection"],

  // core-react
  ["@bentley/ui-core.NumericInput", "@bentley/ui-core.NumberInput"]
]);

// If member ends in () it is a function
// If class is surrounded with [], it is describing the rename of a static member
const changedMembers = new Map<string, string>([
  // core-common
  ["AnalysisStyle.scalar", "AnalysisStyle.thematic" ],
  ["[BriefcaseIdValue].Standalone", "[BriefcaseIdValue].Unassigned"],
  ["[BriefcaseIdValue].DeprecatedStandalone", "[BriefcaseIdValue].Unassigned"],
  ["Code.getValue()", "Code.value"], 
  ["CodeSpec.specScopeType", "CodeSpec.scopeType" ],
  ["DisplayStyleSettings.excludedElements", "DisplayStyleSettings.excludedElementIds" ],
  ["DisplayStyleOverridesOptions.includeProjectSpecific", "DisplayStyleOverridesOptions.includeITwinSpecific" ],
  ["[IModelVersion].fromJson()", "[IModelVersion].fromJSON()"],

  // core-backend
  ["IModelHostConfiguration.briefcaseCacheDir", "IModelHostConfiguration.cacheDir" ],
  ["IModelDb.clearSqliteStatementCache()", "IModelDb.clearCaches()" ],
  ["IModelDb.clearStatementCache()", "IModelDb.clearCaches()" ],
  ["IModelDb.changeSetId", "IModelDb.changeset.id" ],
  ["[IModelHost].iModelClient", "[IModelHubBackend].iModelClient" ],
  ["[Platform].isDesktop", "[ProcessDetector].isElectronAppBackend"],
  ["[Platform].isElectron", "[ProcessDetector].isElectronAppBackend"],
  ["[Platform].isMobile", "[ProcessDetector].isMobileAppBackend"],
  ["[Platform].isNodeJs", "[ProcessDetector].isNodeProcess"],
  ["SnapshotDb.filePath", "SnapshotDb.pathName" ],
  ["StandaloneDb.filePath", "StandaloneDb.pathName" ],
  ["TxnChangedEntities.inserted", "TxnChangedEntities.inserts" ],
  ["TxnChangedEntities.deleted", "TxnChangedEntities.deletes" ],
  ["TxnChangedEntities.updated", "TxnChangedEntities.updates" ],  

  // core-frontend
  ["CheckpointConnection.open()", "CheckpointConnection.openRemote()"],
  ["DecorateContext.screenViewport", "DecorateContext.viewport"],
  ["[IModelApp].iModelClient", "[IModelHubFrontend].iModelClient"],
  ["Viewport.featureOverrideProvider", "Viewport.featureOverrideProviders"],
  ["Viewport.setRedrawPending()", "Viewport.requestRedraw()"],

  // core-geometry
  ["BSplineCurve3dBase.createThroughPoints()", "BSplineCurve3dBase.createFromInterpolationCurve3dOptions()"],
  ["TransitionSpiralProps.curveLength", "TransitionSpiralProps.length"],
  ["TransitionSpiralProps.fractionInterval", "TransitionSpiralProps.activeFractionInterval"],
  ["TransitionSpiralProps.intervalFractions", "TransitionSpiralProps.activeFractionInterval"],
  ["InterpolationCurve3dOptions.isChordLenTangent", "InterpolationCurve3dOptions.isChordLenTangents"],

  // core-react
  ["LoadingPromptProps.isDeterministic", "LoadingPromptProps.isDeterminate"],
  ["TabsProps.onClickLabel()", "TabsProps.onActivateTab()"]
]);


interface ParserState {
  services?: ParserServices;
  options?: TSESTreeOptions;
}

const parserState: ParserState = {};

function parseWithServices(j, file: FileInfo, projectPath) {
  // Add custom AST node definitions
  const { def } = Type;
  def("TSInterfaceHeritage")
    .bases("Node");
  def("TSClassImplements")
    .bases("Node"); 
  finalize();

  parserState.options = { 
    filePath: file.path, 
    tsconfigRootDir: process.cwd(), 
    project: projectPath
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
  
  // Transform imports
  const changedClasses = new Map<string, string>();
  const newImports = new Map<string, ImportSpecifier[]>();

  // TODO: Ensure no duplicate imports
  // Update import renames within same package, build list of class renames, and imports to update
  ast.find(j.ImportDeclaration)
    .replaceWith((path: ASTPath<ImportDeclaration>) => {
      const packageName = (path.value.source as StringLiteral).value;
      const newSpecifiers: ImportSpecifierKind[] = [];
      for (const specifier of path.value.specifiers) {
        if (specifier.type === "ImportSpecifier") {
          const key = `${packageName}.${specifier.imported.name}`;
          if (!changedImports.has(key)) {
            newSpecifiers.push(specifier);
          } else {
            const [newPackageName, newImport] = changedImports.get(key).split('.');
            if (newPackageName) {
              if (newImport !== specifier.imported.name) {
                // Class was renamed, add it to changedClasses
                changedClasses.set(specifier.imported.name, newImport)
              }

              const newSpecifier = j.importSpecifier(j.identifier(newImport));
              if (newPackageName === packageName) {
                // Import renamed within same package
                if (!newSpecifiers.some(spec => { return spec.name === newSpecifier.name; })) {
                  newSpecifiers.push(newSpecifier);
                }
              } else {
                if (newImports.has(newPackageName))
                  newImports.get(newPackageName).push(newSpecifier);
                else
                  newImports.set(newPackageName, [newSpecifier]);
              }
            }
          }
        } else {
          // Import is either default or namespace import
          newSpecifiers.push(specifier);
        }
      }

      return j.importDeclaration(sortImports(newSpecifiers), j.stringLiteral(packageName));
    });

  // Update existing imports with classes moved between packages
  ast.find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      return newImports.has((path.value.source as StringLiteral).value);
    })
    .replaceWith((path: ASTPath<ImportDeclaration>) => {
      const packageName = (path.value.source as StringLiteral).value;
      const newSpecifiers = path.value.specifiers;
      for (const newImport of newImports.get(packageName)) {
        if (!newSpecifiers.some(spec => { return spec.name === newImport.name; }))
          newSpecifiers.push(newImport);
      }
      newImports.delete(packageName);

      return j.importDeclaration(sortImports(newSpecifiers), j.stringLiteral(packageName));
    })

  // Add new imports for classes moved between packages
  for (const packageName of newImports.keys()) {
    const specifiers = newImports.get(packageName);
    const newImport = j.importDeclaration(sortImports(specifiers), j.stringLiteral(packageName));
    const importDeclarations = ast.find(j.ImportDeclaration);
    // Insert after last import
    j(importDeclarations.at(importDeclarations.length - 1).get()).insertAfter(newImport);
  }

  // Delete empty imports
  // ast.find(j.ImportDeclaration)
  //   .filter((path: ASTPath<ImportDeclaration>) => {
  //     return path.value.specifiers.length === 0;
  //   })
  //   .remove();

  // Rename class functions
  ast.find(j.CallExpression)
    .filter((path: ASTPath<CallExpression>) => {
      if (path.value.callee.type !== "MemberExpression")
        return false;

      const expression = path.value.callee as MemberExpression;
      if (expression.object.type === "ThisExpression")
        return false;

      if (expression.object.type !== "Identifier" || expression.property.type !== "Identifier")
        return false;
      const object = expression.object as Identifier;
      const property = expression.property as Identifier;
    
      const isStatic = object.name?.charAt(0) === object.name?.charAt(0).toUpperCase();
      const objectType = getDeclaredTypeName(object, services);
      const objectName = isStatic ? `[${objectType}]` : objectType;

      return changedMembers.has(`${objectName}.${property.name}()`);
    })
    .replaceWith((path: ASTPath<CallExpression>) => {
      const expression = path.value.callee as MemberExpression;
      const object = expression.object as Identifier;
      const property = expression.property as Identifier;

      const isStatic = object.name.charAt(0) === object.name.charAt(0).toUpperCase();
      const objectType = getDeclaredTypeName(object, services);
      const objectName = isStatic ? `[${objectType}]` : objectType;
      const newMemberParsed = changedMembers.get(`${objectName}.${property.name}()`).split('.');
      const isNewMemberStatic = newMemberParsed[0].charAt(0) === "[";
      if (isStatic !== isNewMemberStatic)
        throw new Error("Replacing static member with non static member and the reverse is not yet supported")

      // Strip [] from static object name
      const newObjectName = isNewMemberStatic ? newMemberParsed[0].slice(1, -1) : object.name;
      const newMemberName = newMemberParsed.slice(1).join('.');
      const isNewMemberFunction = newMemberName.endsWith("()");

      if (isNewMemberFunction) {
        return j.callExpression(
          j.memberExpression(
            j.identifier(newObjectName),
            j.identifier(newMemberName.slice(0, -2))
          ), 
          path.value.arguments
        );
      } else {
        return j.memberExpression(
          j.identifier(newObjectName),
          j.identifier(newMemberName)
        )
      }
    });

  // Rename class properties
  ast.find(j.MemberExpression)
    .filter((path: ASTPath<MemberExpression>) => {
      if (path.value.object.type === "ThisExpression")
        return false;

      if (path.value.object.type !== "Identifier" || path.value.property.type !== "Identifier")
        return false;
      const object = path.value.object as Identifier;
      const property = path.value.property as Identifier;

      const isStatic = object.name.charAt(0) === object.name.charAt(0).toUpperCase();
      const objectType = getDeclaredTypeName(object, services);
      const objectName = isStatic ? `[${objectType}]` : objectType;
  
      return changedMembers.has(`${objectName}.${property.name}`);
      })
    .replaceWith((path: ASTPath<MemberExpression>) => {
      const object = path.value.object as Identifier;
      const property = path.value.property as Identifier;

      const isStatic = object.name.charAt(0) === object.name.charAt(0).toUpperCase();
      const objectType = getDeclaredTypeName(object, services);
      const objectName = isStatic ? `[${objectType}]` : objectType;
      const newMemberParsed = changedMembers.get(`${objectName}.${property.name}`).split('.');
      const isNewMemberStatic = newMemberParsed[0].charAt(0) === "[";
      if (isStatic !== isNewMemberStatic)
        throw new Error("Replacing static member with non static member and the reverse is not yet supported")

      // Strip [] from static object name
      const newObjectName = isNewMemberStatic ? newMemberParsed[0].slice(1, -1) : object.name;
      const newMemberName = newMemberParsed.slice(1).join('.');
      const isNewMemberFunction = newMemberName.endsWith("()");

      if (isNewMemberFunction) {
        return j.callExpression(
          j.memberExpression(
            j.identifier(newObjectName),
            j.identifier(newMemberName.slice(0, -2))
          ),
          [ /* Leave arguments param blank for now */ ]
        );
      } else {
        return j.memberExpression(
          j.identifier(newObjectName),
          j.identifier(newMemberName)
        );
      }
    });

  // Rename classes
  ast.find(j.Identifier)
    .filter((path: ASTPath<Identifier>) => {
      return changedClasses.has(path.value.name)
    })
    .replaceWith((path: ASTPath<Identifier>) => {
      return j.identifier(changedClasses.get(path.value.name));
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

  // Arbitrarily high value to prevent unintended line wrapping
  return ast.toSource({ wrapColumn: 1024 });
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
      });
      parserState.services = services;
      return ast;
    }
    return parse(source);
  }
};