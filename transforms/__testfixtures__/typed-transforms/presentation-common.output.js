import { ContentInstancesOfSpecificClassesSpecification, ContentRequestOptions, ContentRpcRequestOptions, Descriptor, DescriptorJSON, DescriptorOverrides, DisplayLabelRequestOptions, DisplayLabelRpcRequestOptions, ECPropertyGroupingNodeKey, Field, HierarchyRequestOptions, HierarchyRpcRequestOptions, PresentationRpcInterface, PropertiesFieldDescriptor, Ruleset, SelectClassInfo, SelectClassInfoJSON } from "@bentley/presentation-common";

let contentInstancesSpec: ContentInstancesOfSpecificClassesSpecification;
contentInstancesSpec.handleInstancesPolymorphically;

let descriptor: Descriptor;
descriptor.toJSON();

let descriptorOverrides: DescriptorOverrides;
descriptorOverrides.fieldsSelector;
descriptorOverrides.sorting.direction;
descriptorOverrides.sorting.field;

let groupingNodeKey: ECPropertyGroupingNodeKey;
groupingNodeKey.groupingValues;

Field.fromCompressedJSON();

let rpcInterface: PresentationRpcInterface;
rpcInterface.getPagedDisplayLabelDefinitions();
rpcInterface.getPagedDistinctValues();
rpcInterface.getPagedNodes();
rpcInterface.getPagedNodes();

let fieldDescriptor: PropertiesFieldDescriptor;
fieldDescriptor.properties.class;
fieldDescriptor.properties.name;

let ruleset: Ruleset;
ruleset.requiredSchemas;

let selectClassInfo: SelectClassInfo;
selectClassInfo.pathFromInputToSelectClass;
selectClassInfo.relatedInstancePaths;

let selectClassInfoJSON: SelectClassInfoJSON;
selectClassInfoJSON.pathFromInputToSelectClass;
selectClassInfoJSON.relatedInstancePaths;
