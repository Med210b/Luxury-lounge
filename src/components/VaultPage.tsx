import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  ArrowLeft,
  FileText,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Plane,
  Anchor,
  Key,
  Globe2,
  Building,
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { ScrollReveal } from './ScrollReveal';

interface VaultPageProps {
  onBackToHome: () => void;
  onInitiateInquiry: () => void;
}

interface CaseStudyDossier {
  id: string;
  caseCode: string;
  category: 'aviation' | 'maritime' | 'specie' | 'extraction' | 'diplomatic';
  title: string;
  clearanceLevel: string;
  clientDescriptor: string;
  originDestination: string;
  transitDuration: string;
  jurisdiction: string;
  riskClass: string;
  objective: string;
  obstacle: string;
  executionFeat: {
    text: string;
    redactions: string[];
  };
  keyMetrics: { label: string; value: string }[];
  clientDebriefQuote: string;
  timestamp: string;
}

const DOSSIERS: CaseStudyDossier[] = [
  {
    id: 'case-088',
    caseCode: 'DOSSIER 088 // OPERATION ALPINE AIRLIFT',
    category: 'aviation',
    title: 'Severe Weather Blizzard Airside Extraction & Cross-Border Sovereign Relay',
    clearanceLevel: 'RESTRICTED // LEVEL 4',
    clientDescriptor: 'Principal Family Office // Principality of Monaco',
    originDestination: 'Gstaad Saanen (LSGK) → Zurich Kloten (LSZH) → Dubai Al Maktoum (OMDW)',
    transitDuration: '3 Hours 45 Minutes',
    jurisdiction: 'Swiss Federal Aviation Administration & UAE Airspace',
    riskClass: 'Category 3 Mountain Snowstorm',
    objective:
      'Immediate medical and security extraction of 6 family members and private documents from an isolated alpine residence during a Category 3 mountain squall with civilian airspace shutdown.',
    obstacle:
      'Gstaad runway iced over; standard charter operators grounded for 36 hours. Road passes blocked by avalanche warnings.',
    executionFeat: {
      text: 'Mobilized dual twin-engine Airbus H145 helicopters equipped with four-axis auto-hover and tactical de-icing. Secured emergency diplomatic tarmac clearance through private contacts at Swiss Federal Civil Protection. Direct helicopter touchdown on private helipad, transferring principals to an idling Dassault Falcon 8X at Zurich private apron with zero terminal dwell time and pre-cleared biometric passports.',
      redactions: ['Airbus H145', 'Dassault Falcon 8X', 'LSGK-LSZH', 'OMDW VIP Ramp 4'],
    },
    keyMetrics: [
      { label: 'Time from Call to Lift-Off', value: '42 Min' },
      { label: 'Airspace Clearance', value: 'Diplomatic Override' },
      { label: 'Security Detachment', value: 'Armed Swiss Federal Res.' },
      { label: 'Identity Exposure', value: '0.00%' },
    ],
    clientDebriefQuote:
      '"While other guests were stranded in the chalet for three days without power, Luxury Lounge had our entire family airborne above the clouds in under an hour. Impeccable discretion."',
    timestamp: 'JAN 2024 // ZURICH LOG',
  },
  {
    id: 'case-104',
    caseCode: 'DOSSIER 104 // CORRIDOR POSEIDON',
    category: 'maritime',
    title: 'Strait of Hormuz Tactical Superyacht Transit & Off-Grid Berth Orchestration',
    clearanceLevel: 'MARITIME SENSITIVE // COMPARTMENTED',
    clientDescriptor: 'Sovereign Wealth Executive // London & GCC',
    originDestination: 'Muscat, Oman → Arabian Sea Corridor → Dubai Harbor Private Island',
    transitDuration: '54 Hours Non-Stop',
    jurisdiction: 'International Waters & GCC Coast Guard Command',
    riskClass: 'Maritime High-Traffic & Geopolitical Chokepoint',
    objective:
      'Guaranteed safe passage and AIS stealth positioning for an 86-meter Lürssen yacht carrying high-profile principals and confidential institutional hard drives during regional marine tension.',
    obstacle:
      'Heightened insurance exclusion zone declarations and commercial shipping rerouting causing average delays of 5 days.',
    executionFeat: {
      text: 'Embedded four former Royal Navy Special Boat Service operators as civilian maritime advisors. Established redundant encrypted satellite communication linked directly to our 24/7 Operations Room. Pre-arranged priority offshore rendezvous with private maritime refueling vessels and coordinated direct customs clearance with Port Hercule / UAE Maritime Authorities to bypass commercial inspections.',
      redactions: ['Royal Navy SBS', '86-meter Lürssen', 'Inmarsat Military Band', 'Vessel ID: M/Y SILENT'],
    },
    keyMetrics: [
      { label: 'Voyage Schedule Adherence', value: '100% on SLA' },
      { label: 'Tactical Escort Crew', value: '4 SBS Specialists' },
      { label: 'Satellite Encryption', value: 'AES-256 Air-Gapped' },
      { label: 'Inspection Delay', value: '0 Minutes' },
    ],
    clientDebriefQuote:
      '"The operations room tracked every nautical mile in real time. We felt total serenity onboard while commercial traffic around us was paralyzed."',
    timestamp: 'MAR 2024 // DUBAI BERTH 01',
  },
  {
    id: 'case-117',
    caseCode: 'DOSSIER 117 // PROJECT CUSTODIA',
    category: 'specie',
    title: 'High-Value Specie & Art Basel Masterpiece Armored Freeport Transit',
    clearanceLevel: 'FREEPORT CLASS 1 // CUSTODIAL',
    clientDescriptor: 'European Dynasty Trust // Geneva & Zurich',
    originDestination: 'Messe Basel Exhibition → Geneva Free Port Armored Vault 4',
    transitDuration: '4 Hours 15 Minutes',
    jurisdiction: 'Swiss Federal Customs & Cantonal Police Escort',
    riskClass: 'Specie Valuation Exceeding €90,000,000',
    objective:
      'Discrete, climate-stabilized transport and biometrically sealed custodial vaulting of three museum-grade Renaissance oil paintings sold privately off-market at Art Basel.',
    obstacle:
      'Heavy international press presence outside exhibition hall and strict cantonal transport declarations requiring armed escort without attracting paparazzi notice.',
    executionFeat: {
      text: 'Utilized three identical unmarked armored Mercedes-Benz Sprinter vans with nitrogen-purged hermetic art crates. Two decoy routes dispatched simultaneously to Basel-Mulhouse Airport, while the primary specie transit traveled under unmarked diplomatic seal directly into the subterranean vehicle elevator of the Geneva Free Port. Dual-key biometric signature authenticated handover in presence of Swiss notary public.',
      redactions: ['€94,500,000 EUR', 'Geneva Free Port Vault 4', 'Mercedes-Benz Armored', 'Notary Dr. H. Von Redacted'],
    },
    keyMetrics: [
      { label: 'Specie Insured Valuation', value: '€94.5M EUR' },
      { label: 'Crate Temp Deviation', value: '< 0.2°C' },
      { label: 'Decoy Convoy Dispersal', value: '3 Outbound Units' },
      { label: 'Public Media Exposure', value: 'Zero Mentions' },
    ],
    clientDebriefQuote:
      '"A precision operation that rivals central bank bullion movements. The custody chain documentation was flawless down to the second."',
    timestamp: 'JUN 2024 // GENEVA VAULT',
  },
  {
    id: 'case-129',
    caseCode: 'DOSSIER 129 // PROTOCOL AEGIS',
    category: 'extraction',
    title: 'Remote Indian Ocean Private Atoll Pediatric ICU Aero-Medical Repatriation',
    clearanceLevel: 'MEDICAL TOP-TIER // CRITICAL',
    clientDescriptor: 'Sovereign Royal Family Member',
    originDestination: 'Baa Atoll, Maldives → Malé (VRMM) → Cleveland Clinic Abu Dhabi (OMAD)',
    transitDuration: '6 Hours 10 Minutes Total',
    jurisdiction: 'Maldivian Civil Aviation & UAE Health Authority',
    riskClass: 'High-Acuity Medical Instability at Remote Atoll',
    objective:
      'Emergency airlift of an 11-year-old child suffering from acute trauma on an unpaved private coral island during night conditions with monsoonal rain.',
    obstacle:
      'Standard Maldivian sea-plane fleet grounded after sunset. Nearest surgical ICU was 2,100 nautical miles away in Abu Dhabi.',
    executionFeat: {
      text: 'Dispatched amphibious military-specification Twin Otter from private standby charter in Malé equipped with NVG night-vision avionics. Simultaneously dispatched Bombardier Challenger 605 air ambulance from Dubai equipped with pediatric ECMO unit and two intensive-care specialists. Rendezvous achieved at Malé military apron with zero baggage transfer delays, executing direct tarmac bedside-to-bedside handover in Abu Dhabi.',
      redactions: ['Challenger 605 ICU', 'Baa Atoll Private Island', 'Callsign: MEDEVAC-ONE', 'Dr. K. Al-Redacted'],
    },
    keyMetrics: [
      { label: 'Aero-Medical Scramble Time', value: '38 Minutes' },
      { label: 'Night Sea-Plane Landing', value: 'NVG Certified Runway' },
      { label: 'In-Flight Life Support', value: 'Pediatric ICU / ECMO' },
      { label: 'Hospital Gate-to-Bed', value: '14 Minutes' },
    ],
    clientDebriefQuote:
      '"They literally moved heaven and earth in the middle of a night storm. The medical flight crew saved our daughter\'s life."',
    timestamp: 'AUG 2024 // ABU DHABI DESK',
  },
  {
    id: 'case-142',
    caseCode: 'DOSSIER 142 // VILLA SANITIZE',
    category: 'diplomatic',
    title: 'Lake Como Historic Palazzo Full Privatization & Counter-Surveillance Sanitization',
    clearanceLevel: 'DIPLOMATIC RESTRICTED // BILATERAL',
    clientDescriptor: 'G7 Head of Delegation & Multilateral Tech Envoy',
    originDestination: 'Lake Como, Lombardy, Italy',
    transitDuration: '72 Hours Autonomous Lockdown',
    jurisdiction: 'Italian Carabinieri & International Envoy Security Cell',
    riskClass: 'Eavesdropping Threat & Global Media Scrutiny',
    objective:
      'Complete private buyout and acoustic/electronic counter-surveillance sweep of a 16th-century heritage villa estate for confidential bilateral energy negotiations.',
    obstacle:
      'The estate was fully booked with 34 private European wedding guests and public ferry access passing within 80 meters of the waterfront terrace.',
    executionFeat: {
      text: 'Negotiated comprehensive compensation buyouts and luxury five-star relocation of all existing guests within 18 hours to Villa d\'Este. Deployed TSCM (Technical Surveillance Counter-Measures) team using non-linear junction detectors and RF spectrum analyzers, sterilizing 14 suites and the private wine cellar. Coordinated local maritime police exclusion perimeter of 250 meters across Lake Como waters.',
      redactions: ['Villa Pliniana Buyout', 'TSCM Sweep Unit 03', 'RF Jamming Array 4', 'Envoy Dr. Redacted'],
    },
    keyMetrics: [
      { label: 'Estate Buyout Clearance', value: '18 Hours' },
      { label: 'RF Surveillance Sweeps', value: '100% Sterile' },
      { label: 'Water Corridor Exclusion', value: '250m Radial Buffer' },
      { label: 'Information Leakage', value: 'Zero' },
    ],
    clientDebriefQuote:
      '"Unbelievable negotiation agility. To displace 34 guests courteously and sweep a historic 20,000 sq ft palazzo in less than a day is unprecedented in private diplomacy."',
    timestamp: 'SEP 2024 // COMO ESCORT',
  },
  {
    id: 'case-156',
    caseCode: 'DOSSIER 156 // TOKYO HORIZON',
    category: 'aviation',
    title: 'Sub-Minute Imperial Runway Slot Allocation & Armored Shinkansen Synchronization',
    clearanceLevel: 'LEVEL 5 STRATEGIC // TOKYO SECTOR',
    clientDescriptor: 'Fortune 5 Chief Executive & Sovereign Delegation',
    originDestination: 'Tokyo Haneda (RJTT) → Kyoto Gosho Private Estate via Bullet Train Special',
    transitDuration: '2 Hours 15 Minutes',
    jurisdiction: 'Japan Civil Aviation Bureau (JCAB) & JR Central Railways',
    riskClass: 'Extreme Schedule Density (Zero-Tolerance Protocol)',
    objective:
      'Deliver principal from touchdown at Haneda Airport to an off-record closed door cultural summit in Kyoto within 135 minutes during peak typhoon traffic.',
    obstacle:
      'Commercial flights between Tokyo and Osaka canceled; Shinkansen bullet train public departures completely sold out.',
    executionFeat: {
      text: 'Secured priority head-of-state runway slot at Haneda for Gulfstream G650ER with tarmac escort to waiting Toyota Century armored limousine. Private police motorcade bypassed expressway congestion via dedicated Olympic lanes. Boarded private-chartered Shinkansen carriage pre-cleared with Japanese security service, arriving in Kyoto with zero timetable drift.',
      redactions: ['Gulfstream G650ER', 'Haneda VIP Ramp 9', 'Toyota Century V12', 'JR Special Track 14'],
    },
    keyMetrics: [
      { label: 'Tarmac-to-Highway Time', value: '3 Minutes' },
      { label: 'Rail Carriage Privatization', value: '1st Class Car 10' },
      { label: 'Timetable Deviation', value: '+0.0 Seconds' },
      { label: 'Client Discretion', value: 'Total Gated Access' },
    ],
    clientDebriefQuote:
      '"Precision down to the second. In Japan, where timing is everything, Luxury Lounge proved they have relationships at the very pinnacle of government infrastructure."',
    timestamp: 'NOV 2024 // TOKYO SECTOR',
  },
];

