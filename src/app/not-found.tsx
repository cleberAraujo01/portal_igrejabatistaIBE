import Link from 'next/link';
import { IconArrow } from '@/components/icons';

/**
 * Pagina 404.
 * -------------------------------------------------------------
 * Mantem a linguagem editorial e oferece um caminho de volta claro,
 * em vez de um beco sem saida.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center border-b border-line">
      <div className="container py-section text-center">
        <span className="eyebrow justify-center">Página não encontrada</span>
        <h1 className="mx-auto mt-6 max-w-[14ch] font-display text-display-lg font-bold text-ink">
          Este caminho <span className="font-medium italic text-emerald">não existe</span>
        </h1>
        <p className="prose-editorial mx-auto mt-6">
          A página que você procura pode ter sido movida ou nunca ter existido. Voltemos ao início.
        </p>
        <Link href="/" className="btn-primary mt-9">
          Ir para a página inicial
          <IconArrow className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
