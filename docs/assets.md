# Art assets guide

How to add **PNG character sprites** and **parallax background layers**. For scenes and power-ups in code, see [extending.md](./extending.md).

Run **`pnpm dev`** while testing assets locally. Files under **`public/`** are copied to **`dist/`** on build and served from the site root.

---

## Character sprites (PNG) — implemented

The game loads horizontal **sprite sheets** from `public/sprites/`. Procedural code-drawn racers have been removed.

### Folder layout

```txt
public/sprites/
├── fighter/run.png
├── samurai/run.png
├── shinobi/run.png
├── ninja/run.png
└── <your-key>/run.png
```

URL in code: **`/sprites/<key>/run.png`** (leading slash, lowercase paths recommended — Linux/Vercel are case-sensitive).

### Asset requirements

| Requirement | Detail |
|-------------|--------|
| **Format** | PNG with **transparent** background (not solid black) |
| **Layout** | Single **horizontal row** of frames |
| **Direction** | Character **faces right** (race scrolls left → right) |
| **Frame size** | Every frame same width × height |
| **Animation** | Run cycle only is required for racing |

### Measuring frame size

Open the PNG and read pixel dimensions:

```txt
frames = imageWidth ÷ frameWidth
```

Example: **1024 × 128** with 128px-wide frames → **8 frames**.

Current bundled sheets use **128 × 128** per frame, **8 frames** (1024px total width).

### Register in code

Add one entry to **`CHARACTERS`** in **`src/game/characters.js`**:

```javascript
const SHEET_RUN = { frameW: 128, frameH: 128, frames: 8 };

{
  key: 'ninja',
  name: 'Ninja',
  kind: 'hero', // or 'critter'
  sheet: { src: '/sprites/ninja/run.png', ...SHEET_RUN },
},
```

Custom frame size (example — 6 frames at 96×96):

```javascript
{
  key: 'wizard',
  name: 'Wizard',
  kind: 'hero',
  sheet: {
    src: '/sprites/wizard/run.png',
    frameW: 96,
    frameH: 96,
    frames: 6,
  },
},
```

No engine changes needed — **`src/game/sprite-sheets.js`** loads all `sheet.src` paths on boot; **`engine.js`** slices frames and draws them in-race.

### Player colour

The lobby **colour swatch** identifies each player (HUD dot, name label). **PNG art keeps its own colours** — the swatch does not recolour the sprite.

### Remove old entries

Each character should exist only once in `CHARACTERS` with a `sheet:` entry — no `draw:` blocks.

### Optional sheets (not wired yet)

`Idle.png`, `Walk.png`, etc. from asset packs are **not used** unless you add engine support. Only **`run.png`** is required for the race.

### Character checklist

- [ ] `public/sprites/<key>/run.png` exists
- [ ] Transparent PNG, faces right
- [ ] `frames = width ÷ frameW` matches `sheet.frames`
- [ ] Entry added to `CHARACTERS` in `characters.js`
- [ ] `pnpm dev` — cycle racer in lobby, start a race, check animation on phone + desktop

### Troubleshooting

| Issue | Fix |
|-------|-----|
| Black box around character | Re-export PNG with transparency |
| Sprite doesn’t appear | Check browser console; verify path and filename case |
| Wrong animation / sliding feet | Wrong `frameW` or `frames` count |
| Character faces left | Flip art to face right before importing |

### Third-party art

Keep license files or links (e.g. [Craftpix licenses](https://craftpix.net/file-licenses/)) if you use purchased/free packs commercially.

---

## Background art (PNG) — implemented

Scenes use **layered parallax PNGs** in the sky/horizon band above the track. The lane area uses **opaque** colours (same as the original procedural layout) so racers stay readable.

### Folder layout

```txt
public/background/
├── beach/01-coast.png
├── meadow/01-sky.png … 08-front-detail.png
├── snow/01-sky.png … 04-front.png
├── desert/01-sky.png, 02-rocks.png
└── volcano/01-sky.png, 02-aurora.png, 03-mountains.png
```

URL in code: **`/background/<scene>/<layer>.png`**.

### Asset requirements

| Requirement | Detail |
|-------------|--------|
| **Format** | PNG |
| **Layout** | One layer per file, back → front order in `scenes.js` |
| **Size** | Bundled Craftpix layers are **576 × 324**; scaled to viewport height |
| **Layout** | Parallax fills ~44% sky band; lanes use fixed pixel height (`PXS × 24`); dithered lane texture; optional `front: true` layers for trees |
| **Tiling** | Layers tile horizontally; left/right edges should match for seamless scroll |
| **Parallax** | Optional `parallax` per layer (0 = slowest); defaults in `backgrounds.js` |

### Register in code

Add or edit a scene in **`src/game/scenes.js`**:

```javascript
{
  key: 'desert',
  name: 'Desert',
  layers: [
    { src: '/background/desert/01-sky.png' },
    { src: '/background/desert/02-rocks.png', parallax: 0.35 },
  ],
  track: 'rgba(236,214,168,0.5)',
  groundDark: 'rgba(208,168,95,0.5)',
  laneLine: 'rgba(205,177,120,0.7)',
},
```

**`src/game/backgrounds.js`** loads all unique `layer.src` paths on boot. **`drawScene()`** in **`engine.js`** draws layers bottom-aligned, scaled to viewport height, with horizontal scroll tied to camera position.

Night theme still adds stars and a colour overlay on top (`THEMES` in `scenes.js`).

### Background checklist

- [ ] PNG layers under `public/background/<scene>/`
- [ ] Layers listed in order (sky first) in `scenes.js`
- [ ] Seamless left/right edges on scrolling layers
- [ ] Lane rgba colours keep racers readable on the art
- [ ] `pnpm dev` — cycle scenes in lobby, race on mobile + desktop widths

---

## Quick reference

| Asset type | Location | Code touchpoint | Status |
|------------|----------|-----------------|--------|
| Character run sheet | `public/sprites/<key>/run.png` | `characters.js` → `sheet:` | **Live** |
| Scene lane colours | — | `scenes.js` → `track`, `groundDark`, `laneLine` | **Live** |
| Background PNG layers | `public/background/<scene>/…` | `scenes.js` → `layers[]`, `backgrounds.js`, `drawScene()` | **Live** |

---

## Related docs

- [extending.md](./extending.md) — scenes, power-ups
- [deployment.md](./deployment.md) — build output includes `public/` assets
