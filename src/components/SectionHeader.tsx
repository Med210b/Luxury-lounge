import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  chapter: string;
  title: string;
  subtitle: string;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  chapter,
  title,
  subtitle,
  className = '',
  children,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // 1. Chapter Eyebrow fade and subtle slide up
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
        );
      }

      // 2. Main Heading: "Mask Reveal" slide-up from behind invisible line (translateY 100% -> 0)
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.out', // Mirrors cubic-bezier(0.16, 1, 0.3, 1)
          },
          '-=0.25'
        );
      }

      // 3. Sub-paragraph: "Mask Reveal" slide-up with 0.18s staggered delay after heading
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power4.out',
          },
          '-=0.62' // ~0.18s after title animation starts
        );
      }

      // 4. Children elements if present
      if (childrenRef.current) {
        tl.fromTo(
          childrenRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`text-center max-w-3xl mx-auto mb-14 ${className}`}
    >
      {/* Chapter Eyebrow with gradient hairlines */}
      <div ref={eyebrowRef} className="inline-flex items-center gap-3 mb-4">
        <span className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[rgba(192,192,192,0.6)] to-transparent" />
        <span className="text-[11px] font-times uppercase tracking-[0.3em] text-[#C0C0C0] font-normal">
          {chapter}
        </span>
        <span className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[rgba(192,192,192,0.6)] to-transparent" />
      </div>

      {/* Main Title Mask Reveal Container (overflow: hidden acts as the invisible horizontal mask) */}
      <div className="overflow-hidden pb-1.5 pt-0.5">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-times font-normal tracking-[0.02em] leading-tight block will-change-transform"
        >
          <span className="silver-gradient-heading">{title}</span>
        </h2>
      </div>

      {/* Subtitle / Quote Mask Reveal Container (overflow: hidden mask with staggered slide-up) */}
      <div className="overflow-hidden mt-2.5 pb-1">
        <p
          ref={subtitleRef}
          style={{ fontFamily: "'Times New Roman', Times, 'Tinos', serif" }}
          className="text-[#A0A7B8] text-sm sm:text-base font-normal italic leading-relaxed max-w-2xl mx-auto block will-change-transform"
        >
          {subtitle}
        </p>
      </div>

      {/* Optional additional elements (like view switcher buttons) */}
      {children && (
        <div ref={childrenRef}>
          {children}
        </div>
      )}
    </div>
  );
};
