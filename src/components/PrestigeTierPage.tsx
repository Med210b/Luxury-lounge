import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Clock,
  Compass,
  Plane,
  Car,
  MapPin,
  Briefcase,
  Users,
  Zap,
  Home,
  Laptop,
  TrendingUp,
  Share2,
  Camera,
  Mountain,
  Anchor,
  Scale,
  Music,
  Sparkles,
  Heart,
  UtensilsCrossed,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  Check,
  CreditCard,
  MessageCircle,
  X,
  Send,
  Building,
} from 'lucide-react';
import { PrestigeKeycard3D } from './PrestigeKeycard3D';
import { ServiceCard3D, SignatureServiceItem } from './ServiceCard3D';

interface PrestigeTierPageProps {
  onBackToOverview: () => void;
  onInitiateInquiry?: (tierName: string) => void;
  onSwitchTier?: (tierName: string) => void;
}

const PRESTIGE_SERVICES: SignatureServiceItem[] = [
  {
    id: 'dedicated-concierge',
    title: 'Dedicated Concierge (Named Point of Contact)',
    category: 'Executive & Mobility',
    description:
      'A personal, named senior lifestyle director who intimately knows your preferences, schedules, family tastes, and professional standards.',
    scope: [
      'Single named senior concierge who knows the member',
      'Personalized profiling of preferences and recurring directives',
      'Direct liaison with executive assistants and family offices',
      'Continuous relationship continuity across global travels',
    ],
    turnaround: 'Named Liaison',
    icon: UserCheck,
    isOriginal: true,
  },
  {
    id: 'extended-hours',
    title: 'Extended-Hours Support',
    category: 'Executive & Mobility',
    description:
      'Comprehensive active coverage spanning extended morning to late-night timezones, ensuring immediate execution for international principals.',
    scope: [
      'Extended-hours active support across multi-city itineraries',
      'Priority routing for cross-continental timezones',
      'Immediate night-desk response for urgent travel updates',
      'Direct weekend and holiday priority dispatch',
    ],
    turnaround: 'Extended Hours',
    icon: Clock,
    isOriginal: true,
  },
  {
    id: 'executive-travel',
    title: 'Executive Travel Planning',
    category: 'Executive & Mobility',
    description:
      'End-to-end luxury corporate and personal travel architecture: multi-leg itineraries, presidential suites, bespoke transfers, and global coordination.',
    scope: [
      'Multi-destination bespoke executive travel planning',
      'Presidential and royal suite bookings with partner upgrades',
      'Custom flight & private charter connections',
      'Digital executive itineraries with live concierge updates',
    ],
    turnaround: 'High Priority',
    icon: Compass,
    isOriginal: true,
  },
  {
    id: 'priority-airport',
    title: 'Priority Airport Coordination',
    category: 'Executive & Mobility',
    description:
      'VIP tarmac transfers, executive terminal access (FBO), private diplomatic customs liaison, and white-glove luggage handling worldwide.',
    scope: [
      'VIP terminal and private FBO meet-and-assist',
      'Airside limousine ramp escort where permitted',
      'Fast-track border, customs, and immigration clearance',
      'Bespoke luggage porterage and priority handling',
    ],
    turnaround: 'Priority Protocol',
    icon: Plane,
  },
  {
    id: 'priority-chauffeur',
    title: 'Priority Chauffeur Arrangements',
    category: 'Executive & Mobility',
    description:
      'Dedicated executive vehicle fleet arrangements: armored options, Rolls-Royce Phantom, Mercedes-Maybach, and security-trained drivers.',
    scope: [
      'First-priority vehicle allocation from private executive fleets',
      'Security-cleared, multilingual professional chauffeurs',
      'Inter-emirate and multi-day full-disposal arrangements',
      'Flight-tracking automatic arrival coordination',
    ],
    turnaround: 'Immediate Dispatch',
    icon: Car,
  },
  {
    id: 'property-relocation',
    title: 'Property & Relocation Coordination',
    category: 'Assets & Family',
    description:
      'Turnkey executive relocation, family settling-in coordination, luxury home search, international schooling liaison, and administrative support.',
    scope: [
      'Prime residential search & lease coordination',
      'VIP executive school admission and campus tour liaison',
      'International fine art & luxury household move coordination',
      'Utility, vehicle registration & residence settling',
    ],
    turnaround: 'Turnkey Project',
    icon: MapPin,
  },
  {
    id: 'business-meetings',
    title: 'Business Meeting Arrangements & Corporate Hospitality',
    category: 'Corporate & Business',
    description:
      'Confidential boardroom bookings, private dining hospitality for high-stakes deal negotiations, bilateral summits, and investor roundtables.',
    scope: [
      'Private executive boardroom and diplomatic club bookings',
      'Corporate hospitality suites at Formula 1, golf & global summits',
      'Bespoke catering & sommelier curation for VIP delegations',
      'Confidential audio-visual and transcription setup',
    ],
    turnaround: 'Same-Day Clearance',
    icon: Briefcase,
  },
  {
    id: 'family-concierge',
    title: 'Family Concierge (Immediate Family Members)',
    category: 'Assets & Family',
    description:
      'Comprehensive lifestyle coordination extended to your spouse and children: school logistics, leisure planning, tutors, and private lessons.',
    scope: [
      'Full coverage for spouse and dependent family members',
      'Private tutor, nanny, and sports instructor screening',
      'Family vacation logistics and children entertainment curation',
      'Medical specialist appointments & private clinic access',
    ],
    turnaround: 'Family Priority',
    icon: Users,
  },
  {
    id: 'last-minute-priority',
    title: 'Priority Handling of Last-Minute Requests',
    category: 'Executive & Mobility',
    description:
      'Expedited escalation protocol for high-urgency directives: same-day private jets, sold-out events, and last-minute suite acquisitions.',
    scope: [
      'Direct bypass to senior management emergency dispatch',
      'Instant access to off-market inventory & private reserves',
      'Rapid turnaround for same-day aviation & hospitality bookings',
      'Guaranteed proactive status updates every 30 minutes',
    ],
    turnaround: 'Immediate Escalation',
    icon: Zap,
  },
  {
    id: 'villas-apartments',
    title: 'Rent & Sell Villas and Apartments',
    category: 'Assets & Family',
    description:
      'High-tier brokerage liaison, off-market villa sales, and trophy residential leasing across Palm Jumeirah, Emirates Hills, and global prime markets.',
    scope: [
      'Access to strictly confidential, off-market properties',
      'Advisory on acquisitions, sales, and high-yield rentals',
      'Coordination of legal conveyancing and escrow transactions',
      'VIP staging and private discrete buyer tours',
    ],
    turnaround: 'Prime Portfolio',
    icon: Home,
  },
  {
    id: 'website-development',
    title: 'Website Development',
    category: 'Digital & Creative',
    description:
      'Premium web engineering, bespoke family office digital infrastructure, high-conversion executive personal brands, and enterprise digital solutions.',
    scope: [
      'Bespoke responsive web architecture (React/Next.js/Three.js)',
      'Luxury visual design with custom animations and 3D elements',
      'High-security cloud infrastructure, custom domains & SSL',
      'Executive content strategy and digital asset protection',
    ],
    turnaround: 'Tailored Sprints',
    icon: Laptop,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Digital & Creative',
    description:
      'Strategic executive search positioning, brand visibility campaigns, reputation management, and high-impact digital audience acquisition.',
    scope: [
      'Search engine presence optimization and Wikipedia/PR liaison',
      'Strategic executive thought-leadership visibility',
      'Targeted digital campaigns for luxury ventures and funds',
      'Performance analytics and digital brand auditing',
    ],
    turnaround: 'Active Campaign',
    icon: TrendingUp,
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    category: 'Digital & Creative',
    description:
      'Bespoke social media stewardship for corporate entities, founders, and public figures: content calendar, aesthetic curation, and growth.',
    scope: [
      'Curated content calendars matching executive brand tone',
      'High-touch LinkedIn & Instagram profile aesthetic direction',
      'Audience engagement, community moderation & DM screening',
      'Executive reputation monitoring and crisis response',
    ],
    turnaround: 'Monthly Cadence',
    icon: Share2,
  },
  {
    id: 'photography-content',
    title: 'Photography & Content',
    category: 'Digital & Creative',
    description:
      'Editorial-grade photography, cinematic drone videography, personal brand portraits, and bespoke property showcasing.',
    scope: [
      'World-class portraiture and editorial lifestyle shoots',
      'Cinematic 4K drone videography of estates & yachts',
      'High-end post-production, color grading & retouching',
      'Full commercial rights and private archive delivery',
    ],
    turnaround: 'On-Demand Production',
    icon: Camera,
  },
];

