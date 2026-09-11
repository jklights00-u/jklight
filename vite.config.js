import { resolve } from 'path';
import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import fs from 'fs';

// Ensure uploaded owner images are synchronized to assets
try {
  const uploadedPhoto = 'C:/Users/LENOVO/.gemini/antigravity-ide/brain/13b22998-cb27-4d1f-9f5a-3adf444c2f7c/.user_uploaded/media_1789104193719.png';
  const targetDir = resolve(__dirname, 'assets', 'owners');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  if (fs.existsSync(uploadedPhoto)) {
    fs.copyFileSync(uploadedPhoto, resolve(targetDir, 'kaushik-prajapati.png'));
    fs.copyFileSync(uploadedPhoto, resolve(targetDir, 'kaushik-prajapati.jpg'));
    const distTargetDir = resolve(__dirname, 'dist', 'assets', 'owners');
    if (!fs.existsSync(distTargetDir)) fs.mkdirSync(distTargetDir, { recursive: true });
    fs.copyFileSync(uploadedPhoto, resolve(distTargetDir, 'kaushik-prajapati.png'));
    fs.copyFileSync(uploadedPhoto, resolve(distTargetDir, 'kaushik-prajapati.jpg'));
  }
} catch (e) {
  // Ignore
}

function copyAssetsPlugin() {
  return {
    name: 'copy-assets-plugin',
    buildStart() {
      try {
        const uploadedPhoto = 'C:/Users/LENOVO/.gemini/antigravity-ide/brain/13b22998-cb27-4d1f-9f5a-3adf444c2f7c/.user_uploaded/media_1789104193719.png';
        const targetDir = resolve(__dirname, 'assets', 'owners');
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
        if (fs.existsSync(uploadedPhoto)) {
          fs.copyFileSync(uploadedPhoto, resolve(targetDir, 'kaushik-prajapati.png'));
          fs.copyFileSync(uploadedPhoto, resolve(targetDir, 'kaushik-prajapati.jpg'));
        }
      } catch (err) {}
    },
    closeBundle() {
      try {
        const copyFolder = (src, dest) => {
          if (fs.existsSync(src)) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.cpSync(src, dest, { recursive: true, force: true });
          }
        };

        copyFolder(resolve(__dirname, 'assets'), resolve(__dirname, 'dist', 'assets'));
        copyFolder(resolve(__dirname, 'js'), resolve(__dirname, 'dist', 'js'));
        copyFolder(resolve(__dirname, 'css'), resolve(__dirname, 'dist', 'css'));
        console.log('[copy-assets-plugin] Successfully copied assets, js, and css into dist/');
      } catch (err) {
        console.error('[copy-assets-plugin] Error copying assets:', err);
      }
    }
  };
}

export default defineConfig({
  base: './',
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