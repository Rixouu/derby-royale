import './styles/fonts.css';
import './styles/game.css';
import { bootGame } from './game/engine.js';

function start() {
  bootGame();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
