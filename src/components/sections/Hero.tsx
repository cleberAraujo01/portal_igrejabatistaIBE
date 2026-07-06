'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { services, site } from '@/lib/site';
import { IconArrow, IconPlay } from '@/components/icons';

/**
 * Hero — tese visual da pagina inicial.
 * -------------------------------------------------------------
 * Duas colunas sobre um fundo verde em camadas (linear 160° + dois
 * brilhos radiais, verde e dourado). A esquerda: eyebrow com traco
 * dourado, titulo 800, lead, botoes e a linha de estatisticas. A
 * direita: composicao com pontilhado dourado, glow, moldura fina de
 * cantos assimetricos, a foto da Biblia, badge "ao vivo" e o card
 * flutuante em glassmorphism com o proximo culto.
 */

// Fade/slide escalonado dos blocos de conteudo.
const fade: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/** Dia da semana (0-6) de cada culto, derivado de lib/site. */
const DAY_INDEX: Record<string, number> = { Sunday: 0, Wednesday: 3 };
const DAY_FULL = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

type NextService = { day: string; time: string; label: string };

/** Proximo culto a partir de agora (roda so no cliente, pos-hidratacao). */
function nextService(now: Date): NextService {
  let best: { value: NextService; score: number } | null = null;
  for (const s of services) {
    const target = DAY_INDEX[s.dayOfWeek];
    const [h, m] = s.opens.split(':').map(Number);
    let inDays = (target - now.getDay() + 7) % 7;
    if (inDays === 0 && (now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m))) {
      inDays = 7;
    }
    // Minutos ate o culto: quanto menor, mais proximo.
    const score = inDays * 24 * 60 + h * 60 + m;
    if (!best || score < best.score) {
      best = { value: { day: DAY_FULL[target], time: s.time, label: s.label }, score };
    }
  }
  return best!.value;
}

/**
 * Valor client-only via useSyncExternalStore: o servidor rende o
 * primeiro culto (estavel) e o cliente refina para o proximo real
 * na hidratacao. O cache mantem o snapshot estavel entre renders.
 */
const SERVER_NEXT: NextService = {
  day: DAY_FULL[DAY_INDEX[services[0].dayOfWeek]],
  time: services[0].time,
  label: services[0].label,
};
let cachedNext: NextService | null = null;
const subscribeNoop = () => () => {};
const getNextService = () => {
  if (cachedNext === null) cachedNext = nextService(new Date());
  return cachedNext;
};

/** Estatisticas da linha inferior da coluna de texto. */
const stats = [
  { value: '47', label: 'Anos de história' },
  { value: '3', label: 'Cultos semanais' },
  { value: '+300', label: 'Famílias' },
] as const;

// Raio assimetrico compartilhado entre moldura e foto.
const FRAME_RADIUS = '20px 120px 20px 20px';

