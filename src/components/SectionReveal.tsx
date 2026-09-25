import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

interface SectionRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

/**
 * SectionReveal: Scroll-triggered section container reveal animation powered by Framer Motion.
 * Animates section containers into view with subtle opacity and transform fade as user scrolls.
 */
export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 36,
  duration = 0.85,
  once = true,
  amount = 0.08,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: '0px 0px -40px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`w-full will-change-[opacity,transform] ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
