import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { IconArrow } from '@/components/icons';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Quem Somos',
  description:
    'Conheça a história e a identidade da Igreja Batista Emanuel de Jundiaí, fundada em 1978. Uma comunidade cristã centrada na Bíblia.',
  path: '/sobre',
});

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Quem Somos', path: '/sobre' },
];

const values = [
  {
    title: 'A Bíblia aberta',
    text: 'As Escrituras Sagradas são nossa regra suprema de fé e conduta. Cada culto e cada decisão nascem da Palavra de Deus.',
  },
  {
    title: 'Uma família',
    text: 'Somos pessoas comuns reunidas pela graça. Aqui ninguém caminha sozinho: crescemos na fé em comunhão uns com os outros.',
  },
  {
    title: 'O evangelho no centro',
    text: 'Existimos para anunciar Jesus Cristo, o Emanuel, Deus conosco, dentro e fora das nossas paredes.',
  },
];

export default function SobrePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Quem Somos"
        index="01"
        title="Deus"
        accent="conosco"
        lead="Emanuel significa Deus conosco. Desde 1978, essa verdade nos reúne em Jundiaí como uma comunidade cristã simples, centrada nas Escrituras e comprometida com o evangelho de Jesus Cristo."
      />

      {/* Historia */}
      <section className="border-b border-line" aria-labelledby="historia-title">
        <div className="container grid grid-cols-1 gap-12 py-section md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">Nossa história</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="historia-title"
                className="mt-5 font-display text-display-sm font-bold text-ink"
              >
                Fundada em <span className="font-medium italic text-emerald">1978</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose-editorial mt-8">
                <p>
                  A Igreja Batista Emanuel de Jundiaí nasceu do desejo de um grupo de fiéis de ter
                  um lugar onde a Bíblia fosse aberta, lida e vivida. Desde então, gerações têm sido
                  alcançadas pelo evangelho nesta cidade.
                </p>
                <p>
                  Ao longo de mais de quatro décadas, mantemos o mesmo compromisso do primeiro dia:
                  proclamar as Escrituras com fidelidade e acolher cada pessoa com o amor de Cristo.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <Placeholder label="Congregação reunida" ratio="aspect-[4/5]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="border-b border-line bg-bone" aria-labelledby="valores-title">
        <div className="container py-section">
          <Reveal>
            <span className="eyebrow">O que nos move</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="valores-title" className="mt-5 font-display text-display-md font-bold text-ink">
              Três compromissos
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title} className="bg-bone">
                <Reveal delay={i * 0.05}>
                  <div className="flex h-full flex-col p-8">
                    <span className="font-sans text-label uppercase text-muted/70">0{i + 1}</span>
                    <h3 className="mt-6 font-display text-2xl font-bold text-ink">{v.title}</h3>
                    <p className="prose-editorial mt-4 text-sm">{v.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proximo passo */}
      <section aria-label="Próximos passos">
        <div className="container flex flex-col items-start justify-between gap-6 py-section sm:flex-row sm:items-center">
          <p className="max-w-xl font-display text-2xl font-semibold text-ink md:text-3xl">
            Queremos conhecer você. Descubra no que cremos ou venha a um culto.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/no-que-cremos" className="btn-primary">
              No que cremos
              <IconArrow className="h-5 w-5" />
            </Link>
            <Link href="/horarios" className="btn-ghost">
              Horários
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
