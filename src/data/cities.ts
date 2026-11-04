/* The towns. Grand Rapids is home, so its service pages ARE the main service
   pages. A town gets a hub at /service-areas/<id>/ only once its content file
   exists in src/content/cities; until then its links land on its line of the
   service areas page. Service-in-a-town pages exist only where MATRIX says so,
   and the matrix is chosen from real search demand (see _source/private-docs/MARKET.md). */

import { SERVICES, service, type Service, type ServiceId } from './services';

export type Area = 'Grand Rapids' | 'East' | 'South' | 'West' | 'North';

export interface City {
  id: string;
  name: string;
  county: 'Kent' | 'Ottawa' | 'Allegan';
  state: 'MI';
  area: Area;
  /** Map position. */
  lat: number;
  lon: number;
  home?: boolean;
}

const ALL: City[] = [
  { id: 'grand-rapids', name: 'Grand Rapids', county: 'Kent', state: 'MI', area: 'Grand Rapids', lat: 42.963, lon: -85.668, home: true },
  { id: 'east-grand-rapids', name: 'East Grand Rapids', county: 'Kent', state: 'MI', area: 'Grand Rapids', lat: 42.941, lon: -85.611 },
  { id: 'grand-rapids-township', name: 'Grand Rapids Township', county: 'Kent', state: 'MI', area: 'Grand Rapids', lat: 42.995, lon: -85.565 },
  { id: 'ada', name: 'Ada', county: 'Kent', state: 'MI', area: 'East', lat: 42.955, lon: -85.495 },
  { id: 'cascade-township', name: 'Cascade Township', county: 'Kent', state: 'MI', area: 'East', lat: 42.905, lon: -85.52 },
  { id: 'lowell', name: 'Lowell', county: 'Kent', state: 'MI', area: 'East', lat: 42.934, lon: -85.342 },
  { id: 'kentwood', name: 'Kentwood', county: 'Kent', state: 'MI', area: 'South', lat: 42.869, lon: -85.645 },
  { id: 'wyoming', name: 'Wyoming', county: 'Kent', state: 'MI', area: 'South', lat: 42.913, lon: -85.705 },
  { id: 'byron-center', name: 'Byron Center', county: 'Kent', state: 'MI', area: 'South', lat: 42.812, lon: -85.723 },
  { id: 'caledonia', name: 'Caledonia', county: 'Kent', state: 'MI', area: 'South', lat: 42.789, lon: -85.516 },
  { id: 'gaines-township', name: 'Gaines Township', county: 'Kent', state: 'MI', area: 'South', lat: 42.83, lon: -85.62 },
  { id: 'grandville', name: 'Grandville', county: 'Kent', state: 'MI', area: 'West', lat: 42.91, lon: -85.763 },
  { id: 'jenison', name: 'Jenison', county: 'Ottawa', state: 'MI', area: 'West', lat: 42.907, lon: -85.792 },
  { id: 'hudsonville', name: 'Hudsonville', county: 'Ottawa', state: 'MI', area: 'West', lat: 42.871, lon: -85.865 },
  { id: 'walker', name: 'Walker', county: 'Kent', state: 'MI', area: 'West', lat: 42.995, lon: -85.768 },
  { id: 'allendale', name: 'Allendale', county: 'Ottawa', state: 'MI', area: 'West', lat: 42.972, lon: -85.953 },
  { id: 'comstock-park', name: 'Comstock Park', county: 'Kent', state: 'MI', area: 'North', lat: 43.039, lon: -85.672 },
  { id: 'plainfield-township', name: 'Plainfield Township', county: 'Kent', state: 'MI', area: 'North', lat: 43.055, lon: -85.6 },
  { id: 'rockford', name: 'Rockford', county: 'Kent', state: 'MI', area: 'North', lat: 43.12, lon: -85.56 },
  { id: 'sparta', name: 'Sparta', county: 'Kent', state: 'MI', area: 'North', lat: 43.161, lon: -85.71 },
];

export const ALL_CITIES = ALL;
export const CITIES = ALL;
export const city = (id: string) => CITIES.find((c) => c.id === id)!;
export const AREAS: Area[] = ['Grand Rapids', 'East', 'South', 'West', 'North'];
export const AREA_NAMES: Record<Area, string> = {
  'Grand Rapids': 'Grand Rapids and East Grand Rapids',
  East: 'Ada, Cascade and Lowell',
  South: 'Kentwood, Wyoming and south',
  West: 'Grandville and Ottawa County',
  North: 'Rockford and north',
};
export const inArea = (a: Area) => CITIES.filter((c) => c.area === a);
export const areaId = (a: Area) => a.toLowerCase().replace(/[^a-z]+/g, '-');

const hubs = import.meta.glob('../content/cities/*.json');
const HUB_IDS = new Set(Object.keys(hubs).map((p) => p.split('/').pop()!.replace(/\.json$/, '')));
export const hasHub = (c: City) => HUB_IDS.has(c.id);
export const hubPath = (c: City) => (hasHub(c) ? `/service-areas/${c.id}/` : `/service-areas/#${c.id}`);
export const cityLabel = (c: City) => `${c.name}, ${c.state}`;

/** service id: towns that get their own page. Empty in the first draft. */
export const MATRIX: Partial<Record<ServiceId, string[]>> = {};

const slugFor = (s: Service, c: City) => `${s.townSlug}-${c.id}-${c.state.toLowerCase()}`;

/** Every service and town pair that gets its own page. */
export const TOWN_PAGES = Object.entries(MATRIX).flatMap(([sid, ids]) =>
  (ids ?? []).filter((id) => CITIES.some((c) => c.id === id)).map((id) => {
    const s = service(sid), c = city(id);
    return { service: s, city: c, slug: slugFor(s, c), key: `${s.id}--${c.id}` };
  }),
);

/** The page for one service in one town, or the main service page when it has none. */
export function townPath(s: Service, c: City): string {
  return TOWN_PAGES.some((p) => p.service.id === s.id && p.city.id === c.id) ? `/${slugFor(s, c)}/` : s.path;
}
export const hasTownPage = (s: Service, c: City) => TOWN_PAGES.some((p) => p.service.id === s.id && p.city.id === c.id);
export const townsFor = (s: Service) => TOWN_PAGES.filter((p) => p.service.id === s.id).map((p) => p.city);
export { SERVICES };
