import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plane, Anchor, Compass, Globe2, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalServicePanel {
  step: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  metrics: { label: string; value: string }[];
  deliverables: string[];
}

const HORIZONTAL_PANELS: HorizontalServicePanel[] = [
  {
    step: '01',
    eyebrow: 'Chapter III • Protocol 01 / 06',
    title: 'PRIVATE AVIATION DISPATCH',
    description:
      'Instantaneous worldwide private jet positioning across 180+ sovereign flight hubs, operating with 15-minute tarmac ramp clearance, heavy intercontinental airframes, and bilateral diplomatic discretion.',
    image:
      'https://res.cloudinary.com/swcgor0l/image/upload/v1790102285/aa8151ed-f24d-4af1-91d9-9924a50098c1_hfmivv.png',
    icon: <Plane className="w-5 h-5 text-white" />,
    metrics: [
      { label: 'Ramp Access', value: '< 15 Minutes' },
      { label: 'Global Reach', value: '180+ Hubs' },
      { label: 'Discretion', value: 'Bilateral NDA' },
    ],
    deliverables: [
      'Ultra-Long-Range Heavy Jet Availability',
      'Airside Diplomatic Tarmac Escort',
      'Private Master Stateroom Configuration',
      'Confidential Tail Registry Protocol',
    ],
  },
  {
    step: '02',
    eyebrow: 'Chapter III • Protocol 02 / 06',
    title: 'SUPERYACHT CHARTER & MARITIME',
    description:
      'Unrestricted maritime chartering of 60m to 120m world-class yachts, equipped with touch-and-go helipads, deep-water submersible tenders, certified master navigators, and secluded private anchorages.',
    image:
      'https://res.cloudinary.com/swcgor0l/image/upload/v1790102638/ChatGPT_Image_Sep_22_2026_10_43_49_PM_dbyekr.png',
    icon: <Anchor className="w-5 h-5 text-white" />,
    metrics: [
      { label: 'Fleet Scope', value: '60m – 120m' },
      { label: 'Navigation', value: 'Confidential' },
      { label: 'Crew Service', value: 'Michelin Team' },
    ],
    deliverables: [
      'Helipad & Submersible Staging',
      'Michelin-Trained Maritime Culinary Team',
      'Custom Deep-Water Anchorages',
      'Private Tender Island Shuttles',
    ],
  },
  {
    step: '03',
    eyebrow: 'Chapter III • Protocol 03 / 06',
    title: 'JET CABIN SANCTUARY',
    description:
      'Custom-engineered airborne staterooms featuring active acoustic dampening, circadian sky illumination, full-flat master berths, and encrypted satellite command suites built for world principals.',
    image:
      'https://res.cloudinary.com/swcgor0l/image/upload/v1790102143/2370745c-0d60-4744-a73c-9924114f4396_plahtw.png',
    icon: <Compass className="w-5 h-5 text-white" />,
    metrics: [
      { label: 'Cabin Noise', value: '< 48 dB (Silent)' },
      { label: 'Satellite Uplink', value: 'Ka-Band' },
      { label: 'Master Berth', value: 'Full-Flat 180°' },
    ],
    deliverables: [
      'Ergonomic Sleep & Wellness Staterooms',
      'Direct Satellite Secure Voice/Data Suite',
      'In-Flight Restorative Lighting & Air Filtration',
      'Dedicated In-Flight Sommelier',
    ],
  },
  {
    step: '04',
    eyebrow: 'Chapter III • Protocol 04 / 06',
    title: 'MARINE LEISURE & RESIDENCES',
    description:
      'Curated deep-water coastal estates, secluded archipelago compounds, and turnkey marine assets managed with perpetual custodial security and private helitransfer links.',
    image:
      'https://res.cloudinary.com/swcgor0l/image/upload/v1790102143/ChatGPT_Image_Sep_22_2026_10_34_57_PM_sej4rf.png',
    icon: <Globe2 className="w-5 h-5 text-white" />,
    metrics: [
      { label: 'Estate Scope', value: 'Coastal & Island' },
      { label: 'Security Level', value: 'Diplomatic' },
      { label: 'Helipad Staging', value: 'Dedicated Pad' },
    ],
    deliverables: [
      'Private Deep-Water Superyacht Moorings',
      'Turnkey Island Residential Stewardship',
      '24/7 Diplomatic-Grade Security Patrols',
      'Helitransfer & Marine Tender Logistics',
    ],
  },
  {
    step: '05',
    eyebrow: 'Chapter III • Protocol 05 / 06',
    title: 'EXECUTIVE AVIATION LOGISTICS',
    description:
      'Precision multi-leg delegation charters, biometric airside processing, supersonic positioning, and standby emergency rerouting managed by senior flight dispatch commanders.',
    image:
      'https://res.cloudinary.com/swcgor0l/image/upload/v1790102532/ChatGPT_Image_Sep_22_2026_10_41_02_PM_sgxcyk.png',
    icon: <Plane className="w-5 h-5 text-white" />,
    metrics: [
      { label: 'Dispatch Desk', value: '24/7 Senior' },
      { label: 'Redundancy', value: 'Hot-Spare' },
      { label: 'Airway Routing', value: 'Rank #1 Priority' },
    ],
    deliverables: [
      'Global Range Nonstop Heavy Fleet',
      'Biometric Airside Expedited Clearance',
      'Sovereign Airspace Overflight Rights',
      'Priority Air Traffic Control Handling',
    ],
  },
  {
    step: '06',
    eyebrow: 'Chapter III • Protocol 06 / 06',
    title: 'VIP CABIN SUITE & GASTRONOMY',
    description:
      'Sky-chef bespoke menus formulated for high-altitude gastronomy, rare Grand Cru cellar allocations, and altitude recovery therapies ensuring absolute vitality across intercontinental time zones.',
    image:
      'https://res.cloudinary.com/swcgor0l/image/upload/v1790102566/ChatGPT_Image_Sep_22_2026_10_42_39_PM_enmcmj.png',
    icon: <Sparkles className="w-5 h-5 text-white" />,
    metrics: [
      { label: 'Gastronomy', value: 'Sky Chef' },
      { label: 'Cellar Selection', value: 'Grand Cru' },
      { label: 'Ground Liaison', value: 'Airside Escort' },
    ],
    deliverables: [
      'High-Altitude Customized Nutrition Protocols',
      'Rare Vintage Cellar Reserves Onboard',
      'Restorative Sleep & Recovery Regimen',
      'Seamless Airside Chauffeur Concierge',
    ],
  },
];

