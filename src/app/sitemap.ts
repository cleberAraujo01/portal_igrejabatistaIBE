import type { MetadataRoute } from 'next';
import { navigation, site } from '@/lib/site';

/**
 * sitemap.xml gerado pelo Next.
 * -------------------------------------------------------------
 * Deriva as URLs da navegacao central (lib/site.ts), entao novas
 * paginas entram no sitemap automaticamente. A home recebe prioridade
 * maxima; as demais, prioridade alta e revisao mensal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-07-01');
  // Home (prioridade maxima) + as paginas internas derivadas da navegacao.
  return [
    { url: site.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...navigation.map((item) => ({
      url: `${site.url}${item.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
