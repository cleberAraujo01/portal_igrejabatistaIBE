import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

/**
 * PageHeader — cabecalho padrao das paginas internas.
 * -------------------------------------------------------------
 * Mantem a consistencia editorial: breadcrumb navegavel, micro-label
 * de seccao, numeracao "NN / 05", h1 unico com destaque em verde
 * (por cor e peso — italico fica reservado a citacoes biblicas) e um
 * subtitulo curto. O breadcrumb visual espelha o BreadcrumbList
 * (JSON-LD) injetado na pagina.
 *
 * `backdrop` (opcional) aplica uma imagem de fundo decorativa com
 * art direction: uma versao horizontal no desktop e outra vertical
 * no mobile, sob uma camada clara que garante a legibilidade (AA).
 */
export function PageHeader({
  eyebrow,
  index,
  title,
  accent,
  lead,
  crumbs,
  backdrop,
}: {
  eyebrow: string;
  index: string;
  title: string;
  accent?: string;
  lead: string;
  crumbs: { name: string; path: string }[];
  backdrop?: { desktop: string; mobile: string };
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      {/* Fundo decorativo opcional (art direction desktop/mobile). */}
      {backdrop && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* Mobile: imagem vertical, Biblia no topo. */}
          <Image
            src={backdrop.mobile}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top md:hidden"
          />
          {/* Desktop: imagem horizontal, Biblia a direita. */}
          <Image
            src={backdrop.desktop}
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover object-right md:block"
          />
          {/* Camada clara para legibilidade (AA). Mobile: plana; desktop:
              mais opaca a esquerda (texto) e revelando a Biblia a direita. */}
          <div className="absolute inset-0 bg-paper/55 md:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-l from-paper/20 via-paper/65 to-paper/90 md:block" />
          {/* Fade suave para o fundo da pagina na base. */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper" />
        </div>
      )}

      <div className="container relative z-10 grid grid-cols-1 gap-10 py-section md:grid-cols-12">
        <div className="md:col-span-12">
          {/* Breadcrumb (nav com aria-label) */}
          <Reveal>
            <nav aria-label="Trilha de navegacao" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-sans text-label uppercase text-muted">
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1;
                  return (
                    <li key={c.path} className="flex items-center gap-2">
                      {last ? (
                        <span aria-current="page" className="text-emerald">
                          {c.name}
                        </span>
                      ) : (
                        <Link href={c.path} className="transition-colors hover:text-ink">
                          {c.name}
                        </Link>
                      )}
                      {!last && <span aria-hidden className="text-muted/40">/</span>}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">{eyebrow}</span>
              <span className="font-sans text-label uppercase text-muted/70">
                {index} <span className="text-muted/40">/</span> 05
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-[16ch] font-display text-display-lg font-bold leading-[1] text-ink">
              {title}{' '}
              {accent && <span className="font-medium italic text-emerald">{accent}</span>}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="prose-editorial mt-8 md:max-w-2xl md:text-lg">{lead}</p>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
