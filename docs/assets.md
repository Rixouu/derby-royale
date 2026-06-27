# Art Assets Guide

How to add **character PNGs** and **scene-pack art** for the current Pixel Olympics renderer. For the code-side workflow, see [extending.md](./extending.md).

Run **`pnpm dev`** while testing assets locally. Files under **`public/`** are copied to **`dist/`** on build and served from the site root.

---

## Character sprites

The shipped character system uses **12 numbered PNG frames per racer** stored under `public/sprites/<key>/`.

### Folder layout

```txt
public/sprites/
└── forest-ranger/
    ├── Running_000.png
    ├── Running_001.png
    ├── Running_002.png
    ├── ...
    └── Running_011.png
```

URL pattern in code:

```txt
/sprites/<key>/Running_000.png
...
/sprites/<key>/Running_011.png
```

Lowercase folder names are recommended because Linux and Vercel paths are case-sensitive.

### Asset requirements

| Requirement | Detail |
| ----------- | ------ |
| **Format** | PNG with transparency |
| **Frame count** | 12 files per character |
| **Naming** | `Running_000.png` through `Running_011.png` |
| **Direction** | Character faces right |
| **Canvas consistency** | Keep every frame exported at the same source size |
| **Animation** | Running cycle only is required by the current game |

### Important note about cropping

The engine does **not** assume the character fills the whole PNG. Instead, `characters.js` stores a crop rectangle used for every frame:

```javascript
{
  key: 'forest-ranger',
  name: 'Forest Ranger',
  crop: { x: 209, y: 163, w: 470, h: 588 },
  motion: { paceMul: 1.18, bobMul: 1.35 },
}
```

That crop rectangle means:

- `x`, `y`: where the visible sprite begins inside each source PNG
- `w`, `h`: how much of the frame to keep when drawing

If the art is centered inside a larger export canvas, update the crop values instead of reworking the engine.

### Register in code

Add one entry to **`CHARACTER_ASSETS`** in **`src/game/characters.js`**:

```javascript
{
  key: 'wizard',
  name: 'Wizard',
  crop: { x: 210, y: 160, w: 460, h: 580 },
  motion: { paceMul: 1.1, bobMul: 1.2 },
}
```

`sequenceCharacter()` converts that asset definition into the runtime `CHARACTERS` entry automatically. `loadSpriteSheets()` then preloads all generated frame URLs on boot.

### Player colour

The lobby **colour swatch** identifies each player in the UI and HUD. Imported PNG art keeps its own colours; the swatch does not recolour the sprite.

### Optional motion metadata

| Field | Purpose |
| ----- | ------- |
| `paceMul` | Speeds up or slows down animation playback |
| `bobMul` | Increases or reduces vertical bounce while running |

### Character checklist

- [ ] `public/sprites/<key>/Running_000.png` through `Running_011.png` exist
- [ ] All frames share the same source canvas size
- [ ] Transparent PNG export, facing right
- [ ] Entry added to `CHARACTER_ASSETS` in `characters.js`
- [ ] Crop bounds correctly frame the visible sprite
- [ ] `pnpm dev` and verify picker preview plus in-race animation on desktop and mobile

### Character troubleshooting

| Issue | Fix |
| ----- | --- |
| Black box around character | Re-export PNG with transparency |
| Sprite does not appear | Check filename case and verify all 12 `Running_###.png` files exist |
| Character looks clipped | Adjust `crop.x`, `crop.y`, `crop.w`, or `crop.h` |
| Character feels too floaty or stiff | Tune `motion.bobMul` and `motion.paceMul` |
| Character faces left | Flip the art before export |

### Third-party art

Keep license files or links if you use purchased or free commercial art packs.

---

## Scene packs

Each scene currently uses a **two-file pack**:

```txt
public/background/
└── 07-volcanic-racing/
    ├── 01-background.png
    └── 02-track.png
```

URL pattern in code:

```txt
/background/<scene-folder>/01-background.png
/background/<scene-folder>/02-track.png
```

### Scene asset requirements

