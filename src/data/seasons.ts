/* The year at CAMP: what the crew does to one property, season by season. The
   Season Dial shows it on four pictures of the same property made one from the
   other, so they line up to the pixel. Every line here has to be a service on the
   site (see _source/private-docs/FACTS.md). */

export type SeasonId = 'spring' | 'summer' | 'fall' | 'winter';

export interface Season {
  id: SeasonId;
  name: string;
  /** Months, as the crew counts them in West Michigan. */
  months: string;
  /** Month numbers 1 to 12, for the year ribbon and for opening on today. */
  span: number[];
  title: string;
  items: string[];
  link: { label: string; path: string };
}

export const SEASONS: Season[] = [
  {
    id: 'spring',
    name: 'Spring',
    months: 'March to May',
    span: [3, 4, 5],
    title: 'Wake the property up.',
    items: ['Spring cleanup: beds cleared, grasses and perennials cut back', 'Fresh spade edges and new mulch', 'Irrigation started up and checked zone by zone', 'The first mows of the year'],
    link: { label: 'Landscape management', path: '/landscape-management/' },
  },
  {
    id: 'summer',
    name: 'Summer',
    months: 'June to August',
    span: [6, 7, 8],
    title: 'Keep it sharp every week.',
    items: ['Mowing and trimming on a set schedule', 'Weeding, pruning and shrub shaping', 'Sprinklers checked and adjusted as the heat comes', 'New plantings, patios and walls installed'],
    link: { label: 'Landscape installation', path: '/landscaping/' },
  },
  {
    id: 'fall',
    name: 'Fall',
    months: 'September to November',
    span: [9, 10, 11],
    title: 'Clear it and close it down.',
    items: ['Leaf cleanup and the last mows', 'Beds cut back and put to bed', 'Irrigation blown out before the freeze', 'Snow stakes set along drives and curbs'],
    link: { label: 'Irrigation', path: '/irrigation/' },
  },
  {
    id: 'winter',
    name: 'Winter',
    months: 'December to February',
    span: [12, 1, 2],
    title: 'Keep it open when it snows.',
    items: ['Lots and drives plowed', 'Salt on walks, entries and lots', 'Sidewalks and entries cleared', 'Next season planned while the ground sleeps'],
    link: { label: 'Snow and ice removal', path: '/snow-and-ice-removal/' },
  },
];

export const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
