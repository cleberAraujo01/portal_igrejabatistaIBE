import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

/**
 * Imagem Open Graph gerada dinamicamente (1200x630).
 * -------------------------------------------------------------
 * Renderizada no edge via next/og. Reproduz a identidade visual:
 * fundo verde profundo, cruz sobre Biblia, titulo sans encorpado com
 * "Emanuel" em dourado e o slogan. Serve para todas as paginas via
 * metadataBase.
 */
export const alt = `${site.name} · ${site.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(120% 90% at 50% 15%, #1c5a43 0%, #123f30 50%, #0b291f 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="47" stroke="#8fd6b4" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="42" stroke="#8fd6b4" strokeWidth="1" opacity="0.55" />
            <path
              d="M50 66C42 60 33 59 25 61V40C33 38 42 39 50 45C58 39 67 38 75 40V61C67 59 58 60 50 66Z"
              stroke="#ffffff"
              strokeWidth="1.6"
            />
            <path d="M50 45V66" stroke="#ffffff" strokeWidth="1.4" />
            <path d="M50 14V41M40 24H60" stroke="#8fd6b4" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#8fd6b4',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Jundiaí · São Paulo · Desde 1978
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 88, lineHeight: 1, letterSpacing: -2, fontWeight: 700 }}>
            Igreja Batista
          </span>
          <span style={{ fontSize: 88, lineHeight: 1.05, fontWeight: 700, color: '#d4a843' }}>
            Emanuel
          </span>
        </div>

        <span
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.8)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {site.slogan}
        </span>
      </div>
    ),
    { ...size },
  );
}