| Requirement | Detail |
| ----------- | ------ |
| **Format** | PNG |
| **Layout** | One background file and one track file per scene |
| **Background size** | See [asset-dimensions.md](./asset-dimensions.md); current target is `2138 x 736` |
| **Track size** | Current target is `2048 x 768` |
| **Folder naming** | Use the exact slug from `scenes.js`, usually `NN-scene-name` |

### What each file does

| File | Purpose |
| ---- | ------- |
| `01-background.png` | Stadium environment only: skyline, mountains, river, scoreboards, architecture, and distant set dressing |
| `02-track.png` | Gameplay surface only: six lanes, lane markings, LED strips, and minimal landscaped borders |

### Background / track relationship

- `01-background.png` must never include the running track
- The bottom edge of the background should finish exactly where the track begins
- `02-track.png` should stay orthographic and gameplay-first
- Large landmarks, temples, bridges, skylines, and buildings belong in the background, not the track border
- Track borders should read as landscaping beside the race, not a second environment scene

### Bangkok guidance

For Bangkok specifically:

- background: use the environment asset for skyline, river, stadium framing, and city landmarks
- track surface: rich royal blue with a slight teal tint, subtle asphalt texture, soft sun highlights, and white lane markings
- border: use low Bangkok streetscape landscaping such as sidewalks, drainage, Thai curb accents, LED strips, hedges, palms, heliconia, jasmine, bougainvillea, and elephant ear plants
- avoid tourist-scene elements in the track border such as temples, buildings, statues, bridges, or skyline silhouettes

### Register scene in code

Add or edit a scene in **`src/game/scenes.js`**:

```javascript
makeScene({
  key: 'volcanic-racing',
  name: 'Volcanic Racing',
  pickerLabel: 'Volcano',
  folder: '07-volcanic-racing',
  sky: ['#5f2d26', '#f2995a'],
  ground: '#594239',
  groundDark: '#31211d',
  track: '#8b4334',
  laneLine: '#ffe6c8',
})
```

`makeScene()` derives `backdrop` and `trackTexture` automatically from `folder`.

### Layout-sensitive scene fields

These fields matter when tuning how the track sits on screen:

- `trackTextureSlices`
- `visualLaneCount`
- `laneSlotMode`
- `laneCenterOffsetRatios`
- `trackHeightScaleMobile`
- `skyRatio`, `botRatio`, `minBottomPad`
- `hideRuntimeStartLine`

Use them when new art changes lane geometry or the visible apron size.

### Scene checklist

- [ ] `01-background.png` and `02-track.png` exist under `public/background/<scene-folder>/`
- [ ] Background and track use the current size guidance from [asset-dimensions.md](./asset-dimensions.md)
- [ ] Background contains environment only and stops cleanly where the separate track begins
- [ ] Track art keeps racers readable and aligned to visible lanes
- [ ] Track border stays minimal and does not contain skyline-scale scenery
- [ ] Start and finish remain readable
- [ ] `pnpm dev` and verify the scene in the lobby plus live race on desktop and portrait mobile

---

## Shared power-up art

The current game uses one shared pickup asset:

```txt
public/power/power-up.png
```

The gameplay effect still comes from the power-up type in code (`boost`, `star`, `banana`, `bolt`, `shield`).

---

## Quick Reference

| Asset type | Location | Code touchpoint | Status |
| ---------- | -------- | --------------- | ------ |
| Character run frames | `public/sprites/<key>/Running_###.png` | `characters.js` → `CHARACTER_ASSETS` | **Live** |
| Scene pack art | `public/background/<scene-folder>/...` | `scenes.js` → `folder`, `backdrop`, `trackTexture` | **Live** |
| Scene lane tuning | — | `scenes.js` scene metadata | **Live** |
| Shared pickup art | `public/power/power-up.png` | `assets.js` + `engine.js` | **Live** |

---

## Related Docs

- [extending.md](./extending.md) — code-side workflow for characters, scenes, and power-ups
- [asset-dimensions.md](./asset-dimensions.md) — exact scene pack and sprite guidance
- [deployment.md](./deployment.md) — build output includes all `public/` assets
