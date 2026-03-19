/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
  },
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    globals: true,
    coverage: {
      enabled: true,
      reporter: ['json-summary', 'json', 'text'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/utils/users.ts', 'src/components/ui/**'],
      thresholds: {
        functions: 70,
        branches: 70,
      },
    },
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
  optimizeDeps: {
    include: ['react-dom/client'],
  },
    build: {
      target: 'es2020',
      outDir: 'dist',
    },
  server: {
      host: true,
      port: 5173,
    open: false,
    watch: process.env.DOCKER ? { usePolling: true } : {},
  },
  });