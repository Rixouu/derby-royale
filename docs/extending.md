# Extending Pixel Olympics

Source lives under **`src/game/`**. Run **`pnpm dev`** while editing, then **`pnpm build`** before deploy.

The main extension points are **`characters.js`**, **`scenes.js`**, and **`config.js`**.

## Architecture (quick map)

| Symbol | Role |
| ------ | ---- |
| `CHARACTERS` | Racer registry backed by numbered PNG frame sequences in `public/sprites/` |
| `SCENES` | Scene registry for background art, track art, and lane-layout tuning |
| `COLORS` | Player colour swatches used by the lobby and HUD |
| `POWERUP_TYPES` | Pickup behaviour keys |
| `buildRacers()` | Creates race state from the current lobby players |
| `drawScene()` | Paints backdrop, track, and start/finish lines |
| `loadSpriteSheets()` | Preloads all character frame sources |
| `preloadGameAssets()` | Loads the active scene first, then the rest of the art pack |

See **[assets.md](./assets.md)** for the real file formats used by the current sprite and scene pipeline.

## Adding a character

Characters are defined in **`src/game/characters.js`** and currently use **12 numbered PNG frames**:

```txt
public/sprites/<key>/
├── Running_000.png
├── Running_001.png
├── ...
└── Running_011.png
```

1. Add the 12 running frames under **`public/sprites/<key>/`**.
2. Measure the visible character crop inside each source frame.
3. Add one entry to **`CHARACTER_ASSETS`** in **`src/game/characters.js`**:

```javascript
{
  key: 'wizard',
  name: 'Wizard',
  crop: { x: 210, y: 160, w: 460, h: 580 },
  motion: { paceMul: 1.1, bobMul: 1.2 },
}
```

`sequenceCharacter()` converts that asset definition into the runtime `CHARACTERS` entry automatically.

### Crop fields

| Field | Meaning |
| ----- | ------- |
| `x` | Left offset inside each source PNG |
| `y` | Top offset inside each source PNG |
| `w` | Visible frame width to crop |
| `h` | Visible frame height to crop |

### Motion fields

Both are optional:

- `paceMul`: adjusts animation playback speed
- `bobMul`: adjusts vertical bob amount during the run cycle

Refresh the app after saving. The lobby picker cycles every `CHARACTERS` entry automatically.

## Adding a scene

Scenes use a **two-file pack**:

```txt
public/background/<scene-folder>/
├── 01-background.png
└── 02-track.png
```

1. Add scene art under **`public/background/<scene-folder>/`**.
2. Add an entry to **`SCENES`** in **`src/game/scenes.js`**:

```javascript
makeScene({
  key: 'sky-kingdom',
  name: 'Sky Kingdom',
  pickerLabel: 'Sky',
  folder: '08-sky-kingdom',
  sky: ['#4f7c69', '#c9f1c8'],
  ground: '#5d9827',
  groundDark: '#3d6f19',
  track: '#cf523d',
  laneLine: '#fff7ee',
})
```

### Scene layout tuning

The scene object can also tune how the track renders and how racers sit in the visible lanes:

- `visualLaneCount`
- `laneSlotMode`
- `laneCenterOffsetRatios`
- `racerYOffset`
- `trackTextureSlices`
- `trackHeightScaleMobile`
- `skyRatio`, `botRatio`, `minBottomPad`
- `hideRuntimeStartLine`

Use the exact folder slug in `folder:`. Scene buttons are generated automatically from `SCENES`, so no extra lobby markup is required.

### Scene art checklist

Before exporting or registering a new scene, check the current art spec:

- Use **[asset-dimensions.md](./asset-dimensions.md)** for the exact background and track handoff
- Use **[assets.md](./assets.md)** for the practical scene-pack workflow
- Keep `01-background.png` as environment only; do not bake the track into it
- Keep `02-track.png` as gameplay surface only with six orthographic lanes
- Keep large landmarks, skyline elements, temples, bridges, and major architecture in the background, not the track border
- Keep the track border minimal and landscaping-focused

### Asset loading

`makeScene()` builds `backdrop` and `trackTexture` paths automatically. At runtime:

- `sceneImageSources()` gathers the current scene art
- `preloadGameAssets()` loads the active scene first
- the lobby canvas stays hidden until the active scene art is ready

## Power-ups

Types are defined in **`src/game/config.js`**:

```javascript
export const POWERUP_TYPES = ['boost', 'star', 'banana', 'bolt', 'shield'];
```

To add a new type:

1. Append a key to `POWERUP_TYPES` in **`config.js`**.
2. Add entries to **`POWERUP_COLOR`** and **`POWERUP_GLYPH`** in the same file.
3. Handle the effect in **`applyPowerup()`** in **`src/game/engine.js`**.
4. Update the lobby rule copy in **`index.html`** and the public docs in **[game-rules.md](./game-rules.md)**.

## Colours

Player colours come from **`COLORS`** in **`src/game/config.js`**. They affect the UI swatch and HUD dots, not the imported character art itself.

## Audio

SFX uses the **Web Audio API** in **`src/game/engine.js`** (`tone()`, `sfxPow()`, `sfxFanfare()`, etc.). Keep volumes conservative for laptop and phone speakers.

## Dev helpers

In development, `installDebugTools()` exposes `window.__pixelOlympicsDebug` with helpers such as:

- `setPlayerCount()`
- `getLaneAudit()`
- `getLaneAlignmentReport()`
- `repairLaneAlignment()`
- `returnToLobby()`

These are useful when validating scene alignment across 2 to 6 players.

## Testing checklist

- [ ] New character renders in the picker preview and in-race
- [ ] New scene art looks correct in the lobby and during the race
- [ ] 2-player and 6-player lobbies both align to the intended visible lanes
- [ ] Track height feels correct on desktop and portrait mobile
- [ ] Power-ups still work with the updated art or config
- [ ] `pnpm build` succeeds after the change

## Contributing

Open a PR with a screenshot or short screen recording of your character or scene in-race. Match the existing pixel-art feel and verify the result on both desktop and phone-sized viewports.
