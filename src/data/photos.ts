/* The photo library. Two kinds, and the page always tells the truth about which:
     real    CAMP's own job and team photos.
     ai      made from a prompt for a service with no job photo yet. The caption
             says "Illustration". Never used as proof of a job.
   `alt` says what is in the frame; `caption` is what may be printed under it.
   Never caption a photo with a town unless CAMP has said where the job is.

   This draft is mostly illustration because CAMP's real job photos have not been
   collected yet. Each one is swapped for a real photo as they arrive. */

import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });
const byId: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(files)) byId[path.split('/').pop()!.replace(/\.jpg$/, '')] = mod.default;

type Kind = 'real' | 'ai';
/** `focus` says where a fixed crop should anchor when the subject is not in the middle. */
interface Entry { alt: string; caption: string; kind?: Kind; focus?: 'top' | 'bottom' | 'left' | 'right' }

export const PHOTOS = {
  // real
  'wall-lakeside': { alt: 'A curved natural stone retaining wall with wide stone steps between a lake house lawn and the beach, seen from above', caption: 'Natural stone wall and steps on a lake lot' },
  'team-table': { alt: 'Chris Holmes and Sarah going over plans at a dining table', caption: 'Planning a season', focus: 'right' },
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

export interface Pair { before: PhotoId; after: PhotoId; title: string; note: string; design?: boolean; ratio?: number }
export const PAIRS = {} satisfies Record<string, Pair>;
export type PairId = keyof typeof PAIRS;
