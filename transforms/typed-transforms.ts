import { API, ASTPath, FileInfo, StringLiteral, ImportDeclaration, Options, Identifier, MemberExpression, CallExpression } from "jscodeshift";
import { AST, parse, parseAndGenerateServices, TSESTreeOptions } from "@typescript-eslint/typescript-estree";
import { ParserServices } from "@typescript-eslint/typescript-estree";
import { getDeclaredTypeName, ImportSet, parseDefinitions, sortImports } from "./Utils";
import { Type, finalize } from "ast-types";

const defaultChangedImports = new Map<string, string>([
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
  ["@bentley/imodeljs-frontend.Environment", "@bentley/imodeljs-common.Environment"],
  ["@bentley/imodeljs-frontend.findAvailableRealityModels", "@bentley/imodeljs-frontend.queryRealityData"],
  ["@bentley/imodeljs-frontend.findAvailableUnattachedRealityModels", "@bentley/imodeljs-frontend.queryRealityData"],

  // core-react
  ["@bentley/ui-core.NumericInput", "@bentley/ui-core.NumberInput"],

  // ui-components
  ["@bentley/ui-components.StandardEditorNames", "@bentley/ui-abstract.StandardEditorNames"],
  ["@bentley/ui-components.StandardTypeConverterTypeNames", "@bentley/ui-abstract.StandardTypeNames"],
  ["@bentley/ui-components.StandardTypeNames", "@bentley/ui-abstract.StandardTypeNames"],
  ["@bentley/ui-components.Timeline", "@bentley/ui-components.TimelineComponent"],
  ["@bentley/ui-components.TreeRendererContext", ""],
  ["@bentley/ui-components.TreeRendererContextProvider", ""],
  ["@bentley/ui-components.TreeRendererContextConsumer", ""],
  ["@bentley/ui-components.useTreeRendererContext", ""],
  ["@bentley/ui-components.ExtendedTreeNodeRendererProps", "@bentley/ui-components.TreeNodeRendererProps"],
  ["@bentley/ui-components.SignIn", ""],
  ["@bentley/ui-components.DEPRECATED_Tree", "@bentley/ui-components.ControlledTree"],
  ["@bentley/ui-components.BeInspireTree", "@bentley/ui-components.ControlledTree"],

  // ui-framework
  ["@bentley/ui-framework.COLOR_THEME_DEFAULT", "@bentley/ui-framework.SYSTEM_PREFERRED_COLOR_THEME"],
  ["@bentley/ui-framework.FunctionKey", "@bentley/ui-abstract.FunctionKey"],
  ["@bentley/ui-framework.IModelAppUiSettings", "@bentley/ui-framework.UserSettingsStorage"],
  ["@bentley/ui-framework.ContentGroupManager", ""],
  ["@bentley/ui-framework.ReactMessage", "@bentley/ui-core.ReactMessage"],
  ["@bentley/ui-framework.SavedView", "@bentley/ui-framework.ViewStateHelper"],
  ["@bentley/ui-framework.SavedViewProps", "@bentley/ui-framework.ViewStateHelperProps"],
  ["@bentley/ui-framework.SavedViewLayout", "@bentley/ui-framework.StageContentLayout"],
  ["@bentley/ui-framework.SavedViewLayoutProps", "@bentley/ui-framework.StageContentLayoutProps"],
  ["@bentley/ui-framework.SpecialKey", "@bentley/ui-abstract.SpecialKey"],
  ["@bentley/ui-framework.WidgetState", "@bentley/ui-abstract.WidgetState"],
  ["@bentley/ui-framework.UserProfileBackstageItem", ""],
  ["@bentley/ui-framework.SignIn", ""],
  ["@bentley/ui-framework.SignOutModalFrontstage", ""],
  ["@bentley/ui-framework.IModelConnectedCategoryTree", ""],
  ["@bentley/ui-framework.IModelConnectedModelsTree", ""],
  ["@bentley/ui-framework.IModelConnectedSpatialContainmentTree", ""],
  ["@bentley/ui-framework.CategoryTreeWithSearchBox", ""],
  ["@bentley/ui-framework.ContentLayoutProps", "@bentley/ui-abstract.ContentLayoutProps"],

  // presentation common
  ["@bentley/presentation-common.CompressedDescriptorJSON", "@bentley/presentation-common.DescriptorJSON"],
  ["@bentley/presentation-common.ExtendedContentRequestOptions", "@bentley/presentation-common.ContentRequestOptions"],
  ["@bentley/presentation-common.ExtendedContentRpcRequestOptions", "@bentley/presentation-common.ContentRpcRequestOptions"],
  ["@bentley/presentation-common.ExtendedHierarchyRequestOptions", "@bentley/presentation-common.HierarchyRequestOptions"],
  ["@bentley/presentation-common.ExtendedHierarchyRpcRequestOptions", "@bentley/presentation-common.HierarchyRpcRequestOptions"],
  ["@bentley/presentation-common.HierarchyCompareRpcOptions", ""],
  ["@bentley/presentation-common.LabelRequestOptions", "@bentley/presentation-common.DisplayLabelRequestOptions"],
  ["@bentley/presentation-common.LabelRpcRequestOptions", "@bentley/presentation-common.DisplayLabelRpcRequestOptions"],
  ["@bentley/presentation-common.PresentationDataCompareOptions", ""],
  ["@bentley/presentation-common.RequestPriority", ""],

  // presentation backend
  ["@bentley/presentation-backend.DuplicateRulesetHandlingStrategy", "@bentley/presentation-backend.RulesetInsertOptions"],

  // presentation components
  ["@bentley/presentation-components.ControlledTreeFilteringProps", "@bentley/presentation-components.ControlledPresentationTreeFilteringProps"],
  ["@bentley/presentation-components.PropertyGridWithUnifiedSelectionProps", "@bentley/presentation-components.PropertyDataProviderWithUnifiedSelectionProps"],
  ["@bentley/presentation-components.TreeWithFilteringSupportProps", "@bentley/presentation-components.ControlledPresentationTreeFilteringProps"],
  ["@bentley/presentation-components.TreeWithUnifiedSelectionProps", "@bentley/presentation-components.UnifiedSelectionTreeEventHandlerParams"],


  // ecschema-metadata
  ["@bentley/ecschema-metadata.IDiagnostic", "@bentley/ecschema-editing.IDiagnostic"],
  ["@bentley/ecschema-metadata.BaseDiagnostic", "@bentley/ecschema-editing.BaseDiagnostic"],
  ["@bentley/ecschema-metadata.DiagnosticType", "@bentley/ecschema-editing.DiagnosticType"],
  ["@bentley/ecschema-metadata.DiagnosticCategory", "@bentley/ecschema-editing.DiagnosticCategory"],
  ["@bentley/ecschema-metadata.DiagnosticCodes", "@bentley/ecschema-editing.DiagnosticCodes"],
  ["@bentley/ecschema-metadata.Diagnostics", "@bentley/ecschema-editing.Diagnostics"],
  ["@bentley/ecschema-metadata.IDiagnosticReporter", "@bentley/ecschema-editing.IDiagnosticReporter"],
  ["@bentley/ecschema-metadata.SuppressionDiagnosticReporter", "@bentley/ecschema-editing.SuppressionDiagnosticReporter"],
  ["@bentley/ecschema-metadata.FormatDiagnosticReporter", "@bentley/ecschema-editing.FormatDiagnosticReporter"],
  ["@bentley/ecschema-metadata.LoggingDiagnosticReporter", "@bentley/ecschema-editing.LoggingDiagnosticReporter"],
  ["@bentley/ecschema-metadata.IRuleSet", "@bentley/ecschema-editing.IRuleSet"],
  ["@bentley/ecschema-metadata.ECRuleSet", "@bentley/ecschema-editing.ECRuleSet"],
  ["@bentley/ecschema-metadata.ISuppressionRule", "@bentley/ecschema-editing.ISuppressionRule"],
  ["@bentley/ecschema-metadata.BaseSuppressionRule", "@bentley/ecschema-editing.BaseSuppressionRule"],
  ["@bentley/ecschema-metadata.IRuleSuppressionMap", "@bentley/ecschema-editing.IRuleSuppressionMap"],
  ["@bentley/ecschema-metadata.BaseRuleSuppressionMap", "@bentley/ecschema-editing.BaseRuleSuppressionMap"],
  ["@bentley/ecschema-metadata.IRuleSuppressionSet", "@bentley/ecschema-editing.IRuleSuppressionSet"],
  ["@bentley/ecschema-metadata.SchemaCompareCodes", "@bentley/ecschema-editing.SchemaCompareCodes"],
  ["@bentley/ecschema-metadata.SchemaCompareDiagnostics", "@bentley/ecschema-editing.SchemaCompareDiagnostics"],
  ["@bentley/ecschema-metadata.SchemaValidater", "@bentley/ecschema-editing.SchemaValidater"],
  ["@bentley/ecschema-metadata.SchemaValidationVisitor", "@bentley/ecschema-editing.SchemaValidationVisitor"],
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
  ["InterpolationCurve3dOptions.isChordLenTangent", "InterpolationCurve3dOptions.isChordLenTangents"],

  // core-react
  ["LoadingPromptProps.isDeterministic", "LoadingPromptProps.isDeterminate"],
  ["TabsProps.onClickLabel()", "TabsProps.onActivateTab()"],

  // ui-components
  ["ControlledTreeProps.treeEvents", "ControlledTreeProps.eventsHandler"],

  // presentation common
  ["ContentInstancesOfSpecificClassesSpecification.arePolymorphic", "ContentInstancesOfSpecificClassesSpecification.handleInstancesPolymorphically"],
  ["Descriptor.toCompressedJSON()", "Descriptor.toJSON()"],
  ["DescriptorOverrides.hiddenFieldNames", "DescriptorOverrides.fieldsSelector"],
  ["DescriptorOverrides.sortDirection", "DescriptorOverrides.sorting.direction"],
  ["DescriptorOverrides.sortingFieldName", "DescriptorOverrides.sorting.field"],
  ["ECPropertyGroupingNodeKey.groupingValue", "ECPropertyGroupingNodeKey.groupingValues"],
  ["[Field].fromJSON()", "[Field].fromCompressedJSON()"],
  ["PresentationRpcInterface.getDisplayLabelDefinitions()", "PresentationRpcInterface.getPagedDisplayLabelDefinitions()"],
  ["PresentationRpcInterface.getDistinctValues()", "PresentationRpcInterface.getPagedDistinctValues()"],
  ["PresentationRpcInterface.getNodes()", "PresentationRpcInterface.getPagedNodes()"],
  ["PresentationRpcInterface.getNodesAndCount()", "PresentationRpcInterface.getPagedNodes()"],
  ["PropertiesFieldDescriptor.propertyClass", "PropertiesFieldDescriptor.properties.class"],
  ["PropertiesFieldDescriptor.propertyName", "PropertiesFieldDescriptor.properties.name"],
  ["Ruleset.supportedSchemas", "Ruleset.requiredSchemas"],
  ["SelectClassInfo.pathToPrimaryClass", "SelectClassInfo.pathFromInputToSelectClass"],
  ["SelectClassInfo.relatedInstanceClasses", "SelectClassInfo.relatedInstancePaths"],
  ["SelectClassInfoJSON.pathToPrimaryClass", "SelectClassInfoJSON.pathFromInputToSelectClass"],
  ["SelectClassInfoJSON.relatedInstanceClasses", "SelectClassInfoJSON.relatedInstancePaths"],

  // presentation backend
  ["PresentationManager.getDistinctValues()", "PresentationManager.getPagedDistinctValues()"],
  ["PresentationManagerProps.activeLocale", "PresentationManagerProps.defaultLocale"],
  ["PresentationManagerProps.activeUnitSystem", "PresentationManagerProps.defaultUnitSystem"],
  ["PresentationManagerProps.cacheConfig", "PresentationManagerProps.caching.hierarchies"],
  ["PresentationManagerProps.contentCacheSize", "PresentationManagerProps.caching.content.size"],
  ["PresentationManagerProps.taskAllocationsMap", "PresentationManagerProps.workerThreadsCount"],

  // presentation frontend
  ["[FavoritePropertiesScope].Project", "[FavoritePropertiesScope].ITwin"],

  // ecschema-metadata
  ["RelationshipConstraint.deserialize()", "RelationshipConstraint.fromJSON()"],
  ["RelationshipConstraint.deserializeSync()", "RelationshipConstraint.fromJSONSync()"],
  ["RelationshipConstraint.toJson()", "RelationshipConstraint.toJSON()"]
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

  let changedImports = defaultChangedImports;
  if (options.definitions) {
    ({ changedImports } = parseDefinitions(options.definitions));
  }

  // Transform imports
  const changedClasses = new Map<string, string>();
  const newImports = new Map<string, ImportSet>();

  // TODO: Ensure no duplicate imports
  // Update import renames within same package, build list of class renames, and imports to update
  ast.find(j.ImportDeclaration)
    .replaceWith((path: ASTPath<ImportDeclaration>) => {
      const packageName = (path.value.source as StringLiteral).value;
      const newSpecifiers = new ImportSet();
      for (const specifier of path.value.specifiers) {
        if (specifier.type === "ImportSpecifier") {
          const key = `${packageName}.${specifier.imported.name}`;
          if (!changedImports.has(key)) {
            newSpecifiers.add(specifier);
          } else {
            const [newPackageName, newImport] = changedImports.get(key).split('.');
            if (newPackageName) {
              // If class was renamed, add it to changedClasses
              if (newImport !== specifier.imported.name)
                changedClasses.set(specifier.imported.name, newImport)

              const newSpecifier = j.importSpecifier(j.identifier(newImport));
              if (newPackageName === packageName) {
                newSpecifiers.add(newSpecifier);
              } else {
                if (newImports.has(newPackageName))
                  newImports.get(newPackageName).add(newSpecifier);
                else
                  newImports.set(newPackageName, new ImportSet([newSpecifier]));
              }
            }
          }
        } else {
          // Import is either default or namespace import
          newSpecifiers.add(specifier);
        }
      }

      return j.importDeclaration(sortImports(Array.from(newSpecifiers)), j.stringLiteral(packageName));
    });

  // Update existing imports with classes moved between packages
  ast.find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      return newImports.has((path.value.source as StringLiteral).value);
    })
    .replaceWith((path: ASTPath<ImportDeclaration>) => {
      const packageName = (path.value.source as StringLiteral).value;
      const newSpecifiers = newImports.get(packageName);
      for (const specifier of path.value.specifiers)
        newSpecifiers.add(specifier);

      newImports.delete(packageName);
      return j.importDeclaration(sortImports(Array.from(newSpecifiers)), j.stringLiteral(packageName));
    })

  // Add new imports for classes moved between packages
  for (const packageName of newImports.keys()) {
    const newImportDeclaration = j.importDeclaration(sortImports(Array.from(newImports.get(packageName))), j.stringLiteral(packageName));
    const importDeclarations = ast.find(j.ImportDeclaration);
    // Insert after last import
    j(importDeclarations.at(importDeclarations.length - 1).get()).insertAfter(newImportDeclaration);
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
