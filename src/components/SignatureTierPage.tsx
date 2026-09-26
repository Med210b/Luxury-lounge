import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  UtensilsCrossed,
  Plane,
  Car,
  Compass,
  FileText,
  ShoppingBag,
  Eye,
  Home,
  Laptop,
  Share2,
  ArrowLeft,
  Check,
  Crown,
  Shield,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  Send,
  CreditCard,
  Heart,
  Info,
} from 'lucide-react';
import { SignatureKeycard3D } from './SignatureKeycard3D';
import { ServiceCard3D, SignatureServiceItem } from './ServiceCard3D';

interface SignatureTierPageProps {
  onBackToOverview: () => void;
  onInitiateInquiry?: (tierName: string) => void;
  onSwitchTier?: (tierName: string) => void;
}

const SIGNATURE_SERVICES: SignatureServiceItem[] = [
  // Existing 3 Details
  {
    id: 'whatsapp-concierge',
    title: 'Personal Concierge Access (Priority WhatsApp)',
    category: 'Concierge & Mobility',
    description:
      'Direct, end-to-end encrypted 1-on-1 private WhatsApp liaison with your assigned Lifestyle Director for immediate daily requests, bookings, and logistical directives.',
    scope: [
      'Dedicated personal concierge desk via encrypted WhatsApp',
      'Guaranteed response time within 4 hours',
      '24/7/365 active dispatch for lifestyle requests',
      'Digital calendar invites and confirmation vouchers',
    ],
    turnaround: 'Within 4 Hours',
    icon: MessageCircle,
    isOriginal: true,
  },
  {
    id: 'dining-hotels',
    title: 'Restaurant & Hotel Reservations',
    category: 'Concierge & Mobility',
    description:
      'Preferred table reservations at Michelin-starred restaurants, world 50 best culinary salons, and bespoke suite upgrades across ultra-luxury hotel collections.',
    scope: [
      'Priority reservations at booked-out culinary establishments',
      'Access to chef tables and private dining alcoves',
      'Complimentary room upgrades & VIP amenities at partner hotels',
      'Bespoke dietary profiling & sommelier introductions',
    ],
    turnaround: 'Same-Day Clearance',
    icon: UtensilsCrossed,
    isOriginal: true,
  },
  {
    id: 'airport-assistance',
    title: 'Airport Assistance Coordination',
    category: 'Concierge & Mobility',
    description:
      'Seamless meet-and-assist coordination at commercial international hubs, fast-track diplomatic passport clearance, porterage, and executive lounge access.',
    scope: [
      'VIP Meet & Greet at aircraft airside ramp or jet bridge',
      'Fast-track immigration and customs clearance liaison',
      'Luggage porterage and curbside vehicle transfers',
      'Access to select first-class and VIP executive lounges',
    ],
    turnaround: '4-Hour Notice',
    icon: Plane,
    isOriginal: true,
  },

  // Additional 8 Details
  {
    id: 'chauffeur-arrangements',
    title: 'Chauffeur Arrangements (Coordination)',
    category: 'Concierge & Mobility',
    description:
      'Coordination and dispatch of executive luxury chauffeur vehicles including Rolls-Royce Phantom, Mercedes-Maybach S-Class, and Cadillac Escalade fleets.',
    scope: [
      'Vetted, security-trained professional chauffeurs',
      'Punctual airport arrivals, inter-city journeys & day hire',
      'In-car refreshments, Wi-Fi, and preferred climate presets',
      'Direct coordination with flight arrival telemetry',
    ],
    turnaround: '2-Hour Notice',
    icon: Car,
  },
  {
    id: 'travel-planning',
    title: 'Travel Planning (Standard Itineraries)',
    category: 'Concierge & Mobility',
    description:
      'Bespoke leisure and executive travel itineraries, curated hotel suites, scenic private road trips, and cultural experiences tailored to your family.',
    scope: [
      'Complete end-to-end bespoke travel schedules',
      'Boutique hotel & villa selection matching lifestyle taste',
      'Local insider reservations and private guide coordination',
      'Consolidated digital itinerary with real-time updates',
    ],
    turnaround: '24–48 Hours',
    icon: Compass,
  },
  {
    id: 'government-documents',
    title: 'Government & Document Coordination (Basic)',
    category: 'Real Estate & Assets',
    description:
      'Streamlined coordination for basic UAE municipal documentation, certified document translations, Emirates ID attestation liaison, and administrative filings.',
    scope: [
      'Liaison for basic document notarization & attestation',
      'Translation coordination for legal and trade records',
      'Emirates ID & residency document checklist guidance',
      'Courier pickup and hand-delivery of sensitive materials',
    ],
    turnaround: '24–72 Hours',
    icon: FileText,
  },
  {
    id: 'personal-shopping',
    title: 'Personal Shopping & Gift Coordination',
    category: 'Real Estate & Assets',
    description:
      'Acquisition of hard-to-find luxury fashion items, limited timepieces, rare vintages, bespoke floral arrangements, and global milestone gift deliveries.',
    scope: [
      'Private salon appointments with luxury fashion houses',
      'Sourcing of sold-out accessories & vintage timepieces',
      'Curated anniversary and corporate gift packaging',
      'White-glove international courier delivery',
    ],
    turnaround: 'Bespoke Window',
    icon: ShoppingBag,
  },
  {
    id: 'property-viewing',
    title: 'Property Viewing Coordination',
    category: 'Real Estate & Assets',
    description:
      'Private, confidential property viewings for premium villas, penthouses, and waterfront estates across Dubai, Abu Dhabi, and prime global capitals.',
    scope: [
      'Private scheduling directly with master developers and owners',
      'Chauffeured transportation between viewing locations',
      'Objective architectural and price benchmark briefings',
      'Strict NDA protection for high-profile principals',
    ],
    turnaround: 'Within 24 Hours',
    icon: Eye,
  },
  {
    id: 'rent-sell-properties',
    title: 'Rent & Sell Villas and Apartments',
    category: 'Real Estate & Assets',
    description:
      'Comprehensive brokerage liaison and luxury marketing advisory for leasing, purchasing, and listing high-end residential real estate.',
    scope: [
      'Access to exclusive off-market villas and penthouses',
      'Tenant screening and prime residential lease negotiation',
      'Advisory for listing high-value properties to qualified buyers',
      'Conveyancing and escrow coordination assistance',
    ],
    turnaround: 'Active Portfolio',
    icon: Home,
  },
  {
    id: 'website-development',
    title: 'Website Development',
    category: 'Digital & Tech',
    description:
      'Design and engineering of bespoke ultra-fast modern web applications, family office digital presence, and high-conversion personal brand portfolios.',
    scope: [
      'Custom React / Next.js modern responsive architecture',
      'Ultra-luxury minimalist typography and tailored aesthetic',
      'High-speed hosting setup, domain configuration & SSL',
      'Mobile-optimized interactive UI with custom animations',
    ],
    turnaround: 'Sprint Milestones',
    icon: Laptop,
  },
  {
    id: 'digital-marketing',
    title: 'Basic Digital Marketing',
    category: 'Digital & Tech',
    description:
      'Foundational digital marketing and online brand stewardship, establishing search visibility, curated social media positioning, and executive profiles.',
    scope: [
      'Google Business profile optimization and local search setup',
      'Executive LinkedIn and social media profile curation',
      'Basic meta-advertising or targeted lead capture setup',
      'Monthly digital visibility and reputation review',
    ],
    turnaround: 'Monthly Cadence',
    icon: Share2,
  },
];

