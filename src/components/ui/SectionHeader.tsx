import { Reveal } from './Reveal';

/**
 * SectionHeader — cabecalho editorial de seccao.
 * -------------------------------------------------------------
 * Numeracao "01 / 05", micro-label em caixa alta e titulo display.
 * A numeracao so aparece quando o conteudo e, de fato, uma sequencia
 * de seccoes — encode de informacao, nao decoracao.
 */
export function SectionHeader({
  index,
  total,
  eyebrow,
  title,
  as = 'h2',
}: {
  index?: string;
  total?: string;
  eyebrow: string;
  title: React.ReactNode;
  as?: 'h1' | 'h2';
}) {
  const Heading = as;
  return (
    <div className="flex flex-col gap-5">
      <Reveal className="flex items-center justify-between gap-4">
        <span className="eyebrow">{eyebrow}</span>
        {index && total && (
          <span className="font-sans text-label uppercase text-muted/70">
            {index} <span className="text-muted/40">/</span> {total}
          </span>
        )}
      </Reveal>
      <Reveal delay={0.05}>
        <Heading className="max-w-[18ch] font-display text-display-md font-bold text-ink">
          {title}
        </Heading>
      </Reveal>
    </div>
  );
}
