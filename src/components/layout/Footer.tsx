import Link from 'next/link';
import { navigation, services, site } from '@/lib/site';
import { BrandMark } from '@/components/icons/Logo';
import { IconYoutube, IconInstagram, IconFacebook } from '@/components/icons';

/**
 * Footer — encerramento do site.
 * -------------------------------------------------------------
 * Server component. Quatro colunas sobre verde escuro (marca +
 * redes, navegacao, cultos e card de versiculo) e barra final com
 * copyright. Tudo lido de lib/site.ts. Landmark <footer> com
 * contentinfo implicito para acessibilidade. A CTA "Faca parte da
 * nossa familia" e exclusiva da home (components/sections/FamilyCta).
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
