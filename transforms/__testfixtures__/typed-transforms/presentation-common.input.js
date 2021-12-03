import { CompressedDescriptorJSON, ContentInstancesOfSpecificClassesSpecification, Descriptor, DescriptorOverrides, ECPropertyGroupingNodeKey, ExtendedContentRequestOptions, ExtendedContentRpcRequestOptions, ExtendedHierarchyRequestOptions, ExtendedHierarchyRpcRequestOptions, Field, HierarchyCompareRpcOptions, LabelRequestOptions, LabelRpcRequestOptions, PresentationDataCompareOptions, PresentationRpcInterface, PropertiesFieldDescriptor, Ruleset, RequestPriority, SelectClassInfo, SelectClassInfoJSON } from "@bentley/presentation-common";

let contentInstancesSpec: ContentInstancesOfSpecificClassesSpecification;
contentInstancesSpec.arePolymorphic;

let descriptor: Descriptor;
descriptor.toCompressedJSON();

let descriptorOverrides: DescriptorOverrides;
descriptorOverrides.hiddenFieldNames;
descriptorOverrides.sortDirection;
descriptorOverrides.sortingFieldName;

let groupingNodeKey: ECPropertyGroupingNodeKey;
groupingNodeKey.groupingValue;

Field.fromJSON();

let rpcInterface: PresentationRpcInterface;
rpcInterface.getDisplayLabelDefinitions();
rpcInterface.getDistinctValues();
rpcInterface.getNodes();
rpcInterface.getNodesAndCount();

let fieldDescriptor: PropertiesFieldDescriptor;
fieldDescriptor.propertyClass;
fieldDescriptor.propertyName;

let ruleset: Ruleset;
ruleset.supportedSchemas;

let selectClassInfo: SelectClassInfo;
selectClassInfo.pathToPrimaryClass;
selectClassInfo.relatedInstanceClasses;

let selectClassInfoJSON: SelectClassInfoJSON;
selectClassInfoJSON.pathToPrimaryClass;
selectClassInfoJSON.relatedInstanceClasses;
