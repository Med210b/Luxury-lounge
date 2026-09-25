import React, { useState, useEffect } from 'react';
import {
  Crown,
  Clock,
  ShieldAlert,
  Globe,
  Star,
  Building2,
  Home,
  Laptop,
  TrendingUp,
  Share2,
  Camera,
  UserCheck,
  Users,
  Mountain,
  Plane,
  UtensilsCrossed,
  Sparkles,
  Heart,
  Film,
  Scale,
  Briefcase,
  ArrowLeft,
  ChevronRight,
  Check,
  CreditCard,
  MessageCircle,
  X,
  Zap,
} from 'lucide-react';
import { ImperialKeycard3D } from './ImperialKeycard3D';
import { ServiceCard3D, SignatureServiceItem } from './ServiceCard3D';

interface ImperialTierPageProps {
  onBackToOverview: () => void;
  onInitiateInquiry?: (tierName: string) => void;
  onSwitchTier?: (tierName: string) => void;
}

interface ImperialExperienceItem {
  id: string;
  title: string;
  category: string;
  subItems: string[];
  description: string;
  highlights: string[];
  icon: React.ElementType;
}

const IMPERIAL_SERVICES: SignatureServiceItem[] = [
  // Global & Priority (3)
  {
    id: 'intl-concierge',
    title: 'International Concierge Coordination',
    category: 'Global & Priority',
    description:
      'Seamless multi-country concierge stewardship connecting Dubai, London, Paris, New York, Tokyo, Milan, and Zurich for cross-border continuity.',
    scope: [
      'Worldwide partner desks providing in-destination local white-glove concierge',
      'Cross-border luxury travel, multi-country billing, and customs assistance',
      'Diplomatic and ultra-high-net-worth protocol coordination across destinations',
      'Continuous lifestyle management whether in residence or traveling abroad',
    ],
    turnaround: 'Worldwide 24/7',
    icon: Globe,
    isOriginal: true,
  },
  {
    id: 'emergency-last-minute',
    title: 'Emergency and Last-Minute Coordination',
    category: 'Global & Priority',
    description:
      'Zero-notice rapid response protocol for urgent flight charters, immediate emergency travel, short-notice reservations, and critical logistical needs.',
    scope: [
      'Immediate crisis and rapid-response executive dispatch',
      'Same-day private jet and helicopter charter clearance',
      'Short-notice VIP tables at fully booked global culinary destinations',
      'Emergency personal security, legal dispatch, and medical evacuation liaison',
    ],
    turnaround: 'Immediate Dispatch',
    icon: ShieldAlert,
    isOriginal: true,
  },
  {
    id: 'invitation-only-events',
    title: 'Invitation-Only Events & Experiences',
    category: 'Global & Priority',
    description:
      'Guaranteed access to closed-door galas, international film festivals, red carpet premieres, fashion weeks, and private society gatherings.',
    scope: [
      'Red carpet and film premiere credentials (Cannes, Venice, Met Gala)',
      'Front-row seating for Paris, Milan, and New York Fashion Weeks',
      'Paddock Club and VIP lounge passes for Formula 1 & major global sports',
      'Private salon viewings of rare timepieces, haute joaillerie, and private auctions',
    ],
    turnaround: 'Bespoke Invitation',
    icon: Star,
    isOriginal: true,
  },

  // Corporate & Real Estate (3)
  {
    id: 'business-meetings',
    title: 'Business Meeting Arrangements & Corporate Hospitality',
    category: 'Corporate & Real Estate',
    description:
      'Ultra-exclusive boardroom reservations, sovereign-grade private dining rooms, executive retreats, and corporate hospitality for key stakeholders.',
    scope: [
      'Discreet boardroom and private club meeting suites worldwide',
      'C-suite executive catering and private dining room reservations',
      'Corporate hospitality suites at tier-one sporting tournaments and summits',
      'High-security bilateral business conference logistics',
    ],
    turnaround: 'Executive Priority',
    icon: Briefcase,
  },
  {
    id: 'property-relocation',
    title: 'Property & Relocation Coordination',
    category: 'Corporate & Real Estate',
    description:
      'Full turnkey relocation architecture: prime residential sourcing, family settling, schooling, diplomatic formalities, and household staff staffing.',
    scope: [
      'Prime residential search & lease negotiations across UAE & Europe',
      'Elite private academy and international school enrollment liaison',
      'International fine art, yacht, and vehicle importation formalities',
      'Complete home setup, interior preparation, and domestic staffing sourcing',
    ],
    turnaround: 'Turnkey Project',
    icon: Building2,
  },
  {
    id: 'rent-sell-villas',
    title: 'Rent & Sell Villas and Apartments',
    category: 'Corporate & Real Estate',
    description:
      'Private off-market luxury real estate representation: discreet acquisition, premium rental portfolio management, and prime architectural dispositions.',
    scope: [
      'Confidential off-market luxury acquisitions in Palm Jumeirah, Emirates Hills, and DIFC',
      'Bespoke leasing management for ultra-luxury residential assets',
      'Private buyer vetting and sovereign-level transaction privacy',
      'Conveyancing, escrow liaison, and golden visa real estate advisory',
    ],
    turnaround: 'Dedicated Brokerage',
    icon: Home,
  },

  // Digital, Media & Branding (6)
  {
    id: 'bespoke-website',
    title: 'Bespoke Website Development',
    category: 'Digital, Media & Branding',
    description:
      'Custom high-performance digital presence: artisanal interactive web architecture for family offices, personal ventures, and luxury holding companies.',
    scope: [
      'Bespoke visual identity and WebGL interactive web design',
      'End-to-end full-stack development with bank-grade data encryption',
      'Mobile-first responsive architecture tailored to global investors',
      'Private client portal engineering and secure asset reporting',
    ],
    turnaround: 'Custom Sprint',
    icon: Laptop,
  },
  {
    id: 'full-digital-marketing',
    title: 'Full Digital Marketing',
    category: 'Digital, Media & Branding',
    description:
      'Strategic market amplification: high-intent performance campaigns, executive search engine prestige, and ultra-high-net-worth audience targeting.',
    scope: [
      'High-net-worth demographic programmatic and social marketing',
      'Executive Search Engine Optimization (SEO) & digital footprint governance',
      'Targeted investor acquisition and international PR placements',
      'Precision campaign analytics and conversion tracking',
    ],
    turnaround: 'Continuous Strategy',
    icon: TrendingUp,
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    category: 'Digital, Media & Branding',
    description:
      'Discreet, polished multi-channel social management: voice curation, visual asset publishing, executive thought leadership, and audience stewardship.',
    scope: [
      'C-suite executive LinkedIn and Instagram aesthetic direction',
      'Editorial calendar drafting, tone-of-voice alignment, and captioning',
      'Community engagement, DM filtering, and VIP response routing',
      'Strict confidentiality controls and reputation defense protocol',
    ],
    turnaround: 'Monthly Retainer',
    icon: Share2,
  },
  {
    id: 'photography-content',
    title: 'Photography & Content',
    category: 'Digital, Media & Branding',
    description:
      'World-class editorial photography and cinematic videography: personal branding shoots, private event coverage, and luxury asset captures.',
    scope: [
      'Editorial fashion, portrait, and private lifestyle photoshoots',
      'Cinematic 4K video reels for superyachts, aviation, and estates',
      'Discreet coverage for private celebrations and closed-door dinners',
      'Master color grading, magazine retouching, and secure raw delivery',
    ],
    turnaround: '48h Preview',
    icon: Camera,
  },
  {
    id: 'personal-branding',
    title: 'Personal Branding',
    category: 'Digital, Media & Branding',
    description:
      'Strategic positioning for founders, chairpersons, and visionary leaders: media narrative architecture, keynote advisory, and profile elevation.',
    scope: [
      'Comprehensive personal brand strategy and bio narrative formulation',
      'Tier-1 international media feature pitches (Forbes, Bloomberg, FT)',
      'Speaking engagement placement at global economic forums and summits',
      'Crisis reputation shielding and digital legacy architecture',
    ],
    turnaround: 'Bespoke Program',
    icon: UserCheck,
  },
  {
    id: 'business-networking',
    title: 'Business Networking',
    category: 'Digital, Media & Branding',
    description:
      'Facilitated warm introductions to sovereign wealth directors, family office principals, venture capitalists, and industry titans.',
    scope: [
      'Curated one-on-one bilateral introductions within our vetted member circle',
      'Exclusive private dinners hosted at sovereign and luxury member clubs',
      'Syndicate investment and cross-border partnership discovery',
      'Discreet peer advisory forums and executive salon participation',
    ],
    turnaround: 'Curated Introductions',
    icon: Users,
  },
];

