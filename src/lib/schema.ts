import { ATTRACTION, PHOTOS, SITE_NAME } from '../data/site';
import type { Faq } from '../data/faqs';

export type Schema = Record<string, unknown>;

/** Convierte una ruta interna en URL absoluta cuando hay `site` configurado. */
export function absoluteUrl(site: URL | undefined, path: string): string | undefined {
  if (!site) return undefined;
  return new URL(path, site).toString();
}

/** WebSite + Organization: se emite en todas las páginas. */
export function buildSiteSchema(site: URL | undefined): Schema {
  const url = absoluteUrl(site, '/');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        ...(url ? { '@id': `${url}#website`, url } : {}),
        name: SITE_NAME,
        description: `Guía de visita independiente del ${ATTRACTION.name} en ${ATTRACTION.city}, ${ATTRACTION.country}.`,
        inLanguage: 'es-SV',
      },
      {
        '@type': 'Organization',
        ...(url ? { '@id': `${url}#organization` } : {}),
        name: SITE_NAME,
        description: 'Proyecto editorial independiente de información turística sin fines de lucro.',
      },
    ],
  };
}

/** Entidad principal del sitio: se emite una sola vez, desde la portada. */
export function buildAttractionSchema(site: URL | undefined): Schema {
  const url = absoluteUrl(site, '/');
  const image = absoluteUrl(site, PHOTOS.frontal.src);
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'LandmarksOrHistoricalBuildings'],
    ...(url ? { '@id': `${url}#attraction`, url } : {}),
    name: ATTRACTION.name,
    alternateName: [
      ATTRACTION.englishName,
      ATTRACTION.commonName,
      ATTRACTION.shortName,
      `${ATTRACTION.name} (${ATTRACTION.city})`,
    ],
    description: `El ${ATTRACTION.name} es el conjunto escultórico de 1942 que preside la ${ATTRACTION.commonName} en ${ATTRACTION.city}: una figura de Cristo en mármol de Carrara sobre un globo terráqueo y un pedestal de concreto. Plaza pública abierta las 24 horas y acceso gratuito.`,
    telephone: ATTRACTION.phoneE164,
    ...(image ? { image: [image] } : {}),
    isAccessibleForFree: true,
    publicAccess: true,
    touristType: 'Monumento histórico, hito cívico-religioso y atracción turística',
    address: {
      '@type': 'PostalAddress',
      streetAddress: ATTRACTION.street,
      addressLocality: ATTRACTION.city,
      addressRegion: 'San Salvador',
      addressCountry: ATTRACTION.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.latitude,
      longitude: ATTRACTION.longitude,
    },
    hasMap: ATTRACTION.mapsUrl,
    sameAs: [ATTRACTION.mapsUrl, ATTRACTION.tourismUrl, ATTRACTION.culturaUrl, ATTRACTION.alcaldiaUrl],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ATTRACTION.rating,
      reviewCount: ATTRACTION.reviewCount,
      bestRating: 5,
    },
  };
}

export function buildFaqSchema(faqs: Faq[]): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** `trail` no incluye la página actual: se añade como último elemento. */
export function buildBreadcrumbSchema(
  site: URL | undefined,
  trail: { name: string; path?: string }[],
): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      ...(entry.path ? { item: absoluteUrl(site, entry.path) } : {}),
    })),
  };
}

export function buildWebPageSchema(
  site: URL | undefined,
  path: string,
  title: string,
  description: string,
): Schema {
  const url = absoluteUrl(site, path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    ...(url ? { '@id': `${url}#webpage`, url } : {}),
    name: title,
    description,
    inLanguage: 'es-SV',
    isPartOf: url ? { '@id': `${absoluteUrl(site, '/') ?? ''}#website` } : undefined,
    about: url ? { '@id': `${absoluteUrl(site, '/') ?? ''}#attraction` } : undefined,
  };
}
