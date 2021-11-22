import { RelationshipConstraint, RelationshipConstraintProps } from "@bentley/ecschema-metadata";
import { BaseDiagnostic, BaseRuleSuppressionMap, BaseSuppressionRule, DiagnosticCategory, DiagnosticCodes, Diagnostics, DiagnosticType, ECRuleSet, FormatDiagnosticReporter, IDiagnostic, IDiagnosticReporter, IRuleSet, IRuleSuppressionMap, IRuleSuppressionSet, ISuppressionRule, LoggingDiagnosticReporter, SchemaCompareCodes, SchemaCompareDiagnostics, SchemaValidater, SchemaValidationVisitor, SuppressionDiagnosticReporter } from "@bentley/ecschema-editing";

function testFunction(constraint: RelationshipConstraint, props: RelationshipConstraintProps) {
  constraint.toJSON();
  constraint.fromJSON(props);
  constraint.fromJSONSync(props);
}
