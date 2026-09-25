import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  Check,
  Lock,
  UserCheck,
  FileCheck,
  Building,
  Key,
  CreditCard,
  Scale,
  Clock,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { ScrollReveal } from './ScrollReveal';

interface AdmissionsPageProps {
  onBackToHome: () => void;
  onInitiateInquiry: () => void;
}

interface VettingStep {
  stepNumber: string;
  stageName: string;
  duration: string;
  title: string;
  description: string;
  auditItems: string[];
  securityNote: string;
}

const VETTING_STEPS: VettingStep[] = [
  {
    stepNumber: '01',
    stageName: 'PETITION & SPONSOR ENDORSEMENT',
    duration: 'Day 1–3',
    title: 'Confidential Petition Submission & Patron Introduction',
    description:
      'The admissions cycle begins with a direct confidential petition submitted either through the principal’s family office, trusted legal counsel, or via formal sponsor introduction from an existing Prestige or Imperial patron. Endorsed petitions receive expedited committee prioritization.',
    auditItems: [
      'Encrypted PGP submission of candidate credentials',
      'Verification of sponsor patron in good standing (if applicable)',
      'Initial jurisdiction and regulatory compliance pre-screening',
    ],
    securityNote:
      'All preliminary intake documents are stored on air-gapped, zero-knowledge encrypted local storage.',
  },
  {
    stepNumber: '02',
    stageName: 'SOVEREIGN DUE DILIGENCE & AML AUDIT',
    duration: 'Day 4–8',
    title: 'Forensic Background Vetting & Source of Wealth (SoW)',
    description:
      'In coordination with international risk intelligence firms and former federal compliance attorneys, an exhaustive forensic due diligence audit is conducted. This includes verification of legitimate source of funds, anti-money laundering (AML) clearances, and global sanctions checks.',
    auditItems: [
      'Exhaustive cross-referencing against OFAC, EU, UN, and FATF databases',
      'Politically Exposed Persons (PEP) risk profiling & commercial standing',
      'Third-party institutional source of funds validation',
      'Zero-tolerance policy on unresolved criminal or regulatory infractions',
    ],
    securityNote:
      'Audits are performed with total privacy without leaving public commercial search traces.',
  },
  {
    stepNumber: '03',
    stageName: 'SECURITY & OPERATIONAL BLUEPRINT',
    duration: 'Day 9–12',
    title: 'Operational Assessment & Liaison Matching',
    description:
      'Our Director of Global Operations meets directly with the principal’s Chief of Staff or Executive Assistant to map the family’s operational flight radius, maritime preferences, estate security requirements, and confidential travel patterns to architect custom liaison assignments.',
    auditItems: [
      'Flight frequency, private aviation fleet sizing, and preferred FBO terminals',
      'Executive close-protection and aeromedical evacuation readiness plan',
      'Assignment of dedicated Senior Concierge with specialized language and regional mastery',
    ],
    securityNote:
      'Principal security briefs are partitioned into compartmented access cells.',
  },
  {
    stepNumber: '04',
    stageName: 'GOVERNANCE BOARD & BILATERAL NDA',
    duration: 'Day 13–15',
    title: 'Managing Partner Interview & Ironclad NDA Ratification',
    description:
      'A private bilateral consultation is conducted between the applicant and our Managing Partner. Upon mutual agreement, both parties ratify our perpetual bilateral Non-Disclosure Charter, legally securing the principal’s identity and operational details under Swiss and DIFC civil confidentiality laws.',
    auditItems: [
      'Managing Partner confidential video or in-person briefing',
      'Execution of irrevocable bilateral Non-Disclosure Agreement',
      'Establishment of dual-key digital custody protocol for confidential communications',
    ],
    securityNote:
      'Our Non-Disclosure Charter carries perpetual survival clauses independent of membership status.',
  },
  {
    stepNumber: '05',
    stageName: 'OBSIDIAN KEYCARD ISSUANCE',
    duration: 'Day 16',
    title: 'Physical Keycard Commission & 24/7 Desk Activation',
    description:
      'Upon final committee ratification, the principal is formally inducted into the cohort. A handcrafted obsidian and laser-engraved titanium membership keycard is couriered via armed secure dispatch. The dedicated 24/7 liaison desk is permanently synchronized.',
    auditItems: [
      'Courier delivery of numbered obsidian and titanium keycard',
      'Setup of encrypted direct dispatch hotline (Signal / Priority WhatsApp / Voice)',
      'Provisioning of biometric credentials for the Secure Member Portal',
    ],
    securityNote:
      'Physical keycards contain an encrypted NFC security chip programmed exclusively for the principal.',
  },
];

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  onBackToHome,
  onInitiateInquiry,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="pt-28 pb-32 relative text-[#C0C0C0]">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.07),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Navigation Breadcrumb & Back Action */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] text-[#A0ABBA] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C0C0C0]" />
            <span>Return to Global Overview</span>
          </button>

          <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-[#7C889E]">
            <span className="w-2 h-2 rounded-full bg-white/70 animate-ping" />
            <span>ADMISSIONS CYCLE: 2026 COHORT ACTIVE</span>
          </div>
        </div>

        {/* Hero Section Header */}
        <ScrollReveal distance={20}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/30 bg-white/[0.04] text-[10px] font-mono uppercase tracking-[0.28em] text-[#E2E8F0] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>STRICT INSTITUTIONAL VETTING STANDARDS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight font-normal mb-5">
              ADMISSIONS & <span className="silver-gradient-heading font-serif">VETTING</span>
            </h1>

            <p className="text-sm sm:text-base text-[#A0ABBA] font-light leading-relaxed max-w-2xl mx-auto mb-8">
              To protect the operational integrity and peer sanctity of our community, admission to Luxury Lounge is subject to rigorous background vetting, reputational audit, and liquid net worth criteria.
            </p>

            {/* Quota & Intake Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md">
              <div className="text-center border-r border-white/10 last:border-r-0">
                <div className="text-2xl sm:text-3xl font-serif text-white font-medium">50 Patrons</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E9AAE] mt-1">
                  Global Annual Cap
                </div>
              </div>
              <div className="text-center border-r border-white/10 last:border-r-0">
                <div className="text-2xl sm:text-3xl font-serif text-white font-medium">8.4%</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E9AAE] mt-1">
                  Admissions Acceptance
                </div>
              </div>
              <div className="text-center border-r border-white/10 last:border-r-0">
                <div className="text-2xl sm:text-3xl font-serif text-white font-medium">$25M+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E9AAE] mt-1">
                  Liquid Net Worth Min.
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-serif text-white font-medium">15 Days</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E9AAE] mt-1">
                  Average Audit Window
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Two-Column Section: Vertical Timeline & Financial Criteria */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Numbered Step Vertical Timeline (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="pb-3 border-b border-white/10 mb-6 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-white">
                5-Stage Vetting Protocol
              </span>
              <span className="text-[10px] font-mono uppercase text-[#738096]">
                Strict Chronological Progression
              </span>
            </div>

            <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-[1px] before:bg-gradient-to-b before:from-white/60 before:via-white/20 before:to-transparent">
              {VETTING_STEPS.map((step, idx) => (
                <ScrollReveal key={step.stepNumber} delayMs={idx * 60} distance={20}>
                  <div
                    onClick={() => setActiveStep(idx)}
                    className={`relative rounded-2xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer ${
                      activeStep === idx
                        ? 'bg-gradient-to-br from-white/[0.1] via-[#0E1628]/95 to-[#060B16] border-white/60 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.08)]'
                        : 'bg-white/[0.02] border-white/15 hover:border-white/35 hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Node Dot on Timeline */}
                    <div
                      className={`absolute -left-6 sm:-left-10 top-7 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold transition-all -translate-x-1/2 ${
                        activeStep === idx
                          ? 'border-white bg-white text-[#050A15] shadow-[0_0_12px_rgba(255,255,255,0.8)] scale-110'
                          : 'border-white/40 bg-[#050A15] text-white'
                      }`}
                    >
                      {step.stepNumber}
                    </div>

                    {/* Step Stage Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
                        {step.stageName}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-[#E2E8F0]">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif text-white font-medium mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Audit Checklist Items */}
                    <div className="space-y-2 pt-3 border-t border-white/10 mb-4">
                      {step.auditItems.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                          <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Security Note */}
                    <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-center gap-2.5 text-[11px] font-mono text-[#8E9AAE]">
                      <Lock className="w-3 h-3 text-white/60 shrink-0" />
                      <span>{step.securityNote}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column: Financial Prerequisite Matrix & Charter (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal distance={20}>
              <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-white/[0.08] via-[#0E1628]/90 to-[#060A14] border border-white/25 shadow-[0_20px_45px_rgba(0,0,0,0.8)] sticky top-28">
                <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1] mb-3">
                  <Scale className="w-3.5 h-3.5 text-white" />
                  <span>MANDATORY PREREQUISITES</span>
                </div>

                <h3 className="text-xl font-serif text-white font-medium mb-4">
                  Financial & Sovereign Criteria
                </h3>

                <p className="text-xs text-[#A0ABBA] leading-relaxed mb-6 font-light">
                  Candidates must demonstrate compliance with the following foundational thresholds prior to formal committee audit.
                </p>

                {/* Criteria Items */}
                <div className="space-y-4 mb-6 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-[#738096] block mb-1">
                      1. Verified Liquid Capital
                    </span>
                    <span className="text-white font-medium block text-sm">
                      $25M USD Minimum Benchmark
                    </span>
                    <span className="text-[11px] text-[#8E9AAE] mt-0.5 block">
                      Must be substantiated via institutional bank reference or family office custody letter.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-[#738096] block mb-1">
                      2. Clean Regulatory Ledger
                    </span>
                    <span className="text-white font-medium block text-sm">
                      Zero Sanctions & Clean AML
                    </span>
                    <span className="text-[11px] text-[#8E9AAE] mt-0.5 block">
                      No unresolved investigations under FATF, Interpol, FINMA, SEC, or equivalent sovereign regulators.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-[#738096] block mb-1">
                      3. Sovereign Code of Conduct
                    </span>
                    <span className="text-white font-medium block text-sm">
                      Mutual Peer Sanctity
                    </span>
                    <span className="text-[11px] text-[#8E9AAE] mt-0.5 block">
                      Patrons commit to absolute confidentiality regarding fellow members, private pavilions, and shared air assets.
                    </span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2">
                  <MagneticButton
                    onClick={onInitiateInquiry}
                    strength={0.35}
                    className="btn-silver w-full py-3 text-center text-xs tracking-[0.2em]"
                  >
                    Initiate Admission Petition
                  </MagneticButton>
                  <p className="text-[10px] font-mono text-center text-[#6C778B] mt-2.5">
                    Average committee review window: 15 business days
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Sponsor Referral Callout */}
            <ScrollReveal delayMs={100} distance={20}>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/15 text-xs text-[#A0ABBA]">
                <div className="flex items-center gap-2 text-white font-medium mb-1 font-serif">
                  <UserCheck className="w-4 h-4 text-white" />
                  <span>Existing Member Endorsement?</span>
                </div>
                <p className="text-[11px] text-[#8E9AAE] leading-relaxed">
                  If an existing Imperial or Prestige patron is endorsing your petition, provide their member reference keycard code during intake to accelerate Stage 01.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Admissions FAQ Box */}
        <ScrollReveal distance={20} className="mt-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/15">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1]">
                ADMISSIONS DISCLOSURES
              </span>
              <h3 className="text-2xl font-serif text-white mt-1">Frequently Addressed Questions</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#A0ABBA]">
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <h4 className="text-sm font-serif text-white mb-2">Can my corporate family office apply on my behalf?</h4>
                <p className="leading-relaxed">
                  Yes. Over 65% of admissions petitions are submitted by a principal’s Chief of Staff, General Counsel, or Multi-Family Office managing trustee.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <h4 className="text-sm font-serif text-white mb-2">What occurs if the 50-patron cohort cap is reached?</h4>
                <p className="leading-relaxed">
                  Subsequent qualified candidates are placed on our confidential Gated Standby Roster and granted priority accession upon the next calendar quarter opening.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <h4 className="text-sm font-serif text-white mb-2">Is the vetting fee refundable if a petition is declined?</h4>
                <p className="leading-relaxed">
                  There is zero upfront fee to submit a petition. Due diligence costs are absorbed directly by Luxury Lounge as part of our governance stewardship.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <h4 className="text-sm font-serif text-white mb-2">Are non-disclosure agreements bilateral?</h4>
                <p className="leading-relaxed">
                  Yes. Our NDA is strictly bilateral, legally binding Luxury Lounge and all associated handling partners to perpetual confidentiality regarding your family identity.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
