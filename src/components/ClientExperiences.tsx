import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, Lock, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface GoogleReviewItem {
  id: string;
  name: string;
  title: string;
  avatar: string;
  date: string;
  location: string;
  quote: string;
  tier: string;
}

const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Alexander von Bergmann',
    title: 'Managing Partner, Bergmann Private Capital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
    date: '3 weeks ago',
    location: 'Dubai & Geneva',
    tier: 'Imperial Tier Patron',
    quote:
      'When our transatlantic charter was grounded during critical diplomatic negotiations, the Luxury Lounge operations desk had an alternative Global 7500 on the ramp at Dubai DWC with VIP customs clearance in under 110 minutes. Their discretion and swift execution are unmatched anywhere in the world.',
  },
  {
    id: 'rev-2',
    name: 'Lady Camilla Sterling',
    title: 'Trustee, Sterling Maritime Trust',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    date: '1 month ago',
    location: 'Monaco & London',
    tier: 'Prestige Member',
    quote:
      'Securing a prime 65-meter deep-water berth at Port Hercule during the Monaco Grand Prix on forty-eight hours notice seemed entirely impossible. The team not only secured the berth but orchestrated seamless airside helicopter transfers directly to the yacht’s aft deck.',
  },
  {
    id: 'rev-3',
    name: 'Tariq Al-Mansoor',
    title: 'Principal, Al-Mansoor Family Office',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop',
    date: '2 months ago',
    location: 'Dubai & Abu Dhabi',
    tier: 'Imperial Tier Patron',
    quote:
      'Beyond aviation and superyacht logistics, their fine art advisory acquired an off-market private collection masterpiece under strict institutional NDA. Having a dedicated Senior Director who anticipates our family office logistics across four continents is indispensable.',
  },
  {
    id: 'rev-4',
    name: 'Dr. Elena Rostova',
    title: 'Founder, Quantum Biosystems & Global Collector',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop',
    date: '2 weeks ago',
    location: 'Zurich & Singapore',
    tier: 'Signature Member',
    quote:
      'Whether orchestrating in-residence gastronomy with three-star Michelin masters at our St. Moritz retreat or expedited tarmac passage through Tokyo Haneda, their quiet precision never wavers. Luxury Lounge defines the pinnacle of confidential patronage.',
  },
  {
    id: 'rev-5',
    name: 'Jean-Luc Mercier',
    title: 'Director General, Hélios Aviation Advisory',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop',
    date: '3 days ago',
    location: 'Paris & Nice',
    tier: 'Prestige Member',
    quote:
      'Our flight dispatch commands require absolute punctuality and zero airside friction. Luxury Lounge manages diplomatic overflight clearances and hot-spare redundancies with a military level of precision that gives our leadership total peace of mind.',
  },
  {
    id: 'rev-6',
    name: 'Marcus Vance',
    title: 'Chief Investment Officer, Vance Sovereign Partners',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=250&auto=format&fit=crop',
    date: '1 month ago',
    location: 'Singapore & New York',
    tier: 'Imperial Tier Patron',
    quote:
      'From securing an unlisted private archipelago estate in French Polynesia to confidential airside tarmac transfers in Singapore, their network has access to sovereign assets that are simply absent from commercial luxury channels.',
  },
];

