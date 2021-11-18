import { AppearanceOverrideProps, AsyncMethodsOf, AsyncFunction, CheckpointConnection, DecorateContext, EmphasizeElementsProps, Environment, FeatureOverrideType, findAvailableRealityModels, findAvailableUnattachedRealityModels, IModelApp, PromiseReturnType, RemoteBriefcaseConnection, UnitSystemKey, Viewport } from "@bentley/imodeljs-frontend";

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