export const BespokeServices: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isRtl, setIsRtl] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.dir === 'rtl' || localStorage.getItem('luxury_lounge_selected_lang') === 'ar';
    }
    return false;
  });

  // Keep RTL state in sync and refresh ScrollTrigger when language changes
  useEffect(() => {
    const handleLang = () => {
      const rtl = document.documentElement.dir === 'rtl' || localStorage.getItem('luxury_lounge_selected_lang') === 'ar';
      setIsRtl(rtl);
      setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch {}
      }, 150);
    };

    window.addEventListener('luxuryLanguageChanged', handleLang);
    return () => window.removeEventListener('luxuryLanguageChanged', handleLang);
  }, []);

  // Animate panel text mask reveal when active panel changes
  const animatePanelMaskReveal = (index: number) => {
    const panels = document.querySelectorAll<HTMLElement>('.service-horizontal-panel');
    const panel = panels[index];
    if (!panel) return;

    const title = panel.querySelector<HTMLElement>('.panel-mask-title');
    const text = panel.querySelector<HTMLElement>('.panel-mask-text');
    const watermark = panel.querySelector<HTMLElement>('.panel-watermark');
    const meta = panel.querySelector<HTMLElement>('.panel-meta');
    const card = panel.querySelector<HTMLElement>('.panel-media-card');

    if (watermark) {
      gsap.to(watermark, { opacity: 0.05, x: 0, duration: 0.9, ease: 'power3.out' });
    }

    // Heading Mask Reveal: translateY(105%) -> translateY(0%) with cubic-bezier / power4.out (0.8s)
    if (title) {
      gsap.fromTo(
        title,
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power4.out', overwrite: 'auto' }
      );
    }

    // Sub-paragraph Mask Reveal: 0.18s staggered delay
    if (text) {
      gsap.fromTo(
        text,
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, delay: 0.18, ease: 'power4.out', overwrite: 'auto' }
      );
    }

    if (meta) {
      gsap.fromTo(
        meta,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.28, ease: 'power3.out', overwrite: 'auto' }
      );
    }

    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power3.out', overwrite: 'auto' }
      );
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: gsap.Context;

    // Small timeout to guarantee DOM metrics & layouts are fully painted
    const initTimer = setTimeout(() => {
      ctx = gsap.context(() => {
        const totalPanels = HORIZONTAL_PANELS.length;

        // Calculate total distance to translate along X axis
        const getDistance = () => {
          return track.scrollWidth - window.innerWidth;
        };

        // Main Horizontal Tween pinned to sectionRef
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(getDistance(), (totalPanels - 1) * window.innerHeight * 0.9)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${Math.min(100, p * 100)}%`;
              }
              const calculatedIndex = Math.min(
                totalPanels - 1,
                Math.floor(p * (totalPanels - 0.05))
              );
              setActiveIndex((prev) => {
                if (prev !== calculatedIndex) {
                  animatePanelMaskReveal(calculatedIndex);
                  return calculatedIndex;
                }
                return prev;
              });
            },
            onEnter: () => {
              // Trigger panel 0 mask reveal immediately upon section entrance
              animatePanelMaskReveal(0);
            },
          },
        });

        scrollTriggerInstanceRef.current = tween.scrollTrigger || null;

        // Animate initial panel 0 immediately
        animatePanelMaskReveal(0);
      }, section);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (ctx) ctx.revert();
    };
  }, []);

  // Jump to specific panel by smooth scroll with robust retry and state synchronization
  const scrollToPanel = (index: number, attempts = 0) => {
    const clampedIndex = Math.max(0, Math.min(HORIZONTAL_PANELS.length - 1, index));
    const st = scrollTriggerInstanceRef.current;
    
    if (!st || st.end <= st.start) {
      if (attempts < 6) {
        try {
          ScrollTrigger.refresh();
        } catch {}
        setTimeout(() => scrollToPanel(clampedIndex, attempts + 1), 120);
      }
      return;
    }

    const total = HORIZONTAL_PANELS.length;
    const progressRatio = total > 1 ? clampedIndex / (total - 1) : 0;
    const targetScroll = st.start + progressRatio * (st.end - st.start);

    window.scrollTo({
      top: Math.round(targetScroll),
      behavior: 'smooth',
    });

    setActiveIndex(clampedIndex);
    animatePanelMaskReveal(clampedIndex);
  };

  // Listen to global jumpToServiceProtocol events dispatched by Navbar or search
  useEffect(() => {
    const handleJump = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      if (typeof customEvent.detail?.index === 'number') {
        scrollToPanel(customEvent.detail.index);
      }
    };

    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      const match = hash.match(/#service(?:s)?-protocol-(\d+)/) || hash.match(/#protocol-0?(\d+)/);
      if (match) {
        const protocolNum = parseInt(match[1], 10);
        if (protocolNum >= 1 && protocolNum <= HORIZONTAL_PANELS.length) {
          setTimeout(() => {
            scrollToPanel(protocolNum - 1);
          }, 160);
        }
      }
    };

    window.addEventListener('jumpToServiceProtocol', handleJump as EventListener);
    window.addEventListener('hashchange', checkHash);

    // Initial hash check after mount
    const timer = setTimeout(checkHash, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('jumpToServiceProtocol', handleJump as EventListener);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const handleNext = () => {
    if (activeIndex < HORIZONTAL_PANELS.length - 1) {
      scrollToPanel(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToPanel(activeIndex - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#050A15] text-[#C0C0C0] selection:bg-[#E0E0E0] selection:text-[#050A15]"
    >
      {/* Pinned Stage: Locks full height in place while scrolling */}
      <div className="h-screen w-full relative overflow-hidden flex flex-col justify-between bg-[#050A15]">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-[#0A1128] opacity-50 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] rounded-full bg-[#070D1C] opacity-40 blur-[140px] pointer-events-none" />

        {/* TOP AGENCY HEADER BAR (Sticky inside pinned viewport) */}
        <header className="h-[74px] sm:h-[84px] px-4 sm:px-8 lg:px-12 flex items-center justify-between border-b border-white/10 z-30 bg-[#050A15]/95 backdrop-blur-md relative shrink-0">
          {/* Left: Chapter & Section Title */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.26em] text-[#8E96A8] uppercase">
                  Chapter III • Bespoke Protocol
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-times font-normal tracking-[0.04em] uppercase text-white">
                <span className="silver-gradient-heading">Bespoke Services</span>
              </h2>
            </div>
          </div>

          {/* Center: Protocol Navigation Indicator Pills */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {HORIZONTAL_PANELS.map((p, idx) => (
              <button
                key={p.step}
                type="button"
                onClick={() => scrollToPanel(idx)}
                aria-label={`Jump to Protocol ${p.step}`}
                className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-white text-[#050A15] font-bold shadow-[0_0_12px_rgba(255,255,255,0.75)]'
                    : 'text-[#8E96A8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {p.step}
              </button>
            ))}
          </div>

          {/* Right: Controls & Active Counter */}
          <div className="flex items-center gap-3">
            {/* Arrow Nav Buttons for instant click scrolling */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous Protocol"
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeIndex === 0
                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                    : 'border-white/30 text-white hover:border-white hover:bg-white/10'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === HORIZONTAL_PANELS.length - 1}
                aria-label="Next Protocol"
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeIndex === HORIZONTAL_PANELS.length - 1
                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                    : 'border-white/30 text-white hover:border-white hover:bg-white/10'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right pl-2 border-l border-white/15">
              <span className="text-xs sm:text-sm font-mono font-medium text-white tracking-widest block font-number">
                [ {HORIZONTAL_PANELS[activeIndex]?.step} / 06 ]
              </span>
              <span className="text-[8.5px] font-mono tracking-[0.16em] text-[#737A8C] uppercase hidden sm:block">
                Scroll to explore →
              </span>
            </div>
          </div>

          {/* Hairline Progress Indicator at the bottom of the top bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#9E9E9E] via-white to-[#C0C0C0] shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-none"
              style={{ width: `${((activeIndex + 1) / HORIZONTAL_PANELS.length) * 100}%` }}
            />
          </div>
        </header>

        {/* HORIZONTAL TRACK (Flex row translated horizontally via GSAP scrub) */}
        <div dir="ltr" className="flex-1 relative w-full overflow-hidden flex items-center">
          <div
            ref={trackRef}
            dir="ltr"
            className="flex flex-row h-full will-change-transform items-center"
            style={{ width: 'max-content' }}
          >
            {HORIZONTAL_PANELS.map((panel, idx) => (
              <div
                key={panel.step}
                id={`service-protocol-${idx + 1}`}
                data-protocol-index={idx}
                data-protocol-step={panel.step}
                className="service-horizontal-panel w-screen min-w-[100vw] h-full flex items-center justify-between relative px-4 sm:px-10 lg:px-20 py-4 sm:py-6 overflow-hidden shrink-0"
              >
                {/* LARGE SUBTLE WATERMARK TYPOGRAPHY ON THE RIGHT */}
                <div
                  className="panel-watermark absolute right-3 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 text-[32vw] sm:text-[24vw] lg:text-[20vw] font-serif font-extralight text-white/[0.045] select-none pointer-events-none tracking-tighter leading-none will-change-transform z-0"
                  aria-hidden="true"
                >
                  {panel.step}
                </div>

                {/* MAIN CONTENT CONTAINER */}
                <div
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-14 relative z-10"
                >
                  {/* Left Column: Main Content */}
                  <div className={`max-w-xl lg:max-w-2xl flex flex-col justify-center ${isRtl ? 'text-right' : 'text-left'}`}>
                    {/* Eyebrow badge */}
                    <div className={`inline-flex items-center gap-2 mb-2 sm:mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-[#A0A7B8] font-medium">
                        {panel.eyebrow}
                      </span>
                    </div>

                    {/* Main Heading with "Mask Reveal" slide-up container */}
                    <div className="overflow-hidden pb-1 pt-0.5 mb-2 sm:mb-3">
                      <h3 className="panel-mask-title text-2xl sm:text-4xl lg:text-5xl font-times font-normal tracking-[0.03em] uppercase text-white leading-[1.12] will-change-transform">
                        <span className="silver-gradient-heading">{panel.title}</span>
                      </h3>
                    </div>

                    {/* Sub-paragraph with "Mask Reveal" slide-up container & cascading delay */}
                    <div className="overflow-hidden mb-4 sm:mb-6 pb-1">
                      <p className={`panel-mask-text text-xs sm:text-sm lg:text-base text-[#A0A7B8] font-light leading-relaxed tracking-wide italic will-change-transform max-w-xl ${isRtl ? 'text-right' : 'text-left'}`}>
                        &ldquo;{panel.description}&rdquo;
                      </p>
                    </div>

                    {/* Specifications & Deliverables (panel-meta) */}
                    <div className="panel-meta flex flex-col gap-3 sm:gap-4">
                      {/* Metric Stat Cards */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {panel.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className={`p-2 sm:p-2.5 rounded-xl border border-white/15 bg-white/[0.03] backdrop-blur-md ${isRtl ? 'text-right' : 'text-left'}`}
                          >
                            <span className="text-[8.5px] uppercase tracking-[0.18em] text-[#737A8C] font-mono block mb-0.5">
                              {m.label}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-white font-number block truncate">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bullets List */}
                      <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-[#C0C8D6] font-light ${isRtl ? 'text-right' : 'text-left'}`}>
                        {panel.deliverables.map((d, dIdx) => (
                          <li key={dIdx} className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <span className="text-white text-xs leading-none select-none">•</span>
                            <span className="leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate sm:whitespace-normal">
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Button */}
                      <div className={`pt-2 flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <a
                          href={`https://wa.me/971585783038?text=${encodeURIComponent(`Hello Luxury Lounge Private Desk, I would like to inquire about ${panel.title} (Protocol ${panel.step}).`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-silver inline-flex items-center gap-2 px-5 py-2 text-[10.5px] tracking-[0.2em] uppercase font-sans font-medium cursor-pointer"
                        >
                          <span>Initiate Protocol {panel.step}</span>
                          <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                        </a>

                        {idx < HORIZONTAL_PANELS.length - 1 && (
                          <button
                            type="button"
                            onClick={() => scrollToPanel(idx + 1)}
                            className="text-xs text-[#8E96A8] hover:text-white font-mono tracking-wider transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Next</span>
                            <span>{isRtl ? '←' : '→'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Photo Card with Glow & Corner Brackets */}
                  <div className="panel-media-card relative z-10 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] xl:max-w-[480px] shrink-0">
                    <div className="group relative rounded-2xl p-2 sm:p-2.5 border border-white/25 hover:border-white/60 bg-gradient-to-b from-[#0E172A]/85 via-[#090F20]/95 to-[#050A15] backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(255,255,255,0.06)] transition-all duration-500">
                      {/* Corner Accents */}
                      <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white/70" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white/70" />
                      <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white/70" />
                      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white/70" />

                      {/* Card Image */}
                      <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[320px] rounded-xl overflow-hidden bg-[#0A1128]">
                        <img
                          src={panel.image}
                          alt={panel.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050A15]/85 via-transparent to-transparent pointer-events-none" />

                        {/* Floating Circular Icon Badge */}
                        <div className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-full border border-white/60 bg-[#050A15]/85 backdrop-blur-md flex items-center justify-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">
                          {panel.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM METRIC / STATUS FOOTER BAR */}
        <footer className="h-[40px] sm:h-[46px] px-4 sm:px-8 lg:px-12 flex items-center justify-between text-[11px] text-[#737A8C] border-t border-white/10 z-30 bg-[#050A15]/90 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="tracking-wider hidden sm:inline text-xs">
              Luxury Lounge Private Client Office • Dispatch Architecture
            </span>
            <span className="tracking-wider sm:hidden text-xs">
              Protocol {HORIZONTAL_PANELS[activeIndex]?.step}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#A0A7B8] tracking-widest uppercase">
              {HORIZONTAL_PANELS[activeIndex]?.title}
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
};
