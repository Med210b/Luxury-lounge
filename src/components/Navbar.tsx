import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Sparkles, Plane, Anchor, Shield, Globe2, Compass, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  onNavigateHome?: (targetHash?: string) => void;
  onNavigate?: (target: string) => void;
}

interface NavSubItem {
  name: string;
  href: string;
  tag?: string;
  icon?: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: NavSubItem[];
}

const NAV_ITEMS: NavItem[] = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT US', href: '#about' },
  {
    name: 'SERVICES',
    href: '#services',
    hasDropdown: true,
    subItems: [
      { name: 'Private Aviation Dispatch', href: '#service-protocol-1', tag: 'Protocol 01', icon: <Plane className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Superyacht Charter & Maritime', href: '#service-protocol-2', tag: 'Protocol 02', icon: <Anchor className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Jet Cabin Sanctuary', href: '#service-protocol-3', tag: 'Protocol 03', icon: <Compass className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Marine Leisure & Residences', href: '#service-protocol-4', tag: 'Protocol 04', icon: <Globe2 className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Executive Aviation Logistics', href: '#service-protocol-5', tag: 'Protocol 05', icon: <Plane className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'VIP Cabin Suite & Gastronomy', href: '#service-protocol-6', tag: 'Protocol 06', icon: <Sparkles className="w-3.5 h-3.5 text-white/80" /> },
    ],
  },
  { name: 'DESTINATIONS', href: '#destinations' },
  { name: 'EXPERIENCES', href: '#experiences' },
  {
    name: 'MEMBERSHIPS',
    href: '#memberships',
    hasDropdown: true,
    subItems: [
      { name: 'Signature Tier', href: '#signature', tag: 'Executive Access', icon: <Shield className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Prestige Tier', href: '#prestige', tag: 'Maritime & Helipad', icon: <Shield className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Imperial Tier', href: '#imperial', tag: 'Sovereign Diplomatic', icon: <Shield className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Admissions & Vetting', href: '#admissions', tag: 'Admissions', icon: <Shield className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Operations Vault', href: '#vault', tag: 'Case Studies', icon: <Sparkles className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Patron Portal', href: '#portal', tag: 'Encrypted', icon: <Shield className="w-3.5 h-3.5 text-white/80" /> },
      { name: 'Compare All Protocols', href: '#memberships', tag: 'Dossier', icon: <Sparkles className="w-3.5 h-3.5 text-white/80" /> },
    ],
  },
  { name: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);

    if (onNavigate) {
      onNavigate(href);
      return;
    }

    if (href === '#signature' || href === '#prestige' || href === '#imperial') {
      window.location.hash = href;
      return;
    }

    if (onNavigateHome) {
      onNavigateHome(href);
    } else if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        const navHeight = 80;
        const rect = elem.getBoundingClientRect();
        const targetY = rect.top + window.pageYOffset - navHeight;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }
  };

  const toggleMobileDropdown = (menuName: string) => {
    setExpandedMobileMenu(expandedMobileMenu === menuName ? null : menuName);
  };

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const totalScrollableHeight = doc.scrollHeight - doc.clientHeight;
      if (totalScrollableHeight > 0) {
        const currentProgress = (window.scrollY / totalScrollableHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setScrollProgress(0);
      }
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K or Escape for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Search filter candidates
  const SEARCH_ITEMS = [
    { label: 'Private Aviation Dispatch (Heavy Jets)', href: '#service-protocol-1', category: 'Services' },
    { label: 'Superyacht Charter & Maritime Port Hercule', href: '#service-protocol-2', category: 'Services' },
    { label: 'Jet Cabin Sanctuary & Stateroom', href: '#service-protocol-3', category: 'Services' },
    { label: 'Marine Leisure & Island Residences', href: '#service-protocol-4', category: 'Services' },
    { label: 'Executive Aviation Logistics & Overflight', href: '#service-protocol-5', category: 'Services' },
    { label: 'VIP Cabin Suite & Michelin Gastronomy', href: '#service-protocol-6', category: 'Services' },
    { label: 'Destination 3D Maps & Sovereign Flight Corridors', href: '#destinations', category: 'Destinations' },
    { label: 'Explore Global Possibilities & 3D Interactive Globe', href: '#destinations', category: 'Destinations' },
    { label: 'Dubai Epicenter & Jetex VIP Terminal (DWC)', href: '#destinations', category: 'Destinations' },
    { label: 'Signature Tier Membership', href: '#signature', category: 'Membership' },
    { label: 'Prestige Tier Membership', href: '#prestige', category: 'Membership' },
    { label: 'Imperial Tier Sovereign Membership', href: '#imperial', category: 'Membership' },
    { label: 'Admissions & Patron Vetting Protocol', href: '#admissions', category: 'Admissions' },
    { label: 'Case Studies & Operations Vault', href: '#vault', category: 'Vault' },
    { label: 'Encrypted Patron Portal & Dispatch Desk', href: '#portal', category: 'Portal' },
    { label: 'Client Testimonials & Google Reviews', href: '#experiences', category: 'Dispatches' },
    { label: 'About Us • The Private Client Office & Heritage', href: '#about', category: 'Heritage' },
    { label: 'House Philosophy & Gabrielle Chanel Heritage', href: '#philosophy', category: 'Heritage' },
    { label: 'Frequently Asked Questions (FAQ)', href: '#faq', category: 'Advisory' },
    { label: 'Private Client Desk & Booking Contact Form', href: '#contact', category: 'Contact' },
  ];

  const filteredSearch = SEARCH_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hairline Scroll Progress Bar */}
      <div
        id="scroll-progress-container"
        className="fixed top-0 left-0 right-0 h-[2px] w-full z-[100] pointer-events-none bg-transparent"
      >
        <div
          id="scroll-progress-bar"
          className="h-full bg-gradient-to-r from-[#9E9E9E] via-[#FFFFFF] to-[#C0C0C0] shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Sticky/Fixed Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#050A15]/85 backdrop-blur-xl border-b border-[rgba(192,192,192,0.14)] py-3 lg:py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
            : 'bg-transparent py-4 border-b border-[rgba(192,192,192,0.06)]'
        }`}
      >
        {/* Flexbox Layout: Logo far left, Nav links center, Actions far right */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* 1. FAR LEFT: Strictly Retained Brand Logo */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#home');
              }}
              className="flex items-center shrink-0 group cursor-pointer z-50 relative"
              aria-label="Luxury Lounge Home"
            >
              <img
                src="https://res.cloudinary.com/swcgor0l/image/upload/v1790089140/dad1d938-dba2-4299-8e56-830655f5f41ejjjjjjjjjjjj_pv6vmo.png"
                alt="Luxury Lounge Logo"
                className="h-[36px] sm:h-[40px] lg:h-[44px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ maxHeight: '44px' }}
              />
            </a>
          </div>

          {/* 2. CENTER: Clean Nav Links (Desktop Only) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                className="relative py-2 group"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#9AA3B5] hover:text-[#FFFFFF] transition-colors duration-300 ease-out cursor-pointer relative py-1"
                >
                  <span>{item.name}</span>

                  {/* Dropdown Arrow */}
                  {item.hasDropdown && (
                    <ChevronDown className="w-3 h-3 text-[#7E889B] group-hover:text-white transition-all duration-300 group-hover:rotate-180 shrink-0" />
                  )}
                </a>

                {/* Desktop Dropdown Sub-menu Panel */}
                {item.hasDropdown && item.subItems && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-200 z-50 ${
                      activeDropdown === item.name
                        ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                        : 'opacity-0 translate-y-2 invisible pointer-events-none'
                    }`}
                  >
                    <div className="rounded-2xl border border-white/15 bg-[#0A101D]/95 backdrop-blur-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.04)]">
                      <div className="space-y-1">
                        {item.subItems.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(sub.href);
                            }}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.08] transition-all group/item text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-white/30 transition-colors">
                                {sub.icon}
                              </div>
                              <div>
                                <div className="text-[11px] font-sans text-white/90 group-hover/item:text-white font-medium tracking-wide">
                                  {sub.name}
                                </div>
                                {sub.tag && (
                                  <div className="text-[9px] font-mono text-[#7E889B] group-hover/item:text-[#A0A7B8]">
                                    {sub.tag}
                                  </div>
                                )}
                              </div>
                            </div>
                            <span className="text-[10px] text-white/30 group-hover/item:text-white group-hover/item:translate-x-0.5 transition-all">
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 3. FAR RIGHT: Utilities & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Switcher (Hidden on Mobile, moved to drawer) */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open global search"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#A0A7B8] hover:text-white border border-transparent hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer relative z-50"
            >
              <Search className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
            </button>

            {/* Pill-Shaped WhatsApp Button (Desktop Only) */}
            <a
              href="https://wa.me/971585783038?text=Hello%20Luxury%20Lounge%20Private%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex group relative items-center gap-2.5 px-5 py-2 rounded-full border border-white/25 hover:border-white bg-[#0E1422]/90 hover:bg-white text-[#E2E8F0] hover:text-[#050A15] shadow-[0_2px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_rgba(255,255,255,0.65)] transition-all duration-300 ease-out hover:scale-105 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-[#25D366] transition-transform duration-300 group-hover:scale-110 shrink-0" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.41 0-2.8-.36-4.02-1.05l-.29-.16-3.11.82.83-3.03-.19-.31a8.21 8.21 0 01-1.26-4.43c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
              </svg>
              <span className="text-[13px] font-sans font-semibold text-[#E2E8F0] group-hover:text-[#050A15] transition-colors lowercase tracking-normal">
                message us
              </span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 text-white hover:text-gray-300 transition-colors z-50 relative"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ==============================================================================
          FULL SCREEN MOBILE MENU (Fixes overcrowding by using a separate drawer)
          ============================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[40] bg-[#050A15] lg:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Nav Links Stack */}
            <nav className="flex-1 flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="border-b border-white/10">
                  {item.hasDropdown ? (
                    // Toggleable Category for Mobile
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between py-4 text-left font-sans text-sm tracking-[0.2em] uppercase text-white cursor-pointer"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-white/50 transition-transform duration-300 ${
                          expandedMobileMenu === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    // Standard Link for Mobile
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.href);
                      }}
                      className="block py-4 font-sans text-sm tracking-[0.2em] uppercase text-white cursor-pointer"
                    >
                      {item.name}
                    </a>
                  )}

                  {/* Mobile Sub-menu Accordion */}
                  {item.hasDropdown && item.subItems && (
                    <AnimatePresence>
                      {expandedMobileMenu === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 pl-4 flex flex-col space-y-3 border-l border-white/10 ml-2">
                            {item.subItems.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLinkClick(sub.href);
                                }}
                                className="text-xs text-[#9AA3B5] hover:text-white py-1 flex items-center justify-between transition-colors"
                              >
                                <span>{sub.name}</span>
                                {sub.tag && (
                                  <span className="text-[9px] font-mono text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                                    {sub.tag}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Bottom Actions Stack */}
            <div className="mt-8 space-y-4 pb-12">
              {/* WhatsApp Button Full Width */}
              <a
                href="https://wa.me/971585783038?text=Hello%20Luxury%20Lounge%20Private%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20services."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full border border-white/20 bg-white text-[#050A15] font-sans font-semibold text-sm transition-all"
              >
                <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.41 0-2.8-.36-4.02-1.05l-.29-.16-3.11.82.83-3.03-.19-.31a8.21 8.21 0 01-1.26-4.43c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                </svg>
                <span>MESSAGE US ON WHATSAPP</span>
              </a>

              {/* Language Settings inline for mobile */}
              <div className="pt-4 flex justify-center">
                <LanguageSwitcher variant="mobile-drawer" onLanguageSelected={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPOTLIGHT SEARCH MODAL (Triggered by Search Icon or Cmd+K) */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[120] flex items-start justify-center pt-24 px-4 sm:px-6 bg-black/80 backdrop-blur-md">
            <div
              className="absolute inset-0"
              onClick={() => setSearchOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-2xl bg-[#0D1322] border border-white/20 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Search className="w-5 h-5 text-white/60 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search aviation, yachts, memberships, cities..."
                  className="w-full bg-transparent text-white placeholder-white/40 text-sm font-sans focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-xs font-mono text-white/50 hover:text-white px-2 py-1 rounded border border-white/10 hover:border-white/30"
                >
                  ESC
                </button>
              </div>

              {/* Results List */}
              <div className="mt-3 max-h-72 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchOpen(false);
                        handleLinkClick(item.href);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.08] transition-colors cursor-pointer group"
                    >
                      <span className="text-xs text-white/90 group-hover:text-white font-medium">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-mono text-[#7E889B] uppercase px-2 py-0.5 rounded bg-white/5">
                        {item.category}
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-[#7E889B]">
                    No protocols found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};