import { DataTexture, RGBAFormat, FloatType, ClampToEdgeWrapping } from "three";
import { ImgHandler } from "./imgHandler";
import { GPUHandler } from "./gpuHandler";

export class DataHandler {
  private index = -1;
  private _length: number;
  private _size = 128;
  private data: DataTexture[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private imgHandler: ImgHandler;
  constructor() {
    this._length = this._size ** 2;
    this.imgHandler = new ImgHandler(this._length);
  }
  private getData = async (path: string) => {
    const data = await this.imgHandler.getData(path)
      .then(res => res)
      .catch(err => {
        console.log(err);
        return new Float32Array(this._length * 4);
      })
    return new DataTexture(data, this.size, this.size, RGBAFormat, FloatType);
  }
  public init = async (paths: string[]) => {
    const data = await Promise.all(paths.map(path => this.getData(path)));
    data.forEach(d => {
      d.wrapS = ClampToEdgeWrapping;
      d.wrapT = ClampToEdgeWrapping;
    })
    this.data = [...data];
  }
  private next = () => {
    this.index = (this.index + 1) % this.data.length;
    return this.data[this.index];
  }
  public loop = (gpuHandler: GPUHandler, time = 1000) => {
    this.timer !== null && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.loop(gpuHandler, time);
    }, time);
    if (!this.data.length) { return }
    const data = this.next();
    gpuHandler.updateTargetPos(data);
    data.needsUpdate = true;
  }
  public get length() {
    return this._length;
  }
  public get size() {
    return this._size;
  }
}