export const VaultPage: React.FC<VaultPageProps> = ({ onBackToHome, onInitiateInquiry }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [allDeclassified, setAllDeclassified] = useState<boolean>(false);
  const [individuallyRevealed, setIndividuallyRevealed] = useState<Record<string, boolean>>({});

  const filteredDossiers =
    selectedFilter === 'all'
      ? DOSSIERS
      : DOSSIERS.filter((d) => d.category === selectedFilter);

  const toggleIndividual = (key: string) => {
    setIndividuallyRevealed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isRevealed = (dossierId: string, index: number) => {
    if (allDeclassified) return true;
    return !!individuallyRevealed[`${dossierId}-${index}`];
  };

  return (
    <div className="pt-28 pb-32 relative text-[#C0C0C0]">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_65%)] pointer-events-none" />

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
            <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
            <span>ARCHIVE STATUS: SECURE VAULT // AIR-GAPPED</span>
          </div>
        </div>

        {/* Hero Section Header */}
        <ScrollReveal distance={20}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/[0.04] text-[10px] font-mono uppercase tracking-[0.28em] text-[#E2E8F0] mb-4">
              <Shield className="w-3 h-3 text-white" />
              <span>CLASSIFIED OPERATIONAL DISPATCHES // DECLASSIFIED ARCHIVE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight font-normal mb-5">
              THE <span className="silver-gradient-heading font-serif">VAULT</span>
            </h1>

            <p className="text-sm sm:text-base text-[#A0ABBA] font-light leading-relaxed max-w-2xl mx-auto mb-8">
              A curated ledger of extreme logistical feats executed for sovereign patrons, heads of state, and family offices. Redacted for operational security, unsealed for verification.
            </p>

            {/* Global Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md">
              <div className="text-center border-r border-white/10 last:border-r-0">
                <div className="text-2xl sm:text-3xl font-serif text-white font-medium">100%</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E9AAE] mt-1">Zero Breach Record</div>
              </div>
              <div className="text-center border-r border-white/10 last:border-r-0">
                <div className="text-2xl sm:text-3xl font-serif text-white font-medium">4,800+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E9AAE] mt-1">Tactical Flight Hours</div>
              </div>
              <div className="text-center border-r border-white/10 last:border-r-0">
                <div className="text-2xl sm:text-3xl font-serif text-white font-medium">19</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E9AAE] mt-1">Sovereign Corridors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-serif text-white font-medium">15 Min</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E9AAE] mt-1">Rapid Dispatch SLA</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Controls & Master Declassify Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Dossiers (6)' },
              { id: 'aviation', label: 'Aviation & Airlift' },
              { id: 'maritime', label: 'Maritime Corridors' },
              { id: 'specie', label: 'Specie & Vaulting' },
              { id: 'extraction', label: 'Crisis Extraction' },
              { id: 'diplomatic', label: 'Diplomatic Buyouts' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 text-xs font-serif uppercase tracking-[0.16em] rounded-full border transition-all ${
                  selectedFilter === tab.id
                    ? 'border-white bg-white text-[#050A15] font-medium shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'border-white/20 bg-white/[0.02] text-[#A0ABBA] hover:text-white hover:border-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Master Redaction Toggle */}
          <button
            onClick={() => setAllDeclassified(!allDeclassified)}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/35 bg-white/[0.04] text-xs font-mono uppercase tracking-[0.18em] text-white hover:bg-white/15 hover:border-white transition-all shadow-sm shrink-0"
          >
            {allDeclassified ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#CBD5E1]" />
                <span>Secure All Redactions</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-[#CBD5E1]" />
                <span>Declassify All Redactions</span>
              </>
            )}
          </button>
        </div>

        {/* Redaction Instruction Hint */}
        <div className="text-center mb-8">
          <p className="text-xs text-[#7E8B9F] font-mono tracking-wider">
            TIP: Hover over or tap any blackened <span className="redacted-bar text-white px-2 py-0.5">REDACTED</span> segment in the dossiers below to temporarily reveal classified operational details.
          </p>
        </div>

        {/* Strict Grid Dossier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDossiers.map((dossier, dIdx) => (
            <ScrollReveal key={dossier.id} delayMs={dIdx * 80} distance={25}>
              <div className="h-full rounded-2xl bg-gradient-to-b from-white/[0.08] via-[#0B1220]/90 to-[#050912] border border-white/25 p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-white/55 transition-all duration-300 relative group overflow-hidden">
                {/* Dossier Header Bar */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/15">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <span className="text-[11px] font-mono tracking-[0.22em] text-[#E2E8F0] font-semibold">
                        {dossier.caseCode}
                      </span>
                    </div>

                    <div className="px-2.5 py-1 rounded bg-white/10 border border-white/20 text-[9px] font-mono uppercase tracking-[0.2em] text-[#CBD5E1]">
                      {dossier.clearanceLevel}
                    </div>
                  </div>

                  {/* Title & Classification */}
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium mb-3 leading-snug">
                    {dossier.title}
                  </h3>

                  {/* Metadata Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/10 mb-6 text-xs font-mono">
                    <div>
                      <span className="text-[#6C778B] block text-[10px] uppercase">Principal / Entity:</span>
                      <span className="text-[#E2E8F0]">{dossier.clientDescriptor}</span>
                    </div>
                    <div>
                      <span className="text-[#6C778B] block text-[10px] uppercase">Transit Duration:</span>
                      <span className="text-white font-medium">{dossier.transitDuration}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-[#6C778B] block text-[10px] uppercase">Operational Route:</span>
                      <span className="text-[#CBD5E1]">{dossier.originDestination}</span>
                    </div>
                  </div>

                  {/* Objective & Challenge */}
                  <div className="space-y-4 mb-6 text-xs sm:text-sm font-light leading-relaxed">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A0ABBA] block mb-1">
                        Operational Mandate:
                      </span>
                      <p className="text-[#D8E0EC]">{dossier.objective}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A0ABBA] block mb-1">
                        Critical Contingency / Friction:
                      </span>
                      <p className="text-[#9CA3AF]">{dossier.obstacle}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E2E8F0] block mb-1">
                        Execution Log & Redacted Vectors:
                      </span>
                      <p className="text-[#CBD5E1] leading-relaxed">
                        {dossier.executionFeat.text}
                      </p>
                      
                      {/* Interactive Redacted Tokens */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                        <span className="text-[10px] font-mono uppercase text-[#738096]">Compartmented Details:</span>
                        {dossier.executionFeat.redactions.map((item, rIdx) => {
                          const revealed = isRevealed(dossier.id, rIdx);
                          return (
                            <span
                              key={rIdx}
                              onClick={() => toggleIndividual(`${dossier.id}-${rIdx}`)}
                              className={`redacted-bar text-[11px] ${revealed ? 'revealed' : ''}`}
                              title="Click to toggle redaction"
                            >
                              {item}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Metrics Bar & Debrief Quote */}
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 px-3 rounded-lg bg-white/[0.02] border border-white/10 mb-5">
                    {dossier.keyMetrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-[9px] font-mono uppercase tracking-wider text-[#79859A]">
                          {metric.label}
                        </div>
                        <div className="text-xs font-mono text-white font-medium mt-0.5">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Client Debrief Quote */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-white/70 italic text-xs text-[#CBD5E1] leading-relaxed mb-4">
                    {dossier.clientDebriefQuote}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6C778B] pt-2 border-t border-white/10">
                    <span>{dossier.timestamp}</span>
                    <span className="text-white/60">SEALED IN PERPETUITY</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <ScrollReveal distance={20} className="mt-20">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-white/[0.08] via-[#0D1525]/90 to-white/[0.06] border border-white/30 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/[0.05] text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1] mb-4">
              <Key className="w-3.5 h-3.5 text-white" />
              <span>GATED LOGISTICAL COMMAND</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif text-white mb-4">
              Require Critical Cross-Border Orchestration?
            </h2>

            <p className="text-xs sm:text-sm text-[#A0ABBA] font-light max-w-2xl mx-auto mb-8 leading-relaxed">
              Every prospective operation begins with a confidential briefing under bilateral non-disclosure agreement. Direct access to our Managing Partners is available 24/7.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                onClick={onInitiateInquiry}
                strength={0.35}
                className="btn-silver px-8 py-3 text-xs tracking-[0.25em]"
              >
                Initiate Confidential Briefing
              </MagneticButton>

              <button
                onClick={onBackToHome}
                className="px-8 py-3 rounded-full border border-white/20 bg-white/[0.03] text-xs font-serif uppercase tracking-[0.2em] text-[#CBD5E1] hover:text-white hover:border-white/50 transition-all"
              >
                Explore Memberships
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
