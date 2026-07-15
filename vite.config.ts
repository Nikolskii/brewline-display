import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@' → /src. Разрешается Vite на сборке (в отличие от backend, где чистый Node).
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Dev-proxy: браузер ходит на :5173, Vite форвардит на backend — один origin, CORS не нужен.
    // Префикс '/orders' покрывает и GET /orders, и SSE /orders/stream. Прод — в срезе 2.
    proxy: {
      '/orders': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