export interface PrestigeExperience {
  id: string;
  title: string;
  category: string;
  subItems: string[];
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
}

const PRESTIGE_EXPERIENCES: PrestigeExperience[] = [
  {
    id: 'luxury-travel-aviation',
    title: 'Luxury Travel & Aviation',
    category: 'Private Aviation & Sea',
    subItems: ['Luxury Travel Expr.', 'Private Jet', 'Yacht & Sailing', 'Helicopter', 'Luxury Desert'],
    description:
      'Comprehensive private aviation charter, superyacht voyages, helicopter transfers, and private luxury desert pavilions with turnkey logistics.',
    highlights: [
      'Heavy jet & ultra-long-range private charter coordination',
      'Superyacht charters along the Dubai Coast, Mediterranean & Caribbean',
      'Helicopter airport transfers & scenic skyline itineraries',
      'Secluded luxury desert oasis camps with starlit fine dining',
    ],
    icon: Plane,
  },
  {
    id: 'adventure',
    title: 'Adventure',
    category: 'Extreme & Remote',
    subItems: ['Adventure & Expedition'],
    description:
      'Curated high-adrenaline expeditions, private submarine dives, polar explorations, and alpine treks orchestrated with seasoned security and luxury teams.',
    highlights: [
      'Private Arctic and Antarctic luxury expedition charters',
      'High-altitude alpine climbing with elite private guides',
      'Desert dune rally training and private supercar track days',
      'Deep-sea exploration and marine conservation expeditions',
    ],
    icon: Mountain,
  },
  {
    id: 'culinary',
    title: 'Culinary',
    category: 'Haute Gastronomy',
    subItems: ['Culinary & Fine Dining', 'Private Chef'],
    description:
      'Guaranteed table clearances at world-leading restaurants, plus private in-villa chef placements, Michelin masterclasses, and bespoke cellar curation.',
    highlights: [
      'Priority access to 3-Star Michelin & World 50 Best tables',
      'Private in-residence master chefs for dinners & long-term hire',
      'Private sommelier cellar acquisitions & rare vintage auctions',
      'VIP access to international culinary festivals & guest chef dinners',
    ],
    icon: UtensilsCrossed,
  },
  {
    id: 'beauty-fashion',
    title: 'Beauty & Fashion',
    category: 'Haute Couture & Styling',
    subItems: ['Beauty & Self-Care', 'Fashion Week'],
    description:
      'VIP credentials for Paris, Milan & New York Fashion Weeks, private haute couture salons, bespoke tailoring, and celebrity aesthetic practitioners.',
    highlights: [
      'Front-row & salon credentials for global Fashion Weeks',
      'Private showroom previews with storied couture maisons',
      'Bespoke Savile Row & Milanese tailoring appointments',
      'In-suite celebrity hair, aesthetic, and wellness specialists',
    ],
    icon: Sparkles,
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    category: 'VIP Access & Nightlife',
    subItems: ['Nightlife & VIP', 'Private Party'],
    description:
      'VIP table reservations at premier international beach clubs and nightlife venues, plus full-scale private party and celebration orchestration.',
    highlights: [
      'Prime VIP booth clearance at top global clubs & festivals',
      'Private villa and yacht celebration production with top DJs',
      'Access to Cannes Film Festival, Monaco GP & red carpet galas',
      'Discreet backstage introductions and celebrity artist booking',
    ],
    icon: Music,
  },
  {
    id: 'family-celebrations',
    title: 'Family & Celebrations',
    category: 'Milestones & Memories',
    subItems: ['Family & Kids', 'Birthday & Celebrations', 'Honeymoon', 'Proposal'],
    description:
      'Bespoke multi-generational family journeys, spectacular landmark birthday productions, romantic private island proposals, and honeymoons.',
    highlights: [
      'Turnkey multi-generational private villa holiday planning',
      'Cinematic proposal staging in remote desert or private islands',
      'Unmatched birthday productions with private fireworks & live acts',
      'VIP access to premier theme parks with private VIP escorts',
    ],
    icon: Heart,
  },
  {
    id: 'business',
    title: 'Business',
    category: 'Corporate & Legal Support',
    subItems: ['Legal services', 'Business man services'],
    description:
      'Dedicated business and legal liaison: company formation assistance, corporate legal advisory coordination, and executive business man services.',
    highlights: [
      'Coordination with top-tier corporate legal counsel & notaries',
      'Business man services & commercial licensing liaison in the UAE',
      'Executive visa, Golden Visa & residency facilitation coordination',
      'Corporate document translation, attestation & chamber clearances',
    ],
    icon: Scale,
  },
];

