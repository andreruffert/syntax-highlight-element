import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SyntaxHighlightElement',
      fileName: 'syntax-highlight-element',
      cssFileName: 'syntax-highlight-element',
    },
  },
});
