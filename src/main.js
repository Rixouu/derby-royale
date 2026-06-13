import './styles/fonts.css';
import './styles/game.css';
import { bootGame } from './game/engine.js';

async function start() {
  await bootGame();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
