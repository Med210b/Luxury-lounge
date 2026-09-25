import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll progression across the full Hero viewport
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Dark overlay fades in gently as user scrolls, preserving video hardware overlay
  const overlayDarken = useTransform(scrollYProgress, [0, 0.8], [0, 0.75]);

  // Foreground Content: upward floating drift and gradual opacity taper
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Optimized video autoplay & lifecycle: auto-pauses when out of view to guarantee zero lag
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video) return;

    // Fluid playback speed
    video.playbackRate = 1.0;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    playVideo();
    video.addEventListener('loadeddata', playVideo);

    // Pause video when scrolled out of view to free 100% GPU/CPU decoding resources
    let observer: IntersectionObserver | null = null;
    if (hero && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (video.paused) {
                video.play().catch(() => {});
              }
            } else {
              if (!video.paused) {
                video.pause();
              }
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(hero);
    }

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      if (observer && hero) {
        observer.unobserve(hero);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between items-center pt-28 pb-12 overflow-hidden bg-[#050A15]"
    >
      {/* 1. Full-Bleed Background Video with Native Hardware Compositor Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/video/hero-poster.jpg"
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/video/hero-720p.mp4" type="video/mp4" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Unified Cinematic Vignette for Contrast without Compositor Stutter */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(5,10,21,0.25) 0%, rgba(5,10,21,0.7) 70%, #050A15 100%), linear-gradient(180deg, rgba(5,10,21,0.9) 0%, transparent 25%, transparent 75%, #050A15 100%)',
          }}
        />

        {/* Dynamic Scroll Fade Layer */}
        <motion.div
          style={{ opacity: overlayDarken }}
          className="absolute inset-0 bg-[#050A15] pointer-events-none"
        />
      </div>

      {/* Spacer to balance vertical centering with header */}
      <div className="w-full h-4" />

      {/* 2. Refined Foreground Typography Placed Directly on the Video */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center my-auto will-change-transform flex flex-col items-center"
      >
        {/* Subtle Luxury Micro-Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-[#050A15]/80 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E0E0E0]" />
          <span className="text-[10px] md:text-[11px] font-serif tracking-[0.3em] uppercase text-[#E0E0E0]">
            Bespoke Private Client Concierge
          </span>
        </motion.div>

        {/* Main Headline: THE ESSENCE OF REFINED LIVING. (Mask Reveal Container) */}
        <div className="overflow-hidden pb-2 pt-1 mb-6">
          <motion.h1
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-[0.06em] uppercase leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] will-change-transform"
          >
            <span className="silver-gradient-heading block">THE ESSENCE OF</span>
            <span className="silver-gradient-heading block">REFINED LIVING.</span>
          </motion.h1>
        </div>

        {/* Subheadline: A BESPOKE CONCIERGE AND LIFESTYLE MANAGEMENT FIRM */}
        <div className="overflow-hidden mb-10 pb-1">
          <motion.p
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.43, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm md:text-base text-[#D4D4D4] font-light tracking-[0.26em] uppercase max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] will-change-transform"
          >
            A Bespoke Concierge and Lifestyle Management Firm
          </motion.p>
        </div>

        {/* Refined Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full"
        >
          <a
            href="https://wa.me/971585783038?text=Hello%20Luxury%20Lounge%20Private%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-silver w-full sm:w-auto px-8 py-3.5 text-[11px] tracking-[0.25em] text-center"
          >
            Direct Inquiry
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-3.5 text-[11px] tracking-[0.25em] text-center rounded-full border border-white/35 bg-[#050A15]/80 hover:bg-white hover:text-[#050A15] text-white transition-all duration-300 shadow-lg cursor-pointer"
          >
            Explore Services
          </a>
        </motion.div>
      </motion.div>

      {/* 3. Subtle Animated Scroll Indicator at the Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#A0A7B8] hover:text-white transition-colors duration-300"
          aria-label="Scroll to explore about us"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#C0C0C0] group-hover:text-white" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