export function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? 'visible' : 'hidden';

  const next = useSyncExternalStore(subscribeNoop, getNextService, () => SERVER_NEXT);

  return (
    <section
      className="relative overflow-hidden text-paper"
      aria-label="Boas-vindas"
      style={{
        background: [
          'radial-gradient(620px 460px at 6% 4%, rgba(60,120,80,0.5), transparent 70%)',
          'radial-gradient(560px 440px at 96% 96%, rgba(190,140,50,0.18), transparent 70%)',
          'linear-gradient(160deg, #123322 0%, #0c2318 55%, #0a1c14 100%)',
        ].join(', '),
      }}
    >
      <div className="container grid grid-cols-1 items-center gap-14 py-12 pt-[56px] lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-[56px] lg:py-[64px] lg:pt-[90px] xl:px-16">
        {/* --- Coluna de texto --- */}
        <div>
          {/* Eyebrow com traco dourado */}
          <motion.p
            className="flex items-center gap-3 font-sans text-[13px] font-bold uppercase tracking-[1.5px] text-[#e8c37a]"
            variants={fade}
            custom={0.1}
            initial={initial}
            animate="visible"
          >
            <span className="inline-block h-[2px] w-[28px] bg-gold" aria-hidden />
            Jundiaí, SP · desde {site.foundedYear}
          </motion.p>

          {/* Titulo */}
          <motion.h1
            className="mt-6 font-display text-[clamp(2.4rem,5.5vw,52px)] font-bold leading-[1.1] tracking-[-0.02em]"
            variants={fade}
            custom={0.2}
            initial={initial}
            animate="visible"
          >
            Uma igreja com a <span className="font-medium italic text-[#f0b054]">Bíblia aberta</span> para você
          </motion.h1>

          {/* Lead */}
          <motion.p
            className="mt-6 max-w-[480px] font-sans text-[16.5px] leading-relaxed text-[#cfe0d3]"
            variants={fade}
            custom={0.35}
            initial={initial}
            animate="visible"
          >
            Emanuel significa &ldquo;Deus conosco&rdquo;. Somos uma comunidade simples, centrada
            nas Escrituras, onde você e a sua família serão muito bem-vindos.
          </motion.p>

          {/* Acoes */}
          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            variants={fade}
            custom={0.5}
            initial={initial}
            animate="visible"
          >
            <Link href="/horarios" className="btn-gold">
              Planeje sua visita
              <IconArrow className="h-5 w-5" />
            </Link>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/35 px-6 py-3 font-sans text-sm font-medium text-paper transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
            >
              <IconPlay className="h-5 w-5" />
              Assistir ao vivo
            </a>
          </motion.div>

          {/* Estatisticas */}
          <motion.dl
            className="mt-12 flex flex-wrap gap-x-10 gap-y-6"
            variants={fade}
            custom={0.65}
            initial={initial}
            animate="visible"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[26px] font-bold leading-none text-paper">
                  {s.value}
                </dd>
                <dd className="mt-2 font-sans text-[12.5px] uppercase tracking-[0.08em] text-[#a9c2ae]">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* --- Composicao de imagem --- */}
        <motion.div
          className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:max-w-none"
          variants={fade}
          custom={0.3}
          initial={initial}
          animate="visible"
        >
          <div className="relative h-[400px] sm:h-[480px] lg:h-[560px]">
            {/* Pontilhado dourado (fundo, canto superior esquerdo) */}
            <div
              aria-hidden
              className="absolute -left-6 -top-6 h-36 w-44 opacity-70"
              style={{
                backgroundImage: 'radial-gradient(rgba(240,176,84,0.55) 1px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />

            {/* Glow dourado difuso (canto superior direito) */}
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-[340px] w-[340px] blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(240,176,84,0.35), transparent 70%)',
              }}
            />

            {/* Moldura fina dourada, deslocada na diagonal */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-[18px] -right-[18px] left-[26px] top-[26px] border-2 border-[rgba(240,176,84,0.55)]"
              style={{ borderRadius: FRAME_RADIUS }}
            />

            {/* Foto */}
            <div
              className="absolute inset-0 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)]"
              style={{ borderRadius: FRAME_RADIUS }}
            >
              <Image
                src="/images/hero-biblia.png"
                alt="Bíblia aberta sobre o púlpito da Igreja Batista Emanuel"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover [filter:saturate(1.05)_contrast(1.03)]"
              />
              {/* Overlay: escurece a base para contraste */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 40%, rgba(8,20,13,0.85) 100%)',
                }}
              />

              {/* Badge ao vivo (dentro da foto, canto superior direito) */}
              <p className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[rgba(10,20,14,0.55)] px-4 py-2 font-sans text-xs font-medium text-paper backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#e74c3c] animate-live-pulse" aria-hidden />
                Ao vivo aos domingos
              </p>
            </div>

            {/* Card flutuante: proximo culto */}
            <div className="absolute bottom-[30px] left-3 w-[250px] rounded-2xl border border-white/25 bg-white/10 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-[16px] lg:-left-[30px]">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#9fd8b0]">
                Próximo culto
              </p>
              <p className="mt-1.5 font-display text-[19px] font-bold text-paper">
                {next.day} · {next.time}
              </p>
              <p className="mt-1 font-sans text-[12.5px] leading-snug text-paper/75">{next.label}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
