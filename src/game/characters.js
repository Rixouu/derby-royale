/* ============================================================
   SPRITE REGISTRY — PNG run sheets only
   Place files at public/sprites/<key>/run.png
   See docs/assets.md
   ============================================================ */

const SHEET_RUN = { frameW: 128, frameH: 128, frames: 8 };
/* frames = image width ÷ frameW (e.g. 1024 ÷ 128 = 8) */

const CHARACTERS = [
  { key: 'fighter', name: 'Fighter', kind: 'hero', sheet: { src: '/sprites/fighter/run.png', ...SHEET_RUN } },
  { key: 'samurai', name: 'Samurai', kind: 'hero', sheet: { src: '/sprites/samurai/run.png', ...SHEET_RUN } },
  { key: 'shinobi', name: 'Shinobi', kind: 'hero', sheet: { src: '/sprites/shinobi/run.png', ...SHEET_RUN } },
  { key: 'naia', name: 'Naia', kind: 'hero', sheet: { src: '/sprites/naia/run.png', ...SHEET_RUN } },
  { key: 'val', name: 'Val', kind: 'hero', sheet: { src: '/sprites/val/run.png', ...SHEET_RUN } },
  { key: 'tess', name: 'Tess', kind: 'hero', sheet: { src: '/sprites/tess/run.png', ...SHEET_RUN } },
  { key: 'gotoku', name: 'Gotoku', kind: 'hero', sheet: { src: '/sprites/gotoku/run.png', ...SHEET_RUN } },
  { key: 'yurei', name: 'Yurei', kind: 'hero', sheet: { src: '/sprites/yurei/run.png', ...SHEET_RUN } },
  { key: 'onryou', name: 'Onryou', kind: 'hero', sheet: { src: '/sprites/onryou/run.png', ...SHEET_RUN } },
];

const CHAR_COUNT = CHARACTERS.length;

export { CHARACTERS, CHAR_COUNT };
