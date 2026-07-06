# Igreja Batista Emanuel de Jundiai

Site institucional da **Igreja Batista Emanuel de Jundiai** — _A Igreja da Biblia Aberta_.
Projeto Next.js (App Router) com TypeScript, foco em performance, acessibilidade (WCAG 2.1 AA)
e SEO tecnico.

---

## Stack

| Camada        | Tecnologia                                             |
| ------------- | ------------------------------------------------------ |
| Framework     | Next.js 16 (App Router, React Server Components)        |
| Linguagem     | TypeScript (strict)                                    |
| Estilo        | Tailwind CSS 3 com design system tokenizado            |
| Animacao      | Framer Motion (discreta, respeita prefers-reduced-motion) |
| Fontes        | next/font self-hosted (Fraunces + Inter), sem CLS      |
| Deploy alvo   | Vercel                                                 |

---

## Como rodar

Requisitos: Node.js 18.18+ (recomendado 20+).

```bash
npm install       # instala dependencias
npm run dev       # ambiente de desenvolvimento em http://localhost:3000
npm run build     # build de producao (inclui checagem de tipos)
npm run start     # serve o build de producao
npm run lint      # ESLint (flat config, Next + jsx-a11y)
npm run typecheck # apenas checagem de tipos
```

---

## Estrutura de pastas

```
src/
  app/                     Rotas (App Router)
    layout.tsx             Layout raiz: fontes, metadata global, JSON-LD, Header/Footer
    globals.css            Base do design system + utilitarios + grao de filme
    page.tsx               Pagina inicial (Hero + indice editorial)
    sobre/                 Quem Somos
    no-que-cremos/         Declaracao de Fe
    salvacao/              Como Ser Salvo
    horarios/              Horarios e Localizacao
    contato/               Contato (formulario acessivel)
    sitemap.ts             sitemap.xml gerado
    robots.ts              robots.txt gerado
    opengraph-image.tsx    Imagem OG 1200x630 gerada por codigo
    icon.svg               Favicon (logo)
    not-found.tsx          Pagina 404
  components/
    layout/                Header, Footer, PageHeader
    sections/              Hero, ContactForm
    ui/                    Reveal, SectionHeader, JsonLd, Placeholder
    icons/                 Logo (SVG inline) e icones line-style
  lib/
    site.ts                Fonte unica de verdade (conteudo, contato, horarios)
    fonts.ts               Configuracao de fontes (next/font)
    seo.ts                 Fabrica de metadata por pagina
    jsonld.ts              Grafos schema.org (Church/LocalBusiness, WebSite, Breadcrumb)
public/
  images/                  Fotos reais (ver public/images/LEIA-ME.md)
```

### Decisoes de arquitetura

- **Server Components por padrao.** Apenas o que precisa de interatividade e client
  component (`Header`, `Hero`, `Reveal`, `ContactForm`). Isso reduz o JavaScript enviado
  ao navegador e melhora o INP.
- **Fonte unica de verdade (`lib/site.ts`).** Conteudo institucional, horarios, contato e
  navegacao vivem em um so lugar. Header, Footer, sitemap e o JSON-LD leem dele, evitando
  divergencia de dados.
- **SEO centralizado.** `lib/seo.ts` monta title/description/canonical/OG por pagina;
  `lib/jsonld.ts` monta os dados estruturados. Cada `page.tsx` so declara seus textos.

---

## Design system

Tokens definidos em `tailwind.config.ts` e espelhados como CSS custom properties em
`src/app/globals.css` (para uso em gradientes e SVG).

### Cores

| Token            | Hex                       | Uso                              |
| ---------------- | ------------------------- | -------------------------------- |
| `ink`            | `#151a18`                 | Texto principal (tinta escura)   |
| `paper`          | `#ffffff`                 | Fundo dominante                  |
| `bone`           | `#f7f6f2`                 | Fundo de seccoes alternadas      |
| `emerald`        | `#1a6b4d`                 | Verde principal (acento)         |
| `emerald.deep`   | `#0f3d2c`                 | Verde profundo (hover, hero)     |
| `emerald.soft`   | `#8fd6b4`                 | Verde claro (italicos, detalhes) |
| `muted`          | `#5b625f`                 | Texto secundario                 |
| `line`           | `rgba(21,26,24,.12)`      | Hairlines / divisorias           |

