import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { IconArrow } from '@/components/icons';

/**
 * FamilyCta — "Faca parte da nossa familia".
 * -------------------------------------------------------------
 * Seccao de fechamento exclusiva da home (antes do footer). Fundo
 * creme entre dois blocos verde-escuros; fios dourados em gradiente
 * nas bordas suavizam a transicao. Layout de coluna unica centrada
 * (a colagem de fotos sai de cena ate existirem fotos reais da
 * congregacao — placeholders vazios em producao parecem inacabados;
 * quando as fotos chegarem, e so recompor a colagem aqui).
 */
export function FamilyCta() {
  return (
    <section aria-labelledby="family-cta-title" className="relative bg-[#f7f3ea] text-ink">
      {/* Fios dourados: transicao suave com os blocos verdes vizinhos */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f0b054]/60 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f0b054]/60 to-transparent"
      />

      <div className="container flex flex-col items-center py-20 text-center lg:py-24">
        <Reveal>
          <p className="flex items-center justify-center gap-3 font-sans text-[13px] font-bold uppercase tracking-[1.5px] text-[#8a6d2f]">
            <span className="inline-block h-[2px] w-[24px] bg-gold" aria-hidden />
            Venha conhecer
            <span className="inline-block h-[2px] w-[24px] bg-gold" aria-hidden />
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="family-cta-title"
            className="mt-5 font-display text-[clamp(1.9rem,3.5vw,38px)] font-bold leading-tight text-[#0e3322]"
          >
            Faça parte da nossa <span className="font-medium italic text-[#c9822f]">família</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-md font-sans leading-relaxed text-[#3e4f45]">
            Venha para um culto, converse com a gente e sinta-se em casa. Toda semana recebemos
            novas famílias de braços abertos.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link href="/horarios" className="btn-gold mt-8">
            Planeje sua visita
            <IconArrow className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
