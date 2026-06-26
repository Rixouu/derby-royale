/** Load parallax background layers referenced by SCENES[].layers */

import { loadImages } from './image-loader.js';

export function sceneImageSources(scene) {
  const srcs = [];
  [scene.backdrop, scene.trackTexture].forEach(function (src) {
    if (src && srcs.indexOf(src) < 0) srcs.push(src);
  });
  if (!scene.layers) return srcs;
  scene.layers.forEach(function (layer) {
    if (srcs.indexOf(layer.src) < 0) srcs.push(layer.src);
  });
  return srcs;
}

export function allSceneImageSources(scenes) {
  const srcs = [];
  scenes.forEach(function (scene) {
    sceneImageSources(scene).forEach(function (src) {
      if (srcs.indexOf(src) < 0) srcs.push(src);
    });
  });
  return srcs;
}

export async function loadBackgroundImages(srcs) {
  return loadImages(srcs, 'background');
}

export async function loadBackgroundLayers(scenes) {
  return loadBackgroundImages(allSceneImageSources(scenes));
}

/** Default parallax factor by layer index (0 = sky, slowest). */
export function defaultParallax(index, total) {
  if (total <= 1) return 0.05;
  return 0.06 + (index / Math.max(total - 1, 1)) * 0.42;
}
