import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  distance?: number; // px to translateY
  duration?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  threshold = 0.12,
  distance = 32,
  duration = 0.85,
  once = true,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold, margin: '0px 0px -40px 0px' }}
      transition={{
        duration,
        delay: delayMs / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-[opacity,transform] ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