const IMPERIAL_EXPERIENCES: ImperialExperienceItem[] = [
  {
    id: 'travel-aviation',
    title: 'Luxury Travel & Aviation',
    category: 'Private Aviation & Nautical',
    subItems: [
      'Luxury Travel Expr.',
      'Private Jet',
      'Yacht & Sailing',
      'Helicopter',
      'Luxury Desert',
    ],
    description:
      'Transcontinental private jet charters, Mediterranean superyacht moorings, point-to-point executive helicopter transfers, and secluded desert palace experiences.',
    highlights: [
      'Heavy jet & ultra-long-range fleet clearances on 2-hour notice',
      'Charter of 50m+ superyachts across Côte d’Azur, Amalfi & Greek Isles',
      'Direct helipad arrivals to rooftop suites, estates & mega-events',
      'Private conservation desert camps with royal protocol service',
    ],
    icon: Plane,
  },
  {
    id: 'adventure',
    title: 'Adventure & Expedition',
    category: 'Extreme Frontiers',
    subItems: ['Adventure & Expedition'],
    description:
      'Rare polar expeditions, high-altitude alpine summits, submarine trench explorations, and sub-orbital edge-of-space journeys orchestrated with elite expedition leaders.',
    highlights: [
      'Antarctic fly-in expeditions with private ice camps',
      'Submersible ocean deep dives & historic shipwreck exploration',
      'Guided helicopter mountaineering & virgin powder heli-skiing',
      'Spaceflight qualification and edge-of-space stratospheric flights',
    ],
    icon: Mountain,
  },
  {
    id: 'culinary',
    title: 'Culinary & Fine Dining',
    category: 'Gastronomic Salons',
    subItems: ['Culinary & Fine Dining', 'Private Chef'],
    description:
      'Reserved chef tables at 3-Michelin-starred institutions worldwide, private vineyard acquisitions, and residencies of celebrated master chefs in your personal villa or yacht.',
    highlights: [
      'Guaranteed reservations at fully booked culinary temples globally',
      'Private Michelin-star master chef residencies at home or on charter',
      'Closed-door Grand Cru vineyard tours & private cellar acquisitions',
      'Bespoke tasting menus designed around private dietary preferences',
    ],
    icon: UtensilsCrossed,
  },
  {
    id: 'fashion',
    title: 'Beauty & High Fashion',
    category: 'Haute Couture & Wellness',
    subItems: ['Beauty & Self-Care', 'Fashion Week'],
    description:
      'Front-row credentials for Paris, Milan, and New York Fashion Weeks, private haute couture atelier salons, and private celebrity aesthetic practitioners.',
    highlights: [
      'Front-row seating & VIP backstage credentials for Fashion Weeks',
      'Private salon previews with historic couture houses & jewellers',
      'Exclusive aesthetic, wellness & rejuvenation clinic access in Switzerland',
      'In-residence celebrity stylists, hairdressers, and wellness gurus',
    ],
    icon: Sparkles,
  },
  {
    id: 'entertainment',
    title: 'Entertainment & Red Carpet',
    category: 'Society & Global Galas',
    subItems: [
      'Film & Red Carpet',
      'Nightlife & VIP',
      'Private Party',
      'Exclusive & Invitation-Only Experiences',
    ],
    description:
      'Red carpet credentials at Cannes, Venice, and the Met Gala, sovereign society balls, VIP Paddock Club at Formula 1, and turnkey private festival production.',
    highlights: [
      'Red carpet and premiere credentials for Cannes & Venice Film Festivals',
      'Private invitation-only society galas and charity balls',
      'VIP Paddock Club passes & private pit lane access at Formula 1 races',
      'Private concert staging with global recording artists for milestone events',
    ],
    icon: Film,
  },
  {
    id: 'family',
    title: 'Personal & Family Milestones',
    category: 'Legacy & Celebrations',
    subItems: ['Honeymoon', 'Family & Kids', 'Birthday & Celebrations', 'Proposal'],
    description:
      'Turnkey milestone anniversary productions, private island takeovers, royal palace wedding celebrations, and multi-generational family holidays.',
    highlights: [
      'Private island buyouts for once-in-a-lifetime family celebrations',
      'Cinematic wedding and engagement proposal staging worldwide',
      'Multi-generational itinerary planning with private tutor & nanny integration',
      'Exclusive theme park and cultural institution after-hours buyouts',
    ],
    icon: Heart,
  },
  {
    id: 'networking-media',
    title: 'Networking & High-Impact Media',
    category: 'Influence & Editorial',
    subItems: ['Networking & Social Media', 'Photograph & Content'],
    description:
      'Warm introductions to sovereign leaders and family office principals, bespoke editorial photography, and sovereign personal media management.',
    highlights: [
      'Bilateral warm introductions to vetted global family office principals',
      'Private salon dinners hosted at elite private member clubs',
      'Magazine-grade editorial shoots for assets, portraits, and families',
      'Discreet thought-leadership and executive digital footprint governance',
    ],
    icon: Share2,
  },
  {
    id: 'business',
    title: 'Corporate & Sovereign Business',
    category: 'Legal & Enterprise Support',
    subItems: ['Legal services', 'Business man services'],
    description:
      'Cross-border corporate legal coordination, diplomatic protocol advisory, UAE golden visa and business licensing liaison, and board-level corporate hospitality.',
    highlights: [
      'Top-tier international corporate counsel and notary coordination',
      'Comprehensive business man services & mainland/freezone licensing in the UAE',
      'Executive Golden Visa, diplomatic passport & residency liaison',
      'Sovereign-grade boardroom and high-security conference logistics',
    ],
    icon: Scale,
  },
];

