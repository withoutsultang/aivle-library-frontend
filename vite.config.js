import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: { 'import.meta.env.DEMO_MODE': JSON.stringify(mode === 'demo') },
  server: {
    proxy: {
      "/api/v1": {
        target: mode === 'demo' ? 'http://127.0.0.1:18080' : 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  preview: { proxy: { "/api/v1": { target: mode === 'demo' ? 'http://127.0.0.1:18080' : 'http://localhost:8080', changeOrigin: true } } },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.jsx',
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
  },
}));
