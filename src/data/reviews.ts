/* Reviews, word for word. Source and date are noted per review. A long review may
   be cut at a sentence end and is then marked `excerpt`, so the page shows an
   ellipsis. No words are changed. Names are first name and last initial.

   Nothing on the site says "every review is five stars". */

import type { ServiceId } from './services';

export interface Review {
  id: string;
  name: string;
  text: string;
  excerpt?: boolean;
  more?: string;
  /** What the job was, in the review's own terms. */
  job: string;
  services: ServiceId[];
  /** Where the words were read. */
  source: string;
}

export const REVIEWS: Review[] = [
  { id: 'chris-b', name: 'Chris B.', job: 'Snow removal and landscaping at three sites', services: ['snow-removal', 'landscape-management'], source: 'camplandscape.com About page, read 2026-11-03',
    text: 'I have used Camp for both snow removal and landscaping, at three different sites I have worked at. They have always kept the properties looking top notch. The office has always been fast to respond if any issues came up, or additional work was needed.' },
  { id: 'renee-a', name: 'Renee A.', job: 'Landscaping', services: ['landscaping', 'landscape-management'], source: 'camplandscape.com About page, read 2026-11-03',
    text: 'Camp Landscape is top notch! It’s rare to find people who go above and beyond like they do. I’m so pleased with the work they’ve done for me. They really took the time to do things right.' },
];

export const review = (id: string) => REVIEWS.find((r) => r.id === id);
export const forService = (id: ServiceId, n = 3) => {
  const hit = REVIEWS.filter((r) => r.services.includes(id));
  return (hit.length >= 2 ? hit : REVIEWS).slice(0, n);
};