export interface SignatureExperience {
  id: string;
  title: string;
  category: string;
  subItems: string[];
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
}

const SIGNATURE_EXPERIENCES: SignatureExperience[] = [
  {
    id: 'luxury-travel',
    title: 'Luxury Travel',
    category: 'Expeditions & Escapes',
    subItems: ['Luxury Travel Expr.', 'Luxury Desert'],
    description:
      'Immersive luxury travel architecture and private desert expeditions under the pristine Arabian sky, curated end-to-end.',
    highlights: [
      'Private luxury desert camp setups with starlit dune dining',
      'VIP airport tarmac meet-and-assist & fast-track clearance',
      'Curated scenic journeys & bespoke remote expeditions',
      'Helicopter & private jet charter coordination',
    ],
    icon: Compass,
  },
  {
    id: 'culinary',
    title: 'Culinary',
    category: 'Epicurean Salons',
    subItems: ['Culinary & Fine Dining'],
    description:
      'Privileged table clearance at Michelin-starred restaurants, world 50 best culinary salons, and bespoke chef in-residence dinners.',
    highlights: [
      'Cleared priority access to globally booked-out restaurants',
      'Private in-residence chef dinners & bespoke tasting menus',
      'Sommelier introductions & rare vintage acquisitions',
      'Curated gastronomy hosting for intimate private gatherings',
    ],
    icon: UtensilsCrossed,
  },
  {
    id: 'beauty-self-care',
    title: 'Beauty & Self-Care',
    category: 'Wellness & Vitality',
    subItems: ['Beauty & Self-Care'],
    description:
      'Private wellness stewardship, sanctuary spa buyouts, in-suite practitioners, and premier aesthetic salons.',
    highlights: [
      'Direct appointments with celebrated hair & grooming artists',
      'In-villa luxury massage, wellness & aesthetic practitioners',
      'Private thermal suite buyouts & holistic retreat curation',
      'Personalized wellness regimes and elite fitness liaison',
    ],
    icon: Sparkles,
  },
  {
    id: 'family-celebrations',
    title: 'Family & Celebrations',
    category: 'Private Milestones',
    subItems: ['Family & Kids', 'Birthday & Celebrations', 'Honeymoon', 'Proposal'],
    description:
      'Cinematic milestone staging, romantic proposal coordination, honeymoon escapes, and seamless luxury family itineraries.',
    highlights: [
      'Confidential romantic proposal orchestrations with music & decor',
      'Bespoke honeymoon itineraries with private island villas',
      'Grand milestone birthday planning & private entertainment',
      'Tailored family itineraries & vetted children cultural excursions',
    ],
    icon: Heart,
  },
];

