import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/sections/ContactForm';
import { site } from '@/lib/site';
import { IconMail, IconPhone, IconPin, IconYoutube, IconInstagram } from '@/components/icons';

export const metadata: Metadata = pageMetadata({
  title: 'Contato',
  description:
    'Fale com a Igreja Batista Emanuel de Jundiaí. Envie uma mensagem, pedido de oração ou planeje a sua primeira visita. Telefone, e-mail e redes sociais.',
  path: '/contato',
});

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Contato', path: '/contato' },
];

const channels = [
  { icon: IconPhone, label: 'Telefone', value: site.phone.display, href: `tel:${site.phone.href}` },
  { icon: IconMail, label: 'E-mail', value: site.email, href: `mailto:${site.email}` },
  {
    icon: IconPin,
    label: 'Endereço',
    value: `${site.address.district}, ${site.address.city} · ${site.stateCode}`,
    href: '/horarios',
  },
];

export default function ContatoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Contato"
        index="05"
        title="Fale com"
        accent="a igreja"
        lead="Tem uma dúvida, um pedido de oração ou quer planejar a sua primeira visita? Escreva para nós. Será uma alegria receber você."
      />

      <section aria-labelledby="contato-title">
        <div className="container grid grid-cols-1 gap-16 py-section md:grid-cols-12">
          {/* Canais diretos */}
          <div className="md:col-span-5">
            <Reveal>
              <h2 id="contato-title" className="font-display text-display-sm font-bold text-ink">
                Canais diretos
              </h2>
            </Reveal>
            <ul className="mt-8 flex flex-col">
              {channels.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className="border-t border-line last:border-b">
                    <Reveal delay={i * 0.05}>
                      <a
                        href={c.href}
                        className="group flex items-center gap-5 py-6 transition-colors"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-emerald transition-colors group-hover:bg-emerald group-hover:text-paper">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex flex-col">
                          <span className="font-sans text-label uppercase text-muted">
                            {c.label}
                          </span>
                          <span className="mt-1 font-sans text-lg text-ink">{c.value}</span>
                        </span>
                      </a>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            <Reveal delay={0.15}>
              <div className="mt-10">
                <span className="font-sans text-label uppercase text-muted">Redes sociais</span>
                <div className="mt-4 flex gap-4">
                  <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Canal no YouTube (abre em nova aba)"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-emerald hover:text-emerald"
                  >
                    <IconYoutube className="h-5 w-5" />
                  </a>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Perfil no Instagram (abre em nova aba)"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-emerald hover:text-emerald"
                  >
                    <IconInstagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Formulario */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <div className="border border-line bg-bone p-8 md:p-10">
                <span className="eyebrow">Envie uma mensagem</span>
                <p className="prose-editorial mb-8 mt-5 text-sm">
                  Preencha os campos abaixo. Sua mensagem será aberta no seu aplicativo de e-mail,
                  pronta para enviar.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
