# Transforms Checklist

## Package name changes [x]

A number of packages have been renamed to use the @itwin scope rather than the @bentley scope, and we have modified a few package names to move towards a more consistent naming pattern. The full list of changed packages are listed in the table below.

| Current                                | New                                  |Completed
|----------------------------------------|--------------------------------------|----------
| @bentley/imodeljs-backend              | @itwin/core-backend                  | [x]
| @bentley/imodeljs-common               | @itwin/core-common                   | [x]
| @bentley/imodeljs-frontend             | @itwin/core-frontend                 | [x]
| @bentley/geometry-core                 | @itwin/core-geometry                 | [x]
| @bentley/ecschema-metadata             | @itwin/ecschema-metadata             | [x]
| @bentley/ecschema-locaters             | @itwin/ecschema-locaters             | [x]
| @bentley/ecschema-editing              | @itwin/ecschema-editing              | [x]
| @bentley/bentleyjs-core                | @itwin/core-bentley                  | [x]
| @bentley/orbitgt-core                  | @itwin/core-orbitgt                  | [x]
| @bentley/frontend-devtools             | @itwin/frontend-devtools             | [x]
| @bentley/webgl-compatibility           | @itwin/webgl-compatibility           | [x]
| @bentley/imodeljs-transformer          | @itwin/core-transformer              | [x]
| @bentley/imodeljs-markup               | @itwin/core-markup                   | [x]
| @bentley/imodeljs-editor-common        | @itwin/editor-common                 | [x]
| @bentley/imodeljs-editor-backend       | @itwin/editor-backend                | [x]
| @bentley/imodeljs-editor-frontend      | @itwin/editor-frontend               | [x]
| @bentley/analytical-backend            | @itwin/analytical-backend            | [x]
| @bentley/linear-referencing-backend    | @itwin/linear-referencing-backend    | [x]
| @bentley/linear-referencing-common     | @itwin/linear-referencing-common     | [x]
| @bentley/physical-material-backend     | @itwin/physical-material-backend     | [x]
| @bentley/presentation-backend          | @itwin/presentation-backend          | [x]
| @bentley/presentation-common           | @itwin/presentation-common           | [x]
| @bentley/presentation-frontend         | @itwin/presentation-frontend         | [x]
| @bentley/presentation-components       | @itwin/presentation-components       | [x]
| @bentley/presentation-testing          | @itwin/presentation-testing          | [x]
| @bentley/ui-abstract                   | @itwin/appui-abstract                | [x]
| @bentley/ui-components                 | @itwin/components-react              | [x]
| @bentley/ui-core                       | @itwin/core-react                    | [x]
| @bentley/ui-imodel-components          | @itwin/imodel-components-react       | [x]
| @bentley/ui-ninezone                   | @itwin/appui-layout-react            | [x]
| @bentley/ui-framework                  | @itwin/appui-react                   | [x]
| @bentley/ecschema2ts                   | @itwin/ecschema2ts                   | [x]
| @bentley/webpack-tools-core            | @itwin/core-webpack-tools            | [x]
| @bentley/backend-webpack-tools         | @itwin/backend-webpack-tools         | [x]
| @bentley/build-tools                   | @itwin/build-tools                   | [x]
| @bentley/eslint-plugin                 | @itwin/eslint-plugin                 | [x]
| @bentley/imodeljs-quantity             | @itwin/core-quantity                 | [x]
| @bentley/imodeljs-i18n                 | @itwin/core-i18n                     | [x]
| @bentley/hypermodeling-frontend        | @itwin/hypermodeling-frontend        | [x]
| @bentley/electron-manager              | @itwin/core-electron                 | [x]
| @bentley/mobile-manager                | @itwin/core-mobile                   | [x]
| @bentley/express-server                | @itwin/express-server                | [x]
| @bentley/ecschema-rpcinterface-common  | @itwin/ecschema-rpcinterface-common  | [x]
| @bentley/ecschema-rpcinterface-impl    | @itwin/ecschema-rpcinterface-impl    | [x]
| @bentley/ecschema-rpcinterface-tests   | @itwin/ecschema-rpcinterface-tests   | [x]
| @bentley/certa                         | @itwin/certa                         | [x]
| @bentley/perf-tools                    | @itwin/perf-tools                    | [x]
| @bentley/oidc-signin-tool              | @itwin/oidc-signin-tool              | [x]
| @bentley/geonames-extension            | @itwin/geonames-extension            | [x]
| @bentley/map-layers                    | @itwin/map-layers                    | [x]
| @bentley/rpcinterface-full-stack-tests | @itwin/rpcinterface-full-stack-tests | [x]
| @bentley/imodelhub-client-tests        | @itwin/imodelhub-client-tests        | [x]
| @bentley/frontend-authorization-client | @itwin/browser-authorization        | [x]

## Removal of previously deprecated APIs

In this 3.0 major release, we have removed several APIs that were previously marked as deprecated in 2.x. Generally, the reason for the deprecation as well as the alternative suggestions can be found in the 2.x release notes. They are summarized here for quick reference.

### @itwin/core-backend

