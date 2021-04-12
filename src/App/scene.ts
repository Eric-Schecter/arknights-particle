import { Scene } from "three";

export class MyScene {
  private _instance: Scene;
  constructor() {
    this._instance = new Scene();
  }
  public get instance() {
    return this._instance;
  }
}