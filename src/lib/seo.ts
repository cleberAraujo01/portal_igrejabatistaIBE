import type { Metadata } from 'next';
import { site } from './site';

/**
 * Fabrica de metadata por pagina.
 * -------------------------------------------------------------
 * Centraliza title/description unicos, canonical, Open Graph e
 * Twitter Cards. Cada page.tsx chama pageMetadata() com seus
 * proprios textos, garantindo consistencia e zero repeticao.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = path === '/' ? site.url : `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: canonical,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
