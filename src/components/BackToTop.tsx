import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Reveal button after user scrolls past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="back-to-top-btn"
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, y: 18, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.88 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            scale: 1.1,
            y: -3,
            transition: { type: 'spring', stiffness: 400, damping: 20 },
          }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-7 right-7 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[rgba(192,192,192,0.35)] bg-[#050A15]/90 backdrop-blur-md flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.65),0_0_12px_rgba(255,255,255,0.08)] hover:border-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_22px_rgba(255,255,255,0.28)] transition-all cursor-pointer group"
        >
          <ArrowUp
            className="w-4 h-4 text-[#D4D4D4] group-hover:text-white transition-colors duration-300"
            strokeWidth={1.8}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
