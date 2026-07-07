import Image from 'next/image';
import Link from 'next/link';
import { FamilyCta } from '@/components/sections/FamilyCta';
import { Hero } from '@/components/sections/Hero';
import { SplashIntro } from '@/components/sections/SplashIntro';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { services, site } from '@/lib/site';
import {
  IconArrow,
  IconBook,
  IconCross,
  IconHeadphones,
  IconMusicNote,
  IconPin,
  IconPlay,
} from '@/components/icons';

/**
 * Pagina inicial.
 * -------------------------------------------------------------
 * Splash de abertura (uma vez por sessao), hero dividido, introducao
 * editorial, ministerios em blocos alternados (zig-zag numerado),
 * grade semanal de cultos e chamada final para a Salvacao.
 */

// Herda title/description do layout raiz (ja otimizados para a home).

/**
 * Recursos do ministerio (blocos da seccao Explore).
 * `external` alterna entre navegacao interna (next/link) e link
 * externo com target/rel de seguranca. `image` e a fotografia do
 * bloco visual (recebe overlay verde para conversar com a marca).
 *
 * PLACEHOLDER de foto: o card "Podcast e Cursos" ainda usa uma arte
 * generica do projeto — quando houver foto do estudio/podcast, basta
 * apontar `image` para o novo arquivo em public/images.
 */
const resources = [
  {
    icon: IconCross,
    title: 'As Boas Novas',
    text: 'Você tem certeza que irá para o céu um dia? Conheça o plano simples de Deus para a salvação.',
    action: 'Como ser salvo',
    href: '/salvacao',
    external: false,
    aria: 'Como ser salvo: conheça o plano de Deus para a salvação',
    image: '/images/ministerio-boas-novas.jpg',
  },
  {
    icon: IconBook,
    title: 'No que Cremos',
    text: 'Nossa declaração de fé completa, das Escrituras à salvação pela graça.',
    action: 'Ler declaração de fé',
    href: '/no-que-cremos',
    external: false,
    aria: 'Ler a declaração de fé da Igreja Batista Emanuel',
    image: '/images/ministerio-no-que-cremos.png',
  },
  {
    icon: IconHeadphones,
    title: 'Podcast e Cursos',
    text: 'Cursos bíblicos e o estudo Música na Balança, disponíveis no portal Bíblia Aberta.',
    action: 'Acessar cursos',
    href: 'https://bibliaaberta.com.br',
    external: true,
    aria: 'Acessar cursos no portal Bíblia Aberta (abre em nova aba)',
    image: '/images/splash-bg-desktop.png',
  },
  {
    icon: IconMusicNote,
    title: 'Música Cristã',
    text: 'Louvores e hinos produzidos pelo nosso ministério, para ouvir e adorar a qualquer momento.',
    action: 'Ouvir agora',
    // PLACEHOLDER: troque pela URL real da playlist/album do ministerio
    // (YouTube Music, Spotify etc.). Por ora aponta para o canal.
    href: 'https://www.youtube.com/@IgrejaBatistaEmanueldeJundiai',
    external: true,
    aria: 'Ouvir os louvores do ministério de música (abre em nova aba)',
    image: '/images/ministerio-musica.jpg',
  },
] as const;

// Structured data: lista dos recursos apresentados na seccao Explore.
const resourcesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Recursos do ministério',
  itemListElement: resources.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: r.title,
    url: r.external ? r.href : `${site.url}${r.href}`,
  })),
};

/**
 * Semana de cultos: 7 dias, com os cultos de lib/site agrupados por
 * dia. Dias sem culto entram apagados — a grade inteira comunica o
 * ritmo semanal de uma vez.
 */
const WEEK = [
  { short: 'Dom', long: 'Domingo', dayOfWeek: 'Sunday' },
  { short: 'Seg', long: 'Segunda', dayOfWeek: 'Monday' },
  { short: 'Ter', long: 'Terça', dayOfWeek: 'Tuesday' },
  { short: 'Qua', long: 'Quarta', dayOfWeek: 'Wednesday' },
  { short: 'Qui', long: 'Quinta', dayOfWeek: 'Thursday' },
  { short: 'Sex', long: 'Sexta', dayOfWeek: 'Friday' },
  { short: 'Sáb', long: 'Sábado', dayOfWeek: 'Saturday' },
] as const;

const weekWithServices = WEEK.map((d) => ({
  ...d,
  services: services.filter((s) => s.dayOfWeek === d.dayOfWeek),
}));

