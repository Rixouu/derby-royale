# Pixel Olympics Asset Dimensions

This file is the current art handoff for the scene-pack system.

Each scene uses two separate assets with different responsibilities:

- `01-background.png` = stadium environment only
- `02-track.png` = gameplay surface only

## Scene pack structure

Each scene currently uses a two-file scene pack:

```txt
public/background/<nn-scene-slug>/
├── 01-background.png
└── 02-track.png
```

Current examples:

```txt
01-mountain-valley
02-neo-tokyo
08-sky-kingdom
```

## Scene pack spec

### 01-background.png

- Asset: environment background
- Dimensions: `2138 x 736`
- Format: lossless PNG
- Camera: fixed wide panoramic
- Projection: `2.5D` pixel art
- Transparency: none
- Looping: no
- Purpose: panoramic stadium environment used behind the race track

The background should include:

- complete environment
- skyline / mountains / city / river
- stadium architecture
- scoreboards
- banners
- lighting
- decorative set dressing

The background must never contain the running track. The bottom edge should finish exactly where the separate track asset begins.

### 02-track.png

- Asset: race track
- Dimensions: `2048 x 768`
- Format: PNG
- Camera: top-down
- Projection: orthographic
- Transparency: none
- Lanes: exactly `6`
- Purpose: gameplay surface only

Track layout:

- top decorative border
- LED strip
- track play area
- `6` equal lanes
- LED strip
- bottom decorative border

Lane specification:

- exactly `6` lanes
- equal lane height
- white lane separators
- left lane numbers
- consistent lane spacing
- no perspective

Border height guidance:

- top decorative border: about `110 px`
- bottom decorative border: about `110 px`
- track play area: about `548 px`

## Background safe area

- Top `75%`
  - sky
  - landmarks
  - city
  - mountains
- Bottom `25%`
  - stadium
  - scoreboards
  - railings
  - entrance

No gameplay elements should overlap outside the stadium area.

## Background design rules

- fixed perspective
- no visible horizon movement
- symmetrical composition
- bright daylight
- strong focal point in the center
- pixel-art style
- consistent lighting
- clean negative space above the skyline

Theme examples:

- Alpine Summit
- Bangkok
- Volcano Racing
- Space Colony
- Sky Kingdom
- Desert
- Sakura Garden
- Cyber City

## Track theme rules

The track surface should change depending on the environment.

Examples:

- Alpine: blue
- Bangkok: slight teal-blue asphalt with warm reflections and urban texture
- Volcano: dark basalt with lava glow
- Space Colony: cyan metallic
- Sky Kingdom: bright sky blue
- Desert: sandy orange

## Border design rules

Borders should remain minimal. They should feel like landscaping beside the race instead of large decorative scenes.

- Maximum height: about `110 px`

Good border examples:

- tropical plants
- Thai flowers
- palms
- stone curb
- LED lights
- road drainage
- sidewalks
- flower beds

Avoid:

- buildings
- temples
- large statues
- bridges
- skylines
- huge trees

Those belong in the background asset, not the track.

## Bangkok track style

Track surface:

- rich royal blue with a slight teal tint to match the Chao Phraya River
- subtle asphalt texture
- soft sun highlights
- white lane markings

Border:

- clean stone sidewalk
- red / white Thai curb sections used sparingly
- drainage channel
- blue LED strip
- low tropical hedges
- heliconia
- bird of paradise
- white jasmine
- pink bougainvillea
- small palms
- elephant ear plants
- no buildings
- no temples
- no skyline

The Bangkok border should read as "Bangkok streetscape landscaping", not "tourist Bangkok".

## Asset relationship

Use this relationship consistently:

| Asset | Purpose | Size |
| ----- | ------- | ---- |
| Background | Stadium environment only | `2138 x 736` |
| Track | Gameplay surface only | `2048 x 768` |

## Current scene workflow

Use this set for the current renderer:

- `01-background.png`: `2138 x 736`
- `02-track.png`: `2048 x 768`

If separate desktop/mobile scene packs are introduced later, document that only when the renderer officially supports them.

## Character sprite frames

### `Running_000.png` ... `Running_011.png`

- Purpose: racer run cycle
- Current project format: `12` numbered PNG files per character
- Format: transparent PNG
- Direction: character faces right
- Source canvas: keep every frame exported at the same size
- Crop workflow: the engine uses `crop.x`, `crop.y`, `crop.w`, and `crop.h` from `src/game/characters.js` to isolate the visible sprite area

There is no single shared frame size baked into the engine. Measure the real art you export, then set the matching crop rectangle in `characters.js`.

## Shared power-up asset

### `power-up.png`

- Purpose: shared question-box style pickup art
- Recommended size: `256 x 256`
- Minimum size: `128 x 128`
- Format: transparent PNG
- Shape: square

## UI / Store / Social Images

These are not part of a scene pack, but useful as a reference.

### Favicons

- `favicon-16x16.png`: `16 x 16`
- `favicon-32x32.png`: `32 x 32`
- `apple-touch-icon.png`: `180 x 180`

### Open graph image

- `og-image.png`: `1200 x 630`

## Export rules

- Use PNG for all scene assets
- Keep filenames lowercase and exact
- Keep scene folder names lowercase and exact; the current convention is `NN-scene-name`
- Do not bake the track into the background
- Do not put skyline, buildings, temples, bridges, or other large landmarks into the track borders
- Keep transparency only where it is needed, mainly on sprite sheets
- Avoid heavy blur because the game art reads best with crisp shapes

## Quick handoff

If you want one exact spec to give an artist, use this:

```txt
01-background.png            2138 x 736  PNG
02-track.png                 2048 x 768  PNG
Running_000.png ... 011.png  consistent PNG source size, transparent
power-up.png                 256 x 256   PNG with transparency
```

## Current file location

This spec is saved at:

`docs/asset-dimensions.md`
