# Extending Derby Royale

Source lives under **`src/game/`**. Run **`pnpm dev`** while editing, then **`pnpm build`** before deploy.

Comments in `characters.js` and `scenes.js` mark the main extension points.

## Architecture (quick map)

| Symbol | Role |
|--------|------|
| `CHARACTERS` | Racer sprites — PNG run sheets (`public/sprites/`) |
| `COLORS` | Player colour swatches |
| `SCENES` | Parallax background layers + lane colours |
| `THEMES` | Time-of-day overlays (day / sunset / night) |
| `POWERUP_TYPES` | Pickup behaviour keys |
| `buildRacers()` | Creates sim state from lobby `players` |
| `drawScene()` | Paints background + track |

All racers use **PNG sprite sheets**. See **[assets.md](./assets.md)** for how to add `run.png` files and register them in `CHARACTERS`.

## Adding a character

1. Add **`public/sprites/<key>/run.png`** (see [assets.md](./assets.md)).
2. Add an entry to **`CHARACTERS`** in **`src/game/characters.js`**:

```javascript
{ key: 'wizard', name: 'Wizard', kind: 'hero', sheet: { src: '/sprites/wizard/run.png', ...SHEET_RUN } },
```

3. Refresh — the lobby picker cycles all `CHARACTERS` entries automatically.

### Critter vs hero

`kind` is for grouping/labels only; it does not change gameplay.

## Adding a scene

Scenes use **PNG parallax layers** plus semi-transparent lane colours. See **[assets.md](./assets.md)** for layer sizes and folder layout.

1. Add PNG layers under **`public/background/<key>/`** (numbered filenames, back → front).
2. Add an entry to **`SCENES`** in **`src/game/scenes.js`**:

```javascript
{
  key: 'city',
  name: 'City',
  layers: [
    { src: '/background/city/01-sky.png' },
    { src: '/background/city/02-skyline.png', parallax: 0.25 },
  ],
  track: 'rgba(120,120,130,0.5)',
  groundDark: 'rgba(80,80,90,0.5)',
  laneLine: 'rgba(100,100,110,0.7)',
},
```

3. Add a lobby button in **`index.html`** `#sceneSeg` (copy an existing `<button data-i="…">`).

Scene index `data-i` must match the array index (0-based). New layer paths load automatically on boot via **`loadBackgroundLayers()`**.

## Time of day

`THEMES` applies colour overlays on top of any scene. Usually you **don’t** need new entries unless you want a fourth mood (e.g. dawn).

## Power-ups

Types are defined in **`src/game/config.js`**:

```javascript
export const POWERUP_TYPES = ['boost', 'star', 'banana', 'bolt', 'shield'];
```

To add a type:

1. Append a key to `POWERUP_TYPES` in **`config.js`**.
2. Add entries to **`POWERUP_COLOR`** and **`POWERUP_GLYPH`** in the same file.
3. Handle behaviour in **`applyPowerup()`** in **`src/game/engine.js`**.
4. Document in the lobby `.pw-legend` in **`index.html`** and in [game-rules.md](./game-rules.md).

## Colours

Player colours come from **`COLORS`** in **`src/game/config.js`**.

## Audio

SFX uses the **Web Audio API** (`tone()`, `sfxPow()`, etc.). Hook new events there — keep volumes modest for mobile speakers.

## Testing checklist

- [ ] New character renders in picker preview and in-race at multiple `PXS` scales
- [ ] New scene layers don’t obscure the start/finish line
- [ ] 2-player and 8-player lobbies both work
- [ ] Power-up off/on paths still run
- [ ] Mobile viewport (narrow width, short height)
- [ ] `prefers-reduced-motion` — countdown still readable

## When to split further

The engine is still one file (`engine.js`). If that grows too large, split render/simulation/UI into separate modules — Vite already code-splits **`characters.js`** and **`scenes.js`** into their own chunks.

## Contributing

Open a PR with a screenshot or short screen recording of your character/scene in-race. Match the existing pixel scale and palette vibe (bright arcade, dark purple UI chrome).