| Removed                                                      | Replacement                                    | Completed
| ------------------------------------------------------------ | ---------------------------------------------- | ----------
| `AutoPush`                                                   | _eliminated_                                   | [x]
| `BriefcaseDb.reinstateChanges`                               | `BriefcaseDb.pullChanges`                      | [ ]
| `BriefcaseDb.reverseChanges`                                 | `BriefcaseDb.pullChanges`                      | [ ]
| `BriefcaseIdValue`                                           | `BriefcaseIdValue` in @itwin/core-common       | [x]
| `BriefcaseManager.getCompatibilityFileName`                  | _eliminated_                                   | [ ]
| `BriefcaseManager.getCompatibilityPath`                      | _eliminated_                                   | [ ]
| `BriefcaseManager.isStandaloneBriefcaseId`                   | use `id === BriefcaseIdValue.Unassigned`       | [ ]
| `compatibilityDir` argument of `BriefcaseManager.initialize` | _eliminated_                                   | [ ]
| `DocumentCarrier`                                            | _eliminated_                                   | [x]
| `IModelDb.clearSqliteStatementCache`                         | `IModelDb.clearCaches`                         | [x]
| `IModelDb.clearStatementCache`                               | `IModelDb.clearCaches`                         | [x]
| `IModelHost.iModelClient`                                    | `IModelHubBackend.iModelClient`                | [x]
| `IModelHostConfiguration.briefcaseCacheDir`                  | `IModelHostConfiguration.cacheDir`             | [x]
| `InformationCarrierElement`                                  | _eliminated_                                   | [x]
| `Platform.isDesktop`                                         | `ProcessDetector.isElectronAppBackend`         | [x]
| `Platform.isElectron`                                        | `ProcessDetector.isElectronAppBackend`         | [x]
| `Platform.isMobile`                                          | `ProcessDetector.isMobileAppBackend`           | [x]
| `Platform.isNodeJs`                                          | `ProcessDetector.isNodeProcess`                | [x]
| `SnapshotDb.filePath`                                        | `SnapshotDb.pathName`                          | [x]
| `StandaloneDb.filePath`                                      | `StandaloneDb.pathName`                        | [x]
| `Texture.width, height, flags`                               | _eliminated_                                   | [ ]
| `TxnAction`                                                  | `TxnAction` in @itwin/core-common              | [x]
| `TxnChangedEntities.inserted, deleted, updated`              | `TxnChangedEntities.inserts, deletes, updates` | [x]

### @itwin/core-common

| Removed                                               | Replacement                                                    | Completed
| ----------------------------------------------------- | -------------------------------------------------------------- | ----------
| `AnalysisStyle.scalar`                                | `AnalysisStyle.thematic`                                       | [x]
| `AnalysisStyleScalar`                                 | `AnalysisStyleThematic`                                        | [x]
| `AnalysisStyleScalarProps`                            | `AnalysisStyleThematicProps`                                   | [x]
| `BriefcaseTypes.DeprecatedStandalone`                 | `BriefcaseTypes.Unassigned`                                    | [x]
| `BriefcaseTypes.Standalone`                           | `BriefcaseTypes.Unassigned`                                    | [x]
| `Code.getValue`                                       | `Code.value`                                                   | [x]
| `CodeSpec.specScopeType`                              | `CodeSpec.scopeType`                                           | [x]
| `DisplayStyleSettings.excludedElements`               | `DisplayStyleSettings.excludedElementIds`                      | [x]
| `DisplayStyleOverridesOptions.includeProjectSpecific` | `DisplayStyleOverridesOptions.includeITwinSpecific`            | [x]
| `IModel.changeSetId`                                  | `IModel.changeset.id`                                          | [x]
| `IModelVersion.evaluateChangeSet`                     | `IModelHost`/`IModelApp` `hubAccess.getChangesetIdFromVersion` | [ ]
| `IModelVersion.fromJson`                              | `IModelVersion.fromJSON`                                       | [x]
| `IModelVersion.getChangeSetFromNamedVersion`          | `IModelHost`/`IModelApp` `hubAccess.getChangesetIdFromVersion` | [ ]
| `IModelVersion.getLatestChangeSetId`                  | `IModelHost`/`IModelApp` `hubAccess.getChangesetIdFromVersion` | [ ]
| `IModelWriteRpcInterface`                             | Use IPC for writing to iModels                                 | [ ]
| `LatAndLong`                                          | _eliminated_                                                   | [ ]
| `LatLongAndHeight`                                    | [CartographicProps]($common)                                   | [ ]
| `TerrainSettings.locatable`                           | `BackgroundMapSettings.locatable`                              | [ ]
| `TerrainSettingsProps.nonLocatable`                   | `BackgroundMapProps.nonLocatable`                              | [ ]
| `ViewFlagOverrides` class                             | [ViewFlagOverrides]($common) type                              | [ ]
| `ViewFlagProps.edgeMask`                              | _eliminated_                                                   | [ ]
| `ViewFlagProps.hlMatColors`                           | _eliminated_                                                   | [ ]
| `ViewFlags.clone`                                     | [ViewFlags.copy]($common)                                      | [ ]
| `ViewFlags.edgeMask`                                  | _eliminated_                                                   | [ ]
| `ViewFlags.hLineMaterialColors`                       | _eliminated_                                                   | [ ]
| `ViewFlags.noCameraLights`                            | [ViewFlags.lighting]($common)                                  | [ ]
| `ViewFlags.noGeometryMap`                             | _eliminated_                                                   | [ ]
| `ViewFlags.noSolarLight`                              | [ViewFlags.lighting]($common)                                  | [ ]
| `ViewFlags.noSourceLights`                            | [ViewFlags.lighting]($common)                                  | [ ]

