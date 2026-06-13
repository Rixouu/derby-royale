# Extending Derby Royale

Source lives under **`src/game/`**. Run **`npm run dev`** while editing, then **`npm run build`** before deploy.

Comments in `characters.js` and `scenes.js` mark the main extension points.

## Architecture (quick map)

| Symbol | Role |
|--------|------|
| `CHARACTERS` | Racer sprites — procedural pixel art |
| `COLORS` | Player colour swatches |
| `SCENES` | Backgrounds (sky, track, props) |
| `THEMES` | Time-of-day overlays (day / sunset / night) |
| `POWERUP_TYPES` | Pickup behaviour keys |
| `buildRacers()` | Creates sim state from lobby `players` |
| `drawScene()` | Paints background + track |

Sprite grid size: **`GW = 18`**, **`GH = 22`** art pixels. Characters face **right**. Run animation uses **4 frames** (`0–3`).

## Adding a character

1. Open **`src/game/characters.js`** and find the `CHARACTERS` array.
2. Add an object:

```javascript
{
  key: 'robot',
  name: 'Robot',
  kind: 'hero', // or 'critter'
  draw: function (g, f, tint) {
    // g(x, y, w, h, color) paints a rectangle in art-pixel coords
    // f = frame 0..3, tint = player's chosen colour hex
    bipedLegs(g, f);
    var L = lean(f);
    g(6 + L, 8, 6, 7, tint);
    g(6 + L, 3, 6, 5, '#c9ced6');
    g(8 + L, 5, 2, 2, '#2ee6c0'); // eye
    bipedArms(g, f, tint);
  },
},
```

3. Reuse helpers where possible:
   - **`bipedLegs(g, f)`** / **`bipedArms(g, f, tint)`** — humanoid runners
   - **`lean(f)`** — subtle forward lean on contact frames
4. Keep drawing inside the `GW × GH` grid; origin is top-left.
5. Refresh — the lobby character picker cycles all `CHARACTERS` entries automatically.

### Critter vs hero

`kind` is for grouping/labels only; it does not change gameplay. Use `'critter'` for animals and `'hero'` for humanoid archetypes.

## Adding a scene

1. Find the `SCENES` array in **`src/game/scenes.js`**.
2. Add an entry:

```javascript
{
  key: 'city',
  name: 'City',
  sky: ['#4a6fa5', '#8fb8e8'],
  ground: '#5a5a5a',
  groundDark: '#3a3a3a',
  track: '#6a6a6a',
  laneLine: '#4a4a4a',
  finishWord: 'the finish',
  prop: 'building', // must match a branch in drawProp()
},
```

3. Implement the prop in **`drawProp()`** inside **`src/game/engine.js`** (search for `palm`, `cactus`, etc.) using the same `R()` pixel helper.
4. Add a lobby button in **`index.html`** `#sceneSeg` (copy an existing `<button data-i="…">`).

Scene index `data-i` must match the array index (0-based).

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
- [ ] New scene props don’t clip the track or finish line
- [ ] 2-player and 8-player lobbies both work
- [ ] Power-up off/on paths still run
- [ ] Mobile viewport (narrow width, short height)
- [ ] `prefers-reduced-motion` — countdown still readable

## When to split further

The engine is still one file (`engine.js`). If that grows too large, split render/simulation/UI into separate modules — Vite already code-splits **`characters.js`** and **`scenes.js`** into their own chunks.

## Contributing

Open a PR with a screenshot or short screen recording of your character/scene in-race. Match the existing pixel scale and palette vibe (bright arcade, dark purple UI chrome).
