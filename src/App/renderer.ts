import { WebGLRenderer, LinearToneMapping, PCFSoftShadowMap } from "three";

export class Renderer {
  private _instance: WebGLRenderer;
  constructor(canvas: HTMLCanvasElement) {
    const { innerWidth: width, innerHeight: height } = window;
    this._instance = new WebGLRenderer({ canvas });
    this._instance.setSize(width, height);
    this._instance.toneMapping = LinearToneMapping;
    this._instance.shadowMap.enabled = true;
    this._instance.shadowMap.type = PCFSoftShadowMap;
    this._instance.domElement.style.width = '100%';
    this._instance.domElement.style.height = '100vh';
  }
  public get instance() {
    return this._instance;
  }
}