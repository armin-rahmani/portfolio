import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.NODE_ENV === 'production' ? '/portfolio/' : '/';

function rewritePublicAssets(basePath: string) {
  return {
    name: 'rewrite-public-assets',
    transform(code: string, id: string) {
      if (id.includes('/src/') && basePath !== '/') {
        return {
          code: code
            .replace(/(['"])\/images\//g, `$1${basePath}images/`)
            .replace(/(['"])\/fonts\//g, `$1${basePath}fonts/`),
          map: null,
        };
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    rewritePublicAssets(base),
  ],
  server: {
    host: true,
    allowedHosts: true,
  },
});
