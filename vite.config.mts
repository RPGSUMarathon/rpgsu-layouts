import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodecg from './vite-nodecg.mjs';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({ typescript: { tsconfigPath: './tsconfig.browser.json' } }),
    nodecg({
      bundleName: 'rpgsu-layouts',
      graphics: './src/browser/graphics/views/*.tsx',
      dashboard: './src/browser/dashboard/*.tsx',
    }),
  ],
});