### Tipografia

- **Display:** Fraunces (serifada, eixo optico variavel) — titulos editoriais.
- **Texto e labels:** Inter (sans humanista).
- Escala: `label`, `display-sm`, `display-md`, `display-lg` (todas com `clamp()` para
  fluidez responsiva).

### Espacamento e detalhes editoriais

- `spacing.section` — respiro vertical fluido entre seccoes.
- `.eyebrow` — micro-label em caixa alta com tracking e tracinho verde.
- `.text-vertical` — coordenadas geograficas na vertical.
- Numeracao de seccoes `01 / 05` — usada apenas onde ha sequencia real.
- `.grain` — grao de filme via SVG feTurbulence (data URI, sem requisicao de rede).

---

## SEO tecnico

- **Metadata API** com title/description unicos por pagina e `title.template` de marca.
- **Open Graph e Twitter Cards** completos, com imagem OG gerada em `opengraph-image.tsx`.
- **Canonical URLs** por pagina.
- **sitemap.xml** e **robots.txt** gerados pelo Next.
- **JSON-LD**: `Church`/`LocalBusiness` (nome, endereco, geo, horarios, telefone, `sameAs`),
  `WebSite` e `BreadcrumbList` por pagina.
- **HTML semantico**: um unico `<h1>` por pagina, hierarquia de headings, landmarks
  (`header`, `main`, `nav`, `footer`), `lang="pt-BR"`.
- **Imagens**: `next/image` com AVIF/WebP e dimensoes explicitas (ver placeholders abaixo).

## Acessibilidade

- Contraste adequado, foco visivel (`:focus-visible`), navegacao por teclado.
- Skip link "Pular para o conteudo".
- `aria-label`/`aria-current`/`aria-expanded` onde necessario; formulario com `label`
  associado e erros anunciados por `aria-describedby`.
- `prefers-reduced-motion` desliga animacoes nao essenciais.

---

## Placeholders a substituir antes de producao

1. **Logo oficial** — `src/components/icons/Logo.tsx` traz uma interpretacao fiel a
   descricao (cruz verde sobre Biblia aberta em circulo duplo). Troque o conteudo do
   componente pelo arquivo oficial mantendo a assinatura de props (`currentColor`).
2. **Fotos reais** — veja `public/images/LEIA-ME.md`. Os `<Placeholder />` marcam onde as
   fotos entram; a hero tem um bloco `<Image>` pronto para descomentar.
3. **Dados institucionais** — em `src/lib/site.ts`: `url` (dominio de producao), endereco
   completo, `geo` (coordenadas), telefone, e-mail e perfis sociais. Todos marcados como
   PLACEHOLDER.
4. **Formulario de contato** — hoje abre o e-mail do visitante (mailto). Para envio via
   servidor, troque o `handleSubmit` de `ContactForm.tsx` por uma Server Action ou endpoint
   (a marcacao acessivel ja esta pronta).

---

## Deploy na Vercel

1. Suba o repositorio para o GitHub/GitLab/Bitbucket.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositorio. A Vercel detecta o
   Next.js automaticamente (build `next build`, sem configuracao extra).
3. Ajuste `site.url` em `src/lib/site.ts` para o dominio final (afeta canonical, OG,
   sitemap e JSON-LD).
4. Deploy. Configure o dominio personalizado em **Settings > Domains**.

Alternativa por CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # producao
```

---

## Checklist de qualidade

- [x] Build de producao sem erros, todas as paginas estaticas.
- [x] `npm run lint` limpo (regras Next + jsx-a11y).
- [x] Um `<h1>` por pagina, landmarks e `lang="pt-BR"`.
- [x] Sem emojis; icones em SVG line-style com `currentColor`.
- [x] Sem travessoes/meias-riscas no texto exibido.
- [ ] Substituir placeholders (logo, fotos, dados, dominio) antes do go-live.
- [ ] Rodar Lighthouse apos publicar com as fotos reais para confirmar Core Web Vitals.
