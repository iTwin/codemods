import { BaseDiagnostic, BaseRuleSuppressionMap, BaseSuppressionRule, DiagnosticCategory, DiagnosticCodes, Diagnostics, DiagnosticType, ECRuleSet, FormatDiagnosticReporter, IDiagnostic, IDiagnosticReporter, IRuleSet, IRuleSuppressionMap, IRuleSuppressionSet, ISuppressionRule, LoggingDiagnosticReporter, RelationshipConstraint, RelationshipConstraintProps, SchemaCompareCodes, SchemaCompareDiagnostics, SchemaValidater, SchemaValidationVisitor, SuppressionDiagnosticReporter } from "@bentley/ecschema-metadata";

function testFunction(constraint: RelationshipConstraint, props: RelationshipConstraintProps) {
  constraint.toJson();
  constraint.deserialize(props);
  constraint.deserializeSync(props);
}
