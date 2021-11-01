import { CheckpointConnection, DecorateContext, findAvailableRealityModels, findAvailableUnattachedRealityModels, IModelHubFrontend, queryRealityData, RemoteBriefcaseConnection, Viewport } from "@bentley/imodeljs-frontend";
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