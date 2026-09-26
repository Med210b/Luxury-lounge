import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { LuxuryPhilosophy } from './components/LuxuryPhilosophy';
import { BespokeServices } from './components/BespokeServices';
import { InteractiveGlobe } from './components/InteractiveGlobe';
import { ClientExperiences } from './components/ClientExperiences';
import { Memberships } from './components/Memberships';
import { LuxuryFaq } from './components/LuxuryFaq';
import { ContactSection } from './components/ContactSection';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import { SignatureTierPage } from './components/SignatureTierPage';
import { PrestigeTierPage } from './components/PrestigeTierPage';
import { ImperialTierPage } from './components/ImperialTierPage';
import { VaultPage } from './components/VaultPage';
import { AdmissionsPage } from './components/AdmissionsPage';
import { MemberPortalPage } from './components/MemberPortalPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SectionReveal } from './components/SectionReveal';

export default function App() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<
    'home' | 'signature' | 'prestige' | 'imperial' | 'vault' | 'admissions' | 'portal'
  >('home');

  const safeOpenWhatsApp = (message: string) => {
    const link = document.createElement('a');
    link.href = `https://wa.me/971585783038?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTopInstant = () => {
    document.documentElement.classList.remove('scroll-smooth');
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.classList.add('scroll-smooth');
    }, 60);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#signature' || hash === '#signature-tier') {
        scrollToTopInstant();
        setCurrentView('signature');
      } else if (hash === '#prestige' || hash === '#prestige-tier') {
        scrollToTopInstant();
        setCurrentView('prestige');
      } else if (hash === '#imperial' || hash === '#imperial-tier') {
        scrollToTopInstant();
        setCurrentView('imperial');
      } else if (hash === '#vault' || hash === '#case-studies') {
        scrollToTopInstant();
        setCurrentView('vault');
      } else if (hash === '#admissions' || hash === '#vetting') {
        scrollToTopInstant();
        setCurrentView('admissions');
      } else if (hash === '#portal' || hash === '#member-portal' || hash === '#login') {
        scrollToTopInstant();
        setCurrentView('portal');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Whenever returning to home view, refresh ScrollTrigger to ensure GSAP horizontal scroll is accurate
  useEffect(() => {
    if (currentView === 'home') {
      const timer = setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch {
          // Safe ignore if GSAP context is initializing
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    scrollToTopInstant();
    const upper = tierName.toUpperCase();
    if (upper === 'SIGNATURE') {
      window.location.hash = '#signature';
      setCurrentView('signature');
    } else if (upper === 'PRESTIGE') {
      window.location.hash = '#prestige';
      setCurrentView('prestige');
    } else if (upper === 'IMPERIAL') {
      window.location.hash = '#imperial';
      setCurrentView('imperial');
    }
  };

  const handleBackToOverview = () => {
    handleNavigate('#memberships');
  };

  const handleNavigate = (target: string) => {
    const normalized = target.toLowerCase();

    // 1. Membership Tier Dossier Pages
    if (normalized === '#signature' || normalized === 'signature' || normalized === '#signature-tier') {
      handleSelectTier('SIGNATURE');
      return;
    }
    if (normalized === '#prestige' || normalized === 'prestige' || normalized === '#prestige-tier') {
      handleSelectTier('PRESTIGE');
      return;
    }
    if (normalized === '#imperial' || normalized === 'imperial' || normalized === '#imperial-tier') {
      handleSelectTier('IMPERIAL');
      return;
    }

    // 2. Specialized Multi-View Pages
    if (normalized === '#vault' || normalized === '#case-studies') {
      scrollToTopInstant();
      window.location.hash = '#vault';
      setCurrentView('vault');
      return;
    }
    if (normalized === '#admissions' || normalized === '#vetting') {
      scrollToTopInstant();
      window.location.hash = '#admissions';
      setCurrentView('admissions');
      return;
    }
    if (normalized === '#portal' || normalized === '#member-portal' || normalized === '#login') {
      scrollToTopInstant();
      window.location.hash = '#portal';
      setCurrentView('portal');
      return;
    }

    // 3. Specific Service Protocols (#service-protocol-1 through 6)
    const protocolMatch = normalized.match(/#service(?:s)?-protocol-(\d+)/) || normalized.match(/#protocol-0?(\d+)/);
    if (protocolMatch) {
      const protocolIdx = Math.max(0, Math.min(5, parseInt(protocolMatch[1], 10) - 1));
      if (currentView !== 'home') {
        setCurrentView('home');
        window.location.hash = target;
        setTimeout(() => {
          try {
            ScrollTrigger.refresh();
          } catch {}
          window.dispatchEvent(new CustomEvent('jumpToServiceProtocol', { detail: { index: protocolIdx } }));
        }, 160);
      } else {
        window.location.hash = target;
        window.dispatchEvent(new CustomEvent('jumpToServiceProtocol', { detail: { index: protocolIdx } }));
      }
      return;
    }

    // 4. Main Services Section (Protocol 01)
    if (normalized === '#services' || normalized === 'services') {
      if (currentView !== 'home') {
        setCurrentView('home');
        window.location.hash = '#services';
        setTimeout(() => {
          try {
            ScrollTrigger.refresh();
          } catch {}
          window.dispatchEvent(new CustomEvent('jumpToServiceProtocol', { detail: { index: 0 } }));
        }, 160);
      } else {
        window.location.hash = '#services';
        window.dispatchEvent(new CustomEvent('jumpToServiceProtocol', { detail: { index: 0 } }));
      }
      return;
    }

    // 5. Home top
    if (normalized === '#home' || normalized === 'home') {
      if (currentView !== 'home') {
        setCurrentView('home');
      }
      window.location.hash = '#home';
      scrollToTopInstant();
      return;
    }

    // 6. General Section on Home Page (#about, #philosophy, #experiences, #memberships, #faq, #contact)
    const targetId = normalized.replace('#', '');
    const doScrollToElement = () => {
      const elem = document.getElementById(targetId);
      if (elem) {
        const navHeight = 80;
        const rect = elem.getBoundingClientRect();
        const targetY = rect.top + window.pageYOffset - navHeight;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    };

    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = target;
      setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch {}
        doScrollToElement();
      }, 160);
    } else {
      window.location.hash = target;
      doScrollToElement();
    }
  };

  const handleNavigateHome = (targetHash?: string) => {
    handleNavigate(targetHash || '#home');
  };

  return (
    <div className="min-h-screen bg-[#050A15] text-[#C0C0C0] relative selection:bg-[#E0E0E0] selection:text-[#050A15]">
      {/* Soft Floating Starlight Particle Canvas Background */}
      <ParticleBackground />

      {/* Sticky & Transparent Navigation Bar */}
      <Navbar onNavigate={handleNavigate} onNavigateHome={handleNavigateHome} />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Tier Dossier Views: rendered conditionally with ErrorBoundaries */}
        {currentView === 'signature' && (
          <ErrorBoundary>
            <SignatureTierPage
              onBackToOverview={handleBackToOverview}
              onSwitchTier={handleSelectTier}
              onInitiateInquiry={(tier) => {
                setSelectedTier(tier);
                safeOpenWhatsApp(`Hello Luxury Lounge Private Desk, I would like to inquire about activating the ${tier} Membership Tier.`);
              }}
            />
          </ErrorBoundary>
        )}

        {currentView === 'prestige' && (
          <ErrorBoundary>
            <PrestigeTierPage
              onBackToOverview={handleBackToOverview}
              onSwitchTier={handleSelectTier}
              onInitiateInquiry={(tier) => {
                setSelectedTier(tier);
                safeOpenWhatsApp(`Hello Luxury Lounge Private Desk, I would like to inquire about activating the ${tier} Membership Tier.`);
              }}
            />
          </ErrorBoundary>
        )}

        {currentView === 'imperial' && (
          <ErrorBoundary>
            <ImperialTierPage
              onBackToOverview={handleBackToOverview}
              onSwitchTier={handleSelectTier}
              onInitiateInquiry={(tier) => {
                setSelectedTier(tier);
                safeOpenWhatsApp(`Hello Luxury Lounge Private Desk, I would like to inquire about activating the ${tier} Membership Tier.`);
              }}
            />
          </ErrorBoundary>
        )}

        {/* Specialized Pages: Vault, Admissions & Member Portal */}
        {currentView === 'vault' && (
          <ErrorBoundary>
            <VaultPage
              onBackToHome={() => handleNavigateHome('#home')}
              onInitiateInquiry={() => {
                safeOpenWhatsApp('Hello Luxury Lounge Private Desk, I would like to inquire about the restricted Operations Vault case studies.');
              }}
            />
          </ErrorBoundary>
        )}

        {currentView === 'admissions' && (
          <ErrorBoundary>
            <AdmissionsPage
              onBackToHome={() => handleNavigateHome('#memberships')}
              onInitiateInquiry={() => {
                safeOpenWhatsApp('Hello Luxury Lounge Private Desk, I would like to petition for confidential Admissions and Patron Vetting.');
              }}
            />
          </ErrorBoundary>
        )}

        {currentView === 'portal' && (
          <ErrorBoundary>
            <MemberPortalPage
              onBackToHome={() => handleNavigateHome('#home')}
            />
          </ErrorBoundary>
        )}

        {/* Home Sections: preserved in DOM so GSAP pinned nodes & animations are not disrupted */}
        <div style={{ display: currentView === 'home' ? 'block' : 'none' }}>
          {/* Hero Section */}
          <Hero />

          {/* About Us Section */}
          <SectionReveal yOffset={32}>
            <AboutUs />
          </SectionReveal>

          {/* Luxury Philosophy Section (Coco Chanel Heritage) */}
          <SectionReveal yOffset={32}>
            <LuxuryPhilosophy />
          </SectionReveal>

          {/* Bespoke Services (Vertical-to-Horizontal Pinned Scroll) */}
          <BespokeServices />

          {/* Destination 3D Maps Section (Interactive Globe) */}
          <SectionReveal yOffset={32}>
            <InteractiveGlobe />
          </SectionReveal>

          {/* Client Experiences (High-End Testimonials Carousel) */}
          <SectionReveal yOffset={32}>
            <ClientExperiences />
          </SectionReveal>

          {/* Membership (SIGNATURE, PRESTIGE, IMPERIAL) */}
          <SectionReveal yOffset={32}>
            <Memberships onSelectTier={handleSelectTier} />
          </SectionReveal>

          {/* Luxury Frequently Asked Questions (FAQ) */}
          <SectionReveal yOffset={32}>
            <LuxuryFaq />
          </SectionReveal>

          {/* Contact Section & Confidential Booking Desk */}
          <SectionReveal yOffset={32}>
            <ContactSection initialTier={selectedTier} />
          </SectionReveal>
        </div>
      </main>

      {/* Minimalist Silver Back to Top Button */}
      <BackToTop />

      {/* Luxury Footer */}
      <SectionReveal yOffset={24} amount={0.06}>
        <Footer />
      </SectionReveal>
    </div>
  );
}