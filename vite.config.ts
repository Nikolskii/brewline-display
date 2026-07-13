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
});
