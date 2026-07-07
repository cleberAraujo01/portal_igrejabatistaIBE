import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { IconArrow, IconDownload } from '@/components/icons';

export const metadata: Metadata = pageMetadata({
  title: 'Como Ser Salvo',
  description:
    'O Plano Simples de Deus para a Salvação: reconhecer o pecado, crer em Jesus Cristo, arrepender-se e receber a vida eterna pela fé. Leia o folheto completo e baixe em PDF.',
  path: '/salvacao',
});

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Salvação', path: '/salvacao' },
];

const PDF_HREF = '/plano-de-salvacao.pdf';

/**
 * Página Salvação.
 * -------------------------------------------------------------
 * Apresenta o folheto "O Plano Simples de Deus para a Salvação"
 * (Ford Porter) na íntegra, em leitura editorial, com todas as
 * referências bíblicas destacadas, a oração guia e as práticas
 * diárias. O mesmo conteúdo pode ser baixado em PDF.
 */

/** Bloco de movimento editorial: numeração + título (H2) à esquerda, corpo à direita. */
function Movement({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <article className="grid grid-cols-12 gap-4 border-t border-line py-12 md:gap-8 md:py-16">
        <div className="col-span-12 md:col-span-4">
          {/* Numeracao do capitulo: serifada dourada, com presenca */}
          <span className="font-display text-xl font-semibold tracking-[0.08em] text-[#f0b054]">
            {index}
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
            {title}
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">{children}</div>
      </article>
    </Reveal>
  );
}

/** Citação bíblica destacada. */
function Verse({ children, cite }: { children: ReactNode; cite: string }) {
  return (
    <figure className="my-7 border-l-2 border-[#f0b054] pl-6">
      <blockquote className="scripture text-xl leading-snug text-ink md:text-2xl">
        {children}
      </blockquote>
      <figcaption className="mt-3 font-sans text-label uppercase text-[#f0b054]">{cite}</figcaption>
    </figure>
  );
}

const practices = [
  { title: 'Orar', text: 'Você fala com Deus.' },
  { title: 'Ler a Bíblia', text: 'Deus fala com você.' },
  { title: 'Testemunhar', text: 'Você fala a outros de Deus.' },
];

