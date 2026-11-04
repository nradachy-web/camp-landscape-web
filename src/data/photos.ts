/* The photo library. Two kinds, and the page always tells the truth about which:
     real    CAMP's own job and team photos.
     ai      made from a prompt for a service with no job photo yet. The caption
             says "Illustration". Never used as proof of a job.
   `alt` says what is in the frame; `caption` is what may be printed under it.
   Never caption a photo with a town unless CAMP has said where the job is.

   Real photos so far come from CAMP's WordPress media, its Google listing and its
   Facebook page (about 940 px wide: originals have to come from Chris). The
   rest is illustration until more real job photos arrive. Never name where a
   job is, and never show a house number, unit number or plate. */

import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });
const byId: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(files)) byId[path.split('/').pop()!.replace(/\.jpg$/, '')] = mod.default;

type Kind = 'real' | 'ai';
/** `focus` says where a fixed crop should anchor when the subject is not in the middle. */
interface Entry { alt: string; caption: string; kind?: Kind; focus?: 'top' | 'bottom' | 'left' | 'right' }

export const PHOTOS = {
  // real: CAMP's own photos (WordPress media, Google listing, CAMP's Facebook page)
  'wall-lakeside': { alt: 'A curved natural stone retaining wall with wide stone steps between a lake house lawn and the beach, seen from above', caption: 'Natural stone wall and steps on a lake lot' },
  'team-table': { alt: 'Two people going over plans at a dining table, one in an Ole Man RB\u2019s cap', caption: 'Planning the season', focus: 'right' },
  'real-fleet': { alt: 'Five CAMP pickups with red BOSS straight blade plows lined up in a lot in fall', caption: 'CAMP plow trucks, 2026' },
  'real-lot-cleared': { alt: 'An apartment parking lot plowed and salted after a snowfall, the walk shoveled and orange snow stakes along the beds', caption: 'Plowed, salted and staked after a storm' },
  'real-shop': { alt: 'The CAMP shop on Blaine Ave SE: a gray metal building with the CAMP sign and a fenced equipment yard', caption: 'The shop on Blaine Ave SE' },
  'real-steps': { alt: 'New timber steps with gravel treads climbing a mulched slope beside a house', caption: 'Timber steps with gravel treads' },
  'real-wall-front-before': { alt: 'A front slope dug out down to the dirt beside the city sidewalk', caption: 'Before' },
  'real-wall-front-after': { alt: 'A new timber retaining wall holding the front lawn above the sidewalk', caption: 'After' },
  'real-wall-side-before': { alt: 'A crumbling block bed at the corner of a house', caption: 'Before' },
  'real-wall-side-after': { alt: 'A new timber wall and fresh soil at the same house corner', caption: 'After' },
  'real-wall-apt-before': { alt: 'A rotted railroad tie wall under the trees beside a brick apartment building', caption: 'Before' },
  'real-wall-apt-after': { alt: 'The same bed at the apartment building rebuilt with a new timber wall', caption: 'After' },
  'real-leaf-before': { alt: 'A sloped front lawn buried under fall leaves in front of a brick ranch house', caption: 'Before' },
  'real-leaf-after': { alt: 'The same lawn and driveway cleared of leaves', caption: 'After' },
  // illustration
  'hero-wide': { alt: 'Illustration: the landscaped entry of a West Michigan office building at golden hour, striped lawn, grasses and limestone boulders', caption: 'Illustration', kind: 'ai' },
  'hero-tall': { alt: 'Illustration: a crisp edged bed of grasses, boxwood and a limestone boulder at an office entry at golden hour', caption: 'Illustration', kind: 'ai' },
  'ai-park-spring': { alt: 'Illustration: the office entry in spring, fresh mulch, new edges and a striped lawn', caption: 'Illustration', kind: 'ai' },
  'ai-park-fall': { alt: 'Illustration: the office entry in October, golden honeylocusts and a lawn cleared of leaves', caption: 'Illustration', kind: 'ai' },
  'ai-park-winter': { alt: 'Illustration: the office entry after a snowfall, the plaza and walk cleared and salted', caption: 'Illustration', kind: 'ai' },
  'ai-home-summer': { alt: 'Illustration: a brick and shake bungalow with deep beds of boxwood, hydrangea and grasses and a striped lawn', caption: 'Illustration', kind: 'ai' },
  'ai-home-fall': { alt: 'Illustration: the same bungalow in October, the oak in color and the lawn cleared of leaves', caption: 'Illustration', kind: 'ai' },
  'ai-home-spring': { alt: 'Illustration: the same bungalow in spring, tulips and daffodils in fresh mulch', caption: 'Illustration', kind: 'ai' },
  'ai-plow-night': { alt: 'Illustration: a pickup with a straight blade plowing a commercial lot at night in falling snow', caption: 'Illustration', kind: 'ai' },
  'ai-lot-plowed': { alt: 'Illustration: an office lot plowed to black asphalt and salted at dawn', caption: 'Illustration', kind: 'ai' },
  'ai-lot-snow': { alt: 'Illustration: an office lot under a fresh snowfall at dawn, lights still on', caption: 'Illustration', kind: 'ai' },
  'ai-irrigation': { alt: 'Illustration: a pop up rotor head spraying a lawn at sunrise', caption: 'Illustration', kind: 'ai' },
  'ai-patio': { alt: 'Illustration: a paver patio with a curved stone seat wall and a fire pit at dusk', caption: 'Illustration', kind: 'ai' },
  'ai-crew-mow': { alt: 'Illustration: a crew member on a stand on mower striping a commercial lawn', caption: 'Illustration', kind: 'ai' },
  'ai-bed-kept': { alt: 'Illustration: an office entry bed with sheared boxwoods, a fresh edge and new mulch', caption: 'Illustration', kind: 'ai' },
  'ai-lawn-clean': { alt: 'Illustration: a clean green lawn and an edged bed after a fall cleanup', caption: 'Illustration', kind: 'ai' },
} satisfies Record<string, Entry>;

export type PhotoId = keyof typeof PHOTOS;
export const PHOTO_IDS = Object.keys(PHOTOS) as [PhotoId, ...PhotoId[]];

export const photo = (id: PhotoId) => {
  const e = PHOTOS[id] as Entry;
  const src = byId[id];
  if (!src) throw new Error(`No file for photo ${id}`);
  return { ...e, kind: e.kind ?? 'real', src };
};

/* Real before and after pairs from CAMP's own posts. The two pictures are not taken
   from the same spot, so they sit side by side instead of in a slider. */
export interface Pair { before: PhotoId; after: PhotoId; title: string; note: string }
export const PAIRS = {
  'wall-front': { before: 'real-wall-front-before', after: 'real-wall-front-after', title: 'A front slope, held', note: 'The bank along the sidewalk dug out and a timber retaining wall built to hold the lawn above it.' },
  'wall-apt': { before: 'real-wall-apt-before', after: 'real-wall-apt-after', title: 'A rotted tie wall, replaced', note: 'Old railroad ties at an apartment building pulled and the bed rebuilt with a new timber wall.' },
  'wall-side': { before: 'real-wall-side-before', after: 'real-wall-side-after', title: 'A failing corner bed, rebuilt', note: 'A crumbling block bed at the house corner taken out and replaced with a timber wall.' },
  'leaf': { before: 'real-leaf-before', after: 'real-leaf-after', title: 'A fall cleanup', note: 'A lawn under a season of leaves, cleared down to the grass and the drive.' },
} satisfies Record<string, Pair>;
export type PairId = keyof typeof PAIRS;
