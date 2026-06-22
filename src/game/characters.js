/* ============================================================
   SPRITE REGISTRY — PNG run sheets only
   Place files at public/sprites/<key>/run.png
   See docs/assets.md
   ============================================================ */

const SHEET_RUN = { frameW: 128, frameH: 128, renderFrameW: 128, renderFrameH: 128, frames: 8 };
const TRIMMED_SHEET_RUN = { frameW: 128, frameH: 80, renderFrameW: 128, renderFrameH: 128, frames: 8 };
/* frames = image width ÷ frameW (e.g. 1024 ÷ 128 = 8) */

const CHARACTERS = [
  { key: 'fighter', name: 'Fighter', kind: 'hero', sheet: { src: '/sprites/fighter/run.png', ...TRIMMED_SHEET_RUN } },
  { key: 'samurai', name: 'Samurai', kind: 'hero', sheet: { src: '/sprites/samurai/run.png', ...TRIMMED_SHEET_RUN } },
  { key: 'shinobi', name: 'Shinobi', kind: 'hero', sheet: { src: '/sprites/shinobi/run.png', ...TRIMMED_SHEET_RUN } },
  { key: 'naia', name: 'Naia', kind: 'hero', sheet: { src: '/sprites/naia/run.png', ...TRIMMED_SHEET_RUN, frames: 12 } },
  { key: 'val', name: 'Val', kind: 'hero', sheet: { src: '/sprites/val/run.png', ...TRIMMED_SHEET_RUN, frames: 12 } },
  { key: 'tess', name: 'Tess', kind: 'hero', sheet: { src: '/sprites/tess/run.png', ...TRIMMED_SHEET_RUN, frames: 12 } },
  { key: 'gotoku', name: 'Gotoku', kind: 'hero', sheet: { src: '/sprites/gotoku/run.png', ...TRIMMED_SHEET_RUN, frames: 7 } },
  { key: 'yurei', name: 'Yurei', kind: 'hero', sheet: { src: '/sprites/yurei/run.png', ...TRIMMED_SHEET_RUN, frames: 5 } },
  { key: 'onryou', name: 'Onryou', kind: 'hero', sheet: { src: '/sprites/onryou/run.png', ...TRIMMED_SHEET_RUN, frames: 7 } },
];

const CHAR_COUNT = CHARACTERS.length;

export { CHARACTERS, CHAR_COUNT };
