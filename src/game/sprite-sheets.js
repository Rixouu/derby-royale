/** Load horizontal PNG sprite sheets referenced by CHARACTERS[].sheet */

import { GW, GH } from './config.js';
import { loadImages } from './image-loader.js';

function sheetSources(sheet) {
  if (!sheet) return [];
  if (Array.isArray(sheet.srcs)) return sheet.srcs.slice();
  if (sheet.src) return [sheet.src];
  return [];
}

export async function loadSpriteSheets(characters) {
  const srcs = [];
  characters.forEach(function (ch) {
    sheetSources(ch.sheet).forEach(function(src){
      if (src && srcs.indexOf(src) < 0) srcs.push(src);
    });
  });
  return loadImages(srcs, 'sprite sheet');
}

export function frameCountFor(char) {
  if (char.sheet) return char.sheet.frames;
  return 4;
}

export function idleFrameFor(char) {
  if (char.sheet) return 0;
  return 1;
}

export function spriteSourceForFrame(char, frame) {
  if (!char.sheet) return null;
  if (Array.isArray(char.sheet.srcs) && char.sheet.srcs.length) {
    return char.sheet.srcs[frame % char.sheet.srcs.length];
  }
  return char.sheet.src || null;
}

export function spriteSourceRectForFrame(char, frame) {
  if (!char.sheet) return null;
  const sx = Array.isArray(char.sheet.srcs)
    ? (char.sheet.srcX || 0)
    : frame * char.sheet.frameW + (char.sheet.srcX || 0);
  return {
    sx: sx,
    sy: char.sheet.srcY || 0,
    sw: char.sheet.frameW,
    sh: char.sheet.frameH,
  };
}

/** Screen size for a racer sprite at scale p (matches procedural GH*p height). */
export function spriteScreenSize(char, p) {
  if (char.sheet) {
    const renderFrameW = char.sheet.renderFrameW || char.sheet.frameW;
    const renderFrameH = char.sheet.renderFrameH || char.sheet.frameH;
    const targetH = GH * p;
    const scale = targetH / renderFrameH;
    return { w: renderFrameW * scale, h: targetH, scale: scale };
  }
  return { w: GW * p, h: GH * p, scale: 1 };
}
