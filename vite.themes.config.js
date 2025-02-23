import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

const themes = [resolve(__dirname, 'src/themes/prettylights.css')];

export default defineConfig({
  build: {
    outDir: 'dist/themes',
    cssMinify: false,
    rollupOptions: {
      input: themes,
      output: {
        assetFileNames: () => '[name][extname]',
      },
    },
  },
});
