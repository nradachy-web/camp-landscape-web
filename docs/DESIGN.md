# Design: Every season

## The idea
CAMP's difference is the calendar. One company installs the landscape, keeps it up, waters it and plows it, so the site is built around one property through a year. It opens on a business park entry at golden hour and the line "One crew for your grounds, every season." Below it, the Season Dial shows the same property in spring, summer, fall and winter.

## Two planes and a contour line
| Plane | Token | Use |
|---|---|---|
| Ink | `--ink` #0e120f pine black | Heroes, the signature panels, the estimate band, the footer |
| Canvas | `--paper` #f1ede4 | Reading bands |
| White | `--white` #faf8f3 | A second light plane |

Where ink meets a light band they meet on a contour line (`Edge.astro`): the cut plus three thin rings, like a survey map.

## Two colors from the logo
Maroon, the band under the word CAMP: `--maroon` #7a1d24 for actions and labels on light planes, `--btn-ink` #8f2129 for buttons on ink. Every eyebrow starts with a short maroon tab, like the logo band. Oak, the leaf: `--accent` #b8cf8c on ink and `--accent-ink` #3d6310 on light planes, for the one italic phrase in a heading. Lamp amber is for stars only.

## Type
Inter Tight, heavy and tight, for headlines and reading. One phrase per heading in Newsreader italic: `**like this**`. The logo keeps its Stardos Stencil lettering; nothing else on the site is stencil. Two subset fonts, about 40 KB. The headline face is loaded twice under two names (swap for headlines, optional for body text) from one file, so it costs one request.

## Motion
One page-load moment on the home page: a dark veil lifts off the photo, the words rise and six contour lines draw themselves in behind the headline. Below that, motion answers the visitor. Reduced motion gets a still page.

## Signature panels
- **Season Dial** (`SeasonDial.astro`, `src/data/seasons.ts`): one property in four seasons, each picture made from the one before so they line up to the pixel. Radio buttons through :has(), no script needed. A few lines of script open it on today's season and mark it Now.
- **Drag to reveal** (`RevealPanel.astro`): plow a snowed in lot, clear a leaf covered lawn, bring back an overgrown entry bed.
- **Zone check** (`ZoneCheck.astro`): a front yard sprinkler plan. Run each zone as found (broken head, overspray on the drive, a dry patch), then flip to after a tune up. Pure SVG and CSS.
- **Plan your year** (`/plan-your-year/`): pick the property and the work each season; the year ribbon and the plan fill in with no script. Send this plan writes it into the estimate form and ticks the services.

## Photos: tell the truth about which is which
`src/data/photos.ts` has two kinds. `real`: CAMP's own photos. `ai`: an illustration, always captioned "Illustration". This draft is mostly illustration until CAMP's real job photos arrive.

## Performance rules
Inherited from the HD Landscape build: no client framework, CSS inlined, hero preloaded and art directed, every image sized and lazy below the hero, analytics after the first interaction, no scroll-linked animation.
