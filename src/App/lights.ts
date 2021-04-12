import { SpotLight, Light, AmbientLight } from "three";

export class Lights {
  private _instance: Light[] = [];
  constructor() {
    const spotlight = new SpotLight();
    spotlight.position.set(0, 700, 0);
    spotlight.angle = Math.PI * 0.2;

    const alight = new AmbientLight();

    this._instance.push(alight,spotlight);
  }
  public get instance() {
    return this._instance;
  }
}