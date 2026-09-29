/**
 * Única fuente de verdad del monumento.
 * Formato del nombre SEO: atractivo + ciudad + guía de visita.
 */
export const SITE_NAME = 'Monumento al Divino Salvador del Mundo (San Salvador) — Guía de visita';

export function withSiteName(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

export const ATTRACTION = {
  name: 'Monumento al Divino Salvador del Mundo',
  englishName: 'Monument to the Divine Savior of the World',
  commonName: 'Plaza Salvador del Mundo',
  shortName: 'Salvador del Mundo',
  slug: 'divino-salvador-del-mundo',
  type: 'Monumento histórico',
  city: 'San Salvador',
  region: 'Departamento de San Salvador',
  country: 'El Salvador',
  countryCode: 'SV',
  street: 'Paseo General Escalón & Alameda Franklin Delano Roosevelt',
  address: 'Paseo General Escalón & Alameda Franklin Delano Roosevelt, San Salvador, El Salvador',
  phone: '+503 2511 6000',
  phoneE164: '+50325116000',
  plusCode: 'PQ2G+G6',
  plusCodeLabel: 'PQ2G+G6 · San Salvador, El Salvador',
  latitude: 13.701326586685262,
  longitude: -89.22700882308682,
  /** Valoración pública de Google Maps (sincronizada en 2026-09). */
  rating: 4.6,
  /** Número de reseñas públicas de Google Maps (sincronizado en 2026-09). */
  reviewCount: 21045,
  mapsUrl: 'https://maps.app.goo.gl/dJbRbbEYndvHH2kDA',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6632.077258421091!2d-89.22700882308682!3d13.701326586685262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6330410eacae2d%3A0xf3bd10411c7f3afb!2sMonument%20to%20the%20Divine%20Savior%20of%20the%20World!5e1!3m2!1sen!2s!4v1788749288171!5m2!1sen!2s',
  tourismUrl: 'https://elsalvador.travel/',
  culturaUrl: 'https://www.cultura.gob.sv/',
  alcaldiaUrl: 'https://www.sansalvador.gob.sv/',
} as const;

export const RATING_DISPLAY = ATTRACTION.rating.toLocaleString('es-SV');
export const REVIEW_DISPLAY = ATTRACTION.reviewCount.toLocaleString('es-SV');
export const RATING_SOURCE = `Google Maps · ${RATING_DISPLAY}/5 · ${REVIEW_DISPLAY} reseñas`;

export type Photo = {
  src: string;
  alt: string;
  author: string;
  license: string;
  href: string;
};

/** Copias locales de fotografías con licencia abierta (ver public/PHOTO-SOURCES.md). */
export const PHOTOS: Record<'frontal' | 'plaza' | 'vertical' | 'noche', Photo> = {
  frontal: {
    src: '/images/monumento-frontal.jpg',
    alt: 'Vista frontal del Monumento al Divino Salvador del Mundo con la esfera y el pedestal',
    author: 'Frankjh',
    license: 'CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Monumento_al_Salvador_del_Mundo_1.jpg',
  },
  plaza: {
    src: '/images/monumento-plaza-dia.jpg',
    alt: 'Monumento al Divino Salvador del Mundo visto desde la Plaza Salvador del Mundo de día',
    author: 'Erickssonr',
    license: 'CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Monumento_al_Divino_Salvador_del_Mundo.JPG',
  },
  vertical: {
    src: '/images/monumento-detalle-vertical.jpg',
    alt: 'Detalle vertical del pedestal y la escultura del Divino Salvador del Mundo',
    author: 'Oskpal777',
    license: 'CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Monumento_al_Divino_Salvador_del_Mundo_-_Plaza_Salvador_del_Mundo.JPG',
  },
  noche: {
    src: '/images/monumento-fiestas-noche.jpg',
    alt: 'Monumento al Divino Salvador del Mundo iluminado durante las fiestas de agosto',
    author: 'Alex Bonilla',
    license: 'CC BY-SA 3.0',
    href: 'https://commons.wikimedia.org/wiki/File:Monumento_al_Divino_Salvador_del_Mundo_en_El_Salvador.jpg',
  },
};

export const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/historia/', label: 'Historia' },
  { href: '/como-llegar/', label: 'Cómo llegar' },
  { href: '/fotos/', label: 'Fotos' },
  { href: '/#alrededores', label: 'Alrededores' },
  { href: '/#faq', label: 'FAQ' },
] as const;

export const GUIDES = [
  {
    href: '/historia/',
    title: 'Historia del monumento',
    text: 'De la escultura funeraria de 1942 al símbolo nacional: terremoto de 1986, restauración y declaratoria como Bien Cultural.',
  },
  {
    href: '/como-llegar/',
    title: 'Cómo llegar',
    text: 'Dirección exacta, Plus Code, autobuses por Roosevelt y Escalón, taxi o transporte por aplicación y estacionamiento.',
  },
  {
    href: '/fotos/',
    title: 'Fotos y miradores',
    text: 'Los cuatro encuadres que mejor explican la escala del monumento, con horarios de luz y recomendaciones de seguridad.',
  },
] as const;
