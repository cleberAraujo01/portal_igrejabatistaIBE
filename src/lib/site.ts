/**
 * Configuracao central do site — fonte unica de verdade.
 * -------------------------------------------------------------
 * Todo conteudo institucional, dados de contato, horarios e
 * parametros de SEO vivem aqui. Componentes e o JSON-LD leem
 * deste objeto, evitando duplicacao e divergencia de dados.
 *
 * PLACEHOLDER: ajuste `url`, telefone, endereco exato e coordenadas
 * geograficas com os dados oficiais antes do deploy em producao.
 */

export const site = {
  name: 'Igreja Batista Emanuel de Jundiaí',
  shortName: 'Igreja Batista Emanuel',
  slogan: 'A Igreja da Bíblia Aberta',
  foundedYear: 1978,
  description:
    'Igreja Batista Emanuel de Jundiaí, fundada em 1978. Cultos aos domingos às 09h e 18h e às quartas às 19h30. A Igreja da Bíblia Aberta.',

  // URL canonica de producao. PLACEHOLDER: troque pelo dominio oficial.
  url: 'https://www.igrejabatistaemanuel.com.br',

  locale: 'pt-BR',
  city: 'Jundiaí',
  state: 'São Paulo',
  stateCode: 'SP',
  country: 'BR',

  // PLACEHOLDER: endereco completo oficial.
  address: {
    street: 'Rua da Congregação, 000',
    district: 'Centro',
    city: 'Jundiaí',
    state: 'SP',
    postalCode: '13200-000',
  },

  // PLACEHOLDER: coordenadas exatas da fachada.
  geo: {
    latitude: -23.1857,
    longitude: -46.8978,
  },

  // PLACEHOLDER: telefone oficial (formato E.164 no href, legivel no texto).
  phone: {
    display: '(11) 0000-0000',
    href: '+551100000000',
  },

  email: 'contato@igrejabatistaemanuel.com.br',

  social: {
    youtube: 'https://www.youtube.com/@IgrejaBatistaEmanueldeJundiai',
    youtubeHandle: 'IgrejaBatistaEmanueldeJundiai',
    instagram: 'https://www.instagram.com/igrejabatistaemanueljundiai',
    // PLACEHOLDER: confirme a pagina oficial no Facebook.
    facebook: 'https://www.facebook.com/igrejabatistaemanueljundiai',
  },
} as const;

/** Horarios de culto — usados na UI e no schema OpeningHoursSpecification. */
export const services = [
  {
    day: 'Domingo',
    dayOfWeek: 'Sunday',
    label: 'Escola Dominical',
    time: '09h00',
    opens: '09:00',
    closes: '10:30',
  },
  {
    day: 'Domingo',
    dayOfWeek: 'Sunday',
    label: 'Culto da Noite',
    time: '18h00',
    opens: '18:00',
    closes: '19:30',
  },
  {
    day: 'Quarta',
    dayOfWeek: 'Wednesday',
    label: 'Estudo Bíblico e Oração',
    time: '19h30',
    opens: '19:30',
    closes: '21:00',
  },
] as const;

/** Navegacao principal — dirige Header, Footer e sitemap. */
export const navigation = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/no-que-cremos', label: 'No que Cremos' },
  { href: '/salvacao', label: 'Salvação' },
  { href: '/horarios', label: 'Horários' },
  { href: '/contato', label: 'Contato' },
] as const;

/** Coordenadas formatadas para o detalhe editorial vertical. */
export const geoLabel = `23°11'08"S · 46°53'52"O`;
