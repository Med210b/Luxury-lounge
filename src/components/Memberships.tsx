import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface MembershipsProps {
  onSelectTier?: (tierName: string) => void;
}

interface TierData {
  id: string;
  name: string;
  isHighlighted?: boolean;
  price?: string;
  role?: string;
  includesHeader?: string;
  benefits: string[];
}

const MEMBERSHIP_TIERS: TierData[] = [
  {
    id: 'signature',
    name: 'SIGNATURE',
    isHighlighted: false,
    role: 'Personal Luxury Concierge',
    includesHeader: 'Membership Includes:',
    benefits: [
      'Personal concierge access via priority WhatsApp channel',
      'Restaurant & hotel reservations',
      'Airport assistance coordination',
      'Experiences: Luxury Travel, Desert, Culinary, Beauty & Celebrations',
      'Usage & Priority: Response time within 4 hours',
      'Scope Note: Legal & Business man services not included',
    ],
  },
  {
    id: 'prestige',
    name: 'PRESTIGE',
    isHighlighted: true,
    role: 'Executive & Lifestyle Concierge',
    includesHeader: 'Membership Includes:',
    benefits: [
      'Dedicated concierge a named point of contact who knows the member',
      'Extended-hours support',
      'Executive travel planning',
      'Priority airport coordination & chauffeur arrangements',
      'Family concierge (immediate family members)',
      'Priority handling of last-minute requests',
      'Experiences: Jets, Yachts, Expeditions, Fashion & Business',
    ],
  },
  {
    id: 'imperial',
    name: 'IMPERIAL',
    isHighlighted: false,
    role: 'Ultra-Private Bespoke Concierge',
    includesHeader: 'Membership Includes:',
    benefits: [
      'Senior personal concierge with 24/7 priority access',
      'Private client profile',
      'Preferences, key dates, family details and preferred suppliers recorded in advance',
      'Bespoke travel planning',
      'Private aviation coordination',
      'Full family & household concierge',
      'International concierge coordination',
    ],
  },
];

interface MembershipTierCardProps {
  tier: TierData;
  isFeatured: boolean;
  onContinue: (name: string) => void;
}