export default function HomePage() {
  return (
    <>
      <SplashIntro />
      <Hero />

      {/* Introducao editorial */}
      <section id="explorar" className="scroll-mt-[84px] border-b border-line" aria-labelledby="intro-title">
        <div className="container grid grid-cols-1 gap-10 py-section md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <span className="eyebrow">A Igreja da Bíblia Aberta</span>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <h2
                id="intro-title"
                className="font-display text-display-sm font-bold leading-[1.1] text-ink"
              >
                Há mais de quatro décadas, abrimos a Bíblia em Jundiaí para anunciar que{' '}
                <span className="font-medium italic text-emerald">Deus está conosco</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="prose-editorial mt-8 md:text-lg">
                Emanuel significa Deus conosco. É essa a nossa confiança e o nosso convite: uma
                igreja simples, centrada nas Escrituras, onde cada pessoa é recebida para conhecer a
                Jesus Cristo e crescer na fé ao lado de irmãos.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Explore: ministerios em blocos alternados (zig-zag) */}
      <section aria-labelledby="explore-title" className="border-b border-line bg-[#f8f9f6]">
        <JsonLd data={resourcesJsonLd} />
        <div className="container py-section">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-emerald">Explore</span>
            <h2
              id="explore-title"
              className="mt-5 font-display text-display-md font-bold tracking-tight text-ink"
            >
              Conheça nosso ministério
            </h2>
            <p className="prose-editorial mt-5">
              Recursos para crescer na fé, conhecer o evangelho e caminhar conosco.
            </p>
          </Reveal>

          {/* Cada ministerio ocupa a linha inteira; o bloco visual troca
              de lado a cada item. */}
          <ol className="mt-16 flex flex-col gap-16 lg:gap-20">
            {resources.map((r, i) => {
              const Icon = r.icon;
              const number = String(i + 1).padStart(2, '0');
              const reversed = i % 2 === 1;

              const content = (
                <div className="flex items-start gap-5 sm:gap-8">
                  {/* Numero grande: a sequencia guia a leitura da secao */}
                  <span
                    className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none tracking-tight text-gold-deep/40"
                    aria-hidden
                  >
                    {number}
                  </span>
                  <div className="pt-2 sm:pt-3">
                    <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                      {r.title}
                    </h3>
                    <p className="prose-editorial mt-4 max-w-md">{r.text}</p>
                    <span className="group/link mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-emerald">
                      {r.action}
                      <IconArrow className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              );

              const visual = (
                <div
                  className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl sm:aspect-[2/1] lg:aspect-[16/10]"
                  aria-hidden
                >
                  {/* Foto (lazy por padrao: a seccao fica abaixo da dobra) */}
                  <Image
                    src={r.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.04]"
                  />
                  {/* Overlay verde diagonal: integra a foto a paleta da marca */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(15,40,25,0.75) 0%, rgba(15,40,25,0.35) 100%)',
                    }}
                  />
                  {/* Selo tematico sobre a imagem */}
                  <span className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full border border-paper/30 bg-emerald-deep/50 text-paper backdrop-blur-md transition-transform duration-500 ease-editorial group-hover:scale-110 sm:h-16 sm:w-16">
                    <Icon className="h-7 w-7" width={28} height={28} />
                  </span>
                </div>
              );

              const row = (
                <div className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}>{content}</div>
                  <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : ''}`}>{visual}</div>
                </div>
              );

              return (
                <li key={r.title}>
                  <Reveal delay={0.05}>
                    {r.external ? (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={r.aria}
                        className="block rounded-3xl"
                      >
                        {row}
                      </a>
                    ) : (
                      <Link href={r.href} aria-label={r.aria} className="block rounded-3xl">
                        {row}
                      </Link>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Grade semanal de cultos */}
      <section className="border-b border-line bg-bone" aria-labelledby="cultos-title">
        <div className="container py-section">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <span className="eyebrow">Reuniões</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="cultos-title" className="mt-5 font-display text-display-md font-bold text-ink">
                  Venha nos visitar
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                <Link href="/horarios" className="btn-primary">
                  <IconPin className="h-5 w-5" />
                  Como chegar
                </Link>
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <IconPlay className="h-5 w-5" />
                  Ao vivo no YouTube
                </a>
              </div>
            </Reveal>
          </div>

          {/* 7 dias: os cultos acendem em verde/dourado, o resto da
              semana fica em repouso. */}
          <Reveal delay={0.15}>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {weekWithServices.map((d) => {
                const active = d.services.length > 0;
                return (
                  <li
                    key={d.short}
                    className={`flex min-h-[150px] flex-col rounded-2xl p-4 transition-transform duration-300 ease-editorial lg:min-h-[190px] ${
                      active
                        ? 'bg-emerald-deep text-paper shadow-[0_18px_38px_-22px_rgba(15,61,44,0.6)] hover:-translate-y-1'
                        : 'border border-line bg-paper/60 text-muted'
                    }`}
                  >
                    <span
                      className={`font-sans text-label uppercase ${
                        active ? 'text-gold' : 'text-muted/70'
                      }`}
                    >
                      <span aria-hidden>{d.short}</span>
                      <span className="sr-only">{d.long}</span>
                    </span>

                    {active ? (
                      <div className="mt-4 flex flex-1 flex-col gap-4">
                        {d.services.map((s) => (
                          <div key={s.time}>
                            <p className="font-display text-xl font-bold text-paper">{s.time}</p>
                            <p className="mt-0.5 font-sans text-xs leading-snug text-paper/75">
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-auto font-sans text-xs text-muted/60">—</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Chamada final — Salvacao */}
      <section className="bg-emerald-deep text-paper" aria-labelledby="cta-title">
        <div className="relative overflow-hidden">
          <div className="grain" aria-hidden />
          <div className="container relative py-section text-center">
            <Reveal>
              <span className="eyebrow text-paper/60 [&::before]:bg-gold [&::after]:bg-gold">
                O convite do evangelho
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="cta-title"
                className="mx-auto mt-6 max-w-[18ch] font-display text-display-md font-bold"
              >
                Aquele que crer <span className="font-medium italic text-gold">terá a vida</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-paper/70">
                Se você deseja entender o que significa ser salvo por Jesus Cristo, preparamos um
                caminho simples e bíblico para você.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/salvacao" className="btn-gold mt-9">
                Descubra como ser salvo
                <IconArrow className="h-5 w-5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fechamento — Faca parte da nossa familia */}
      <FamilyCta />
    </>
  );
}