export const ClientExperiences: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedReview, setSelectedReview] = useState<GoogleReviewItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const [isRtl, setIsRtl] = useState(() => {
    if (typeof document !== 'undefined') {
      return (
        document.documentElement.dir === 'rtl' ||
        document.documentElement.lang === 'ar' ||
        document.body.classList.contains('rtl-layout') ||
        localStorage.getItem('luxury_lounge_selected_lang') === 'ar'
      );
    }
    return false;
  });

  useEffect(() => {
    const checkRtl = () => {
      const rtl =
        document.documentElement.dir === 'rtl' ||
        document.documentElement.lang === 'ar' ||
        document.body.classList.contains('rtl-layout') ||
        localStorage.getItem('luxury_lounge_selected_lang') === 'ar';
      setIsRtl(rtl);
      if (contentRef.current) {
        contentRef.current.style.opacity = '1';
      }
    };

    const handleLang = () => {
      checkRtl();
      setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch {}
      }, 150);
    };

    window.addEventListener('luxuryLanguageChanged', handleLang);

    // Watch for dir / lang attribute mutations on html
    const observer = new MutationObserver(() => {
      checkRtl();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir', 'lang'] });

    return () => {
      window.removeEventListener('luxuryLanguageChanged', handleLang);
      observer.disconnect();
    };
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedReview(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="py-24 md:py-32 relative bg-transparent border-t border-[rgba(192,192,192,0.12)] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-[#0A1628] opacity-50 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[300px] rounded-full bg-[#070D1C] opacity-40 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Mask Reveal */}
        <SectionHeader
          chapter="Chapter III • Confidential Patronage"
          title="Client Testimonials & Dispatches"
          subtitle="“Verbatim reflections from sovereign families, maritime principals, and global patrons on our discreet execution and bespoke stewardship.”"
        >
          {/* Controls Bar: Google Reviews Aggregate Pill Badge + Pause/Play toggle */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-[#121622]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="flex items-center gap-1 text-[#FBBC05]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[11px] font-mono tracking-wider text-white font-medium">
                5.0 RATING
              </span>
              <span className="text-white/30 text-xs">•</span>
              <span className="text-[11px] font-mono tracking-wider text-[#A0A7B8] uppercase">
                180+ VERIFIED PATRONS
              </span>
            </div>

            {/* Optional Play/Pause Animation Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume reviews scroll' : 'Pause reviews scroll'}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/15 bg-[#121622]/80 hover:bg-white/10 text-white text-[11px] font-mono tracking-wider transition-colors cursor-pointer"
            >
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-[#FF4D6D]' : 'bg-[#34A853] animate-pulse'}`} />
              <span>{isPaused ? 'RESUME SCROLL' : 'PAUSE SCROLL'}</span>
            </button>
          </div>
        </SectionHeader>

        {/* Content Area */}
        <div ref={contentRef} className="mt-8 transition-opacity duration-300 opacity-100">
          {/* CONTINUOUS INFINITE-SCROLLING HORIZONTAL MARQUEE */}
          {/* CRITICAL: Must maintain dir="ltr" on the container and track so the coordinate system never flips or disappears in RTL/Arabic */}
          <div
            dir="ltr"
            className="infinite-marquee-container relative w-full overflow-hidden py-3"
            style={{ direction: 'ltr', textAlign: 'left' }}
          >
            {/* Left & Right gradient edge masks for seamless viewport blend */}
            <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-[#050A15] via-[#050A15]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-[#050A15] via-[#050A15]/80 to-transparent z-10 pointer-events-none" />

            {/* Inner Track (Duplicated for seamless 0% -> -50% continuous loop) */}
            <div
              dir="ltr"
              className="infinite-marquee-track flex gap-6"
              style={{
                direction: 'ltr',
                animationPlayState: isPaused ? 'paused' : undefined,
              }}
            >
              {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className={`w-[330px] sm:w-[380px] md:w-[410px] h-[350px] shrink-0 rounded-2xl bg-[#121622] border border-[#2B3245] hover:border-[#4B5675] hover:shadow-[0_12px_36px_rgba(0,0,0,0.65)] transition-all duration-300 p-6 flex flex-col justify-between group ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                >
                  {/* Top Header: Google 'G' Icon + GOOGLE REVIEWS + Date */}
                  <div>
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        {/* Authentic Google 'G' Icon */}
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#A0A7B8] font-medium">
                          GOOGLE REVIEWS
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#6B7280]">
                        {review.date}
                      </span>
                    </div>

                    {/* Rating: Five Gold Stars */}
                    <div className="flex items-center gap-1 my-2.5">
                      {[...Array(5)].map((_, starIdx) => (
                        <svg
                          key={starIdx}
                          className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05] drop-shadow-[0_0_4px_rgba(251,188,5,0.4)]"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className={`text-xs text-white/90 font-medium font-mono ${isRtl ? 'mr-1.5' : 'ml-1.5'}`}>
                        5.0
                      </span>
                    </div>

                    {/* Review Text wrapped in quotation marks */}
                    <p className={`text-white text-[13.5px] sm:text-sm leading-relaxed font-light line-clamp-4 select-text ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
                      &ldquo;{review.quote}&rdquo;
                    </p>

                    {/* Read More Link */}
                    <button
                      type="button"
                      onClick={() => setSelectedReview(review)}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#FF4D6D] hover:text-[#FF758F] transition-colors cursor-pointer mt-3 ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}
                    >
                      <span>CLICK TO READ MORE</span>
                      <span className="font-mono">{isRtl ? '←' : '→'}</span>
                    </button>
                  </div>

                  {/* Footer (User Info): Avatar, Name, Title */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#232A3B] mt-auto">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0 shadow-sm"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white truncate">
                        {review.name}
                      </div>
                      <div className="text-xs text-[#8E96A8] truncate font-light">
                        {review.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Hover Guidance Hint */}
          <div className="mt-4 text-center">
            <span className="text-[11px] font-mono tracking-widest text-[#737A8C] uppercase">
              • Hover over any review card to pause the scroll •
            </span>
          </div>

          {/* Bottom Discretion & Stewardship Footnote Banner */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-9 h-9 rounded-full border border-white/25 bg-white/5 flex items-center justify-center text-white">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-times text-sm text-white font-medium">100% Confidentiality</h5>
                <p className="font-times text-xs text-[#8E96A8] italic">
                  Strict institutional non-disclosure protocol
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-9 h-9 rounded-full border border-white/25 bg-white/5 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-times text-sm text-white font-medium">Clearance Level 1</h5>
                <p className="font-times text-xs text-[#8E96A8] italic">
                  Diplomatic airside & maritime priority access
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-9 h-9 rounded-full border border-white/25 bg-white/5 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-times text-sm text-white font-medium">Bespoke Stewardship</h5>
                <p className="font-times text-xs text-[#8E96A8] italic">
                  Dedicated logistics director across 4 continents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL REVIEW MODAL DIALOG ON "CLICK TO READ MORE ->" */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            {/* Modal Backdrop Click */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedReview(null)}
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              dir={isRtl ? 'rtl' : 'ltr'}
              className={`relative w-full max-w-lg rounded-2xl bg-[#121622] border border-[#3A435C] p-7 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 overflow-hidden ${
                isRtl ? 'text-right' : 'text-left'
              }`}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                aria-label="Close review dialog"
                className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer`}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header: Google 'G' + Review Info */}
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#A0A7B8] font-medium">
                  GOOGLE REVIEWS • VERIFIED DISPATCH
                </span>
              </div>

              {/* Gold Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className={`text-xs text-white/90 font-medium font-mono ${isRtl ? 'mr-1.5' : 'ml-1.5'}`}>5.0</span>
                <span className={`text-[#8E96A8] text-xs font-mono ${isRtl ? 'mr-2' : 'ml-2'}`}>• {selectedReview.date}</span>
              </div>

              {/* Full Unabridged Quote Text */}
              <div className="my-5 p-4 rounded-xl bg-black/40 border border-white/10">
                <p className={`text-white text-sm sm:text-base leading-relaxed font-light italic ${isRtl ? 'text-right font-sans' : 'text-left'}`}>
                  &ldquo;{selectedReview.quote}&rdquo;
                </p>
              </div>

              {/* User Dossier */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#232A3B]">
                <img
                  src={selectedReview.avatar}
                  alt={selectedReview.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/30 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm sm:text-base font-medium text-white truncate">
                    {selectedReview.name}
                  </div>
                  <div className="text-xs text-[#8E96A8] truncate font-light">
                    {selectedReview.title}
                  </div>
                  <div className="text-[11px] text-[#A0A7B8] font-mono mt-0.5">
                    {selectedReview.location} • {selectedReview.tier}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
