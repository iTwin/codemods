import { API, FileInfo } from 'jscodeshift';
import { ParserServices } from "@typescript-eslint/typescript-estree";
import * as typescriptEstree from "@typescript-eslint/typescript-estree";

import renameImports from "./rename-imports";
import removeRequestContext from "./remove-request-context"
import coreCommon from "./core-common" 

// interface ParserOptions {
//   filePath: string,
//   tsConfigPath: string;
//   preserveNodeMaps: boolean;
// }
// interface ParserState {
//   services?: ParserServices;
//   options?: ParserOptions;
// }

// const parserState: ParserState = {};

// export function parseWithServices(j, file: FileInfo, projectPath) {
//   parserState.options = { filePath: file.path, tsConfigPath: projectPath, preserveNodeMaps: true };
//   return {
//     ast: j(file.source),
//     services: parserState.services
//   };
// }

export default function transformer(file: FileInfo, api: API) {
  // const transforms = [removeRequestContext, coreCommon, renameImports];
  const transforms = [coreCommon, renameImports];
  let src = file.source;
  transforms.forEach((transform) => {
    if (!src)
      return;
    src = transform({ ...file, source:src }, api);
  })

  return src;
}

module.exports.parser = "ts";

// module.exports.parser = { 
//   parse(source): typescriptEstree.AST<any> {
//     if (parserState.options !== undefined) {
//       const options = parserState.options;
//       delete parserState.options;
//       const { ast, services } = typescriptEstree.parseAndGenerateServices(source, {
//         ...options,
//         loc: true, range: true, tokens: true
//       });
//       parserState.services = services;
//       return ast;
//     }
//     return typescriptEstree.parse(source);
//   }
// };