// @ts-check
import { defineConfig } from 'astro/config';

// Preview builds live at https://nradachy-web.github.io/camp-landscape-web/ (BASE_PATH=/camp-landscape-web/).
// Production is the bare domain: leave BASE_PATH unset and SITE_URL at its default.
const site = process.env.SITE_URL || 'https://camplandscape.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  // Generated image sizes are kept here between builds (and cached in CI).
  cacheDir: './.cache',
  build: {
    format: 'directory',
    // All CSS ships inside the HTML: no render-blocking stylesheet request.
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp', config: { limitInputPixels: false } },
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
