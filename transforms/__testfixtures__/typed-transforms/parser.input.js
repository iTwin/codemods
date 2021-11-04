import * as pkg from "package1";
import { Module1, Module2 } from "package2";
import def1 from "package3";
import def2, { Module3, Module4 } from "package4";
import "./localpackage";

class NewClass1 implements BaseClass1 {
  // protected _values = new Set<string>();
  value = "";
}

class NewClass2 extends BaseClass2 {
  value = "";
}

interface NewInterface extends BaseInterface {
  value: string;
}
