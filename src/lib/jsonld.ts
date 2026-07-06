import { site, services } from './site';

/**
 * Structured Data (JSON-LD)
 * -------------------------------------------------------------
 * Gera os grafos schema.org que o Google usa para rich results e
 * o Knowledge Panel. Church herda de LocalBusiness/Organization,
 * entao um unico no cobre nome, endereco, geo, horarios, telefone
 * e sameAs. BreadcrumbList e gerado por pagina.
 */

const ORG_ID = `${site.url}/#church`;

/** No principal: Church + LocalBusiness. Injetado no layout raiz. */
export function churchJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    '@id': ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    foundingDate: String(site.foundedYear),
    telephone: site.phone.href,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: services.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${s.dayOfWeek}`,
      opens: s.opens,
      closes: s.closes,
      name: s.label,
    })),
    sameAs: [site.social.youtube, site.social.instagram],
  };
}

/** WebSite — habilita o nome do site na busca. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: { '@id': ORG_ID },
  };
}

/** BreadcrumbList por pagina. `crumbs` na ordem raiz -> atual. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}
