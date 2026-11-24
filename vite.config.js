import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';

// Multi-page build: every .html file in the project root is a page.
const pages = Object.fromEntries(
  readdirSync(__dirname).filter((f) => f.endsWith('.html')).map((f) => [f.replace('.html', ''), resolve(__dirname, f)])
);

export default defineConfig({
  build: { rollupOptions: { input: pages } }
});
