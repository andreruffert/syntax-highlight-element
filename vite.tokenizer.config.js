import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tokenizer = [resolve(__dirname, 'src/tokenizer/prism.js')];

export default defineConfig({
  build: {
    outDir: 'dist/tokenizer',
    rollupOptions: {
      input: tokenizer,
      output: {
        entryFileNames: () => '[name].js',
      },
    },
  },
});
