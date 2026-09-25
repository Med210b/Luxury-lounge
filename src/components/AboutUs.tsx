import React, { useState } from 'react';
import { Shield, Plane, Users, Compass, ArrowRight, Award, Lock, Sparkles, Building, Globe } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface Pillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const HOUSE_PILLARS: Pillar[] = [
  {
    id: 'discretion',
    number: '01',
    title: 'Sovereign Discretion',
    tagline: 'Diplomatic non-disclosure & classified telemetry',
    description:
      'Every patron engagement is shielded by bilateral diplomatic-grade non-disclosure covenants, end-to-end encrypted wire liaison, and pseudonymized airside passenger manifests.',
    metrics: [
      { label: 'Confidentiality', value: '100% NDA' },
      { label: 'Wire Security', value: '256-Bit Encrypted' },
      { label: 'Data Retention', value: 'Zero-Trace Vault' },
    ],
    deliverables: [
      'Bilateral NDA executed prior to onboarding intake',
      'Pseudonymized flight and hotel reservation booking masks',
      'Private airside escort bypassing general commercial terminals',
      'Direct confidential communication via secure encrypted lines',
    ],
    icon: Lock,
  },
  {
    id: 'speed',
    number: '02',
    title: 'Sub-Two-Hour Airside SLA',
    tagline: 'Rapid aviation mobilization across global corridors',
    description:
      'With pre-cleared sovereign flight permissions and strategic hot-spare aircraft positioning, we guarantee rapid mobilization of executive heavy jets and VIP helicopters across prime corridors.',
    metrics: [
      { label: 'Dispatch Window', value: '< 2 Hours' },
      { label: 'Global Reach', value: 'Nonstop Heavy' },
      { label: 'FBO Clearance', value: 'VIP Diplomatic' },
    ],
    deliverables: [
      'Guaranteed emergency repositioning and standby flight readiness',
      'Direct tarmac ramp access at Jetex VIP, Royal Apron & Le Bourget',
      'Biometric airside passport clearance with no terminal delays',
      'Synchronized motorcade arrival directly to aircraft jet-stairs',
    ],
    icon: Plane,
  },
  {
    id: 'stewardship',
    number: '03',
    title: 'Dual-Officer Stewardship',
    tagline: 'Dedicated Lifestyle Director paired with Flight Commander',
    description:
      'We reject rotating call centers. Every patron is paired with two dedicated officers: a Senior Lifestyle Director commanding lifestyle and acquisitions, and an FAA/GCAA certified Flight Dispatch Officer.',
    metrics: [
      { label: 'Coverage', value: '24/7/365' },
      { label: 'Dedicated Officers', value: 'Dual Command' },
      { label: 'Patron Cap', value: 'Strictly 50' },
    ],
    deliverables: [
      'Single named points of contact who understand your nuances',
      'Deep family profiling: dietary, seasonal preferences, and key dates',
      'Coordination with your personal family office & chief of staff',
      'Real-time proactive resolution before requests are even voiced',
    ],
    icon: Users,
  },
  {
    id: 'allocations',
    number: '04',
    title: 'Off-Market Global Allocations',
    tagline: 'Unlisted estates, superyacht berths & private dining',
    description:
      'Our institutional heritage grants patrons priority access to off-market Mediterranean estates, deep-water mega-yacht moorings, chef table reservations at sold-out salons, and private island buyouts.',
    metrics: [
      { label: 'Residency', value: 'Dubai, UAE' },
      { label: 'Estate Access', value: 'Off-Market Only' },
      { label: 'Yacht Berths', value: 'Up to 120m' },
    ],
    deliverables: [
      'Unlisted architectural villas in Dubai Palm, Saint-Tropez & Lake Como',
      'Direct master charter allocation for 50m–100m+ superyachts',
      'Closed-door private appointments with haute joaillerie houses',
      'VIP passes and private suite access at global milestone events',
    ],
    icon: Compass,
  },
];

const DUBAI_FACILITIES = [
  {
    title: 'Global Headquarters & Patron Salon',
    division: 'Private Client Office',
    location: 'DIFC Gate Precinct 4, Dubai, UAE',
    coords: "25°12'N 55°16'E",
  },
  {
    title: 'Airside Aviation Dispatch Command',
    division: 'Flight Operations & Tarmac Liaison',
    location: 'Dubai Al Maktoum (DWC) & Dubai Intl (DXB) Jetex VIP',
    coords: "24°53'N 55°10'E",
  },
  {
    title: 'Maritime & Coastal Estate Desk',
    division: 'Deepwater Berth & Offshore Allocations',
    location: 'Dubai Harbour & Palm Jumeirah Residency',
    coords: "25°05'N 55°08'E",
  },
];

