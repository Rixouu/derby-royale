# Debug Session: lobby-scene-art
- **Status**: [OPEN]
- **Issue**: Lobby canvas regressions after the asset-module extraction: first the canvas stayed hidden, then the fallback lobby track flashed briefly before the real art appeared.
- **Debug Server**: http://127.0.0.1:7777/event
- **Log File**: .dbg/trae-debug-log-lobby-scene-art.ndjson

## Reproduction Steps
1. Start the app.
2. Open the lobby screen.
3. Observe canvas behavior during startup.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | `currentSceneArtReady()` is called without `sceneIdx`, so the canvas stays hidden in the lobby. | High | Low | Confirmed |
| B | Active scene images are failing to load, so the lobby never gets real art. | Medium | Low | Rejected |
| C | `updateLobbySceneReveal()` exposes the procedural fallback track before the real art is shown. | High | Low | Confirmed |
| D | `engine.js` still references pre-refactor asset state on one code path that controls lobby visuals. | Low | Medium | Rejected |

## Log Evidence
- Pre-fix logs repeatedly showed `currentSceneArtReady missing valid sceneIdx`, confirming hypothesis A.
- Pre-fix logs also showed active scene images loaded successfully for the current scene, rejecting load failure.
- User screenshot after the first fix showed the fallback lobby track becoming visible briefly, confirming hypothesis C.

## Verification Conclusion
- Fix 1: pass `sceneIdx` into `currentSceneArtReady()` from `syncCanvasVisibility()`.
- Fix 2: snap `lobbySceneReveal` directly from `0` to `1` once the real art is ready, preventing the fallback track flash.
- Waiting for user verification before cleanup.
