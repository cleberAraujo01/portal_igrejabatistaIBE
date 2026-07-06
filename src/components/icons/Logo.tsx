import Image from 'next/image';
import type { SVGProps } from 'react';

/**
 * BrandMark — marca compacta com o logo oficial.
 * -------------------------------------------------------------
 * Logo real da igreja (cruz verde sobre Biblia aberta) em um
 * quadrado claro 36x36 de cantos 9px, garantindo contraste sobre
 * os fundos verde-escuros do header e do footer.
 */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-paper ${className}`}
    >
      <Image
        src="/images/logo-ibe.png"
        alt=""
        width={28}
        height={24}
        className="h-6 w-7 object-contain"
      />
    </span>
  );
}

/**
 * Logo — Igreja Batista Emanuel
 * -------------------------------------------------------------
 * Componente SVG inline: cruz solida sobre uma Biblia aberta.
 * Usa `currentColor` para herdar a cor do contexto (versao clara
 * sobre o header/hero e verde sobre o footer claro).
 *
 * O arquivo de referencia original esta em `public/images/logo-ibe.png`.
 */
export function Logo({ title = 'Igreja Batista Emanuel', ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Cruz solida emergindo do centro da Biblia */}
      <path
        d="M43 6 H57 V22 H72 V34 H57 V64 H43 V34 H28 V22 H43 Z"
        fill="currentColor"
      />

      {/* Biblia aberta: duas paginas em perspectiva */}
      <g
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Pagina esquerda */}
        <path d="M50 84 C44 79 34 77 22 78 C14 78.5 9 79 5 80 L14 58 C24 57 36 60 50 68 Z" />
        {/* Pagina direita */}
        <path d="M50 84 C56 79 66 77 78 78 C86 78.5 91 79 95 80 L86 58 C76 57 64 60 50 68 Z" />

        {/* Lombada central */}
        <path d="M50 68 V90" strokeWidth="2.6" />

        {/* Linhas de paginas sugeridas (folhas em leque) */}
        <path d="M50 80 C41 76 30 74.5 15 76.5" strokeWidth="2" opacity="0.75" />
        <path d="M50 80 C59 76 70 74.5 85 76.5" strokeWidth="2" opacity="0.75" />

        {/* Marcador de pagina */}
        <path d="M26 66 V90 L28.5 86.5 L31 90 V64" strokeWidth="2.4" />
      </g>
    </svg>
  );
}
