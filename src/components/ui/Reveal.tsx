'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Reveal — revelacao discreta ao entrar na viewport.
 * -------------------------------------------------------------
 * Client component (usa IntersectionObserver via framer-motion).
 * Quando o usuario prefere menos movimento, o conteudo aparece
 * imediatamente, sem deslocamento (WCAG 2.3.3).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = 'div',
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'li' | 'span';
  className?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  );
}
