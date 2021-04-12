import { Vector2 } from "three";

export class EventsHandler {
  private _mouse: Vector2;
  constructor(private canvas: HTMLCanvasElement) {
    this._mouse = new Vector2(-10000, -10000);
    canvas.addEventListener('mousemove', this.mousemove);
    canvas.addEventListener('touchmove', this.touchmove, { passive: true });
  }
  private moveEvent = (x: number, y: number, ratio = 1) => {
    this._mouse.x = (x / window.innerWidth * 2 - 1) * ratio;
    this._mouse.y = -(y / window.innerHeight) * 2 + 1;
  }
  private mousemove = ({ clientX, clientY }: MouseEvent) => {
    this.moveEvent(clientX, clientY);
  }
  private touchmove = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    this.moveEvent(clientX, clientY, 0.25)
  }
  public unregister = () => {
    this.canvas.removeEventListener('mousemove', this.mousemove);
    this.canvas.removeEventListener('touchmove', this.touchmove);
  }
  public get mouse() {
    return this._mouse;
  }
}