export class ImgHandler {
  private static canvas = document.createElement('canvas');
  private static ctx = ImgHandler.canvas.getContext('2d') as CanvasRenderingContext2D;
  constructor(private length: number) { }
  private handleData = (source: Uint8ClampedArray, width: number) => {
    const target = new Float32Array(this.length * 4);
    const limit = 150;
    const arr = [];
    for (let i = 0; i < source.length; i += 4) {
      if (source[i] > limit && source[i + 1] > limit && source[i + 2] > limit) {
        const index = i / 4;
        const x = (index % width) / width;
        const y = ~~(index / width) / width;
        arr.push([x, y]);
      }
    }
    const step = Math.ceil(arr.length / this.length);
    for (let i = 0, j = 0; i < arr.length && j < this.length * 4; i += step) {
      const [x, y] = arr[i];
      target.set([x * 50 - 25, 0, y * 50 - 25, 1], j);
      j += 4;
    }
    return target;
  }
  public getData(path: string): Promise<Float32Array> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = path;
      const { canvas, ctx } = ImgHandler;
      image.onload = () => {
        const { width, height } = image;
        const size = 512;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(image, 0, 0, width, height, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
        resolve(this.handleData(data, size));
      }
      image.onerror = (e) => reject(e);
    });
  }
}