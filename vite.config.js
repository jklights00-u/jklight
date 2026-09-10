import { resolve } from 'path';
import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import fs from 'fs';

function copyAssetsPlugin() {
  return {
    name: 'copy-assets-plugin',
    closeBundle() {
      try {
        const srcDir = resolve(__dirname, 'assets');
        const destDir = resolve(__dirname, 'dist', 'assets');
        if (fs.existsSync(srcDir)) {
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          fs.cpSync(srcDir, destDir, { recursive: true, force: true });
          console.log('[copy-assets-plugin] Successfully copied all assets into dist/assets/');
        }
      } catch (err) {
        console.error('[copy-assets-plugin] Error copying assets:', err);
      }
    }
  };
}

export default defineConfig({
  plugins: [cloudflare(), copyAssetsPlugin()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        products: resolve(__dirname, 'products.html'),
        blog: resolve(__dirname, 'blog.html'),
        faqs: resolve(__dirname, 'faqs.html'),
        contact: resolve(__dirname, 'contact.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  }
});