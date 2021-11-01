import { AnalysisStyle, AnalysisStyleScalar, AnalysisStyleScalarProps, BriefcaseIdValue, Code, CodeSpec, IModelVersion, IModelVersionProps } from "@bentley/imodeljs-common";

function analysisStyleTestFunction(analysisStyle: AnalysisStyle, props: AnalysisStyleScalarProps) {
  const fromProps: AnalysisStyleScalar = AnalysisStyleScalar.fromJSON(props);
  analysisStyle.scalar = fromProps;
}

let code: Code;
code.getValue();

const versionProps: IModelVersionProps = {};
IModelVersion.fromJson(versionProps);

BriefcaseIdValue.Standalone;
BriefcaseIdValue.DeprecatedStandalone;

let codeSpec: CodeSpec;
codeSpec.specScopeType;
