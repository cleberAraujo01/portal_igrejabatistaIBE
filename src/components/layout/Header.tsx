'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navigation, site } from '@/lib/site';
import { BrandMark } from '@/components/icons/Logo';

/**
 * Header — navegacao principal.
 * -------------------------------------------------------------
 * Barra sticky (em fluxo, sem sobrepor o conteudo) com fundo verde
 * translucido e blur, valida sobre o hero escuro e sobre as paginas
 * claras. Marca compacta a esquerda (cruz em quadrado com gradiente),
 * navegacao central e botao LIVE com bolinha pulsante a direita.
 * Marca o link ativo por rota (aria-current) para acessibilidade e
 * para o sublinhado.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Bloqueia o scroll do body enquanto o menu mobile esta aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[rgba(13,40,24,0.55)] backdrop-blur-[10px]">
      <div className="container flex h-[76px] items-center justify-between gap-6 text-paper">
        {/* Lockup da marca */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name}, pagina inicial`}
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold tracking-tight text-paper">
              Igreja Batista Emanuel
            </span>
            <span className="font-sans text-[11px] tracking-[0.06em] text-paper/70">
              {site.slogan}
            </span>
          </span>
        </Link>

        {/* Navegacao desktop */}
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link nav-link--light text-[14.5px] text-[#dce8dd]"
              data-active={isActive(item.href)}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[20px] bg-[#c0392b] px-5 py-2 font-sans text-sm font-semibold text-paper transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[#d64535]"
            aria-label="Transmissão ao vivo no YouTube (abre em nova aba)"
          >
            <span className="h-2 w-2 rounded-full bg-paper animate-live-pulse" aria-hidden />
            LIVE
          </a>
        </nav>

        {/* Botao mobile */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-paper transition-all duration-300 ${
                open ? 'top-2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-6 bg-paper transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-paper transition-all duration-300 ${
                open ? 'top-2 -rotate-45' : 'top-4'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Painel mobile */}
      <div
        id="mobile-nav"
        className={`overflow-hidden bg-[#0d2818] text-paper transition-[max-height] duration-500 ease-editorial lg:hidden ${
          open ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <nav aria-label="Principal (mobile)" className="container flex flex-col py-4">
          {navigation.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-semibold text-paper"
              aria-current={isActive(item.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <span className="font-sans text-label text-paper/50">0{i + 1}</span>
            </Link>
          ))}
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-[20px] bg-[#c0392b] px-6 py-3 font-sans text-sm font-semibold text-paper"
            onClick={() => setOpen(false)}
          >
            <span className="h-2 w-2 rounded-full bg-paper animate-live-pulse" aria-hidden />
            Assistir ao vivo
          </a>
        </nav>
      </div>
    </header>
  );
}
