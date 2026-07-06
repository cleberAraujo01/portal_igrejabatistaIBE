import { Fraunces, Inter } from 'next/font/google';

/**
 * Fontes self-hosted via next/font.
 * -------------------------------------------------------------
 * next/font baixa e serve as fontes do proprio dominio no build,
 * elimina layout shift (font-display: swap + size-adjust automatico)
 * e evita requisicao a terceiros — bom para LCP/CLS e privacidade.
 */

// Serifada de display para titulos: pesos 600/700 nos headings e
// italico 500 reservado as palavras com destaque de cor dentro dos
// titulos. O corpo do texto continua inteiramente na Inter.
export const fontDisplay = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

// Sans humanista para corpo, navegacao e micro-labels.
export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});
