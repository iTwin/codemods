import { BSplineCurve3dBase, InterpolationCurve3dOptions, TransitionSpiralProps } from "@bentley/geometry-core";

let curve: BSplineCurve3dBase;
curve.createThroughPoints();

let props: TransitionSpiralProps;
props.curveLength;
props.fractionInterval;
props.intervalFractions;

let options: InterpolationCurve3dOptions;
options.isChordLenTangent;
