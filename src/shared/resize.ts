import { Renderer, PerspectiveCamera } from "three";

export const resizeRendererToDisplaySize = (renderer: Renderer, camera: PerspectiveCamera) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const { width, clientWidth, height, clientHeight } = canvas;
  const cWidth = clientWidth * pixelRatio | 0;
  const cHeight = clientHeight * pixelRatio | 0;
  const needResize = cWidth !== width || cHeight !== height;
  if (needResize) {
    renderer.setSize(cWidth, cHeight, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}
