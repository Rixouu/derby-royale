# 🏁 Derby Royale

**Derby Royale** is a browser drinking game built around a side-scrolling pixel-art race: pick your racers, cheer them to the finish line, and let the standings decide who sips.

Everything runs in a **single HTML file** — no build step, no backend, no install. Open it on a phone or laptop, add up to eight players, and start the race.

The game was built by [Jonathan Rycx](https://github.com/Rixouu), who leads product direction, design, and implementation across the Rixouu party-game repos.

[![HTML5 Canvas](https://img.shields.io/badge/Canvas-2D-ff8a2b?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Zero deps](https://img.shields.io/badge/Dependencies-none-2ee6c0?style=flat)](#-quick-start)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Key Features

### 🏎️ Pixel-art race

- Side-on race, left → right, with **photo finish** and live standings HUD.
- **Procedural sprites** — all characters, scenes, and effects are drawn on canvas; no image assets to load.
- **10 racer archetypes**: Turtle, Duck, Frog, Penguin, Bunny, Ninja, Speedster, Runner, Knight, Wizard.
- Each player gets a **custom colour** and **character picker** in the lobby.

### 🌍 Scenes & atmosphere

- **5 scenes**: Beach, Meadow, Snow, Desert, Volcano — each with unique sky, track, and pixel props.
- **3 times of day**: Day, Sunset, Night (colour overlays on the scene).
- **3 race lengths**: Sprint (quick), Classic (balanced), Marathon (epic).

### ⚡ Power-ups (optional)

Toggle power-ups on or off before the race.

| Icon | Power-up | Effect |
|------|----------|--------|
| Boost | Yellow | Burst of speed |
| Star | White | Speed + immunity |
| Banana | Gold | Drop a trap behind you |
| Lightning | Blue | Slow racers ahead |
| Bubble | Cyan | Block one hit |

### 🍻 Drinking rules

Built for groups — the results screen calculates sips automatically:

- **Winner** deals sips equal to the number of players.
- Everyone else drinks their **finishing place** (2nd = 2 sips, etc.).
- **Last place** gets one extra sip (chug call-out).
- **Slowpoke clause**: never led the race → +1 sip of shame.

Drink responsibly — water counts too. **18+**

### 🔊 Audio & UX

- Procedural **Web Audio** SFX (boosts, spins, finish fanfare).
- **Mute toggle** in the corner; respects `prefers-reduced-motion` for the countdown.
- Mobile-friendly layout with pixel fonts (**Press Start 2P**, **Jersey 10**).

## 🛠 Tech Stack

- **Single-file app**: `derby-royale.html` (HTML + CSS + vanilla JavaScript).
- **Canvas 2D** rendering with a low-res pixel scale (`image-rendering: pixelated`).
- **Web Audio API** for sound — no external libraries.
- **Google Fonts** for pixel typography (loaded from CDN when online).

No bundler, framework, or package manager required.

## 🚀 Quick Start

### Prerequisites

- Any modern browser (Chrome, Safari, Firefox, Edge).
- Optional: a local static file server if your browser blocks file:// audio or fonts (see below).

### Play locally

**Option A — open the file**

```bash
open derby-royale.html          # macOS
xdg-open derby-royale.html      # Linux
start derby-royale.html         # Windows
```

Or double-click `derby-royale.html` / `index.html` in Finder.

**Option B — local server (recommended for mobile testing on the same Wi‑Fi)**

```bash
# Python 3
python3 -m http.server 8080

# Node (npx, no install)
npx --yes serve .

# Then open http://localhost:8080
```

On your phone, use your machine’s LAN IP (e.g. `http://192.168.1.10:8080`).

### GitHub Pages

This repo includes `index.html`, which redirects to `derby-royale.html`. Enable **GitHub Pages** from the `main` branch root to host the game at:

`https://rixouu.github.io/derby-royale/`

## 📁 Project Structure

```txt
derby-royale/
├── derby-royale.html   # Full game (HTML + CSS + JS)
├── index.html          # Redirect entry point for static hosting
├── README.md
└── LICENSE
```

## 🎮 How to Play

1. **Add players** (up to 8) — tap colour to recolour, tap the racer sprite to cycle character.
2. Choose **scene**, **time of day**, and **race length**.
3. Toggle **power-ups** if you want chaos (or turn off for a pure sprint).
4. Tap **START THE RACE** — countdown, then watch the HUD.
5. **Results** show placement, sip counts, and optional party prompts — race again or edit settings.

Expand **How to play & power-ups** in the lobby for the full rule card.

## 🌟 Implementation Notes

- **Extending characters**: add an entry to the `CHARACTERS` array with a `draw(g, frame, tint)` function (see comments at the top of the script block).
- **Extending scenes**: add an entry to `SCENES` with sky colours, track palette, and a `prop` key for background decoration.
- **Sprite cache**: characters are pre-rendered to offscreen canvases per colour/frame for performance.
- **Lane model**: each player gets a dedicated lane; the camera tracks the race leader.

## 🔐 Privacy & Security

- **No accounts**, analytics, or network calls during gameplay (except optional Google Fonts CDN).
- **No data persistence** — refresh the page to reset the lobby.
- Safe to host as static files; nothing server-side to configure.

## 🤝 Contributing

Contributions are welcome.

1. Keep the game in a **single HTML file** unless there is a strong reason to split assets.
2. Preserve the pixel-art aesthetic and mobile-first layout.
3. Test on both desktop and a phone-sized viewport before opening a PR.

## 📄 License

[MIT License](LICENSE) — Copyright (c) 2026 Rixouu

## 👥 Team

- **Jonathan** — Lead Developer — [Rixouu](https://github.com/Rixouu)

## 🙏 Acknowledgments

- **Press Start 2P** & **Jersey 10** via Google Fonts
- Classic party-game energy from the Rixouu drinking-game collection ([split-the-g](https://github.com/Rixouu/split-the-g), [split-the-g-mobile](https://github.com/Rixouu/split-the-g-mobile), and friends)

---

**Built with ❤️ for friendly races and responsible sips.**
