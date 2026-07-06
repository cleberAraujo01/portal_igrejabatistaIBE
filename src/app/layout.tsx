import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontDisplay, fontSans } from '@/lib/fonts';
import { site } from '@/lib/site';
import { churchJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';

/**
 * Metadata raiz.
 * -------------------------------------------------------------
 * metadataBase resolve URLs absolutas de OG/canonical. title.template
 * aplica o sufixo da marca a todas as paginas. Cada page.tsx sobrescreve
 * title/description com os seus proprios (SEO por pagina).
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.slogan}`,
    template: `%s · Igreja Batista Emanuel`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    'Igreja Batista',
    'Igreja em Jundiaí',
    'Igreja Batista Emanuel',
    'culto Jundiaí',
    'escola dominical',
    'evangelho',
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.slogan}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · ${site.slogan}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: o script inline da splash pode marcar
    // data-splash-done no <html> antes da hidratacao (padrao de theme
    // scripts) — o atributo nao existe no HTML do servidor.
    <html
      lang="pt-BR"
      className={`${fontDisplay.variable} ${fontSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* Splash: marca <html data-splash-done> antes do primeiro paint
            quando a intro ja foi vista na sessao — o CSS esconde a versao
            SSR e o visitante recorrente nao ve flash algum. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('ibe-splash-vista'))document.documentElement.setAttribute('data-splash-done','')}catch(e){}",
          }}
        />

        {/* Structured Data global: Church/LocalBusiness + WebSite */}
        <JsonLd data={churchJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        {/* Skip link para acessibilidade por teclado (WCAG 2.4.1) */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-emerald focus:px-5 focus:py-2 focus:font-sans focus:text-sm focus:text-paper"
        >
          Pular para o conteudo
        </a>

        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