export const SignatureTierPage: React.FC<SignatureTierPageProps> = ({
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

  const filteredServices = SIGNATURE_SERVICES.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Concierge & Mobility') return item.category === 'Concierge & Mobility';
    if (activeFilter === 'Real Estate & Assets') return item.category === 'Real Estate & Assets';
    if (activeFilter === 'Digital & Tech') return item.category === 'Digital & Tech';
    return true;
  });

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent(
      'Hello Luxury Lounge Private Desk, I am interested in activating the SIGNATURE Membership Tier. Please provide onboarding details.'
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
      subject: `New SIGNATURE Tier Application from ${clientForm.fullName}`,
      Name: clientForm.fullName,
      Phone: clientForm.phone,
      Email: clientForm.email,
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
          onInitiateInquiry('SIGNATURE');
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
    <div className="relative min-h-screen bg-[#040812] text-[#D8E0EC] pt-24 pb-28 px-4 sm:px-6 lg:px-12 selection:bg-white selection:text-[#040812]">
      {/* Background Ambience Radial Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/6 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(62,118,199,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Breadcrumb & Back Header with Quick Tier Switcher */}
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
              <span className="text-white font-semibold">Signature Dossier</span>
            </div>
          </div>

          {/* Quick Tier Dossier Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] p-1 rounded-full border border-white/15">
            <button
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-widest bg-white text-[#050A15] font-semibold shadow-[0_0_15px_rgba(255,255,255,0.4)] cursor-default"
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
              <span>Personal Luxury Concierge Architecture</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-[0.12em] sm:tracking-[0.16em] mb-2 sm:mb-3 leading-tight select-none">
                <span className="luxury-silver-animated-text luxury-silver-signature">
                  SIGNATURE
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base font-serif text-[#CBD5E1] tracking-wider uppercase">
                Tier Specification & Complete Privileges
              </p>
            </div>

            {/* Role & Value Proposition Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/30 shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
              <div className="mb-2">
                <div className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide">
                  Role: <span className="text-[#F1F5F9] font-normal">Personal Luxury Concierge</span>
                </div>
              </div>

              <div className="text-xs text-[#CBD5E1] font-light leading-relaxed flex items-start sm:items-center gap-2 mt-2">
                <Crown className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  Designated <strong className="text-white font-medium">Personal Luxury Concierge</strong> dedicated to managing daily lifestyle, mobility, asset viewing, and private bookings.
                </span>
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

            {/* Trust Markers */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-white/10 text-center">
              <div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white">Within 4h</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Response Time</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white">11 Services</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Full Scope</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-serif font-semibold text-white">4 Portfolios</div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">Experiences</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Keycard */}
          <div className="lg:col-span-6">
            <SignatureKeycard3D />
          </div>
        </div>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-16" />

        {/* Usage & Priority Architecture */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-block text-[11px] font-mono uppercase tracking-[0.28em] text-[#CBD5E1] mb-2">
              Operational Protocols
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal mb-3">
              Usage & Priority
            </h2>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Transparent operational standards and scope boundaries governing the Signature tier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Priority Response SLA */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.12] via-[#0D1527]/90 to-[#060B16] border border-white/35 shadow-[0_20px_45px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-white/80 transition-all duration-300">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />

              <div className="flex items-center gap-3.5 mb-5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-white/30 to-white/5 border border-white/60 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
                    Liaison Dispatch SLA
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                    Response time: within 4 hours
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed mb-6 relative z-10">
                Every request submitted through your dedicated priority WhatsApp channel is logged and routed to your Personal Luxury Concierge, with guaranteed initial response, verification, and action initiation within 4 hours.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Guaranteed within 4 hours WhatsApp response</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Direct escalation to Senior Lifestyle Director for urgent travel</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#E2E8F0]">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Real-time booking confirmations & digital itinerary syncing</span>
                </div>
              </div>
            </div>

            {/* Scope Boundary Notice */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] via-[#09101E]/85 to-[#040812] border border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.7)] relative overflow-hidden group hover:border-white/35 transition-all duration-300">
              <div className="flex items-center gap-3.5 mb-5 relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-[#E2E8F0] shadow-[0_4px_16px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform">
                  <Info className="w-6 h-6 text-[#CBD5E1]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#94A3B8]">
                    Scope Specification
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                    Legal services & Business man services - not included
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed mb-6 relative z-10">
                The Signature tier is dedicated exclusively to personal luxury lifestyle, travel, fine dining, private property viewing, and digital presence. Statutory corporate legal filings, court litigation, company formation, and commercial businessman licensing are not included.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-2.5 text-xs text-[#94A3B8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <span>Excludes: Corporate incorporation & offshore structuring</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#94A3B8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  <span>Excludes: Judicial court litigation & commercial business licensing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>Corporate and enterprise legal coverage available in Prestige & Imperial tiers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Type of Experiences Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block text-[11px] font-mono uppercase tracking-[0.28em] text-[#CBD5E1] mb-2">
              Curated Luxury Portfolios
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-normal mb-3">
              Type of Experiences
            </h2>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Tailored experiential realms orchestrated for Signature members—from private desert camps to milestone family celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SIGNATURE_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-white/[0.12] via-[#0E1628]/90 to-[#060A14] border border-white/20 hover:border-white/70 transition-all duration-300 group shadow-[0_18px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_22px_50px_rgba(255,255,255,0.18)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-white/30 via-white/10 to-transparent border border-white/50 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-white transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                      <exp.icon className="w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F1F5F9] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/30">
                      {exp.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-white font-medium mb-3 group-hover:text-white transition-colors">
                    {exp.title}
                  </h3>

                  {/* Sub-item pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.subItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-serif tracking-wide bg-gradient-to-r from-white/20 to-white/5 border border-white/40 text-white font-medium shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                      >
                        ✦ {item}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <ul className="space-y-2.5 pt-3 border-t border-white/10 mb-6">
                    {exp.highlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
                        <Check className="w-4 h-4 text-white shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#94A3B8]">Signature Tier Privilege</span>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="text-[#CBD5E1] hover:text-white font-serif uppercase tracking-wider text-[11px] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all cursor-pointer"
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
              Comprehensive Signature Privileges
            </h2>
            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
              Every Signature membership includes unrestricted access to our 11 personal concierge, executive travel, property, and brand services. Move your cursor over any card to interact with the 3D perspective sheen.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: 'All', label: 'All Privileges (11)' },
              { id: 'Concierge & Mobility', label: 'Executive Mobility & Travel (5)' },
              { id: 'Real Estate & Assets', label: 'Real Estate & Lifestyle (4)' },
              { id: 'Digital & Tech', label: 'Digital Atelier & Brand (2)' },
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
              Seamless Activation
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mt-1">
              How Your Signature Concierge Operates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                01
              </div>
              <h4 className="text-lg font-serif text-white mb-2">Priority Desk Setup</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                Upon confirmation, your encrypted WhatsApp channel is provisioned with your assigned Personal Luxury Concierge.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                02
              </div>
              <h4 className="text-lg font-serif text-white mb-2">Lifestyle Profiling</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                We catalog your dining tastes, frequent travel routes, preferred airline cabins, vehicle models, and residential criteria.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white text-white flex items-center justify-center font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(255,255,255,0.35)]">
                03
              </div>
              <h4 className="text-lg font-serif text-white mb-2">Instant Global Execution</h4>
              <p className="text-xs text-[#A0ABBA] font-light leading-relaxed">
                Send a single WhatsApp voice or text memo for any directive—from Rolls-Royce airport transfers to prime villa viewings.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Section */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center border border-white/35 bg-gradient-to-b from-[#121A2E] via-[#090F1C] to-[#040812] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
              Admissions Open • 2026 Cohort
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-white font-medium">
              Ready to Activate Your Signature Membership?
            </h3>
            <p className="text-sm text-[#CBD5E1] font-light leading-relaxed">
              Experience the distinction of a dedicated Personal Luxury Concierge in Dubai and worldwide.
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
                Submit Written Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Service Protocol Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-[#0A101D] border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
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
              <span className="text-[#94A3B8]">Standard Turnaround SLA:</span>
              <span className="font-mono text-white font-semibold">
                {selectedService.turnaround}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="btn-silver flex-1 py-3.5 sm:py-3 text-xs tracking-[0.18em] uppercase font-serif w-full"
              >
                Request via WhatsApp
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
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#090F1C] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
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
                  Inquiry Dispatched
                </h3>
                <p className="text-xs text-[#A0ABBA] leading-relaxed max-w-sm mx-auto">
                  Thank you, {clientForm.fullName || 'Client'}. Your application for the SIGNATURE tier has been transmitted to our Private Client Desk. A Senior Director will respond within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setApplicationOpen(false);
                    setFormSubmitted(false);
                  }}
                  className="btn-silver px-6 py-2.5 text-xs tracking-[0.2em] font-serif uppercase mt-4"
                >
                  Return to Details
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
                    Confidential Admission
                  </span>
                  <h3 className="text-2xl font-serif text-white font-medium mt-1">
                    Signature Tier Application
                  </h3>
                  <p className="text-xs text-[#A0ABBA] font-light mt-1">
                    Role: Personal Luxury Concierge
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
                      placeholder="e.g. Lord Alexander Bennett"
                      value={clientForm.fullName}
                      onChange={(e) => setClientForm({ ...clientForm, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      WhatsApp / Mobile Contact
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
                      placeholder="principal@familyoffice.com"
                      value={clientForm.email}
                      onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
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
                      className="w-full bg-[#0D1526] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="WhatsApp">Priority WhatsApp Channel</option>
                      <option value="Direct Call">Direct Private Telephone Line</option>
                      <option value="Encrypted Email">Encrypted Email Communication</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#CBD5E1] mb-1">
                      Initial Directives or Specific Requests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify immediate chauffeur, villa viewing, dining, or travel requirements..."
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
                      {isSubmitting ? 'Transmitting...' : 'Submit Confidential Application'}
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