import type { APIRoute } from 'astro';
import { BRAND, RATING } from '../data/site';
import { GROUPS, inGroup, TREE_PARTNER } from '../data/services';
import { AREAS, AREA_NAMES, inArea } from '../data/cities';

/* A plain summary for AI assistants, in the llms.txt format. Built from the same
   data as the pages, so it cannot drift. */
export const GET: APIRoute = async () => {
  const u = (p: string) => `${BRAND.origin}${p}`;
  const rating = RATING.value ? ` ${RATING.value} stars on Google from ${RATING.countLabel} reviews as of ${RATING.asOf}.` : '';
  const lines = [
    `# ${BRAND.name}`,
    '',
    `> ${BRAND.name} is a landscape company in ${BRAND.city}, Michigan, owned by ${BRAND.owner}. It installs and maintains landscapes for commercial properties, apartment communities, HOAs and homes across greater Grand Rapids, services irrigation systems, and plows and salts commercial properties in winter.${rating} Shop: ${BRAND.street}, ${BRAND.city}, ${BRAND.state} ${BRAND.zip}. Phone and text ${BRAND.phone}.`,
    '',
    `Snow and ice removal is for commercial properties. Tree work is done by the sister company ${TREE_PARTNER.name} (${TREE_PARTNER.href}).`,
    '',
    '## Services',
    ...GROUPS.flatMap((g) => inGroup(g.id).map((s) => `- [${s.name}](${u(s.path)}): ${s.teaser}`)),
    '',
    '## Service areas',
    ...AREAS.map((a) => `- ${AREA_NAMES[a]}: ${inArea(a).map((c) => c.name).join(', ')}`),
    '',
    '## More',
    `- [All services](${u('/services/')})`,
    `- [Commercial grounds care](${u('/commercial/')}): one contract for mowing, beds, irrigation and snow`,
    `- [Plan your year](${u('/plan-your-year/')}): build a season by season plan for a property`,
    `- [All service areas](${u('/service-areas/')})`,
    `- [Get an estimate](${u('/get-an-estimate/')})`,
    `- [About](${u('/about/')})`,
    `- [Contact](${u('/contact/')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
