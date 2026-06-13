/** Load horizontal PNG sprite sheets referenced by CHARACTERS[].sheet */

import { GW, GH } from './config.js';

function loadImage(src) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.onload = function () { resolve(img); };
    img.onerror = function () { reject(new Error('Failed to load sprite sheet: ' + src)); };
    img.src = src;
  });
}

export async function loadSpriteSheets(characters) {
  const srcs = [];
  characters.forEach(function (ch) {
    if (ch.sheet && srcs.indexOf(ch.sheet.src) < 0) srcs.push(ch.sheet.src);
  });
  const images = {};
  await Promise.all(srcs.map(function (src) {
    return loadImage(src).then(function (img) { images[src] = img; });
  }));
  return images;
}

export function frameCountFor(char) {
  if (char.sheet) return char.sheet.frames;
  return 4;
}

export function idleFrameFor(char) {
  if (char.sheet) return 0;
  return 1;
}

/** Screen size for a racer sprite at scale p (matches procedural GH*p height). */
export function spriteScreenSize(char, p) {
  if (char.sheet) {
    const targetH = GH * p;
    const scale = targetH / char.sheet.frameH;
    return { w: char.sheet.frameW * scale, h: targetH, scale: scale };
  }
  return { w: GW * p, h: GH * p, scale: 1 };
}