### @itwin/core-frontend

| Removed                                       | Replacement                                                        | Completed
| --------------------------------------------- | ------------------------------------------------------------------ | ----------
| `AppearanceOverrideProps`                     | [AppearanceOverrideProps]($common)                                 | [x]
| `AsyncMethodsOf`                              | [AsyncMethodsOf]($core-bentley)                                    | [x]
| `AsyncFunction`                               | [AsyncFunction]($core-bentley)                                     | [x]
| `EmphasizeElementsProps`                      | [EmphasizeElementsProps]($common)                                  | [x]
| `PromiseReturnType`                           | [PromiseReturnType]($core-bentley)                                 | [x]
| `CheckpointConnection.open`                   | `CheckpointConnection.openRemote`                                  | [x]
| `DecorateContext.screenViewport`              | `DecorateContext.viewport`                                         | [x]
| `FeatureOverrideType`                         | [FeatureOverrideType]($common)                                     | [x]
| `FeatureSymbology.Appearance`                 | [FeatureAppearance]($common)                                       | [ ]
| `FeatureSymbology.AppearanceProps`            | [FeatureAppearanceProps]($common)                                  | [ ]
| `findAvailableRealityModels`                  | `queryRealityData`                                                 | [ ]
| `findAvailableUnattachedRealityModels`        | `queryRealityData`                                                 | [ ]
| `IModelApp.iModelClient`                      | `IModelHubFrontend.iModelClient`                                   | [x]
| `IModelConnection.Models.loaded`              | use `for..of` to iterate and `getLoaded` to look up by Id          | [ ]
| `IModelConnection.Views.saveThumbnail`        | use IPC and `IModelDb.saveThumbnail`                               | [ ]
| `IOidcFrontendClient`                         | `FrontendAuthorizationClient`                                      | [ ]
| `isIOidcFrontendClient`                       | `FrontendAuthorizationClient`                                      | [ ]
| `OidcBrowserClient`                           | `BrowserAuthorizationClient`                                       | [ ]
| `OidcFrontendClientConfiguration`             | `BrowserAuthorizationClientConfiguration`                          | [ ]
| `QuantityFormatter.onActiveUnitSystemChanged` | [QuantityFormatter.onActiveFormattingUnitSystemChanged]($frontend) | [ ]
| `QuantityFormatter.useImperialFormats`        | [QuantityFormatter.setActiveUnitSystem]($frontend)                 | [ ]
| `RemoteBriefcaseConnection`                   | `CheckpointConnection`                                             | [x]
| `ScreenViewport.decorationDiv`                | `DecorateContext.addHtmlDecoration`                                | [ ]
| `UnitSystemKey`                               | Moved to `@bentley/imodeljs-quantity`                              | [x]
| `ViewManager.forEachViewport`                 | Use a `for..of` loop                                               | [ ]
| `ViewState.isCameraEnabled`                   | Use `view.is3d() && view.isCameraOn`                               | [ ]
| `ViewState3d.lookAtPerspectiveOrOrtho`        | `ViewState3d.LookAt`                                               | [ ]
| `ViewState3d.lookAtUsingLensAngle`            | `ViewState3d.lookAt`                                               | [ ]
| `Viewport.featureOverrideProvider`            | [Viewport.featureOverrideProviders]($frontend)                     | [x]
| `Viewport.setFlashed`                         | [Viewport.flashedId]($frontend)                                    | [ ]
| `Viewport.setRedrawPending`                   | [Viewport.requestRedraw]($frontend)                                | [x]
| `WebAppViewer`                                | *eliminated*                                                       | [ ]
| `Environment`                                 | [Environment]($common)                                             | [x]

### @itwin/core-geometry

| Removed                                         | Replacement                                                | Completed
| ----------------------------------------------- | ---------------------------------------------------------- | ----------
| `BSplineCurve3dBase.createThroughPoints`        | `BSplineCurve3dBase.createFromInterpolationCurve3dOptions` | [x]
| `TransitionSpiralProps.curveLength`             | `TransitionSpiralProps.length`                             | [ ]
| `TransitionSpiralProps.fractionInterval`        | `TransitionSpiralProps.activeFractionInterval`             | [ ]
| `TransitionSpiralProps.intervalFractions`       | `TransitionSpiralProps.activeFractionInterval`             | [ ]
| `InterpolationCurve3dOptions.isChordLenTangent` | `InterpolationCurve3dOptions.isChordLenTangents`           | [x]
| `Point3dArray.createRange`                      | `Range3d.createFromVariantData`                            | [ ]

### @bentley/backend-itwin-client

SAML support has officially been dropped as a supported workflow. All related APIs for SAML have been removed.

| Removed                             | Replacement                                                 | Completed
| ----------------------------------- | --------------------------------------------                | ----------
| `OidcDelegationClientConfiguration` | `DelegationAuthorizationClientConfiguration`                | [ ]
| `OidcDelegationClient`              | `DelegationAuthorizationClient`                             | [ ]
| `BackendAuthorizationClient`        | Moved to @iTwin/auth-clients as BrowserAuthorizationClient  | [ ]
| `AgentAuthorizationClient`          | Moved to @iTwin/auth-clients as SerivceAuthorizationClient  | [ ]
| `DelegationAuthorizationClient`     | *removed*                                                   | [ ]
| `IntrospectionClient`               | Moved to @iTwin/auth-clients                                | [ ]

