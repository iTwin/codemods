
import { GuidString, Id64String } from "@bentley/bentleyjs-core";
import { Range3d } from "@bentley/geometry-core";
import { GeometricModel3d, IModelDb } from "@bentley/imodeljs-backend";
import { BatchType, iModelTileTreeIdToString, TileMetadata, TileOptions, TileProps } from "@bentley/imodeljs-common";
import { createScopedLogger } from "@bentley/logging-defaults";

const { logException } = createScopedLogger("tile-generator");

export interface TileTreeInfo {
  treeId: string;
  treeType: BatchType;
  modelId: Id64String;
  is2d: boolean;
  guid?: GuidString;
}

export function* getAllTileTrees(iModel: IModelDb, options: TileOptions): Iterable<TileTreeInfo> {
  // NB: We can't use an ECSql query because the GeometryGuid column may not exist.
  // ###TODO: If the GeometryGuid property *does* exist, we only want to generate tiles for models whose GeometryGuid has *changed*.
  const queryParams = { from: GeometricModel3d.classFullName, limit: IModelDb.maxLimit };
  for (const modelId of iModel.queryEntityIds(queryParams)) {
    let model;
    try {
      model = iModel.models.getModel<GeometricModel3d>(modelId);
    } catch (err) {
      logException(err, "Error loading model", { modelId });
      continue;
    }

    if (model.isNotSpatiallyLocated || model.isTemplate)
      continue;

    const treeId = iModelTileTreeIdToString(modelId, { type: BatchType.Primary, edgesRequired: false }, options);
    const guid = model.geometryGuid || iModel.changeSetId || "first";

    yield {
      treeId,
      modelId,
      guid,
      is2d: false,
      treeType: BatchType.Primary,
    };
  }
}

export function getEmptyTileMetadata(tile: TileProps): TileMetadata {
  const { contentId, sizeMultiplier } = tile;
  const range = Range3d.fromJSON(tile.range);
  const contentRange = (tile.contentRange) ? Range3d.fromJSON(tile.contentRange) : range;
  const emptySubRangeMask = 0;
  const isLeaf = !!tile.isLeaf;
  return { contentId, sizeMultiplier, range, contentRange, emptySubRangeMask, isLeaf };
}
