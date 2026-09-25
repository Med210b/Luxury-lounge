import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-aviation',
    question: 'How are private aviation departures and tarmac clearances coordinated?',
    answer:
      'All private flights are orchestrated through dedicated VIP executive handling terminals, including Dubai Jetex VIP (DWC/DXB), Abu Dhabi Al Bateen, London Farnborough, Paris Le Bourget, and New York Teterboro. We secure diplomatic airside customs clearance, direct tarmac vehicle ramp access, and bespoke in-flight gastronomy curated by celebrated chefs with as little as two hours notice.',
  },
  {
    id: 'faq-discretion',
    question: 'What degree of discretion and confidentiality is maintained?',
    answer:
      'Absolute anonymity is the foundational pillar of Luxury Lounge. All client engagements, travel manifests, asset acquisitions, and private office services are governed by institutional-grade Non-Disclosure Agreements (NDAs). All communication is conducted through end-to-end encrypted private channels, ensuring complete discretion for high-profile principals.',
  },
  {
    id: 'faq-membership',
    question: 'How does a patron qualify for admission into the Imperial Tier?',
    answer:
      'Admission to the Imperial Tier is strictly capped at 50 patrons globally to guarantee uncompromising availability and dedicated dual lifestyle directors. Admission is conducted by member referral or direct evaluation by the Managing Partner. Inquiries submitted through our Private Desk undergo confidential review within 48 hours.',
  },
  {
    id: 'faq-marine',
    question: 'Can Luxury Lounge arrange premier superyacht berths and island buyouts?',
    answer:
      'Yes. Through longstanding maritime access with port captaincies across Port Hercule (Monaco), Saint-Tropez, Gustavia, and Dubai Harbour, we guarantee priority berths for vessels exceeding 50 meters. Furthermore, our advisory manages secluded private island buyouts throughout the Caribbean, French Polynesia, and the Indian Ocean.',
  },
  {
    id: 'faq-dispatch',
    question: 'What is the operational turnaround time for high-urgency requests?',
    answer:
      'Our global operations cell is active 24/7/365. Direct client requests are acknowledged within 15 minutes by your assigned Private Client Director. For urgent aviation charters or emergency logistical re-routing, flight dispatch protocols can be mobilized within four hours internationally.',
  },
];

export const LuxuryFaq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      const items = gsap.utils.toArray<HTMLElement>('.luxury-faq-item');
      if (items.length > 0 && listRef.current) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
              once: true,
            },
            onComplete: () => {
              gsap.set(items, { clearProps: 'transform' });
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 md:py-32 relative bg-transparent border-t border-[rgba(192,192,192,0.12)] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] rounded-full bg-[#0A1128] opacity-40 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Sticky Section Header & Direct Protocol Bento Box */}
          <div
            ref={headerRef}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="text-[10px] font-mono tracking-[0.28em] text-[#8E96A8] uppercase">
                  Chapter VI • Protocols & Inquiries
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.04em] text-white uppercase font-light leading-[1.15]">
                <span className="silver-gradient-heading block">Luxury</span>
                <span className="silver-gradient-heading block">FAQs</span>
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-[#9DA7BC] font-light leading-relaxed tracking-wide italic">
                “Essential tenets governing our aviation clearances, absolute non-disclosure covenants, and private client relations.”
              </p>
            </div>

            {/* Direct Assistance Protocol Bento Card */}
            <div className="p-6 rounded-2xl border border-[rgba(192,192,192,0.2)] bg-[rgba(255,255,255,0.025)] backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8E96A8]">
                EXPEDITED PROTOCOL DESK
              </span>

              <p className="text-xs text-[#9DA7BC] font-light leading-relaxed">
                Require immediate custom charter validation or expedited diplomatic ramp permissions?
              </p>

              <div className="pt-2 border-t border-[rgba(192,192,192,0.1)] space-y-2 text-xs">
                <a
                  href="tel:+971585783038"
                  className="font-number text-white tracking-widest block hover:text-[#C0C0C0] transition-colors"
                >
                  +971 585783038
                </a>
                <a
                  href="mailto:aksa@luxury-lounge.ae"
                  className="font-mono text-[#8E96A8] text-[11px] block hover:text-white transition-colors"
                >
                  aksa@luxury-lounge.ae
                </a>
              </div>

              {/* Modern Structured Agency Button */}
              <div className="pt-3">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[#F1F5F9] border border-[rgba(192,192,192,0.35)] hover:border-white bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.09)] transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <span>Submit Private Inquiry</span>
                  <span className="text-[#A0A7B8] group-hover:text-white transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bento-Styled Accordion List */}
          <div ref={listRef} className="lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={`luxury-faq-item rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? 'bg-[rgba(255,255,255,0.04)] border-[rgba(224,224,224,0.6)] shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(224,224,224,0.08)]'
                      : 'bg-[rgba(255,255,255,0.02)] border-[rgba(192,192,192,0.2)] hover:border-[rgba(192,192,192,0.45)] hover:bg-[rgba(255,255,255,0.03)]'
                  } backdrop-blur-md overflow-hidden`}
                >
                  {/* Accordion Question Header */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                  >
                    <span className="font-serif text-sm sm:text-base md:text-lg tracking-[0.03em] text-[#E8E8E8] group-hover:text-white transition-colors duration-200">
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-[rgba(192,192,192,0.3)] flex items-center justify-center shrink-0 transition-transform duration-300 bg-[rgba(255,255,255,0.03)] group-hover:border-white ${
                        isOpen ? 'rotate-180 border-white bg-[rgba(255,255,255,0.1)]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 text-[#D4D4D4] group-hover:text-white" />
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.25, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 pt-1 border-t border-[rgba(192,192,192,0.12)] text-xs sm:text-sm text-[#A0A7B8] font-light leading-relaxed">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