const MembershipTierCard: React.FC<MembershipTierCardProps> = ({
  tier,
  isFeatured,
  onContinue,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage for dynamic glint reflection
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    setShinePos({ x: percentX, y: percentY });

    // Subtle luxury 3D tilt angles (-7.5 to +7.5 deg max)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 7.5;
    const rotY = ((x - centerX) / centerX) * 8.5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setShinePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      id={`membership-tier-${tier.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`membership-tier-card relative rounded-2xl pt-8 pb-8 px-6 sm:px-8 flex flex-col justify-between backdrop-blur-xl cursor-pointer group overflow-hidden transition-all ${
        isFeatured
          ? isHovered
            ? 'border border-white/80 border-t-white shadow-[0_28px_65px_rgba(0,0,0,0.85),0_0_35px_rgba(255,255,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.85)]'
            : 'border border-white/40 border-t-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.7)]'
          : isHovered
          ? 'border border-white/60 border-t-white/80 shadow-[0_24px_55px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.22),inset_0_1px_1px_rgba(255,255,255,0.7)]'
          : 'border border-white/25 border-t-white/50 shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.5)]'
      }`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale3d(1.025, 1.025, 1.025)`
          : isFeatured
          ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(-4px) scale3d(1, 1, 1)'
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.3s ease'
          : 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease, border-color 0.5s ease',
        transformStyle: 'preserve-3d',
        // The exact frosted glass gradient from reference: milky white at top fading to deep charcoal glass
        background: isFeatured
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.12) 22%, rgba(18, 25, 42, 0.78) 55%, rgba(10, 15, 26, 0.94) 100%)'
          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 22%, rgba(15, 22, 38, 0.75) 55%, rgba(8, 13, 24, 0.92) 100%)',
      }}
    >
      {/* Dynamic 3D Specular Sheen Glint on Hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 320px at ${shinePos.x}% ${shinePos.y}%, rgba(255, 255, 255, 0.32), transparent 75%)`,
        }}
      />

      {/* Luminous Frosted White Top Glow Bloom */}
      <div
        className={`absolute inset-x-0 top-0 h-40 pointer-events-none rounded-t-2xl transition-opacity duration-300 ${
          isFeatured ? 'opacity-100' : 'opacity-85 group-hover:opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.12) 50%, transparent 80%)',
        }}
      />

      {/* Razor-sharp Specular White Top Edge Highlight */}
      <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

      {/* Card Upper Content with 3D Parallax Depth */}
      <div
        className="relative z-10"
        style={{
          transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)',
          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* Card Title with Automated Animated Luxury Luminous Silver Gradient */}
        <h3 className="text-xl sm:text-2xl font-serif text-center uppercase tracking-[0.18em] font-semibold select-none">
          <span
            className={`luxury-silver-animated-text ${
              tier.id === 'signature'
                ? 'luxury-silver-signature'
                : tier.id === 'prestige'
                ? 'luxury-silver-prestige'
                : 'luxury-silver-imperial'
            }`}
          >
            {tier.name}
          </span>
        </h3>

        {/* Horizontal Divider Line with luminous silver specular bloom */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent mt-4 mb-5" />

        {/* Role Header (e.g. for Signature Tier) */}
        {tier.role && (
          <div className="mb-5 pb-4 border-b border-white/10 text-center">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-serif font-medium text-[#E2E8F0]">
              Role: <span className="text-white font-normal">{tier.role}</span>
            </div>
          </div>
        )}

        {/* Optional Section Header */}
        {tier.includesHeader && (
          <div className="text-[11px] font-serif uppercase tracking-[0.18em] text-[#CBD5E1] font-semibold mb-3.5 pl-1">
            {tier.includesHeader}
          </div>
        )}

        {/* Bullet Points List */}
        <ul className="space-y-3.5 text-[13px] text-[#D8E0EC] font-light pl-1 sm:pl-2 mb-8">
          {tier.benefits.map((benefit, bIdx) => (
            <li key={bIdx} className="flex items-start gap-2.5">
              <span className="text-[#FFFFFF] text-base leading-none select-none">•</span>
              <span className="leading-snug text-[#E2E8F0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button: Compact Rounded Pill centered at bottom with raised 3D layer */}
      <div
        className="pt-2 text-center relative z-10"
        style={{
          transform: isHovered ? 'translateZ(26px)' : 'translateZ(0px)',
          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <button
          type="button"
          id={`btn-select-tier-${tier.id}`}
          onClick={() => onContinue(tier.name)}
          className={`inline-flex items-center justify-center gap-2 px-8 py-3 w-full text-[11px] tracking-[0.22em] font-sans font-medium uppercase transition-all duration-300 cursor-pointer ${
            isFeatured
              ? 'bg-[#FFFFFF] text-[#050A15] hover:bg-[#E2E8F0] shadow-[0_0_25px_rgba(255,255,255,0.4)] border border-white'
              : 'border border-white/40 bg-[rgba(255,255,255,0.04)] text-white hover:bg-white hover:text-[#050A15] hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
          }`}
        >
          <span>Explore Tier Dossier</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export const Memberships: React.FC<MembershipsProps> = ({ onSelectTier }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tiersContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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

      // Staggered tiers reveal
      const tierCards = gsap.utils.toArray<HTMLElement>('.membership-tier-card');
      if (tierCards.length > 0 && tiersContainerRef.current) {
        gsap.fromTo(
          tierCards,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tiersContainerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
              once: true,
            },
            onComplete: () => {
              gsap.set(tierCards, { clearProps: 'transform' });
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleContinue = (tierName: string) => {
    if (onSelectTier) {
      onSelectTier(tierName);
    }
    const upper = tierName.toUpperCase();
    if (upper !== 'SIGNATURE' && upper !== 'PRESTIGE' && upper !== 'IMPERIAL') {
      const message = encodeURIComponent(`Hello Luxury Lounge Private Desk, I would like to inquire about activating the ${tierName} Membership Tier.`);
      const link = document.createElement('a');
      link.href = `https://wa.me/971585783038?text=${message}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="memberships"
      className="py-24 md:py-32 relative bg-transparent overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-[#0A1128] opacity-50 blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionHeader
          chapter="Chapter VI • Private Patronage"
          title="Membership"
          subtitle="“Three distinguished echelons of confidential stewardship, dedicated concierge directors, and round-the-clock priority execution.”"
        />

        {/* Bento Charter Overview Strip with Clean Borders */}
        <div className="max-w-5xl mx-auto mb-12 p-6 sm:p-7 rounded-2xl border border-[rgba(192,192,192,0.2)] bg-[rgba(255,255,255,0.025)] backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-left shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
          <div className="border-r border-[rgba(192,192,192,0.12)] pr-4">
            <span className="text-[10px] font-mono tracking-[0.24em] text-[#8E96A8] uppercase block">
              ADMISSION CAP
            </span>
            <p className="text-sm font-serif text-white tracking-wide mt-1">
              Strictly Capped
            </p>
            <p className="text-[11px] text-[#737A8C] font-light mt-0.5">
              50 Imperial global patrons
            </p>
          </div>

          <div className="md:border-r md:border-[rgba(192,192,192,0.12)] pr-4">
            <span className="text-[10px] font-mono tracking-[0.24em] text-[#8E96A8] uppercase block">
              DISCRETION
            </span>
            <p className="text-sm font-serif text-white tracking-wide mt-1">
              Bilateral NDA
            </p>
            <p className="text-[11px] text-[#737A8C] font-light mt-0.5">
              256-bit encrypted wire
            </p>
          </div>

          <div className="border-r border-[rgba(192,192,192,0.12)] pr-4">
            <span className="text-[10px] font-mono tracking-[0.24em] text-[#8E96A8] uppercase block">
              AIRSIDE SLA
            </span>
            <p className="text-sm font-serif text-white tracking-wide mt-1">
              &lt; 2 Hours
            </p>
            <p className="text-[11px] text-[#737A8C] font-light mt-0.5">
              Guaranteed flight dispatch
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-[0.24em] text-[#8E96A8] uppercase block">
              STEWARDSHIP
            </span>
            <p className="text-sm font-serif text-white tracking-wide mt-1">
              Dual Officers
            </p>
            <p className="text-[11px] text-[#737A8C] font-light mt-0.5">
              24/7 dedicated coverage
            </p>
          </div>
        </div>

        {/* 3 Tier Cards Grid with 3D perspective context */}
        <div
          ref={tiersContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch max-w-5xl mx-auto [perspective:1200px]"
        >
          {MEMBERSHIP_TIERS.map((tier) => (
            <MembershipTierCard
              key={tier.id}
              tier={tier}
              isFeatured={Boolean(tier.isHighlighted)}
              onContinue={handleContinue}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
