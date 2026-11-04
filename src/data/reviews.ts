/* Reviews, word for word. Source and date are noted per review. A long review may
   be cut at a sentence end and is then marked `excerpt`, so the page shows an
   ellipsis. No words are changed. Names are first name and last initial.

   Left out on purpose: reviews that name crew members (the crew changed in 2026),
   Dustin P. (praises the previous owner), Nate V. (a subcontractor), Facebook-only
   testimonial cards, and "Nicholas R." (very likely written by our agency).

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
  /** The star rating, when the source shows one. */
  stars?: number;
}

export const REVIEWS: Review[] = [
  { id: 'christine-s', name: 'Christine S.', job: 'Retaining wall beside the garage', services: ['landscaping', 'retaining-walls'], source: 'Google, read 2026-11-03', stars: 5,
    text: 'We had Camp Landscape come do a retaining wall for the side of our garage. They did a fabulous job and we would highly recommend them. Job site was cleaned and graded before they left and they always asked if things were looking the way we had anticipated.' },
  { id: 'chris-b', name: 'Chris B.', job: 'Snow removal and landscaping at three sites', services: ['snow-removal', 'landscape-management'], source: 'Google, read 2026-11-03', stars: 5,
    text: 'I have used Camp for both snow removal and landscaping, at three different sites I have worked at. They have always kept the properties looking top notch. The office has always been fast to respond if any issues came up, or additional work was needed.' },
  { id: 'lavelle-l', name: 'Lavelle L.', job: 'Lawn care', services: ['landscape-management', 'lawn-treatment', 'lawn-mowing'], source: 'Google, read 2026-11-03', stars: 5, excerpt: true,
    text: 'I couldn’t be more pleased with the service I received from CAMP Landscape Management. From start to finish, they were professional, prompt, and thorough. My lawn looks healthier and more vibrant than ever.' },
  { id: 'jayme-k', name: 'Jayme K.', job: 'New landscaping and irrigation', services: ['irrigation', 'landscaping'], source: 'Google, read 2026-11-03 (signed out view shows the start only)', stars: 5, excerpt: true,
    text: 'Camps Lawn Care did an absolutely amazing job on our new landscaping and irrigation project! From start to finish, the entire team was professional, efficient, and a pleasure to work with.' },
  { id: 'molli', name: 'Molli', job: 'Landscaping', services: ['landscaping'], source: 'Google, read 2026-11-03 (signed out view shows the start only)', stars: 5, excerpt: true,
    text: 'I couldn’t be happier with the work this landscape company did for me! From the first consultation to the final touches, they were professional, friendly, and incredibly knowledgeable.' },
  { id: 'renee-a', name: 'Renee A.', job: 'Landscaping', services: ['landscaping', 'landscape-management'], source: 'camplandscape.com About page, read 2026-11-03',
    text: 'Camp Landscape is top notch! It’s rare to find people who go above and beyond like they do. I’m so pleased with the work they’ve done for me. They really took the time to do things right.' },
];

export const review = (id: string) => REVIEWS.find((r) => r.id === id);
export const forService = (id: ServiceId, n = 3) => {
  const hit = REVIEWS.filter((r) => r.services.includes(id));
  return (hit.length >= 2 ? hit : REVIEWS).slice(0, n);
};