export default function SalvacaoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="O Plano de Salvação"
        index="03"
        title="Você é"
        accent="salvo?"
        lead="Meu amigo: gostaria de fazer-lhe a pergunta mais importante da sua vida. Sua alegria ou tristeza para toda a eternidade depende da sua resposta. Não pergunto se você é uma pessoa boa, nem se é membro de uma igreja, mas se você é salvo? Você tem certeza que irá para o céu quando morrer?"
        backdrop={{
          desktop: '/images/bg-salvacao-desktop.png',
          mobile: '/images/bg-salvacao-mobile.png',
        }}
        tone="gold"
        meta={[
          { value: '8 min', label: 'de leitura' },
          { value: '5', label: 'capítulos' },
          { value: 'Bíblia', label: 'como base' },
        ]}
      />

      {/* Barra com download do folheto */}
      <div className="border-b border-line bg-bone">
        <div className="container flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
          <p className="font-sans text-sm text-muted">
            Leia o folheto completo abaixo ou leve com você.
          </p>
          <a href={PDF_HREF} download className="btn-gold">
            <IconDownload className="h-5 w-5" />
            Baixar em PDF
          </a>
        </div>
      </div>

      {/* Corpo do folheto */}
      <div className="container pb-4">
        <Movement index="01" title="Você precisa nascer de novo">
          <div className="prose-editorial md:text-lg">
            <p>
              Deus diz que, para ir para o céu, você tem que nascer de novo. Em João 3:7, Jesus disse
              a Nicodemos:
            </p>
          </div>
          <Verse cite="João 3:7">&ldquo;Necessário vos é nascer de novo.&rdquo;</Verse>
          <div className="prose-editorial md:text-lg">
            <p>
              Na Bíblia, Deus nos dá o plano de como nascer de novo, ou seja, como ser salvo. O plano
              de Deus é simples! Você pode ser salvo hoje. Como?
            </p>
          </div>
        </Movement>

        <Movement index="02" title="Reconheça que você é pecador">
          <div className="prose-editorial md:text-lg">
            <p>Primeiro, meu amigo, você precisa reconhecer que você é um pecador.</p>
          </div>
          <Verse cite="Romanos 3:23">
            &ldquo;Porque todos pecaram e destituídos estão da glória de Deus.&rdquo;
          </Verse>
          <div className="prose-editorial md:text-lg">
            <p>
              Por você ser um pecador, você está condenado à morte, o que inclui separação eterna de
              Deus no inferno.
            </p>
          </div>
          <Verse cite="Romanos 6:23">&ldquo;Porque o salário do pecado é a morte.&rdquo;</Verse>
          <Verse cite="Hebreus 9:27">
            &ldquo;E, como aos homens está ordenado morrerem uma vez, vindo, depois disso, o
            juízo.&rdquo;
          </Verse>
        </Movement>

        <Movement index="03" title="Deus proveu um substituto">
          <div className="prose-editorial md:text-lg">
            <p>
              Mas o amor de Deus por você é tão grande que Ele deu Seu único Filho, Jesus, para
              carregar o seu pecado e morrer em seu lugar. Jesus teve que derramar o Seu próprio
              sangue e morrer.
            </p>
          </div>
          <Verse cite="2 Coríntios 5:21">
            &ldquo;Àquele que não conheceu pecado, o fez pecado por nós; para que, nele, fôssemos
            feitos justiça de Deus.&rdquo;
          </Verse>
          <Verse cite="Levítico 17:11">&ldquo;Porque a vida da carne está no sangue.&rdquo;</Verse>
          <Verse cite="Hebreus 9:22">
            &ldquo;E sem derramamento de sangue não há remissão.&rdquo;
          </Verse>
          <Verse cite="Romanos 5:8">
            &ldquo;Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós
            ainda pecadores.&rdquo;
          </Verse>
          <div className="prose-editorial md:text-lg">
            <p>
              Embora não possamos entender como, Deus lançou os meus pecados e os seus sobre Jesus, e
              Ele morreu em nosso lugar. Ele tornou-se o nosso substituto. É verdade, pois Deus não
              pode mentir.
            </p>
          </div>
        </Movement>

        <Movement index="04" title="Arrependa-se e creia">
          <div className="prose-editorial md:text-lg">
            <p>
              Deus anuncia agora a todos os homens, em todo lugar, que se arrependam (Atos 17:30).
              Este arrependimento envolve uma mudança de mentalidade que concorda com a declaração
              que Deus faz de que um indivíduo é pecador, e também concorda com o que Jesus fez por
              nós na cruz. Em Atos 16:30-31, o carcereiro de Felipo perguntou a Paulo e Silas:
              &ldquo;Senhores, que é necessário que eu faça para me salvar?&rdquo; E eles disseram:
            </p>
          </div>
          <Verse cite="Atos 16:31">&ldquo;Crê no Senhor Jesus Cristo e serás salvo.&rdquo;</Verse>
          <div className="prose-editorial md:text-lg">
            <p>
              Simplesmente confie nEle como aquEle que tomou o seu pecado, morreu no seu lugar, foi
              sepultado e a quem Deus ressuscitou. Sua ressurreição assegura vida eterna a quem
              recebe Jesus como Salvador pessoal.
            </p>
          </div>
          <Verse cite="João 1:12">
            &ldquo;Mas a todos quantos o receberam deu-lhes o poder de serem feitos filhos de Deus:
            aos que crêem no seu nome.&rdquo;
          </Verse>
          <Verse cite="Romanos 10:13">
            &ldquo;Porque todo aquele que invocar o nome do Senhor será salvo.&rdquo;
          </Verse>
          <div className="prose-editorial md:text-lg">
            <p>
              &ldquo;Todo aquele&rdquo; inclui você. &ldquo;Será salvo&rdquo; não significa talvez,
              nem poderá, mas &ldquo;será salvo&rdquo;.
            </p>
          </div>
        </Movement>
      </div>

      {/* Oração guia */}
      <section className="bg-emerald-deep text-paper" aria-labelledby="oracao-title">
        <div className="relative overflow-hidden">
          <div className="grain" aria-hidden />
          <div className="container relative grid grid-cols-1 gap-10 py-section md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow text-paper/60 [&::before]:bg-gold">Uma oração</span>
              <h2 id="oracao-title" className="mt-5 font-display text-display-sm font-bold">
                Fale com <span className="font-medium italic text-gold">Deus</span>
              </h2>
              <p className="mt-5 text-sm text-paper/70">
                Com certeza, você admite que é um pecador. Agora mesmo, onde você estiver,
                arrependido, eleve o seu coração a Deus em oração. Em Lucas 18:13, o pecador orou:
                &ldquo;Ó Deus, tem misericórdia de mim, pecador!&rdquo;. Simplesmente ore:
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <blockquote className="font-display text-2xl font-medium leading-snug text-paper/90 md:text-3xl">
                Ó Deus, eu sei que sou pecador. Creio que Jesus foi meu substituto quando Ele morreu
                na cruz. Creio que o sangue que Ele verteu, que a Sua morte, sepultamento e
                ressurreição foram por mim. Eu agora O recebo como meu Salvador. Agradeço-te pelo
                perdão dos meus pecados, pelo dom da salvação e vida eterna, por causa da Sua graça
                misericordiosa. Amém.
              </blockquote>
              <p className="mt-8 text-paper/70">
                Simplesmente aceite a Palavra de Deus e receba Sua salvação pela fé. Creia e você
                será salvo. Nenhuma igreja, nenhuma instituição religiosa, nenhuma boa obra poderá
                salvá-lo. Lembre-se, somente Deus pode salvar!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tenha certeza + práticas diárias */}
      <div className="container pb-4">
        <Movement index="05" title="Tenha certeza da sua salvação">
          <div className="prose-editorial md:text-lg">
            <p>
              O plano simples de Deus para salvação é: porque você é pecador, você precisa de
              salvação. Portanto, a menos que você creia em Jesus, que morreu no seu lugar, você
              passará a eternidade no inferno. Se você crer nEle como seu Salvador crucificado,
              sepultado e ressurreto, você receberá perdão por todos os seus pecados e Seu dom de
              salvação eterna pela fé.
            </p>
            <p>
              Você diz: &ldquo;com certeza, não pode ser tão simples assim&rdquo;. Sim, é bem simples
              e bíblico. Este é o plano de Deus. Meu amigo, creia em Jesus e O receba como seu
              Salvador pessoal hoje.
            </p>
            <p>
              Se o plano de Deus não estiver perfeitamente claro, leia este folheto várias vezes, sem
              parar, até que você o entenda. Sua alma é mais valiosa que o mundo inteiro.
            </p>
          </div>
          <Verse cite="Marcos 8:36">
            &ldquo;Pois que aproveitaria ao homem ganhar todo o mundo e perder a sua alma?&rdquo;
          </Verse>
          <div className="prose-editorial md:text-lg">
            <p>
              Tenha certeza de que você é salvo. O poder de Deus o salvará, o manterá salvo e fará com
              que você viva uma vida cristã vitoriosa.
            </p>
          </div>
          <Verse cite="1 Coríntios 10:13">
            &ldquo;Não veio sobre vós tentação, senão humana; mas fiel é Deus, que vos não deixará
            tentar acima do que podeis; antes, com a tentação dará também o escape, para que a
            possais suportar.&rdquo;
          </Verse>
          <div className="prose-editorial md:text-lg">
            <p>
              Não confie em seus sentimentos, pois eles mudam. Confie nas promessas de Deus. Elas
              nunca mudam.
            </p>
          </div>
        </Movement>

        <Movement index="06" title="Depois de ser salvo">
          <div className="prose-editorial md:text-lg">
            <p>
              Depois que você for salvo, há três coisas que você precisa praticar diariamente para o
              crescimento espiritual. Você também deve ser batizado em obediência ao Senhor Jesus
              Cristo, como testemunho público da sua salvação, e, sem demora, unir-se a uma igreja
              que pregue a Bíblia.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {practices.map((p, i) => (
              <li key={p.title} className="bg-paper p-6">
                <span className="font-sans text-label uppercase text-muted/70">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 font-sans text-sm text-muted">{p.text}</p>
              </li>
            ))}
          </ul>

          <Verse cite="2 Timóteo 1:8">
            &ldquo;Portanto, não te envergonhes do testemunho de nosso Senhor.&rdquo;
          </Verse>
          <Verse cite="Mateus 10:32">
            &ldquo;Portanto, qualquer que me confessar diante dos homens, eu o confessarei diante de
            meu Pai, que está nos céus.&rdquo;
          </Verse>

          <p className="mt-6 font-sans text-xs uppercase tracking-[0.15em] text-muted/70">
            Folheto O Plano Simples de Deus para a Salvação, por Ford Porter (POR 164)
          </p>
        </Movement>
      </div>

      {/* Próximo passo: faixa de encerramento em degrade verde (sem imagem),
          distinta do footer claro. */}
      <section className="relative overflow-hidden bg-emerald-deep text-paper" aria-label="Próximo passo">
        <div className="absolute inset-0" aria-hidden>
          {/* Degrade radial: brilho verde suave no canto superior direito,
              escurecendo para a esquerda/base (onde fica o texto). */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_150%_at_85%_0%,#2e7a58_0%,#17573d_42%,#0f3728_72%,#092619_100%)]" />
          <div className="grain" />
        </div>
        <div className="container relative z-10 flex flex-col items-start justify-between gap-6 py-section sm:flex-row sm:items-center">
          <p className="max-w-xl font-display text-2xl font-semibold md:text-3xl">
            Se você fez essa oração, queremos caminhar com você nos primeiros passos.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/contato" className="btn-gold">
              Quero conversar
              <IconArrow className="h-5 w-5" />
            </Link>
            <a
              href={PDF_HREF}
              download
              className="btn-ghost border-paper/30 text-paper hover:border-paper"
            >
              <IconDownload className="h-5 w-5" />
              Baixar em PDF
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