### @itwin/appui-abstract

| Removed                       | Replacement                  | Completed
| ----------------------------- | ---------------------------- | ----------
| `ContentLayoutProps.priority` | *eliminated*                 | [ ]
| `UiItemsArbiter`              | *eliminated*                 | [ ]
| `UiAbstract.messagePresenter` | `UiAdmin.messagePresenter`   | [ ]

### @itwin/core-react

| Removed                              | Replacement                                                | Completed
| ------------------------------------ | ---------------------------------------------------------- | ----------
| `LoadingPromptProps.isDeterministic` | `LoadingPromptProps.isDeterminate` in @itwin/core-react | [x]
| `NumericInput` component             | `NumberInput` component in @itwin/core-react            | [x]
| `TabsProps.onClickLabel`             | `TabsProps.onActivateTab` in @itwin/core-react          | [x]

### @itwin/components-react

| Removed                                                    | Replacement                                                                                                                   | Completed
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------
| `hasFlag`                                                  | `hasSelectionModeFlag` in @itwin/components-react                                                                             | [ ]
| `StandardEditorNames`                                      | `StandardEditorNames` in @itwin/appui-abstract                                                                                | [x]
| `StandardTypeConverterTypeNames`                           | `StandardTypeNames` in @itwin/appui-abstract                                                                                  | [x]
| `StandardTypeNames`                                        | `StandardTypeNames` in @itwin/appui-abstract                                                                                  | [x]
| `Timeline`                                                 | `TimelineComponent` in @itwin/components-react                                                                                | [x]
| `ControlledTreeProps.treeEvents`                           | `ControlledTreeProps.eventsHandler`                                                                                           | [x]
| `ControlledTreeProps.visibleNodes`                         | `ControlledTreeProps.model`                                                                                                   | [ ]
| `MutableTreeModel.computeVisibleNodes`                     | `computeVisibleNodes` in @itwin/components-react                                                                              | [ ]
| `TreeModelSource.getVisibleNodes`                          | memoized result of `computeVisibleNodes`                                                                                      | [ ]
| `useVisibleTreeNodes`                                      | `useTreeModel` and `computeVisibleNodes`                                                                                      | [ ]
| `TreeRendererContext`                                      | _eliminated_                                                                                                                  | [x]
| `TreeRendererContextProvider`                              | _eliminated_                                                                                                                  | [x]
| `TreeRendererContextConsumer`                              | _eliminated_                                                                                                                  | [x]
| `useTreeRendererContext`                                   | _eliminated_                                                                                                                  | [x]
| `ExtendedTreeNodeRendererProps`                            | `TreeNodeRendererProps`                                                                                                       | [x]
| `SignIn`                                                   | _eliminated_                                                                                                                  | [x]
| All drag & drop related APIs                               | Third party components. E.g. see this [example](https://www.itwinjs.org/sample-showcase/?group=UI+Trees&sample=drag-and-drop) | [ ]
| `DEPRECATED_Tree`, `BeInspireTree` and related APIs        | `ControlledTree`                                                                                                              | [x]
| `PropertyValueRendererContext.decoratedTextElement`        | `IPropertyValueRenderer` that can properly render a `PropertyRecord`                                                          | [ ]
| `CommonPropertyGridProps.onPropertyLinkClick`              | `PropertyRecord.links.onClick`                                                                                                | [ ]
| `onPropertyLinkClick` prop in `usePropertyData`            | `PropertyRecord.links.onClick`                                                                                                | [ ]
| `onPropertyLinkClick` prop in `usePropertyGridModelSource` | `PropertyRecord.links.onClick`                                                                                                | [ ]
| `FilteringInputProps.filteringInProgress`                  | `FilteringInputProps.status`                                                                                                  | [ ]
| `hasLinks`                                                 | `!!PropertyRecord.links?.length`                                                                                              | [ ]
| `PropertyListProps.onListWidthChanged`                     | Width is now passed to `PropertyList` through `PropertyListProps.width` prop                                                  | [ ]

### @itwin/appui-react

| Removed                                    | Replacement                                                                                                                   | Completed
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ----------
| `COLOR_THEME_DEFAULT`                      | `SYSTEM_PREFERRED_COLOR_THEME` in @bentley/ui-framework is used as default color theme                                        | [x]
| `FunctionKey`                              | `FunctionKey` in @bentley/ui-abstract                                                                                         | [x]
| `IModelAppUiSettings`                      | `UserSettingsStorage` in @bentley/ui-framework                                                                                | [x]
| `ConfigurableUiManager.findFrontstageDef`  | `FrontstageManager.findFrontstageDef`                                                                                         | [ ]
| `ConfigurableUiManager.loadContentGroup`   | *eliminated*                                                                                                                  | [ ]
| `ConfigurableUiManager.loadContentGroups`  | *eliminated*                                                                                                                  | [ ]
| `ConfigurableUiManager.loadContentLayout`  | *eliminated*                                                                                                                  | [ ]
| `ConfigurableUiManager.loadContentLayouts` | *eliminated*                                                                                                                  | [ ]
| `ContentGroupManager`                      | *eliminated*                                                                                                                  | [x]
| `Frontstage.initializeFrontstageDef`       | `FrontstageManager.getFrontstageDef` (async method)                                                                           | [ ]
| `Frontstage.findFrontstageDef`             | `FrontstageManager.getFrontstageDef` (async method)                                                                           | [ ]
| `Frontstage.initializeFromProvider`        | `Frontstage.create` (async method)                                                                                            | [ ]
| `FrontstageProps.defaultLayout`            | `ContentGroup` now holds the layout information.                                                                              | [ ]
| `FrontstageProvider.initializeDef`         | *eliminated*                                                                                                                  | [ ]
| `FrontstageProvider.frontstageDef`         | `FrontstageManager.getFrontstageDef` (async method)                                                                           | [ ]
| `reactElement` in ContentControl           | `ContentControl.reactNode`                                                                                                    | [ ]
| `reactElement` in NavigationAidControl     | `NavigationAidControl.reactNode`                                                                                              | [ ]
| `reactElement` in NavigationWidgetDef      | `NavigationWidgetDef.reactNode`                                                                                               | [ ]
| `reactElement` in ToolWidgetDef            | `ToolWidgetDef.reactNode`                                                                                                     | [ ]
| `reactElement` in WidgetControl            | `WidgetControl.reactNode`                                                                                                     | [ ]
| `reactElement` in WidgetDef                | `WidgetDef.reactNode`                                                                                                         | [ ]
| `ReactMessage`                             | `ReactMessage` in @itwin/core-react                                                                                           | [x]
| `SavedView`                                | `ViewStateHelper`                                                                                                             | [x]
| `SavedViewProps`                           | `ViewStateHelperProps`                                                                                                        | [x]
| `SavedViewLayout`                          | `StageContentLayout`                                                                                                          | [x]
| `SavedViewLayoutProps`                     | `StageContentLayoutProps`                                                                                                     | [x]
| `SpecialKey`                               | `SpecialKey` in @itwin/appui-abstract                                                                                         | [x]
| `WidgetState`                              | `WidgetState` in @itwin/appui-abstract                                                                                        | [x]
| `UserProfileBackstageItem`                 | *eliminated*                                                                                                                  | [x]
| `SignIn`                                   | *eliminated*                                                                                                                  | [x]
| `SignOutModalFrontstage`                   | *eliminated*                                                                                                                  | [x]
| `IModelConnectedCategoryTree`              | *eliminated*                                                                                                                  | [x]
| `IModelConnectedModelsTree`                | *eliminated*                                                                                                                  | [x]
| `IModelConnectedSpatialContainmentTree`    | *eliminated*                                                                                                                  | [x]
| `CategoryTreeWithSearchBox`                | *eliminated*                                                                                                                  | [x]
| `VisibilityComponent`                      | `TreeWidgetComponent` in @bentley/tree-widget-react                                                                           | [ ]
| `VisibilityWidget`                         | `TreeWidgetControl` in @bentley/tree-widget-react                                                                             | [ ]
| `ContentLayoutProps`                       | `ContentLayoutProps` in @itwin/appui-abstract                                                                                 | [x]
| All drag & drop related APIs               | Third party components. E.g. see this [example](https://www.itwinjs.org/sample-showcase/?group=UI+Trees&sample=drag-and-drop) | [ ]

### @itwin/core-bentley

| Removed         | Replacement                                                | Completed
| --------------- | ---------------------------------------------------------- | ----------
| `Config`        | Use `process.env` to access environment variables directly | [ ]
| `EnvMacroSubst` | *eliminated*                                               | [ ]

### @itwin/presentation-common

| Removed                                                         | Replacement                                                                                                                                                    | Completed
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------
| `CompressedDescriptorJSON`                                      | `DescriptorJSON`                                                                                                                                               | [x]
| `ContentInstancesOfSpecificClassesSpecification.arePolymorphic` | `ContentInstancesOfSpecificClassesSpecification.handleInstancesPolymorphically`                                                                                | [ ]
| `ContentModifiersList.propertiesDisplay`                        | `ContentModifiersList.propertyOverrides`                                                                                                                       | [ ]
| `ContentModifiersList.propertyEditors`                          | `ContentModifiersList.propertyOverrides`                                                                                                                       | [ ]
| `ContentRelatedInstancesSpecification.isRecursive`              | *eliminated*                                                                                                                                                   | [ ]
| `ContentRelatedInstancesSpecification.relatedClasses`           | `ContentRelatedInstancesSpecification.relationshipPaths.targetClass`                                                                                           | [ ]
| `ContentRelatedInstancesSpecification.relationships`            | `ContentRelatedInstancesSpecification.relationshipPaths.relationship`                                                                                          | [ ]
| `ContentRelatedInstancesSpecification.requiredDirection`        | `ContentRelatedInstancesSpecification.relationshipPaths.direction`                                                                                             | [ ]
| `ContentRelatedInstancesSpecification.skipRelatedLevel`         | *eliminated*                                                                                                                                                   | [ ]
| `Descriptor.toCompressedJSON`                                   | `Descriptor.toJSON`                                                                                                                                            | [x]
| `DescriptorOverrides.hiddenFieldNames`                          | `DescriptorOverrides.fieldsSelector`                                                                                                                           | [ ]
| `DescriptorOverrides.sortDirection`                             | `DescriptorOverrides.sorting.direction`                                                                                                                        | [ ]
| `DescriptorOverrides.sortingFieldName`                          | `DescriptorOverrides.sorting.field`                                                                                                                            | [ ]
| `ECPropertyGroupingNodeKey.groupingValue`                       | `ECPropertyGroupingNodeKey.groupingValues`                                                                                                                     | [ ]
| `ExtendedContentRequestOptions`                                 | `ContentRequestOptions`                                                                                                                                        | [ ]
| `ExtendedContentRpcRequestOptions`                              | `ContentRpcRequestOptions`                                                                                                                                     | [ ]
| `ExtendedHierarchyRequestOptions`                               | `HierarchyRequestOptions`                                                                                                                                      | [ ]
| `ExtendedHierarchyRpcRequestOptions`                            | `HierarchyRpcRequestOptions`                                                                                                                                   | [ ]
| `Field.fromJSON`                                                | `Field.fromCompressedJSON`                                                                                                                                     | [ ]
| `HierarchyCompareRpcOptions`                                    | *eliminated*                                                                                                                                                   | [ ]
| `LabelRequestOptions`                                           | `DisplayLabelRequestOptions`                                                                                                                                   | [ ]
| `LabelRpcRequestOptions`                                        | `DisplayLabelRpcRequestOptions`                                                                                                                                | [ ]
| `LoggingNamespaces`                                             | `PresentationBackendLoggerCategory`, `PresentationBackendNativeLoggerCategory`, `PresentationFrontendLoggerCategory` or `PresentationComponentsLoggerCategory` | [ ]
| `NodeDeletionInfo.target`                                       | `NodeDeletionInfo.parent` and `NodeDeletionInfo.position`                                                                                                      | [ ]
| `NodeDeletionInfoJSON.target`                                   | `NodeDeletionInfoJSON.parent` and `NodeDeletionInfoJSON.position`                                                                                              | [ ]
| `PresentationDataCompareOptions`                                | *eliminated*                                                                                                                                                   | [ ]
| `PresentationRpcInterface.compareHierarchies`                   | *eliminated*                                                                                                                                                   | [ ]
| `PresentationRpcInterface.compareHierarchiesPaged`              | *eliminated*                                                                                                                                                   | [ ]
| `PresentationRpcInterface.getContent`                           | `PresentationRpcInterface.getPagedContent` and `getPagedContentSet`                                                                                            | [ ]
| `PresentationRpcInterface.getContentAndSize`                    | `PresentationRpcInterface.getPagedContent` and `getPagedContentSet`                                                                                            | [ ]
| `PresentationRpcInterface.getDisplayLabelDefinitions`           | `PresentationRpcInterface.getPagedDisplayLabelDefinitions`                                                                                                     | [ ]
| `PresentationRpcInterface.getDistinctValues`                    | `PresentationRpcInterface.getPagedDistinctValues`                                                                                                              | [ ]
| `PresentationRpcInterface.getNodes`                             | `PresentationRpcInterface.getPagedNodes`                                                                                                                       | [ ]
| `PresentationRpcInterface.getNodesAndCount`                     | `PresentationRpcInterface.getPagedNodes`                                                                                                                       | [ ]
| `PresentationRpcInterface.loadHierarchy`                        | *eliminated*                                                                                                                                                   | [ ]
| `PresentationUnitSystem`                                        | `UnitSystemKey` in `@bentley/imodeljs-quantity`                                                                                                                | [ ]
| `PropertiesFieldDescriptor.propertyClass`                       | `PropertiesFieldDescriptor.properties.class`                                                                                                                   | [ ]
| `PropertiesFieldDescriptor.propertyName`                        | `PropertiesFieldDescriptor.properties.name`                                                                                                                    | [ ]
| `Property.relatedClassPath`                                     | `NestedContentField.pathToPrimaryClass`                                                                                                                        | [ ]
| `PropertyJSON.relatedClassPath`                                 | `NestedContentFieldJSON.pathToPrimaryClass`                                                                                                                    | [ ]
| `RelatedInstanceNodesSpecification.relatedClasses`              | `RelatedInstanceNodesSpecification.relationshipPaths.targetClass`                                                                                              | [ ]
| `RelatedInstanceNodesSpecification.relationships`               | `RelatedInstanceNodesSpecification.relationshipPaths.relationship`                                                                                             | [ ]
| `RelatedInstanceNodesSpecification.requiredDirection`           | `RelatedInstanceNodesSpecification.relationshipPaths.direction`                                                                                                | [ ]
| `RelatedInstanceNodesSpecification.skipRelatedLevel`            | *eliminated*                                                                                                                                                   | [ ]
| `RelatedInstanceNodesSpecification.supportedSchemas`            | *eliminated*                                                                                                                                                   | [ ]
| `RelatedInstanceSpecification.class`                            | `RelatedInstanceSpecification.relationshipPath.targetClass`                                                                                                    | [ ]
| `RelatedInstanceSpecification.relationship`                     | `RelatedInstanceSpecification.relationshipPath.relationship`                                                                                                   | [ ]
| `RelatedInstanceSpecification.requiredDirection`                | `RelatedInstanceSpecification.relationshipPath.direction`                                                                                                      | [ ]
| `RelatedPropertiesSpecification.isPolymorphic`                  | `RelatedPropertiesSpecification.handleTargetClassPolymorphically`                                                                                              | [ ]
| `RelatedPropertiesSpecification.propertyNames`                  | `RelatedPropertiesSpecification.properties`                                                                                                                    | [ ]
| `RelatedPropertiesSpecification.relatedClasses`                 | `RelatedPropertiesSpecification.propertiesSource.targetClass`                                                                                                  | [ ]
| `RelatedPropertiesSpecification.relationships`                  | `RelatedPropertiesSpecification.propertiesSource.relationship`                                                                                                 | [ ]
| `RelatedPropertiesSpecification.requiredDirection`              | `RelatedPropertiesSpecification.propertiesSource.direction`                                                                                                    | [ ]
| `Ruleset.supportedSchemas`                                      | `Ruleset.requiredSchemas`                                                                                                                                      | [ ]
| `RequestPriority`                                               | *eliminated*                                                                                                                                                   | [ ]
| `RequestOptions<TIModel>.priority`                              | *eliminated*                                                                                                                                                   | [ ]
| `SelectClassInfo.pathToPrimaryClass`                            | `SelectClassInfo.pathFromInputToSelectClass`                                                                                                                   | [ ]
| `SelectClassInfo.relatedInstanceClasses`                        | `SelectClassInfo.relatedInstancePaths`                                                                                                                         | [ ]
| `SelectClassInfoJSON.pathToPrimaryClass`                        | `SelectClassInfoJSON.pathFromInputToSelectClass`                                                                                                               | [ ]
| `SelectClassInfoJSON.relatedInstanceClasses`                    | `SelectClassInfoJSON.relatedInstancePaths`                                                                                                                     | [ ]

### @itwin/presentation-backend

| Removed                                       | Replacement                                                                                                               | Completed
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------
| `DuplicateRulesetHandlingStrategy`            | `RulesetInsertOptions`                                                                                                    | [ ]
| `PresentationManager.activeUnitSystem`        | Changed type from `PresentationUnitSystem` to `UnitSystemKey`                                                             | [ ]
| `PresentationManager.getContentAndSize`       | `PresentationManager.getContent` and `getContentSetSize`                                                                  | [ ]
| `PresentationManager.getDistinctValues`       | `PresentationManager.getPagedDistinctValues`                                                                              | [ ]
| `PresentationManager.getNodesAndCount`        | `PresentationManager.getNodes` and `getNodesCount`                                                                        | [ ]
| `PresentationManager.loadHierarchy`           | _eliminated_                                                                                                              | [ ]
| `PresentationManagerProps.activeLocale`       | `PresentationManagerProps.defaultLocale`                                                                                  | [ ]
| `PresentationManagerProps.activeUnitSystem`   | Renamed to `PresentationManagerProps.defaultUnitSystem` and changed type from `PresentationUnitSystem` to `UnitSystemKey` | [ ]
| `PresentationManagerProps.cacheConfig`        | `PresentationManagerProps.caching.hierarchies`                                                                            | [ ]
| `PresentationManagerProps.contentCacheSize`   | `PresentationManagerProps.caching.content.size`                                                                           | [ ]
| `PresentationManagerProps.taskAllocationsMap` | `PresentationManagerProps.workerThreadsCount`                                                                             | [ ]
| `UnitSystemFormat.unitSystems`                | Changed type from `PresentationUnitSystem[]` to `UnitSystemKey[]`                                                         | [ ]
| `WithClientRequestContext<T>`                 | _eliminated_                                                                                                              | [ ]

### @itwin/presentation-frontend

| Removed                                     | Replacement                                                   | Completed
| ------------------------------------------- | ------------------------------------------------------------- | ----------
| `FavoritePropertiesScope.Project`           | `FavoritePropertiesScope.ITwin`                               | [ ]
| `PresentationManager.activeUnitSystem`      | Changed type from `PresentationUnitSystem` to `UnitSystemKey` | [ ]
| `PresentationManager.compareHierarchies`    | _eliminated_                                                  | [ ]
| `PresentationManager.getDistinctValues`     | `PresentationManager.getPagedDistinctValues`                  | [ ]
| `PresentationManager.loadHierarchy`         | _eliminated_                                                  | [ ]
| `PresentationManagerProps.activeUnitSystem` | Changed type from `PresentationUnitSystem` to `UnitSystemKey` | [ ]

### @itwin/presentation-components

| Removed                                                | Replacement                                     | Completed
| ------------------------------------------------------ | ----------------------------------------------- | ----------
| `ContentDataProvider.configureContentDescriptor`       | `ContentDataProvider.getDescriptorOverrides`    | [ ]
| `ContentDataProvider.isFieldHidden`                    | `ContentDataProvider.getDescriptorOverrides`    | [ ]
| `ContentDataProvider.shouldConfigureContentDescriptor` | _eliminated_                                    | [ ]
| `ContentDataProvider.shouldExcludeFromDescriptor`      | `ContentDataProvider.getDescriptorOverrides`    | [ ]
| `ControlledTreeFilteringProps`                         | `ControlledPresentationTreeFilteringProps`      | [ ]
| `DEPRECATED_controlledTreeWithFilteringSupport`        | _eliminated_                                    | [ ]
| `DEPRECATED_controlledTreeWithVisibleNodes`            | _eliminated_                                    | [ ]
| `DEPRECATED_treeWithFilteringSupport`                  | `useControlledPresentationTreeFiltering`        | [ ]
| `DEPRECATED_treeWithUnifiedSelection`                  | `useUnifiedSelectionTreeEventHandler`           | [ ]
| `FilteredPresentationTreeDataProvider.loadHierarchy`   | _eliminated_                                    | [ ]
| `IPresentationTreeDataProvider.loadHierarchy`          | _eliminated_                                    | [ ]
| `PresentationTreeDataProvider.loadHierarchy`           | _eliminated_                                    | [ ]
| `PresentationTreeNodeLoaderProps.preloadingEnabled`    | _eliminated_                                    | [ ]
| `propertyGridWithUnifiedSelection`                     | `usePropertyDataProviderWithUnifiedSelection`   | [ ]
| `PropertyGridWithUnifiedSelectionProps`                | `PropertyDataProviderWithUnifiedSelectionProps` | [ ]
| `TreeWithFilteringSupportProps`                        | `ControlledPresentationTreeFilteringProps`      | [ ]
| `TreeWithUnifiedSelectionProps`                        | `UnifiedSelectionTreeEventHandlerParams`        | [ ]
| `useControlledTreeFiltering`                           | `useControlledPresentationTreeFiltering`        | [ ]

### @itwin/ecschema-metadata

| Removed                                  | Replacement                                                  | Completed
| ---------------------------------------- | ------------------------------------------------------------ | ----------
| `IDiagnostic`                            | `IDiagnostic` in @itwin/ecschema-editing                   | [x]
| `BaseDiagnostic`                         | `BaseDiagnostic` in @itwin/ecschema-editing                | [x]
| `DiagnosticType`                         | `DiagnosticType` in @itwin/ecschema-editing                | [x]
| `DiagnosticCategory`                     | `DiagnosticCategory` in @itwin/ecschema-editing            | [x]
| `DiagnosticCodes`                        | `DiagnosticCodes` in @itwin/ecschema-editing               | [x]
| `Diagnostics`                            | `Diagnostics` in @itwin/ecschema-editing                   | [x]
| `IDiagnosticReporter`                    | `IDiagnosticReporter` in @itwin/ecschema-editing           | [x]
| `SuppressionDiagnosticReporter`          | `SuppressionDiagnosticReporter` in @itwin/ecschema-editing | [x]
| `FormatDiagnosticReporter`               | `FormatDiagnosticReporter` in @itwin/ecschema-editing      | [x]
| `LoggingDiagnosticReporter`              | `LoggingDiagnosticReporter` in @itwin/ecschema-editing     | [x]
| `IRuleSet`                               | `IRuleSet` in @itwin/ecschema-editing                      | [x]
| `ECRuleSet`                              | `ECRuleSet` in @itwin/ecschema-editing                     | [x]
| `ISuppressionRule`                       | `ISuppressionRule` in @itwin/ecschema-editing              | [x]
| `BaseSuppressionRule`                    | `BaseSuppressionRule` in @itwin/ecschema-editing           | [x]
| `IRuleSuppressionMap`                    | `IRuleSuppressionMap` in @itwin/ecschema-editing           | [x]
| `BaseRuleSuppressionMap`                 | `BaseRuleSuppressionMap` in @itwin/ecschema-editing        | [x]
| `IRuleSuppressionSet`                    | `IRuleSuppressionSet` in @itwin/ecschema-editing           | [x]
| `SchemaCompareCodes`                     | `SchemaCompareCodes` in @itwin/ecschema-editing            | [x]
| `SchemaCompareDiagnostics`               | `SchemaCompareDiagnostics` in @itwin/ecschema-editing      | [x]
| `SchemaValidater`                        | `SchemaValidater` in @itwin/ecschema-editing               | [x]
| `SchemaValidationVisitor`                | `SchemaValidationVisitor` in @itwin/ecschema-editing       | [x]
| `RelationshipConstraint.deserialize`     | `RelationshipConstraint.fromJSON`                            | [x]
| `RelationshipConstraint.deserializeSync` | `RelationshipConstraint.fromJSONSync`                        | [x]
| `RelationshipConstraint.toJson`          | `RelationshipConstraint.toJSON`                              | [x]

### @bentley/itwin-client

| Removed                            | Replacement                    | Completed
| ---------------------------------- | ------------------------------ | ----------
| `UserInfo`                         | Moved to @itwin/appui-react | [ ]
| `AuthorizationClient.isAuthorized` | *eliminated*                   | [ ]

### @bentley/appui-react

| Removed                            | Replacement                                           | Completed
| ---------------------------------- | ----------------------------------------------------- | ----------
| `WidgetProvider`                   | Provide widget via [UiItemsProvider]($appui-abstract) | [ ]

### @bentley/frontend-authorization-client

| Removed                                          | Replacement                    | Completed
| -------------------------------------------------| ------------------------------ | ----------
| `FrontendAuthorizationClient`                    | *removed*                      | [ ]
| `FrontendAuthorizationClientLoggerCategory`      | *removed*                      | [ ]
| `BrowserAuthorizationCallbackHandler`            | Moved to iTwin/auth-clients    | [ ]
| `BrowserAuthorizationBase`                       | *removed*                      | [ ]
| `BrowserAuthorizationClient`                     | Moved to iTwin/auth-clients    | [ ]
| `BrowserAuthorizationClientRedirectState`        | Moved to iTwin/auth-clients    | [ ]
| `BrowserAuthorizationLogger`                     | Moved to iTwin/auth-clients    | [ ]
