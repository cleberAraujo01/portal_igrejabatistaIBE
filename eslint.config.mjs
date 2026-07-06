import next from 'eslint-config-next';

/**
 * ESLint (flat config) — Next 16 + ESLint 9.
 * -------------------------------------------------------------
 * Consome o flat config nativo do Next (core-web-vitals + typescript
 * + jsx-a11y + react-hooks), sem camadas de compatibilidade.
 */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...next,
];

export default eslintConfig;
