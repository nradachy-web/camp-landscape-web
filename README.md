# CAMP Landscape Management website

The website for CAMP Landscape Management (Chris Holmes, Grand Rapids, MI). Built by Modern Apex Strategies, November 2026, to replace the public pages of the WordPress site at camplandscape.com. The WordPress install also runs CAMP's back office (employee portal, estimates, invoices, QuickBooks connection, work orders): any launch must leave those routes on WordPress.

Astro, static HTML, no client framework, hosted on GitHub Pages. Preview: https://nradachy-web.github.io/camp-landscape-web/ (noindex).

- `docs/DESIGN.md`: the design system and the performance rules.
- Copy is JSON in `src/content`. Facts, launch notes and open questions are kept outside this public repo.

`npm run build` builds and checks the house rules. `node scripts/check-content.mjs <file>` checks one content file.
