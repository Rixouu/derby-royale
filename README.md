# 🏁 Pixel Olympics

**Pixel Olympics** is a browser drinking game built around a side-scrolling pixel-art race: pick your racers, cheer them to the finish line, and let the standings decide who sips.

It now includes **9 race scenes** including **Bangkok City**, **18 selectable racers** including **Evil Bad Guy**, **Old Guy**, and **Monk**, plus an in-game **English / French** language switcher.

Everything runs in the **browser** — no backend, no accounts. Clone the repo and run **`pnpm dev`**, or play the live build on a phone or laptop. Add up to six players and start the race.

**Play now:** [pixel-olympics.vercel.app](https://pixel-olympics.vercel.app/)

The game was built by [Jonathan Rycx](https://github.com/Rixouu), who leads product direction, design, and implementation across the Rixouu party-game repos.

[![HTML5 Canvas](https://img.shields.io/badge/Canvas-2D-ff8a2b?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?style=flat&logo=vercel)](docs/deployment.md)
[![License: PolyForm NC](https://img.shields.io/badge/License-PolyForm%20NC-blue.svg)](LICENSE)

## ✨ Key Features

### 🏎️ Pixel-art race

- Side-on race, left → right, with **photo finish** and live standings HUD.
- **18 PNG-sequence racers** in `public/sprites/` — Forest Ranger, Pirate, Anubis, Assassin, Black Ninja, Egyptian Mummy, Egyptian Sentry, Jungle Master, Pumpkin Head, Robin Hood, Rogue, Skull Night, Thief, Vampire, White Ninja, Evil Bad Guy, Old Guy, Monk
- Each player gets a **custom colour** (UI swatch) and **character picker** in the lobby.

### 🌍 Scenes & atmosphere

- **9 scene packs**: Sky Kingdom, Mountain Valley, Ancient Greek, Desert Grand Prix, Neo Tokyo, Space Colony, Tropical Island, Volcanic Racing, Bangkok City.
- Each scene uses a bespoke **background + track** scene pack.
- **3 race lengths**: Sprint (quick), Classic (balanced), Marathon (epic).

### 🌐 Languages

- Full UI support for **English** and **French**.
- The selected language is saved locally in the browser.

### ⚡ Power-ups (optional)

Toggle power-ups on or off before the race.

All pickups currently share the same `question-box` asset in `public/power/power-up.png`, while the gameplay effects stay distinct.

| Power-up | Effect |
|----------|--------|
| Boost | Burst of speed |
| Star | Speed + immunity |
| Banana | Drop a trap behind you |
| Lightning | Slow racers ahead |
| Shield | Block one hit |

### 🍻 Drinking rules

Built for groups — the results screen calculates sips automatically:

- **Winner** deals sips equal to the number of players.
- Everyone else drinks their **finishing place** (2nd = 2 sips, etc.).
- **Last place** gets one extra sip (chug call-out).
- **Slowpoke clause**: never led the race → +1 sip of shame.

Drink responsibly — water counts too. **18+**

Full rules and house variants: **[docs/game-rules.md](docs/game-rules.md)**

### 🔊 Audio & UX

- Procedural **Web Audio** SFX (boosts, spins, finish fanfare).
- **Mute toggle** in the corner; respects `prefers-reduced-motion` for the countdown.
- **English / French language switcher** in the lobby; the selected language is saved in the browser.
- Mobile-friendly layout with pixel fonts (**Press Start 2P**, **Jersey 10**).

## 🛠 Tech Stack

- **Vite** — dev server and production bundle (split ES modules, hashed assets)
- **Canvas 2D** rendering with a low-res pixel scale (`image-rendering: pixelated`)
- **Web Audio API** for sound — no external libraries
- **Self-hosted fonts** — Press Start 2P & Jersey 10 (WOFF2 in `public/fonts/`)
- **Vercel** static hosting — see **[docs/deployment.md](docs/deployment.md)**

## 🚀 Quick Start

### Develop locally

```bash
corepack enable
pnpm install
pnpm dev
```

Open **http://localhost:5173** (Vite prints the URL in the terminal).

### Production build

```bash
pnpm build
pnpm preview   # optional — serve dist/ at http://localhost:4173
```

### Play online

No install needed — **[pixel-olympics.vercel.app](https://pixel-olympics.vercel.app/)**

### Deploy on Vercel

1. Import [github.com/Rixouu/pixel-olympics](https://github.com/Rixouu/pixel-olympics) in Vercel.
2. Framework preset: **Vite** (auto-detected) — install: `pnpm install`, build: `pnpm build`, output: `dist`.
3. Deploy — live at **[pixel-olympics.vercel.app](https://pixel-olympics.vercel.app/)**.

Optional share URL: **`/play`** (rewrite to `/`). Details in **[docs/deployment.md](docs/deployment.md)**.

## 📁 Project Structure

```txt
pixel-olympics/
├── index.html              # App shell + meta (Vite entry)
├── src/
│   ├── main.js             # Boot
│   ├── styles/
│   │   ├── fonts.css       # Self-hosted @font-face
│   │   └── game.css        # UI + overlay styles
│   └── game/
│       ├── assets.js       # Asset preload + lobby scene reveal
│       ├── backgrounds.js  # Scene image source helpers
│       ├── config.js       # Constants (colors, lengths, power-ups)
│       ├── color.js        # Color helpers
│       ├── characters.js   # Racer registry + sprite crop data
│       ├── engine.js       # Canvas, race sim, UI, lane alignment, main loop
│       ├── i18n.js         # EN/FR copy, scene labels, and metadata translations
│       ├── image-loader.js # Shared image request cache
│       ├── palette.js      # Sprite palette helpers
│       ├── scenes.js       # Scene registry + track layout tuning
│       └── sprite-sheets.js# Sprite frame loading + source rect helpers
├── public/
│   ├── background/         # Scene packs (background + track)
│   ├── fonts/              # WOFF2 font files
│   ├── power/              # Shared power-up artwork
│   ├── sprites/            # Character frame sequences
│   ├── favicon.svg
│   ├── og-image.png
│   ├── site.webmanifest
│   └── sw.js
├── docs/
├── vite.config.js
├── package.json
├── pnpm-lock.yaml
└── vercel.json
```

## 🎮 How to Play

1. Pick **English** or **French** from the lobby language switcher if needed.
2. **Add players** (up to 6) — tap colour to recolour, tap the racer sprite to cycle character.
3. Choose **scene** and **race length**.
4. Toggle **power-ups** if you want chaos (or turn off for a pure sprint).
5. Tap **START THE RACE** — countdown, then watch the HUD.
6. **Results** show placement, sip counts, and optional party prompts — race again or edit settings.

Expand **How to play & power-ups** in the lobby for the in-game rule card.

## 🌟 Implementation Notes

- **Extending characters / scenes**: see **[docs/extending.md](docs/extending.md)**.
- **Character assets**: racers load from numbered PNG sequences (`Running_000.png` ... `Running_011.png`) with crop metadata in `src/game/characters.js`.
- **Localization**: all lobby, HUD, toast, results, scene, and metadata copy lives in `src/game/i18n.js`.
- **Latest content additions**: Bangkok City is registered in `src/game/scenes.js`, and Evil Bad Guy, Old Guy, and Monk are registered in `src/game/characters.js`.
- **Lane model**: scenes define explicit lane geometry and top-slot formation so 1..N racers occupy the correct visible lanes from the top.
- **Track layout**: track textures render proportionally, with scene-specific lane offsets and mobile height tuning to avoid squeezed tracks or oversized lower aprons.
- **Asset loading**: the lobby keeps the main canvas hidden until the active scene art is ready, then reveals the real background and track.

## 🔐 Privacy & Security

- **No accounts** or third-party analytics.
- Core gameplay runs locally in the browser.
- **Self-hosted fonts** — no Google Fonts CDN at runtime.
- **No data persistence** — refresh the page to reset the lobby.
- Security headers configured in `vercel.json`.

## 🤝 Contributing

Contributions are welcome.

1. Keep changes in **`src/game/`** — run **`pnpm dev`** to verify.
2. Preserve the pixel-art aesthetic and mobile-first layout.
3. Test on both desktop and a phone-sized viewport before opening a PR.
4. Update **docs** when you change rules or extension APIs.

## 📄 License

[PolyForm Noncommercial 1.0.0](LICENSE) — Copyright (c) 2026 Jonathan Rycx

Commercial use is not permitted under this license.

## 👥 Team

- **Jonathan** — Lead Developer — [Rixouu](https://github.com/Rixouu)

## 🙏 Acknowledgments

- **Press Start 2P** & **Jersey 10** (self-hosted WOFF2)
- Classic party-game energy from the Rixouu drinking-game collection ([split-the-g](https://github.com/Rixouu/split-the-g), [split-the-g-mobile](https://github.com/Rixouu/split-the-g-mobile), and friends)

---

**Built with ❤️ for friendly races and responsible sips.**
