import type { Config } from 'tailwindcss';

/**
 * Design System — Igreja Batista Emanuel
 * -------------------------------------------------------------
 * Todos os tokens visuais vivem aqui e sao expostos como classes
 * utilitarias. As cores tambem existem como CSS custom properties
 * em globals.css (para uso em gradientes e SVG), mantendo uma unica
 * fonte de verdade documentada.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    // Container editorial com respiro generoso e largura de leitura controlada.
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.75rem',
        lg: '2.5rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      colors: {
        // Tinta escura de base (quase preto esverdeado).
        ink: '#151a18',
        // Fundo claro dominante.
        paper: '#ffffff',
        // Off-white para seccoes alternadas.
        bone: '#f7f6f2',
        // Verde principal.
        emerald: {
          DEFAULT: '#1a6b4d',
          deep: '#0f3d2c',
          soft: '#8fd6b4',
        },
        // Dourado — acento da identidade Emanuel.
        // DEFAULT sobre fundos escuros (5.5:1 sobre emerald-deep) e em
        // botoes preenchidos com texto ink (7.8:1). `deep` e a variante
        // para texto dourado sobre fundo claro (4.6:1 sobre paper, AA).
        gold: {
          DEFAULT: '#d4a843',
          soft: '#ecd9a0',
          deep: '#8f7222',
        },
        // Texto secundario.
        muted: '#5b625f',
        // Hairlines / divisorias finas.
        line: 'rgba(21, 26, 24, 0.12)',
      },
      fontFamily: {
        // Serifada de display (titulos).
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // Sans humanista (corpo e labels).
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Escala tipografica com line-height e tracking calibrados
        // para a Sora (tracking mais fechado em corpos grandes).
        'label': ['0.72rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'display-sm': ['clamp(1.9rem, 3.6vw, 2.6rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.5rem, 5.2vw, 4rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(3rem, 9vw, 6.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 9rem)',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'grain-shift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-3%, 2%)' },
          '50%': { transform: 'translate(2%, -3%)' },
          '75%': { transform: 'translate(-2%, -1%)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' },
        },
        // Bolinha pulsante dos indicadores "ao vivo".
        'live-pulse': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.3' },
        },
        // Pulso/glow do circulo da cruz na splash.
        'halo-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 168, 67, 0.35), 0 0 40px 4px rgba(212, 168, 67, 0.18)' },
          '50%': { boxShadow: '0 0 0 18px rgba(212, 168, 67, 0), 0 0 64px 10px rgba(212, 168, 67, 0.3)' },
        },
      },
      animation: {
        grain: 'grain-shift 8s steps(6) infinite',
        bob: 'bob 1.8s ease-in-out infinite',
        'halo-pulse': 'halo-pulse 2.6s ease-in-out infinite',
        'live-pulse': 'live-pulse 1.4s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;
