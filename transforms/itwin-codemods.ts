import { API, FileInfo } from 'jscodeshift';

import renameImports from "./rename-imports";
import removeRequestContext from "./remove-request-context"

export default function transformer(file: FileInfo, api: API) {
  // const transforms = [removeRequestContext, renameImports];
  const transforms = [renameImports];
  let src = file.source;
  transforms.forEach((transform) => {
    if (!src)
      return;
    src = transform({ ...file, source:src }, api);
  })

  return src;
}
