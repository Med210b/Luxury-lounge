import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export const LuxuryPhilosophy: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const attributionRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // 1. Spaced category badge
      if (categoryRef.current) {
        tl.fromTo(
          categoryRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
      }

      // 2. Main Quote Heading: Mask Reveal from behind horizontal line (translateY 100% -> 0)
      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { yPercent: 105, opacity: 0.2 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.out', // Equivalent to cubic-bezier(0.16, 1, 0.3, 1)
          },
          '-=0.2'
        );
      }

      // 3. Attribution & Hairline Divider
      if (attributionRef.current) {
        tl.fromTo(
          attributionRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.45'
        );
      }
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );
      }

      // 4. Biography Sub-paragraph: Mask Reveal with 0.18s cascading stagger
      if (bioRef.current) {
        tl.fromTo(
          bioRef.current,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.out',
          },
          '-=0.45'
        );
      }

      // 5. Historical Dates Grid
      if (datesRef.current) {
        tl.fromTo(
          datesRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.35'
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      className="py-20 md:py-28 relative bg-transparent overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Unified Section Header with Mask Reveal */}
        <SectionHeader
          chapter="Chapter II • Archival Manifesto"
          title="Luxury Philosophy"
          subtitle="“Verbatim doctrine from the pioneering figures who redefined contemporary elegance, effortless ease, and haute couture.”"
        />

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Portrait of Coco Chanel in metallic glowing frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[390px] sm:max-w-[420px]">
              {/* Outer Metallic Frame & Glow (with group hover for subtle zoom-out effect) */}
              <div className="group relative p-3 sm:p-3.5 rounded-sm border border-[rgba(224,224,224,0.35)] hover:border-[rgba(255,255,255,0.7)] bg-gradient-to-b from-[#0E172A]/90 via-[#090F20]/95 to-[#050A15] backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(255,255,255,0.07)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(255,255,255,0.18)] transition-all duration-700 ease-out cursor-pointer">
                {/* Metallic Corner Hairline Accents */}
                <div className="absolute -top-[1px] -left-[1px] w-3.5 h-3.5 border-t-2 border-l-2 border-white/70 group-hover:border-white transition-colors duration-500" />
                <div className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 border-t-2 border-r-2 border-white/70 group-hover:border-white transition-colors duration-500" />
                <div className="absolute -bottom-[1px] -left-[1px] w-3.5 h-3.5 border-b-2 border-l-2 border-white/70 group-hover:border-white transition-colors duration-500" />
                <div className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 border-b-2 border-r-2 border-white/70 group-hover:border-white transition-colors duration-500" />

                {/* Inner Image Frame */}
                <div className="relative overflow-hidden rounded-[1px] border border-[rgba(255,255,255,0.12)]">
                  <img
                    src="https://res.cloudinary.com/swcgor0l/image/upload/v1790287637/ChatGPT_Image_Sep_25_2026_02_06_38_AM_qmnunj.png"
                    alt="Gabrielle Coco Chanel"
                    className="w-full h-auto aspect-[3/4] sm:aspect-[4/5] object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700 ease-out will-change-transform"
                    loading="lazy"
                  />
                  {/* Subtle inner highlight border overlay */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Typography, Quote, Bio & Historical Metadata */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top Spaced Category with animated text gradient */}
            <div ref={categoryRef} className="mb-4">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.38em] luxury-title-animated-gradient font-medium block">
                L U X U R Y &nbsp; P H I L O S O P H Y
              </span>
            </div>

            {/* Large Serif Quote with Mask Reveal container (overflow: hidden) */}
            <div className="overflow-hidden pb-1 pt-0.5">
              <blockquote
                ref={quoteRef}
                className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-light leading-[1.35] tracking-wide block will-change-transform"
              >
                <span className="luxury-quote-animated-gradient">
                  &ldquo;Luxury must be comfortable; otherwise it is not luxury.&rdquo;
                </span>
              </blockquote>
            </div>

            {/* Quote Attribution */}
            <div ref={attributionRef} className="mt-3 text-xs sm:text-sm tracking-[0.24em] text-[#A0A7B8] font-sans font-medium uppercase">
              &mdash; GABRIELLE &ldquo;COCO&rdquo; CHANEL
            </div>

            {/* Elegant Metallic Divider */}
            <div
              ref={dividerRef}
              className="w-16 h-[1px] bg-gradient-to-r from-[rgba(224,224,224,0.5)] via-[rgba(224,224,224,0.2)] to-transparent my-6"
            />

            {/* Biography with Mask Reveal container (overflow: hidden) */}
            <div className="overflow-hidden mb-8 pb-1">
              <p
                ref={bioRef}
                className="text-sm sm:text-base text-[#9DA7BC] font-light leading-relaxed tracking-wide block will-change-transform"
              >
                Gabrielle &ldquo;Coco&rdquo; Chanel was a visionary French fashion designer and the founder of the global Chanel brand. She is widely regarded as a pioneer of modern elegance. Her revolutionary ideas about removing restrictive garments to prioritize freedom, function, and effortless comfort continue to shape the luxury industry around the world.
              </p>
            </div>

            {/* Historical Dates Grid */}
            <div
              ref={datesRef}
              className="grid grid-cols-2 gap-6 pt-5 border-t border-[rgba(192,192,192,0.14)] max-w-md"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#737A8C] font-mono block">
                  BORN
                </span>
                <p className="text-sm text-[#F1F5F9] font-serif mt-1 tracking-wide">
                  August 19, 1883
                </p>
                <p className="text-xs text-[#8E96A8] font-light tracking-wide mt-0.5">
                  Saumur, France
                </p>
              </div>

              <div className="border-l border-[rgba(192,192,192,0.14)] pl-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#737A8C] font-mono block">
                  DIED
                </span>
                <p className="text-sm text-[#F1F5F9] font-serif mt-1 tracking-wide">
                  January 10, 1971
                </p>
                <p className="text-xs text-[#8E96A8] font-light tracking-wide mt-0.5">
                  Paris, France
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};