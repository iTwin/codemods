import { AutoPush, BriefcaseDb, BriefcaseIdValue, BriefcaseManager, DocumentCarrier, IModelDb, IModelHost, IModelHostConfiguration, InformationCarrierElement, Platform, SnapshotDb, StandaloneDb, TxnAction, TxnChangedEntities } from "@bentley/imodeljs-backend";

class NotIModelDb { }

function iModelDbTestFunction(imodel: IModelDb, otherObject: NotIModelDb) {
  const newId = imodel.changeSetId;
  const newId2 = otherObject.changeSetId;
  let imodel2: IModelDb;
  const newId3 = imodel2.changeSetId;

  imodel.clearSqliteStatementCache();
  imodel.clearStatementCache();
}

IModelHost.iModelClient;
let iModelHostConfig: IModelHostConfiguration;
iModelHostConfig.briefcaseCacheDir;

Platform.isDesktop;
Platform.isElectron;
Platform.isMobile;
Platform.isNodeJs;

let snapshotDb: SnapshotDb;
snapshotDb.filePath;
let standaloneDb: StandaloneDb;
standaloneDb.filePath;

let changedEntities: TxnChangedEntities;
changedEntities.inserted;
changedEntities.deleted;
changedEntities.updated;
