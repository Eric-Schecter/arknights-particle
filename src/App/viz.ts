import { Scene, WebGLRenderer } from 'three';
import { MyCamera } from './camera';
import { Lights } from './lights';
import { Renderer } from './renderer';
import { MyScene } from './scene';
import { resizeRendererToDisplaySize } from '../shared/resize';
import { Particles } from './particles';
import { DataHandler } from './handlers';
import { EventsHandler } from './handlers';

export class Viz {
  private scene: Scene;
  private camera: MyCamera;
  private lights: Lights;
  private renderer: WebGLRenderer;
  private particles: Particles | null = null;
  private eventsHandler: EventsHandler;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas).instance;
    this.scene = new MyScene().instance;
    this.camera = new MyCamera();
    this.lights = new Lights();
    this.eventsHandler = new EventsHandler(canvas);

    const dataHandler = new DataHandler();
    dataHandler.init([
      'img/source1.jpeg',
      'img/source2.jpeg',
      'img/source3.jpeg',
      'img/source4.jpeg',
    ])
      .then(() => {
        this.particles = new Particles(this.renderer, dataHandler);
        this.scene.add(this.particles.instance);
      });

    this.add2Scene();
    this.update();

  }

  private add2Scene = () => {
    this.scene.add(
      ...this.lights.instance
    );
  }

  private update = () => {
    this.renderer.render(this.scene, this.camera.instance);
    this.particles?.update(this.eventsHandler.mouse)
    resizeRendererToDisplaySize(this.renderer, this.camera.instance);
    requestAnimationFrame(this.update);
  }
  public unregister = () => {
    this.eventsHandler.unregister();
  }
}