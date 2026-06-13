import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          characters: ['./src/game/characters.js'],
          scenes: ['./src/game/scenes.js'],
        },
      },
    },
  },
});
