import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { IconArrow } from '@/components/icons';

export const metadata: Metadata = pageMetadata({
  title: 'No que Cremos',
  description:
    'A Declaração de Fé da Igreja Batista Emanuel de Jundiaí: as Escrituras, a Trindade, a salvação pela graça, a igreja e a esperança da volta de Cristo.',
  path: '/no-que-cremos',
});

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'No que Cremos', path: '/no-que-cremos' },
];

/**
 * Declaracao de Fe.
 * -------------------------------------------------------------
 * Estrutura de sumario numerado real (artigos de fe), o que
 * justifica a numeracao editorial "01, 02, 03...". Cada artigo e
 * um <article> para semantica correta.
 */
const beliefs = [
  {
    title: 'As Sagradas Escrituras',
    text: 'Cremos que a Bíblia, composta pelo Antigo e o Novo Testamento, é a Palavra inspirada por Deus e a regra suprema e final de fé e prática. Por isso mantemos a Bíblia aberta em tudo o que fazemos.',
  },
  {
    title: 'Deus Trino',
    text: 'Cremos em um único Deus vivo e verdadeiro, eterno, subsistente em três pessoas: o Pai, o Filho e o Espírito Santo, iguais em essência e distintos em função.',
  },
  {
    title: 'Jesus Cristo',
    text: 'Cremos em Jesus Cristo, verdadeiro Deus e verdadeiro homem, concebido do Espírito Santo, nascido da virgem Maria, que viveu sem pecado, morreu em nosso lugar, ressuscitou ao terceiro dia e vive para sempre.',
  },
  {
    title: 'O Espírito Santo',
    text: 'Cremos no Espírito Santo, que convence o mundo do pecado, regenera, habita e capacita o crente, conduzindo-o à verdade e a uma vida de santidade.',
  },
  {
    title: 'A Salvação',
    text: 'Cremos que a salvação é dom de Deus, pela graça, mediante a fé em Jesus Cristo, e não por obras, para que ninguém se glorie. Todo aquele que crer e arrepender-se recebe a vida eterna.',
  },
  {
    title: 'A Igreja',
    text: 'Cremos na igreja como o corpo de Cristo, comunidade dos que foram salvos, chamada a adorar a Deus, edificar-se na Palavra, praticar o batismo e a Ceia e proclamar o evangelho.',
  },
  {
    title: 'A Esperança',
    text: 'Cremos na volta pessoal e gloriosa de Jesus Cristo, na ressurreição dos mortos e na vida eterna, esperança viva que sustenta a igreja até o fim.',
  },
];

export default function NoQueCremosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Declaração de Fé"
        index="02"
        title="No que"
        accent="cremos"
        lead="Nossa fé se apoia inteiramente nas Escrituras. Estes são os artigos que resumem aquilo que a Bíblia ensina e que a Igreja Batista Emanuel confessa e vive."
      />

      <section aria-label="Artigos de fé">
        <ol className="container divide-y divide-line py-4">
          {beliefs.map((b, i) => (
            <li key={b.title}>
              <Reveal>
                <article className="grid grid-cols-12 gap-4 py-10 md:gap-8">
                  <div className="col-span-12 md:col-span-3">
                    <span className="font-sans text-label uppercase text-muted/70">
                      0{i + 1} <span className="text-muted/40">/</span> 0{beliefs.length}
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
                      {b.title}
                    </h2>
                  </div>
                  <div className="col-span-12 md:col-span-8 md:col-start-5">
                    <p className="prose-editorial md:text-lg">{b.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Ponte para Salvacao */}
      <section className="border-t border-line bg-bone" aria-label="Próximo passo">
        <div className="container flex flex-col items-start justify-between gap-6 py-section sm:flex-row sm:items-center">
          <p className="max-w-xl font-display text-2xl font-semibold text-ink md:text-3xl">
            Cremos que essa fé salva. Veja como você pode ser salvo por Jesus Cristo.
          </p>
          <Link href="/salvacao" className="btn-primary shrink-0">
            Como ser salvo
            <IconArrow className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
