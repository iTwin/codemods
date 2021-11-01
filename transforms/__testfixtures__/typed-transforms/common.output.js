import { AnalysisStyle, AnalysisStyleThematic, AnalysisStyleThematicProps, BriefcaseIdValue, Code, CodeSpec, IModelVersion, IModelVersionProps } from "@bentley/imodeljs-common";

function analysisStyleTestFunction(analysisStyle: AnalysisStyle, props: AnalysisStyleThematicProps) {
  const fromProps: AnalysisStyleThematic = AnalysisStyleThematic.fromJSON(props);
  analysisStyle.thematic = fromProps;
}

let code: Code;
code.value;

const versionProps: IModelVersionProps = {};
IModelVersion.fromJSON(versionProps);

BriefcaseIdValue.Unassigned;
BriefcaseIdValue.Unassigned;

let codeSpec: CodeSpec;
codeSpec.scopeType;
