import { BriefcaseDb, BriefcaseManager, IModelDb, IModelHost, IModelHostConfiguration, IModelHubBackend, ProcessDetector, SnapshotDb, StandaloneDb, TxnChangedEntities } from "@bentley/imodeljs-backend";
import { BriefcaseIdValue, TxnAction } from "@bentley/imodeljs-common";

class NotIModelDb { }

function iModelDbTestFunction(imodel: IModelDb, otherObject: NotIModelDb) {
  const newId = imodel.changeset.id;
  const newId2 = otherObject.changeSetId;
  let imodel2: IModelDb;
  const newId3 = imodel2.changeset.id;

  imodel.clearCaches();
  imodel.clearCaches();
}

IModelHubBackend.iModelClient;
let iModelHostConfig: IModelHostConfiguration;
iModelHostConfig.cacheDir;

ProcessDetector.isElectronAppBackend;
ProcessDetector.isElectronAppBackend
ProcessDetector.isMobileAppBackend;
ProcessDetector.isNodeProcess;

let snapshotDb: SnapshotDb;
snapshotDb.pathName;
let standaloneDb: StandaloneDb;
standaloneDb.pathName;

let changedEntities: TxnChangedEntities;
changedEntities.inserts;
changedEntities.deletes;
changedEntities.updates;
