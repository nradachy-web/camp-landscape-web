import type { APIRoute } from 'astro';

/* A preview build tells every crawler to stay out. Production lets them in,
   except WordPress admin (the back office stays in WordPress on this domain,
   as the old robots.txt had it). The blog posts stay in WordPress until the new
   blog is built, so their sitemap is listed too. */
export const GET: APIRoute = () => {
  const preview = import.meta.env.BASE_URL !== '/';
  const body = preview
    ? 'User-agent: *\nDisallow: /\n'
    : [
        '# Search engines and AI answer engines are welcome here.',
        ...['*', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'].flatMap((a) => [`User-agent: ${a}`, 'Allow: /', 'Disallow: /wp-admin/', 'Allow: /wp-admin/admin-ajax.php', '']),
        'Sitemap: https://camplandscape.com/sitemap.xml',
        'Sitemap: https://camplandscape.com/wp-sitemap-posts-post-1.xml',
        '',
      ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
