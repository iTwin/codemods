import { CheckpointConnection, DecorateContext, findAvailableRealityModels, findAvailableUnattachedRealityModels, IModelHubFrontend, queryRealityData, Viewport } from "@bentley/imodeljs-frontend";
import { AppearanceOverrideProps, EmphasizeElementsProps, FeatureOverrideType } from "@bentley/imodeljs-common";
import { AsyncFunction, AsyncMethodsOf, PromiseReturnType } from "@bentley/bentleyjs-core";
import { UnitSystemKey } from "@bentley/imodeljs-quantity";

let checkpointConnection: CheckpointConnection;
checkpointConnection.openRemote();

let ctx: DecorateContext;
ctx.viewport;

queryRealityData();
queryRealityData();

IModelHubFrontend.iModelClient;

let conn: CheckpointConnection;

let viewport: Viewport;
viewport.featureOverrideProviders;
viewport.requestRedraw();