export const AboutUs: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>('discretion');
  const activePillar = HOUSE_PILLARS.find((p) => p.id === activePillarId) || HOUSE_PILLARS[0];
  const ActiveIcon = activePillar.icon;

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative bg-transparent overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <SectionHeader
          chapter="Chapter I • The House"
          title="About Luxury Lounge"
          subtitle="“An institution founded on absolute discretion, operational precision, and unilateral loyalty to the world’s most discerning patrons.”"
          className="mb-14 sm:mb-20"
        />

        {/* Narrative Split: Master Story + Frame Portrait Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-24">
          {/* Left Column: The Foundation & Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#8E96A8]">
              <span>Private Client Office</span>
              <span aria-hidden="true">·</span>
              <span className="text-white">Est. 2018</span>
              <span aria-hidden="true">·</span>
              <span>Dubai, United Arab Emirates</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-light leading-snug tracking-wide">
              Eliminating friction for the world&rsquo;s most demanding itineraries.
            </h3>

            <p className="text-sm sm:text-base text-[#9DA7BC] font-light leading-relaxed">
              The Private Client Office of Luxury Lounge was established to resolve a singular dilemma faced by sovereign figures, family principals, and international executives: the need for an infallible, single-point liaison capable of mobilizing aviation, maritime, estate, and lifestyle directives across continents without friction or exposure.
            </p>

            <p className="text-sm text-[#7D889E] font-light leading-relaxed">
              Rather than operating as a transactional agency, our House acts as an extension of your family office based exclusively in Dubai, United Arab Emirates. We manage every parameter from sovereign airside clearances to off-market coastal estates and private yacht berths, executed with uncompromising confidentiality.
            </p>

            {/* Core Operational Numbers Strip (Unboxed clean text) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono tracking-[0.24em] text-[#737A8C] uppercase block">
                  ADMISSION
                </span>
                <p className="text-xl font-serif text-white tracking-wide mt-1">
                  50 Patrons
                </p>
                <p className="text-[11px] text-[#8E96A8] font-light mt-0.5">
                  Strictly capped globally
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-[0.24em] text-[#737A8C] uppercase block">
                  DISCRETION
                </span>
                <p className="text-xl font-serif text-white tracking-wide mt-1">
                  100% NDA
                </p>
                <p className="text-[11px] text-[#8E96A8] font-light mt-0.5">
                  Classified telemetry
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-[0.24em] text-[#737A8C] uppercase block">
                  DISPATCH
                </span>
                <p className="text-xl font-serif text-white tracking-wide mt-1">
                  &lt; 2 Hours
                </p>
                <p className="text-[11px] text-[#8E96A8] font-light mt-0.5">
                  Guaranteed airside SLA
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-[0.24em] text-[#737A8C] uppercase block">
                  RESIDENCY
                </span>
                <p className="text-xl font-serif text-white tracking-wide mt-1">
                  Dubai, UAE
                </p>
                <p className="text-[11px] text-[#8E96A8] font-light mt-0.5">
                  United Arab Emirates
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Master Architectural Frame with Metallic Accents */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px]">
              {/* Metallic Frame Box with Outer Subtle Glow */}
              <div className="group relative p-3 sm:p-3.5 rounded-2xl border border-[rgba(224,224,224,0.3)] hover:border-[rgba(255,255,255,0.7)] bg-gradient-to-b from-[#0E172A]/90 via-[#090F20]/95 to-[#050A15] backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(255,255,255,0.06)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_45px_rgba(255,255,255,0.15)] transition-all duration-700 ease-out">
                {/* Hairline Metallic Corner Brackets */}
                <div className="absolute -top-[1px] -left-[1px] w-3.5 h-3.5 border-t-2 border-l-2 border-white/80 group-hover:border-white transition-colors duration-500" />
                <div className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 border-t-2 border-r-2 border-white/80 group-hover:border-white transition-colors duration-500" />
                <div className="absolute -bottom-[1px] -left-[1px] w-3.5 h-3.5 border-b-2 border-l-2 border-white/80 group-hover:border-white transition-colors duration-500" />
                <div className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 border-b-2 border-r-2 border-white/80 group-hover:border-white transition-colors duration-500" />

                {/* Inner Image Container */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[4/5] bg-gradient-to-b from-[#0D1527] via-[#080E1C] to-[#04070F] flex flex-col justify-between p-6 sm:p-7">
                  {/* Subtle ambient lighting behind logo */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.06)_0%,transparent_65%)] pointer-events-none" />

                  {/* Subtle inner highlight border overlay */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 group-hover:ring-white/25 transition-all duration-500" />

                  {/* Top subtle badge */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#8E96A8]">
                      SEAL OF EXCELLENCE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                  </div>

                  {/* Centered Logo with Perfectly Positioned Medium Size */}
                  <div className="relative z-10 flex-1 flex items-center justify-center my-auto py-2">
                    <img
                      src="https://res.cloudinary.com/swcgor0l/image/upload/v1790089140/dad1d938-dba2-4299-8e56-830655f5f41ejjjjjjjjjjjj_pv6vmo.png"
                      alt="House Insignia"
                      className="max-h-44 sm:max-h-52 md:max-h-56 w-auto max-w-[65%] sm:max-w-[70%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom Vignette with Engraved House Stamp */}
                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
                        Private Patron Salon
                      </div>
                      <div className="text-sm font-serif text-white tracking-wide mt-0.5">
                        Dubai, United Arab Emirates
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Four Operational Protocols / House Pillars (Interactive Segmented Interface) */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-block text-[11px] font-mono uppercase tracking-[0.28em] text-[#CBD5E1] mb-2">
              Operational Doctrine
            </div>
            <h4 className="text-2xl sm:text-3xl font-serif text-white tracking-wide font-normal mb-3">
              The Four House Protocols
            </h4>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Every patron directive is executed under four immutable covenants governing privacy, dispatch speed, and stewardship continuity.
            </p>
          </div>

          {/* Interactive Protocol Selectors */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {HOUSE_PILLARS.map((pillar) => {
              const isSelected = pillar.id === activePillarId;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'border-white bg-white/[0.08] shadow-[0_10px_30px_rgba(255,255,255,0.12)]'
                      : 'border-white/15 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#8E96A8]">
                      PROTOCOL {pillar.number}
                    </span>
                    <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-white' : 'text-[#8E96A8] group-hover:text-white'}`} />
                  </div>
                  <div className="text-sm font-serif font-medium text-white tracking-wide">
                    {pillar.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Protocol Showcase Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-white/[0.08] via-[#09101E]/90 to-[#040812] border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Column: Protocol Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center text-white">
                    <ActiveIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
                      Protocol {activePillar.number} · Standard of Excellence
                    </span>
                    <h5 className="text-xl sm:text-2xl font-serif text-white font-medium">
                      {activePillar.title}
                    </h5>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed">
                  {activePillar.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-3">
                  {activePillar.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E2E8F0]">
                      <span className="text-white text-sm leading-none select-none mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Protocol Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
                <div className="space-y-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#737A8C]">
                    Verified Benchmarks
                  </div>
                  {activePillar.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-between"
                    >
                      <span className="text-xs text-[#9DA7BC] font-light">{metric.label}</span>
                      <span className="text-sm font-serif font-medium text-white tracking-wide">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="#memberships"
                    className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] text-white hover:text-[#CBD5E1] transition-colors"
                  >
                    <span>View Membership Charters</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Seat & Facilities Strip */}
        <div className="p-8 sm:p-10 rounded-2xl border border-white/15 bg-white/[0.025] backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#8E96A8]">
                Exclusive Operational Seat
              </div>
              <h4 className="text-xl sm:text-2xl font-serif text-white tracking-wide mt-1">
                Dubai, United Arab Emirates
              </h4>
            </div>
            <p className="text-xs text-[#8E96A8] max-w-md font-light leading-relaxed">
              Direct physical liaisons situated across the Dubai International Financial Centre (DIFC), private VIP aviation aprons, and Dubai Harbour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {DUBAI_FACILITIES.map((facility, idx) => (
              <div key={idx} className="space-y-1.5 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/25 transition-colors">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E96A8]">
                  {facility.coords}
                </div>
                <div className="text-base font-serif text-white tracking-wide">
                  {facility.title}
                </div>
                <div className="text-[11px] font-medium text-[#CBD5E1]">
                  {facility.division}
                </div>
                <div className="text-[11px] text-[#737A8C] font-light">
                  {facility.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
