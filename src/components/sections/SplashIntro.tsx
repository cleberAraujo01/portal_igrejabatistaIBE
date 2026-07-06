'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * SplashIntro — tela de abertura da home.
 * -------------------------------------------------------------
 * Overlay em tela cheia sobre a arte oficial (cruz, veus dourados e
 * Biblia aberta) com atmosfera animada: blobs em deriva lenta, brasas
 * douradas subindo e um halo pulsante em volta do logo real da
 * igreja. A tela so sai quando o visitante clica no logo (ou usa
 * Enter/Esc/botao "Pular introducao" — acessibilidade por teclado);
 * nao ha saida automatica.
 *
 * Exibida uma vez por sessao (sessionStorage). Um script inline no
 * layout marca <html data-splash-done> antes do primeiro paint para
 * visitantes recorrentes — sem flash da splash nem da home.
 * Respeita prefers-reduced-motion: sem blobs/brasas/pulso, apenas
 * um fade curto.
 */

const STORAGE_KEY = 'ibe-splash-vista';

/**
 * Brasas com valores deterministicos (pseudo-aleatorio por indice).
 * Gerar no modulo — e nao com Math.random no render — mantem o HTML
 * do servidor identico ao do cliente (sem erro de hidratacao).
 */
const EMBERS = Array.from({ length: 26 }, (_, i) => {
  const t = (i * 137.508) % 100; // angulo aureo: espalha bem sem parecer grade
  return {
    left: `${(t + 2) * 0.96}%`,
    size: `${3 + ((i * 7) % 5)}px`,
    duration: `${7 + ((i * 13) % 60) / 10}s`,
    delay: `${((i * 29) % 70) / 10}s`,
    sway: `${((i % 2 ? 1 : -1) * (10 + ((i * 11) % 26)))}px`,
    opacity: `${0.35 + ((i * 17) % 45) / 100}`,
  };
});

export function SplashIntro() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const dismissed = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setVisible(false);
  }, []);

  useEffect(() => {
    // Ja vista nesta sessao? Remove logo apos a hidratacao — o CSS
    // (data-splash-done) ja a escondeu antes do primeiro paint, entao
    // nao ha flash. Microtask evita setState sincrono no efeito.
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        dismissed.current = true;
        queueMicrotask(() => setVisible(false));
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // sessionStorage indisponivel (modo privado etc.): segue exibindo.
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [dismiss]);

  // Trava o scroll da pagina enquanto a splash cobre a tela.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="splash-intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-emerald-deep text-paper"
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.25 } }
              : { opacity: 0, scale: 1.06, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
          }
        >
          {/* --- Atmosfera --- */}
          <div aria-hidden className="absolute inset-0">
            {/* Arte de fundo com art direction: retrato no mobile (cruz no
                alto, Biblia na base), paisagem no desktop. */}
            <Image
              src="/images/splash-bg-mobile.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover md:hidden"
            />
            <Image
              src="/images/splash-bg-desktop.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hidden object-cover md:block"
            />
            {/* Vinheta para manter o centro legivel. (Os blobs desfocados
                foram removidos: com a arte de fundo eles eram redundantes e
                o blur gigante animado pesava demais na GPU.) */}
            <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_50%,transparent_35%,rgba(9,26,19,0.75)_100%)]" />
            {/* Brasas subindo */}
            {!reduce &&
              EMBERS.map((e, i) => (
                <span
                  key={i}
                  className="ember"
                  style={
                    {
                      '--ember-left': e.left,
                      '--ember-size': e.size,
                      '--ember-duration': e.duration,
                      '--ember-delay': e.delay,
                      '--ember-sway': e.sway,
                      '--ember-opacity': e.opacity,
                    } as CSSProperties
                  }
                />
              ))}
            <div className="grain" style={{ opacity: 0.08, mixBlendMode: 'overlay' }} />
          </div>

          {/* --- Conteudo central (levemente acima do centro: a Biblia
              ocupa a base da arte) --- */}
          <div className="relative z-10 mb-[12vh] flex flex-col items-center px-6 text-center">
            {/* Logo real, clicavel, com halo pulsante — a unica porta de entrada */}
            <motion.button
              type="button"
              onClick={dismiss}
              className={`flex h-28 w-28 items-center justify-center rounded-full border border-gold/50 bg-paper/95 transition-transform duration-300 ease-editorial hover:scale-105 ${
                reduce ? '' : 'animate-halo-pulse'
              }`}
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Entrar no site"
            >
              <Image
                src="/images/logo-ibe.png"
                alt=""
                width={88}
                height={88}
                priority
                className="h-[88px] w-[88px] object-contain"
              />
            </motion.button>

            {/* Nome */}
            <motion.h1
              className="mt-8 font-display text-[clamp(2.4rem,7vw,4.8rem)] font-bold leading-[1.05] tracking-[-0.02em]"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              Igreja Batista <span className="font-medium italic text-gold">Emanuel</span>
            </motion.h1>

            {/* Subtitulo */}
            <motion.p
              className="mt-4 font-sans text-label uppercase tracking-[0.28em] text-paper/70"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            >
              A Igreja da Bíblia Aberta
            </motion.p>

            {/* Indicador de entrada */}
            <motion.span
              className="mt-14 inline-flex items-center gap-2 font-sans text-sm text-paper/60"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <span className={`inline-block h-1.5 w-1.5 rounded-full bg-gold ${reduce ? '' : 'animate-bob'}`} />
              Toque no logo para entrar
            </motion.span>
          </div>

          {/* Pular introducao (acessivel por teclado) */}
          <motion.button
            type="button"
            className="absolute right-5 top-5 z-20 rounded-full border border-paper/25 px-4 py-2 font-sans text-xs text-paper/70 transition-colors duration-300 hover:border-paper/60 hover:text-paper"
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Pular introdução
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
