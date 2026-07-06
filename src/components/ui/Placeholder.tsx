import { IconBook } from '@/components/icons';

/**
 * Placeholder de imagem — marcador editorial para fotos reais.
 * -------------------------------------------------------------
 * Enquanto as fotos oficiais da igreja nao chegam, este componente
 * ocupa o espaco com dimensoes explicitas (evita CLS) e deixa claro
 * qual imagem entra ali.
 *
 * COMO SUBSTITUIR: troque este componente por
 *   <Image src="/images/arquivo.jpg" alt="..." fill sizes="..." />
 * usando next/image (ja configurado para AVIF/WebP em next.config.mjs).
 */
export function Placeholder({
  label,
  className = '',
  ratio = 'aspect-[4/3]',
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-bone ${ratio} ${className}`}
      role="img"
      aria-label={`Espaço reservado para foto: ${label}`}
    >
      <div className="grain" aria-hidden />
      {/* Motivo sutil de Biblia aberta */}
      <div className="absolute inset-0 flex items-center justify-center">
        <IconBook className="h-16 w-16 text-emerald/25" />
      </div>
      <div className="absolute inset-0 flex items-end p-4">
        <span className="font-sans text-label uppercase text-muted/70">
          Foto · {label}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 border border-line" />
    </div>
  );
}
