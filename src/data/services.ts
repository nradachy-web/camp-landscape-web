/* The service registry: names, URLs and the one-line facts that the menu, cards
   and town pages share. Page copy lives in src/content. Every service here is one
   CAMP lists on its own site (see _source/private-docs/FACTS.md). Tree work is done
   by Ole Man RB's Tree Service, the sister company, and links out.

   Irrigation installation and irrigation service are two separate services, as
   Chris and Sarah asked on 2026-11-09: a new system is one job, fixing the one
   you have is another. Pest control is not a CAMP service; it is weed control.

   `page: false` means the service is named in the menu and on cards but has no page
   of its own yet in this draft: its link goes to the parent page. */

import type { PhotoId } from './photos';

export type ServiceId =
  | 'landscaping' | 'retaining-walls' | 'sod-seed'
  | 'landscape-management' | 'lawn-mowing' | 'bed-maintenance' | 'lawn-treatment'
  | 'irrigation' | 'irrigation-service' | 'irrigation-start-up' | 'irrigation-winterization'
  | 'snow-removal';

export type GroupId = 'build' | 'care' | 'water' | 'winter';

export interface Service {
  id: ServiceId;
  name: string;
  /** Lower case, for use mid sentence. */
  noun: string;
  path: string;
  /** Slug used for the service-in-a-town pages: /{townSlug}-{city}-mi/. */
  townSlug: string;
  group: GroupId;
  photo: PhotoId;
  /** The full bleed photo band near the end of the page. */
  band: PhotoId;
  teaser: string;
  page?: boolean;
  /** Who it is for: both, or commercial properties only. */
  for?: 'both' | 'commercial';
}

export const GROUPS: { id: GroupId; name: string; blurb: string; photo: PhotoId; path: string }[] = [
  { id: 'build', name: 'Landscape installation', blurb: 'New yards, plantings, lawns, walls and steps, planned for the site and built by our crew.', photo: 'real-wall-front-after', path: '/landscaping/' },
  { id: 'care', name: 'Landscape management', blurb: 'Mowing, edging, beds, mulch and lawn treatments on a schedule you never have to chase.', photo: 'ai-crew-mow', path: '/landscape-management/' },
  { id: 'water', name: 'Irrigation', blurb: 'Sprinkler systems designed, installed, started in spring and blown out before the freeze.', photo: 'ai-irrigation', path: '/irrigation/' },
  { id: 'winter', name: 'Snow and ice', blurb: 'Plowing and salting for commercial lots, walks and entries, all winter.', photo: 'real-fleet', path: '/snow-and-ice-removal/' },
];

const ALL: Service[] = [
  { id: 'landscaping', name: 'Landscape installation', noun: 'landscape installation', path: '/landscaping/', townSlug: 'landscaping', group: 'build', photo: 'ai-home-summer', band: 'ai-home-spring', teaser: 'Grading, topsoil, seed, plantings, edging and mulch, from a bare lot to a finished yard.', page: true, for: 'both' },
  { id: 'retaining-walls', name: 'Retaining walls and steps', noun: 'retaining walls', path: '/landscaping/#walls', townSlug: 'retaining-walls', group: 'build', photo: 'real-wall-front-after', band: 'ai-home-summer', teaser: 'Walls and steps that hold a slope, stop erosion and make a hill usable.', for: 'both' },
  { id: 'sod-seed', name: 'Sod, seed and grading', noun: 'sod and seeding', path: '/landscaping/#lawns', townSlug: 'sod-installation', group: 'build', photo: 'ai-lawn-clean', band: 'ai-home-spring', teaser: 'Grading, topsoil, sod or hydroseed, so a new lawn starts level and takes.', for: 'both' },
  { id: 'landscape-management', name: 'Landscape management', noun: 'landscape management', path: '/landscape-management/', townSlug: 'landscape-management', group: 'care', photo: 'ai-crew-mow', band: 'ai-park-spring', teaser: 'Weekly care for apartment communities, offices and homes: mowing, edging, beds and seasonal upkeep.', page: true, for: 'both' },
  { id: 'lawn-mowing', name: 'Lawn mowing and edging', noun: 'lawn mowing', path: '/landscape-management/#mowing', townSlug: 'lawn-mowing', group: 'care', photo: 'ai-crew-mow', band: 'ai-crew-mow', teaser: 'A consistent mow with sharp edges along walks, curbs and beds.', for: 'both' },
  { id: 'bed-maintenance', name: 'Bed maintenance and mulch', noun: 'bed maintenance', path: '/landscape-management/#beds', townSlug: 'bed-maintenance', group: 'care', photo: 'ai-bed-kept', band: 'ai-bed-kept', teaser: 'Pruning, cutbacks, weeding and fresh mulch so beds look kept, not just mowed around.', for: 'both' },
  { id: 'lawn-treatment', name: 'Fertilizer and weed control', noun: 'lawn fertilizer and weed control', path: '/landscape-management/#treatment', townSlug: 'lawn-fertilization', group: 'care', photo: 'ai-park-spring', band: 'ai-park-spring', teaser: 'Timed fertilizer and weed control that keep turf thick, green and clean.', for: 'both' },
  { id: 'irrigation', name: 'Irrigation installation', noun: 'irrigation installation', path: '/irrigation/', townSlug: 'irrigation', group: 'water', photo: 'ai-irrigation', band: 'ai-home-summer', teaser: 'New sprinkler systems designed for the site and installed by our own crew, never subbed out.', page: true, for: 'both' },
  { id: 'irrigation-service', name: 'Irrigation service and repair', noun: 'irrigation service', path: '/irrigation/#service', townSlug: 'sprinkler-repair', group: 'water', photo: 'ai-irrigation', band: 'ai-irrigation', teaser: 'Repairs, leaks, zone adjustments and tune ups for the system you already have, whoever put it in.', for: 'both' },
  { id: 'irrigation-start-up', name: 'Spring start up', noun: 'sprinkler start up', path: '/irrigation/#spring', townSlug: 'sprinkler-start-up', group: 'water', photo: 'ai-irrigation', band: 'ai-irrigation', teaser: 'April and May: every zone run, checked and adjusted before the heat.', for: 'both' },
  { id: 'irrigation-winterization', name: 'Sprinkler winterization', noun: 'sprinkler winterization', path: '/irrigation/#winter', townSlug: 'sprinkler-winterization', group: 'water', photo: 'ai-home-fall', band: 'ai-home-fall', teaser: 'Lines and backflow blown clear with commercial equipment before the first hard freeze.', for: 'both' },
  { id: 'snow-removal', name: 'Snow and ice removal', noun: 'snow and ice removal', path: '/snow-and-ice-removal/', townSlug: 'snow-removal', group: 'winter', photo: 'real-fleet', band: 'ai-park-winter', teaser: 'Plowing, salting and walks for commercial properties, storm after storm.', page: true, for: 'commercial' },
];

/** Every service the content may name. Content validates against this list. */
export const ALL_SERVICES = ALL;
export const SERVICES = ALL;
export const PAGES = ALL.filter((s) => s.page);
export const service = (id: string) => SERVICES.find((s) => s.id === id)!;
export const inGroup = (g: GroupId) => SERVICES.filter((s) => s.group === g);
/** Kept for the shared components that came from the HD build. */
export const MI_SERVICES = SERVICES;

/* Tree work: the sister company. */
export const TREE_PARTNER = {
  name: "Ole Man RB's Tree Service",
  href: 'https://olemanrb.com/',
  blurb: 'Removals, trimming, crane work and stump grinding by our sister company, Ole Man RB’s Tree Service.',
};
