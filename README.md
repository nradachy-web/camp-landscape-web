# CAMP Landscape Management website

The website for CAMP Landscape Management (Chris Holmes, Grand Rapids, MI). Built by Modern Apex Strategies, November 2026, to replace the public pages of the WordPress site at camplandscape.com. The WordPress install also runs CAMP's back office (employee portal, estimates, invoices, QuickBooks connection, work orders): any launch must leave those routes on WordPress.

Astro, static HTML, no client framework. Live at https://camplandscape.com since November 10, 2026. Every push to main also publishes a noindex preview to GitHub Pages: https://nradachy-web.github.io/camp-landscape-web/ (the preview is not the live site).

- `docs/DESIGN.md`: the design system and the performance rules.
- Copy is JSON in `src/content`. Facts, launch notes and open questions are kept outside this public repo.

`npm run build` builds and checks the house rules. `node scripts/check-content.mjs <file>` checks one content file.

## How the live site is served

The site runs on CAMP's Hostinger account, next to the WordPress install, which stays in charge of the back office. The built files live in `public_html/_apex-site-20261110/`. A block in `public_html/.htaccess`, between `# BEGIN MODERN APEX STATIC SITE` and `# END MODERN APEX STATIC SITE` and directly above `# BEGIN WordPress`, serves a path from that folder only when a matching file exists there. Every other path (employee portal, login, wp-admin, wp-json, blog) falls through to WordPress unchanged. Deleting the block rolls the public pages back to WordPress.

Because a file in that folder takes its path away from WordPress, never add a page whose address matches a back office route (employee-portal, camp-login, estimate, proposal, countersign, work-order, invoices and the rest).

## Shipping a change to camplandscape.com

1. `npm ci`
2. Build for production with the ops@camplandscape.com Web3Forms access key (ask Modern Apex), leaving `BASE_PATH` and `SITE_URL` unset:
   `PUBLIC_WEB3FORMS_KEY=... npm run build`
   Without the key the job application falls back to "call or text the office", and the estimate form loses its email backup.
3. Upload the contents of `dist/` into `public_html/_apex-site-20261110/`, replacing files. Never empty or overwrite `public_html` itself.
4. Purge LiteSpeed (WordPress admin, or `wp litespeed-purge all`) and flush the Hostinger CDN cache in hPanel.
5. Check the home page, one service page, and that `/employee-portal/` still sends signed out visitors to `/camp-login/`.

## Forms

- Estimate form (`src/components/QuoteForm.astro`): posts JSON to `/wp-json/cmp/v1/leads`. If that does not answer OK, the same request is emailed to ops@ through Web3Forms with "NOT in the office system" in the subject, so no lead is lost.
- Job application (`src/components/ApplyForm.astro`): emailed to ops@ through Web3Forms.

