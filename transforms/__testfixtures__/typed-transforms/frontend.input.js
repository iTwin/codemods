import { CheckpointConnection, DecorateContext, findAvailableRealityModels, findAvailableUnattachedRealityModels, IModelApp, RemoteBriefcaseConnection, UnitSystemKey, Viewport } from "@bentley/imodeljs-frontend";

let checkpointConnection: CheckpointConnection;
checkpointConnection.open();

let ctx: DecorateContext;
ctx.screenViewport;

findAvailableRealityModels();
findAvailableUnattachedRealityModels();

IModelApp.iModelClient;

let conn: RemoteBriefcaseConnection;

let viewport: Viewport;
viewport.featureOverrideProvider;
viewport.setRedrawPending();