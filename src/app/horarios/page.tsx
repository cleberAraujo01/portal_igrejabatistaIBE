import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { services, site } from '@/lib/site';
import { IconPin, IconPlay, IconPhone } from '@/components/icons';

export const metadata: Metadata = pageMetadata({
  title: 'Horários e Localização',
  description:
    'Cultos da Igreja Batista Emanuel de Jundiaí: domingos às 09h (Escola Dominical) e 18h, quartas às 19h30. Endereço, mapa e transmissão ao vivo.',
  path: '/horarios',
});

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Horários', path: '/horarios' },
];

// Link de mapa gerado a partir do endereco (PLACEHOLDER: refine com o local exato).
const mapsQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.district}, ${site.address.city} ${site.stateCode}`,
);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export default function HorariosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Horários e Localização"
        index="04"
        title="Quando nos"
        accent="reunimos"
        lead="As portas estão abertas ao longo da semana para adoração, ensino e oração. Se você está longe, participe pela transmissão ao vivo no YouTube."
      />

      {/* Horarios */}
      <section className="border-b border-line" aria-labelledby="cultos-title">
        <div className="container py-section">
          <Reveal>
            <h2 id="cultos-title" className="sr-only">
              Horários dos cultos
            </h2>
          </Reveal>
          <ul className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {services.map((s, i) => (
              <li key={`${s.day}-${s.time}`} className="bg-paper">
                <Reveal delay={i * 0.05}>
                  <div className="flex h-full flex-col justify-between gap-8 p-8">
                    <span className="font-sans text-label uppercase text-muted/70">0{i + 1}</span>
                    <div>
                      <p className="font-sans text-label uppercase text-emerald">{s.day}</p>
                      <p className="mt-3 font-display text-5xl font-bold tracking-tight text-ink">{s.time}</p>
                      <p className="mt-3 font-sans text-muted">{s.label}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Localizacao */}
      <section className="border-b border-line bg-bone" aria-labelledby="local-title">
        <div className="container grid grid-cols-1 gap-12 py-section md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">Onde estamos</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="local-title" className="mt-5 font-display text-display-sm font-bold text-ink">
                Em Jundiaí, <span className="font-medium italic text-emerald">São Paulo</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <address className="mt-8 not-italic">
                <p className="font-sans text-lg text-ink">{site.address.street}</p>
                <p className="font-sans text-muted">
                  {site.address.district} · {site.address.city} · {site.stateCode}
                </p>
                <p className="font-sans text-muted">CEP {site.address.postalCode}</p>
                <p className="mt-4 font-sans text-xs uppercase tracking-[0.15em] text-muted/60">
                  Endereço ilustrativo · confirme o local oficial
                </p>
              </address>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-fit"
                >
                  <IconPin className="h-5 w-5" />
                  Abrir no Google Maps
                </a>
                <a href={`tel:${site.phone.href}`} className="btn-ghost w-fit">
                  <IconPhone className="h-5 w-5" />
                  {site.phone.display}
                </a>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              {/*
                MAPA: para embutir o mapa real, substitua o Placeholder por um
                <iframe> do Google Maps (loading="lazy", title descritivo) ou
                por um componente de mapa. Mantido como placeholder para nao
                carregar terceiros sem necessidade.
              */}
              <Placeholder label="Mapa da localização" ratio="aspect-[4/3]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ao vivo */}
      <section aria-labelledby="live-title">
        <div className="container flex flex-col items-start justify-between gap-6 py-section sm:flex-row sm:items-center">
          <div>
            <span className="eyebrow">Transmissão</span>
            <h2 id="live-title" className="mt-5 max-w-xl font-display text-display-sm font-bold text-ink">
              Participe <span className="font-medium italic text-emerald">ao vivo</span>
            </h2>
            <p className="prose-editorial mt-5">
              Acompanhe nossos cultos pelo canal{' '}
              <span className="text-ink">{site.social.youtubeHandle}</span> no YouTube.
            </p>
          </div>
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            <IconPlay className="h-5 w-5" />
            Assistir no YouTube
          </a>
        </div>
      </section>
    </>
  );
}