export const ImperialTierPage: React.FC<ImperialTierPageProps> = ({
  onBackToOverview,
  onInitiateInquiry,
  onSwitchTier,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<SignatureServiceItem | null>(null);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const filteredServices = IMPERIAL_SERVICES.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Global & Priority') return item.category === 'Global & Priority';
    if (activeFilter === 'Corporate & Real Estate') return item.category === 'Corporate & Real Estate';
    if (activeFilter === 'Digital, Media & Branding') return item.category === 'Digital, Media & Branding';
    return true;
  });

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent(
      'Hello Luxury Lounge Private Desk, I am interested in activating the IMPERIAL Membership Tier (Ultra-Private Bespoke Concierge with 24/7 Priority Access). Please provide onboarding details.'
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

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (onInitiateInquiry) {
      onInitiateInquiry('IMPERIAL');
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
        {/* Navigation Breadcrumbs & Back Header with Quick Tier Switcher */}
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
              <span className="text-white font-semibold">Imperial Dossier</span>
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
              onClick={() => onSwitchTier ? onSwitchTier('PRESTIGE') : (window.location.hash = '#prestige')}
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-widest text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Prestige
            </button>
            <button
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-widest bg-white text-[#050A15] font-semibold shadow-[0_0_15px_rgba(255,255,255,0.4)] cursor-default"
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
              <span>Ultra-Private Bespoke Concierge Protocol</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-[0.12em] sm:tracking-[0.16em] mb-2 sm:mb-3 leading-tight select-none">
                <span className="luxury-silver-animated-text luxury-silver-imperial">
                  IMPERIAL
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
                  Role: <span className="text-[#F1F5F9] font-normal">Ultra-Private Bespoke Concierge</span>
                </div>
              </div>

              <div className="text-xs text-[#CBD5E1] font-light leading-relaxed flex items-start sm:items-center gap-2 mt-2">
                <Crown className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  Role: <strong className="text-white font-medium">Ultra-Private Bespoke Concierge</strong>. Designed for sovereign principals, family offices, and leaders requiring dedicated senior personal concierge, 24/7 priority access, and worldwide continuity.
                </span>
              </div>
            </div>

            {/* Membership Includes Highlights */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-start sm:items-center gap-2.5 text-[#E2E8F0]">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>Dedicated senior concierge a named point of contact with 24/7 priority access</span>
              </div>
              <div className="flex items-start sm:items-center gap-2.5 text-[#E2E8F0]">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>Private client profile & preferences recorded in advance</span>
              </div>
              <div className="flex items-start sm:items-center gap-2.5 text-[#E2E8F0]">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>Bespoke travel planning & priority aviation arrangements</span>
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
                <div className="text-base sm:text-lg font-serif font-semibold text-white">24/7</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Priority Access</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white">12 Services</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Full Scope</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white">8 Portfolios</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Experiences</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Keycard */}
          <div className="lg:col-span-6">
            <ImperialKeycard3D />
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
              Sovereign-grade operational protocols engineered for global leaders and ultra-high-net-worth families.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* 24/7 Priority Access */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.7)] group hover:border-white/70 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                  24/7 Priority Access
                </h3>
                <p className="text-xs text-[#CBD5E1] font-light leading-relaxed mb-4">
                  Direct, unhindered 24/7 priority access to your named Senior Concierge. Any time of day or night, anywhere across the globe.
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] text-[#A0ABBA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>24/7/365 active executive desk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Zero delay across global time zones</span>
                </div>
              </div>
            </div>

            {/* Emergency & Last-Minute Coordination */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.7)] group hover:border-white/70 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                  Emergency & Last-Minute
                </h3>
                <p className="text-xs text-[#CBD5E1] font-light leading-relaxed mb-4">
                  Zero-notice rapid response protocol for urgent flight charters, immediate emergency travel, short-notice reservations, and crisis logistics.
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] text-[#A0ABBA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Immediate escalation protocol</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Sub-15-minute dispatch action</span>
                </div>
              </div>
            </div>

            {/* Highest-Priority Handling */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.7)] group hover:border-white/70 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                  Highest-Priority Handling
                </h3>
                <p className="text-xs text-[#CBD5E1] font-light leading-relaxed mb-4">
                  All Imperial requests bypass general queues and take rank #1 operational priority across our entire partner and global lifestyle network.
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] text-[#A0ABBA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Rank #1 priority across network</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Direct partner leadership clearance</span>
                </div>
              </div>
            </div>

            {/* International Concierge Coordination */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.7)] group hover:border-white/70 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border border-white/50 flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white font-medium mb-2.5">
                  International Coordination
                </h3>
                <p className="text-xs text-[#CBD5E1] font-light leading-relaxed mb-4">
                  Seamless multi-city coordination across Dubai, London, Paris, New York, Tokyo, Milan, and Zurich for total cross-border continuity.
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-white/10 text-[11px] text-[#A0ABBA]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Partner desks in prime capitals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Cross-border protocol continuity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Type of Experiences Section (8 Curated Portfolios) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block text-[11px] font-mono uppercase tracking-[0.28em] text-[#CBD5E1] mb-2">
              Curated Luxury Portfolios
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal mb-3">
              Type of Experiences
            </h2>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Eight tailored experiential realms orchestrated for Imperial members—including transcontinental private aviation, megayachts, Michelin gastronomy, and invitation-only red carpet access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {IMPERIAL_EXPERIENCES.map((exp) => (
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

                  {/* Sub-Items Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exp.subItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-serif tracking-wide bg-gradient-to-r from-white/20 to-white/5 border border-white/40 text-white font-medium shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
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
                  <span className="text-[11px] font-mono text-[#94A3B8]">Imperial Portfolio</span>
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
              Comprehensive Imperial Privileges
            </h2>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Twelve full-scope bespoke services included with Imperial membership. Move your cursor over any card to interact with the 3D perspective sheen and inspect delivery protocols.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: 'All', label: 'All Privileges (12)' },
              { id: 'Global & Priority', label: 'Global & Priority (3)' },
              { id: 'Corporate & Real Estate', label: 'Corporate & Real Estate (3)' },
              { id: 'Digital, Media & Branding', label: 'Digital, Media & Branding (6)' },
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
              Sovereign Activation
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
              How Your Imperial Concierge Operates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                01
              </div>
              <h4 className="text-lg font-serif text-white mb-2">Senior Liaison Intro</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                Meet your assigned Senior Concierge via private call, encrypted WhatsApp, or in-person salon. Your confidential profile and lifestyle roster are cataloged.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                02
              </div>
              <h4 className="text-lg font-serif text-white mb-2">Private Client Profiling</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                Key dates, family details, preferred aviation operators, dietary regimens, and cross-border residence preferences are recorded in advance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                03
              </div>
              <h4 className="text-lg font-serif text-white mb-2">24/7 Sovereign Execution</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                From emergency flight clearances and trophy villa acquisitions to red carpet access, execute complex multi-country directives around the clock.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Section */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center border border-white/35 bg-gradient-to-b from-[#131C30] via-[#0A101E] to-[#040711] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
              Sovereign Intake • 2026 Registry
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-white font-medium">
              Ready to Activate Your Imperial Membership?
            </h3>
            <p className="text-sm text-[#CBD5E1] font-light leading-relaxed">
              Step into the pinnacle of ultra-private bespoke concierge stewardship, 24/7 priority access, and cross-border continuity.
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
                  Thank you, {clientForm.fullName || 'Executive Principal'}. Your admission dossier for the IMPERIAL tier has been received by our Senior Executive Office. A dedicated Managing Director will contact you within 2 business hours.
                </p>
                <button
                  onClick={() => {
                    setApplicationOpen(false);
                    setFormSubmitted(false);
                  }}
                  className="btn-silver px-6 py-2.5 text-xs tracking-[0.2em] font-serif uppercase mt-4"
                >
                  Return to Imperial Overview
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
                    Sovereign Admission
                  </span>
                  <h3 className="text-2xl font-serif text-white font-medium mt-1">
                    Imperial Tier Application
                  </h3>
                  <p className="text-xs text-[#A0ABBA] font-light mt-1">
                    Role: Ultra-Private Bespoke Concierge
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
                      placeholder="e.g. Sheikh Mohammed Al Qasimi"
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
                      placeholder="e.g. Royal Holding / Family Office"
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
                      <option value="EA Coordination">Coordination with Executive Assistant / Chief of Staff</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      Initial Directives or Specific Requests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify aviation charter, luxury estate acquisition, family office structuring, or event access..."
                      value={clientForm.notes}
                      onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:border-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-silver w-full py-3 text-xs tracking-[0.2em] font-serif uppercase cursor-pointer"
                    >
                      Submit Sovereign Admission Dossier
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
