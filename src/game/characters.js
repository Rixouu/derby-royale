/* ============================================================
   SPRITE REGISTRY — 12-frame PNG run sequences
   All current character assets live in public/sprites/<key>/.
   To add a new character:
   1. Drop `Running_000.png` ... `Running_011.png` into `public/sprites/<key>/`
   2. Add one entry to `CHARACTER_ASSETS` with the measured crop bounds.
   ============================================================ */

function sequenceFrames(prefix, count) {
  return Array.from({ length: count }, function(_, idx) {
    return prefix + String(idx).padStart(3, '0') + '.png';
  });
}

function sequencePrefixFor(key) {
  return '/sprites/' + key + '/Running_';
}

function sequenceCharacter(def) {
  return {
    key: def.key,
    name: def.name,
    kind: 'hero',
    sheet: {
      srcs: sequenceFrames(sequencePrefixFor(def.key), 12),
      srcX: def.crop.x,
      srcY: def.crop.y,
      frameW: def.crop.w,
      frameH: def.crop.h,
      renderFrameW: def.crop.w,
      renderFrameH: def.crop.h,
      frames: 12,
      ...(def.motion || {}),
    },
  };
}

const CHARACTER_ASSETS = [
  { key: 'forest-ranger', name: 'Forest Ranger', crop: { x: 209, y: 163, w: 470, h: 588 }, motion: { paceMul: 1.18, bobMul: 1.35 } },
  { key: 'pirate', name: 'Pirate', crop: { x: 175, y: 150, w: 506, h: 600 } },
  { key: 'anubis', name: 'Anubis', crop: { x: 226, y: 168, w: 431, h: 564 } },
  { key: 'assassin', name: 'Assassin', crop: { x: 237, y: 168, w: 429, h: 564 } },
  { key: 'black-ninja', name: 'Black Ninja', crop: { x: 216, y: 171, w: 445, h: 561 } },
  { key: 'egyptian-mummy', name: 'Egyptian Mummy', crop: { x: 192, y: 141, w: 495, h: 591 } },
  { key: 'egyptian-sentry', name: 'Egyptian Sentry', crop: { x: 192, y: 141, w: 495, h: 591 } },
  { key: 'jungle-master', name: 'Jungle Master', crop: { x: 154, y: 156, w: 517, h: 595 } },
  { key: 'pumpkin-head', name: 'Pumpkin Head', crop: { x: 238, y: 133, w: 447, h: 599 } },
  { key: 'robin-hood', name: 'Robin Hood', crop: { x: 193, y: 186, w: 447, h: 565 } },
  { key: 'rogue', name: 'Rogue', crop: { x: 226, y: 195, w: 403, h: 556 } },
  { key: 'skull-night', name: 'Skull Night', crop: { x: 207, y: 184, w: 488, h: 548 } },
  { key: 'thief', name: 'Thief', crop: { x: 189, y: 156, w: 482, h: 595 } },
  { key: 'vampire', name: 'Vampire', crop: { x: 229, y: 161, w: 428, h: 571 } },
  { key: 'white-ninja', name: 'White Ninja', crop: { x: 233, y: 160, w: 433, h: 572 } },
  { key: 'evil-bad-guy', name: 'Evil Bad Guy', crop: { x: 276, y: 196, w: 373, h: 536 } },
  { key: 'old-guy', name: 'Old Guy', crop: { x: 276, y: 162, w: 373, h: 570 } },
  { key: 'monk', name: 'Monk', crop: { x: 273, y: 202, w: 372, h: 530 } },
];

const CHARACTERS = CHARACTER_ASSETS.map(sequenceCharacter);

const CHAR_COUNT = CHARACTERS.length;

export { CHARACTER_ASSETS, CHARACTERS, CHAR_COUNT };
