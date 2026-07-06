import Link from 'next/link';
import { navigation, services, site } from '@/lib/site';
import { BrandMark } from '@/components/icons/Logo';
import { Placeholder } from '@/components/ui/Placeholder';
import { IconArrow, IconYoutube, IconInstagram, IconFacebook } from '@/components/icons';

/**
 * Footer — encerramento do site.
 * -------------------------------------------------------------
 * Server component. Seccao "Faca parte da nossa familia" em fundo
 * creme (quebra a sequencia de blocos escuros: claro -> escuro),
 * com texto a esquerda e colagem assimetrica de fotos a direita;
 * depois, quatro colunas sobre verde escuro (marca + redes,
 * navegacao, cultos e card de versiculo) e barra final com copyright.
 * Tudo lido de lib/site.ts. Landmark <footer> com contentinfo
 * implicito para acessibilidade.
 */

const socials = [
  { icon: IconYoutube, href: site.social.youtube, label: 'Canal no YouTube (abre em nova aba)' },
  { icon: IconInstagram, href: site.social.instagram, label: 'Perfil no Instagram (abre em nova aba)' },
  { icon: IconFacebook, href: site.social.facebook, label: 'Página no Facebook (abre em nova aba)' },
] as const;

export function Footer() {
  const year = 2026; // Ano de referencia da build; atualize no deploy anual.
  return (
    <footer className="text-paper">
      {/* Faca parte da nossa familia — fundo creme, 2 colunas */}
      <section aria-labelledby="footer-cta-title" className="bg-[#f7f3ea] text-ink">
        <div className="container">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-[56px] lg:py-20">
            {/* Texto */}
            <div>
              <p className="flex items-center gap-3 font-sans text-[13px] font-bold uppercase tracking-[1.5px] text-[#8a6d2f]">
                <span className="inline-block h-[2px] w-[24px] bg-gold" aria-hidden />
                Venha conhecer
              </p>
              <h2
                id="footer-cta-title"
                className="mt-5 font-display text-[clamp(1.9rem,3.5vw,38px)] font-bold leading-tight text-[#0e3322]"
              >
                Faça parte da nossa{' '}
                <span className="font-medium italic text-[#c9822f]">família</span>
              </h2>
              <p className="mt-4 max-w-md font-sans leading-relaxed text-[#3e4f45]">
                Venha para um culto, converse com a gente e sinta-se em casa. Toda semana
                recebemos novas famílias de braços abertos.
              </p>
              <Link
                href="/horarios"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0e3322] px-6 py-3 font-sans text-sm font-semibold text-paper transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-emerald"
              >
                Planeje sua visita
                <IconArrow className="h-5 w-5" />
              </Link>
            </div>

            {/* Colagem de fotos (PLACEHOLDER: substituir por fotos reais da
                congregacao — pessoas, familias, momentos de convivencia) */}
            <div className="relative mx-auto h-[280px] w-full max-w-[420px] md:h-[320px]">
              {/* Pontilhado dourado atras das fotos (mesmo motivo do hero) */}
              <div
                aria-hidden
                className="absolute -left-5 bottom-2 h-28 w-36 opacity-70"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(201,130,47,0.55) 1px, transparent 1.5px)',
                  backgroundSize: '12px 12px',
                }}
              />

              {/* Foto principal (esquerda, ligeiramente mais alta) */}
              <div className="absolute left-0 top-0 z-10 h-[230px] w-[185px] overflow-hidden rounded-[18px] shadow-[0_18px_35px_-18px_rgba(21,26,24,0.4)] md:h-[260px] md:w-[210px]">
                <Placeholder label="Congregação reunida" ratio="" className="h-full w-full" />
              </div>

              {/* Foto media (polaroid): desce um pouco e invade a borda da
                  principal, criando a primeira camada de profundidade */}
              <div className="absolute right-[40px] top-5 z-20 h-[150px] w-[150px] overflow-hidden rounded-[18px] border-[6px] border-[#fffdf7] shadow-[0_16px_30px_-16px_rgba(21,26,24,0.4)] md:right-[52px] md:top-6 md:h-[170px] md:w-[170px]">
                <Placeholder label="Famílias" ratio="" className="h-full w-full" />
              </div>

              {/* Foto menor (polaroid): sobrepoe o canto da media */}
              <div className="absolute bottom-0 right-0 z-30 h-[130px] w-[130px] overflow-hidden rounded-[18px] border-[6px] border-[#fffdf7] shadow-[0_16px_30px_-16px_rgba(21,26,24,0.4)] md:h-[150px] md:w-[150px]">
                <Placeholder label="Convivência" ratio="" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colunas principais */}
      <div className="bg-[#0a1c14]">
        <div className="container grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.2fr] lg:gap-10">
          {/* Marca + redes */}
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
              <BrandMark />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-base font-semibold text-paper">
                  Igreja Batista Emanuel
                </span>
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-paper/60">
                  {site.slogan}
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-[#a9c2ae]">
              Uma comunidade cristã em Jundiaí desde {site.foundedYear}, reunida em torno das
              Escrituras e do evangelho de Jesus Cristo.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper/80 transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navegacao */}
          <nav aria-label="Rodape">
            <h2 className="font-sans text-label uppercase text-[#9fd8b0]">Navegue</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-paper/75 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cultos */}
          <div>
            <h2 className="font-sans text-label uppercase text-[#9fd8b0]">Cultos</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {services.map((s) => (
                <li key={`${s.day}-${s.time}`}>
                  <p className="font-sans text-sm text-paper">
                    {s.day} <span className="font-display font-bold text-gold">{s.time}</span>
                  </p>
                  <p className="font-sans text-xs text-paper/55">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Card de versiculo */}
          <div className="relative rounded-2xl bg-white/[0.06] p-7">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 left-4 font-display text-[72px] font-bold leading-none text-gold/30"
            >
              &ldquo;
            </span>
            <blockquote className="relative">
              <p className="scripture text-sm leading-relaxed text-paper/85">
                Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.
              </p>
              <cite className="mt-3 block font-sans text-xs font-semibold uppercase tracking-[0.14em] not-italic text-gold">
                Salmos 119:105
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Barra final */}
        <div className="border-t border-white/[0.08]">
          <div className="container flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
            <p className="font-sans text-xs text-paper/55">
              © {year} {site.name}. Todos os direitos reservados.
            </p>
            <p className="font-sans text-xs text-paper/55">
              Feito com <span className="text-[#e74c3c]" aria-hidden>♥</span>
              <span className="sr-only">amor</span> para o Reino
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
