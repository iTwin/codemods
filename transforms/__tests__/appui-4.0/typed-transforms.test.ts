import * as path from "path";
import { defineTest } from "jscodeshift/src/testUtils";

describe.only("appui-4.0", () => {
  defineTest(path.join(__dirname, ".."), "./typed-transforms", {
    tsConfigPath: "./transforms/__testfixtures__/typed-transforms/tsconfig.json",
    definitions: "./definitions/appui-4.0.json",
  }, "./appui-4.0/typed-transforms/appui-abstract", { parser: "ts" });
});
