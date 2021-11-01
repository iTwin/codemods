import { AST, parse, parseAndGenerateServices, ParserServices, TSESTreeOptions } from '@typescript-eslint/typescript-estree';
import core, { FileInfo } from 'jscodeshift';

interface ParserState {
  services?: ParserServices;
  options?: TSESTreeOptions;
}

export class Parser {
  private static _parserState: ParserState;

  private constructor() { }

  private static getState(): ParserState {
    if (this._parserState === undefined)
      this._parserState = {};  
    return this._parserState;
  }

  public static ParseWithServices(j: core.JSCodeshift, file: FileInfo, tsConfigPath: string) {
    this.getState().options = { filePath: file.path, tsConfigPath };
    this.Parse(file.source);
    return {
      ast: j(file.source),
      services: this.getState().services
    };
  }

  public static Parse(source): AST<any> {
    if (this.getState().options !== undefined) {
      const options = this.getState().options;
      delete this.getState().options;
      const { ast, services } = parseAndGenerateServices(source, options);
      this.getState().services = services;
      return ast;
    }
    return parse(source);
  }
}
