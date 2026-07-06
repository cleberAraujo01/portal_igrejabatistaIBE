# Imagens — placeholders

Coloque aqui as fotos oficiais da igreja. Enquanto os arquivos nao
existem, a interface usa placeholders editoriais (ver
`src/components/ui/Placeholder.tsx`) com dimensoes explicitas, o que
evita deslocamento de layout (CLS).

## Arquivos esperados

| Arquivo                | Onde aparece                         | Proporcao sugerida | Status     |
| ---------------------- | ------------------------------------ | ------------------ | ---------- |
| `hero-biblia.png`      | Fundo full-bleed da hero (home)      | 1600 x 1063 (3:2)  | Em uso     |
| `templo.jpg`           | Seccao de horarios (home)            | 1500 x 1200 (5:4)  | Pendente   |
| `congregacao.jpg`      | Pagina Quem Somos                    | 1200 x 1500 (4:5)  | Pendente   |

## Como substituir um placeholder por foto real

1. Adicione o arquivo otimizado nesta pasta (JPG ou PNG de origem; o
   Next converte para AVIF/WebP automaticamente).
2. Troque o componente `<Placeholder ... />` por `next/image`:

   ```tsx
   import Image from 'next/image';

   <div className="relative aspect-[5/4]">
     <Image
       src="/images/templo.jpg"
       alt="Fachada do templo da Igreja Batista Emanuel"
       fill
       sizes="(max-width: 768px) 100vw, 50vw"
       className="object-cover"
     />
   </div>
   ```

3. Na hero (`src/components/sections/Hero.tsx`), descomente o bloco
   `<Image ... priority ... />` e remova as camadas de placeholder em CSS.

Sempre escreva um `alt` descritivo (acessibilidade e SEO).
