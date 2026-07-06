import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * robots.txt gerado pelo Next.
 * -------------------------------------------------------------
 * Libera todo o rastreamento e aponta para o sitemap. O host ajuda
 * os buscadores a canonicalizar o dominio.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