export const PrestigeTierPage: React.FC<PrestigeTierPageProps> = ({
  onBackToOverview,
  onInitiateInquiry,
  onSwitchTier,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<SignatureServiceItem | null>(null);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [clientForm, setClientForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    preferredMethod: 'WhatsApp',
    notes: '',
  });

  // Force immediate scroll to top on mount
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const filteredServices = PRESTIGE_SERVICES.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Executive & Mobility') return item.category === 'Executive & Mobility';
    if (activeFilter === 'Assets & Family') return item.category === 'Assets & Family';
    if (activeFilter === 'Corporate & Business') return item.category === 'Corporate & Business';
    if (activeFilter === 'Digital & Creative') return item.category === 'Digital & Creative';
    return true;
  });

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent(
      'Hello Luxury Lounge Private Desk, I am interested in activating the PRESTIGE Membership Tier. Please provide onboarding details.'
    );
    const url = `https://wa.me/971585783038?text=${message}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      access_key: '47cc06dc-a863-4c8c-8223-cb9b6dacdcdd',
      subject: `New PRESTIGE Tier Application from ${clientForm.fullName}`,
      Name: clientForm.fullName,
      Phone: clientForm.phone,
      Email: clientForm.email,
      Company: clientForm.company || 'N/A',
      'Preferred Method': clientForm.preferredMethod,
      Notes: clientForm.notes || 'No additional notes provided.',
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        setFormSubmitted(true);
        if (onInitiateInquiry) {
          onInitiateInquiry('PRESTIGE');
        }
      } else {
        setErrorMsg('There was an issue transmitting your application. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040711] text-[#DCE4F0] pt-24 pb-28 px-4 sm:px-6 lg:px-12 selection:bg-white selection:text-[#040711]">
      {/* Background Ambience Radial Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/6 left-1/4 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(110,160,240,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Breadcrumbs with Quick Tier Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToOverview}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-serif uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#CBD5E1] hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.5)] active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1 text-white" />
              <span>Return to Overview</span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#94A3B8]">
              <span>Memberships</span>
              <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
              <span className="text-white font-semibold">Prestige Dossier</span>
            </div>
          </div>

          {/* Quick Tier Dossier Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] p-1 rounded-full border border-white/15">
            <button
              onClick={() => onSwitchTier ? onSwitchTier('SIGNATURE') : (window.location.hash = '#signature')}
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-widest text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Signature
            </button>
            <button
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-widest bg-white text-[#050A15] font-semibold shadow-[0_0_15px_rgba(255,255,255,0.4)] cursor-default"
            >
              Prestige
            </button>
            <button
              onClick={() => onSwitchTier ? onSwitchTier('IMPERIAL') : (window.location.hash = '#imperial')}
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-widest text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Imperial
            </button>
          </div>
        </div>

        {/* Hero Section: 3D Holographic Keycard + Tier Specification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* Left Column: Spec and Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 text-[#F1F5F9] text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              <Sparkles className="w-3 h-3 text-white" />
              <span>Executive & Family Office Protocol</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-[0.12em] sm:tracking-[0.16em] mb-2 sm:mb-3 leading-tight select-none">
                <span className="luxury-silver-animated-text luxury-silver-prestige">
                  PRESTIGE
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base font-serif text-[#CBD5E1] tracking-wider uppercase">
                Tier Specification & Full Capabilities
              </p>
            </div>

            {/* Role & Value Proposition Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] border border-white/35 shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
              <div className="mb-2">
                <div className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide">
                  Role: <span className="text-[#F1F5F9] font-normal">Executive & Lifestyle Concierge</span>
                </div>
              </div>

              <div className="text-xs text-[#CBD5E1] font-light leading-relaxed flex items-start sm:items-center gap-2 mt-2">
                <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  Role: <strong className="text-white font-medium">Executive & Lifestyle Concierge</strong>. Designed for executives, business principals, and families requiring dedicated named coordination and priority last-minute execution.
                </span>
              </div>
            </div>

            {/* Membership Includes Highlights */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-start sm:items-center gap-2.5 text-[#E2E8F0]">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>Dedicated concierge a named point of contact who knows the member</span>
              </div>
              <div className="flex items-start sm:items-center gap-2.5 text-[#E2E8F0]">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>Extended-hours support across cross-continental timezones</span>
              </div>
              <div className="flex items-start sm:items-center gap-2.5 text-[#E2E8F0]">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>Executive travel planning & priority aviation arrangements</span>
              </div>
            </div>

            {/* Core Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={handleWhatsAppDirect}
                className="btn-silver inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 text-xs tracking-[0.2em] font-serif uppercase cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.45)] w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 text-[#0A101D]" />
                <span>Priority WhatsApp Desk</span>
              </button>

              <button
                onClick={() => setApplicationOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 text-xs tracking-[0.2em] font-serif uppercase rounded-full border border-white/30 bg-white/5 hover:bg-white/15 text-white transition-all duration-300 cursor-pointer hover:border-white w-full sm:w-auto"
              >
                <CreditCard className="w-4 h-4 text-[#CBD5E1]" />
                <span>Apply for Membership</span>
              </button>
            </div>

            {/* Key Trust Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-white/10 text-center">
              <div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white">Named</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Dedicated Contact</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white">Priority</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Last-Minute Handling</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white">Extended</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Hours Support</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Keycard */}
          <div className="lg:col-span-6">
            <PrestigeKeycard3D />
          </div>
        </div>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-16" />

        {/* Usage & Priority Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-block text-[11px] font-mono uppercase tracking-[0.28em] text-[#CBD5E1] mb-2">
              Operational Standards
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal mb-3">
              Usage & Priority
            </h2>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Elevated operational readiness engineered specifically for high-mobility executive principals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Extended-Hours Support */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.7)] group hover:border-white/70 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                Extended-hours support
              </h3>
              <p className="text-xs text-[#CBD5E1] font-light leading-relaxed mb-4">
                Active liaison coverage from early mornings to late evenings across international time zones, ensuring your global directives are executed without delay.
              </p>
              <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] text-[#A0ABBA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Early morning to late night coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Multi-timezone travel monitoring</span>
                </div>
              </div>
            </div>

            {/* Priority Handling of Last-Minute Requests */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.7)] group hover:border-white/70 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                Priority handling of last-minute requests
              </h3>
              <p className="text-xs text-[#CBD5E1] font-light leading-relaxed mb-4">
                Expedited queue privilege for urgent bookings, same-day executive aircraft chartering, sold-out dining venues, and emergency private chauffeur dispatch.
              </p>
              <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] text-[#A0ABBA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Immediate escalation protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>VIP off-market access channels</span>
                </div>
              </div>
            </div>

            {/* Executive-Level Coordination */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.7)] group hover:border-white/70 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                Executive-level coordination
              </h3>
              <p className="text-xs text-[#CBD5E1] font-light leading-relaxed mb-4">
                Seamless collaboration with your Chief of Staff, Executive Assistants, and Family Office to orchestrate corporate hospitality, boardrooms, and bilateral meetings.
              </p>
              <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] text-[#A0ABBA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Liaison with EAs & Family Offices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Institutional confidentiality protocols</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Type of Experiences Section (7 Curated Portfolios) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block text-[11px] font-mono uppercase tracking-[0.28em] text-[#CBD5E1] mb-2">
              Curated Luxury Portfolios
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal mb-3">
              Type of Experiences
            </h2>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Seven tailored experiential realms orchestrated for Prestige members—including private jets, superyachts, haute gastronomy, and corporate business man services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {PRESTIGE_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="relative rounded-3xl p-7 bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/20 hover:border-white/70 transition-all duration-300 group shadow-[0_18px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_22px_50px_rgba(255,255,255,0.18)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 via-white/10 to-transparent border border-white/50 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                      <exp.icon className="w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F1F5F9] bg-white/10 px-3 py-1 rounded-full border border-white/30">
                      {exp.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-white font-medium mb-3 group-hover:text-white transition-colors">
                    {exp.title}
                  </h3>

                  {/* Sub-Items */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exp.subItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-serif tracking-wide bg-gradient-to-r from-white/20 to-white/5 border border-white/40 text-white font-medium"
                      >
                        ✦ {item}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-[#A0ABBA] font-light leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-white/10 mb-5">
                    {exp.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                        <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#94A3B8]">Prestige Portfolio</span>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="text-[#CBD5E1] hover:text-white font-serif uppercase tracking-wider text-[11px] inline-flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Inquire via WhatsApp</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-16" />

        {/* 3D Interactive Services Directory */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block text-[11px] font-mono uppercase tracking-[0.28em] text-[#CBD5E1] mb-2">
              Full Spectrum Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal mb-4">
              Comprehensive Prestige Privileges
            </h2>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Fourteen full-scope services included with Prestige membership. Move your cursor over any card to interact with the 3D perspective sheen and inspect delivery protocols.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: 'All', label: 'All Privileges (14)' },
              { id: 'Executive & Mobility', label: 'Executive & Mobility (5)' },
              { id: 'Assets & Family', label: 'Assets & Family (3)' },
              { id: 'Corporate & Business', label: 'Corporate & Business (2)' },
              { id: 'Digital & Creative', label: 'Digital & Creative (4)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-white via-[#E2E8F0] to-[#CBD5E1] text-[#0A101D] font-semibold shadow-[0_4px_16px_rgba(255,255,255,0.35)]'
                    : 'bg-white/5 border border-white/10 text-[#C0C8D6] hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3D Tilt Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filteredServices.map((service, idx) => (
              <ServiceCard3D
                key={service.id}
                service={service}
                index={idx}
                onSelect={(s) => setSelectedService(s)}
              />
            ))}
          </div>
        </div>

        {/* How It Works: 3-Step Onboarding Architecture */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.06] via-[#0A101C]/80 to-[#040812] border border-white/15 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
              Executive Deployment
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
              How Your Prestige Concierge Operates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                01
              </div>
              <h4 className="text-lg font-serif text-white mb-2">Named Liaison Intro</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                Meet your dedicated Senior Concierge via private call or WhatsApp. Your family office profile and recurring preferences are cataloged.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                02
              </div>
              <h4 className="text-lg font-serif text-white mb-2">Family & EA Integration</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                We link with your executive assistants and family members to coordinate travel calendars, aviation logistics, and school requirements.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                03
              </div>
              <h4 className="text-lg font-serif text-white mb-2">Priority Last-Minute Execution</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                From same-day heavy jets to trophy real estate viewings and corporate legal services, execute complex directives with a single WhatsApp note.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Section */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center border border-white/35 bg-gradient-to-b from-[#131C30] via-[#0A101E] to-[#040711] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
              Executive Intake • 2026 Registry
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-white font-medium">
              Ready to Activate Your Prestige Membership?
            </h3>
            <p className="text-sm text-[#CBD5E1] font-light leading-relaxed">
              Step into comprehensive executive lifestyle stewardship, extended-hours support, and priority last-minute execution.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 pt-4">
              <button
                onClick={handleWhatsAppDirect}
                className="btn-silver inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 text-xs tracking-[0.2em] font-serif uppercase cursor-pointer w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 text-[#0A101D]" />
                <span>Direct WhatsApp Liaison</span>
              </button>

              <button
                onClick={() => setApplicationOpen(true)}
                className="px-6 sm:px-8 py-3.5 rounded-full border border-white/30 bg-white/5 hover:bg-white/15 text-white text-xs font-serif uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer w-full sm:w-auto text-center"
              >
                Submit Written Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Service Protocol Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-[#0A1122] border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/40 flex items-center justify-center">
                <selectedService.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#CBD5E1]">
                  {selectedService.category}
                </span>
                <h3 className="text-xl font-serif text-white font-medium">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#CBD5E1] font-light leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-serif uppercase tracking-[0.18em] text-white font-semibold mb-3">
                Service Delivery Protocols:
              </h4>
              <ul className="space-y-2.5">
                {selectedService.scope.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#A0ABBA]">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs mb-6">
              <span className="text-[#94A3B8]">Execution SLA:</span>
              <span className="font-mono text-white font-semibold">
                {selectedService.turnaround}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="btn-silver flex-1 py-3.5 sm:py-3 text-xs tracking-[0.18em] uppercase font-serif w-full"
              >
                Inquire via WhatsApp
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-3 rounded-full border border-white/20 text-xs text-[#CBD5E1] hover:text-white w-full sm:w-auto text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application / Inquiry Modal */}
      {applicationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#09101E] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setApplicationOpen(false);
                setFormSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-white/15 border border-white flex items-center justify-center text-white">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-white font-medium">
                  Application Transmitted
                </h3>
                <p className="text-xs text-[#A0ABBA] leading-relaxed max-w-sm mx-auto">
                  Thank you, {clientForm.fullName || 'Executive Principal'}. Your admission dossier for the PRESTIGE tier has been received by our Senior Executive Office. A dedicated Managing Director will contact you within 2 business hours.
                </p>
                <button
                  onClick={() => {
                    setApplicationOpen(false);
                    setFormSubmitted(false);
                  }}
                  className="btn-silver px-6 py-2.5 text-xs tracking-[0.2em] font-serif uppercase mt-4"
                >
                  Return to Prestige Overview
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
                    Executive Admission
                  </span>
                  <h3 className="text-2xl font-serif text-white font-medium mt-1">
                    Prestige Tier Application
                  </h3>
                  <p className="text-xs text-[#A0ABBA] font-light mt-1">
                    Role: Executive & Lifestyle Concierge
                  </p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sultan Al Mansoor"
                      value={clientForm.fullName}
                      onChange={(e) => setClientForm({ ...clientForm, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      value={clientForm.phone}
                      onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="principal@holding.ae"
                      value={clientForm.email}
                      onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      Entity / Family Office (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Al Mansoor Capital / Family Office"
                      value={clientForm.company}
                      onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      Preferred Liaison Method
                    </label>
                    <select
                      value={clientForm.preferredMethod}
                      onChange={(e) => setClientForm({ ...clientForm, preferredMethod: e.target.value })}
                      className="w-full bg-[#0D1628] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="WhatsApp">Priority WhatsApp Channel</option>
                      <option value="Direct Call">Direct Private Telephone Line</option>
                      <option value="EA Coordination">Coordination with Executive Assistant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      Initial Directives or Specific Requests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify aviation, property relocation, corporate hospitality, or family requirements..."
                      value={clientForm.notes}
                      onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:border-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-red-400 text-xs text-center">{errorMsg}</div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-silver w-full py-3 text-xs tracking-[0.2em] font-serif uppercase cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Submit Executive Admission Dossier'}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-[#64748B] font-light">
                    Protected by Institutional Non-Disclosure Protocol • 100% Confidential
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};