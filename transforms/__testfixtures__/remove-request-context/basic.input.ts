import { ClientRequestContext } from "@itwin/core-bentley";

function testFunction(requestContext: ClientRequestContext, otherParam: string) {
  const variable = otherParam;
  requestContext.enter();
  return variable;
}
