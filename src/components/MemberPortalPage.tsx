import React, { useState } from 'react';
import {
  Lock,
  Shield,
  Key,
  Fingerprint,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Radio,
  Send,
  Plane,
  Clock,
  User,
  LogOut,
  PhoneCall,
  MessageSquare,
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { ScrollReveal } from './ScrollReveal';

interface MemberPortalPageProps {
  onBackToHome: () => void;
}

export const MemberPortalPage: React.FC<MemberPortalPageProps> = ({ onBackToHome }) => {
  const [authMethod, setAuthMethod] = useState<'passkey' | 'hardware'>('passkey');
  const [patronId, setPatronId] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hardware biometric state
  const [isScanningBiometric, setIsScanningBiometric] = useState(false);
  const [biometricSuccess, setBiometricSuccess] = useState(false);

  // Authenticated state mock dispatch messages
  const [dispatchMessage, setDispatchMessage] = useState('');
  const [dispatches, setDispatches] = useState<string[]>([
    'Dispatch #8841: Farnborough tarmac standby Falcon 8X pre-flight checks complete.',
    'Dispatch #8839: Monaco Grand Prix Berth 12 deepwater clearance ratified by Harbor Master.',
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!patronId.trim()) {
      setAuthError('Please enter your Patron Identity Key.');
      return;
    }

    if (!passphrase.trim()) {
      setAuthError('Please enter your Master Security Passphrase.');
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
    }, 1200);
  };

  const handleDemoLogin = () => {
    setPatronId('LL-8820-DXB');
    setPassphrase('••••••••••••');
    setAuthError(null);
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
    }, 900);
  };

  const handleHardwareScan = () => {
    setIsScanningBiometric(true);
    setBiometricSuccess(false);
    setTimeout(() => {
      setIsScanningBiometric(false);
      setBiometricSuccess(true);
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 700);
    }, 1600);
  };

  const handleSendDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchMessage.trim()) return;
    setDispatches((prev) => [
      `Dispatch #${Math.floor(8850 + Math.random() * 50)}: ${dispatchMessage.trim()}`,
      ...prev,
    ]);
    setDispatchMessage('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPatronId('');
    setPassphrase('');
    setBiometricSuccess(false);
  };

  return (
    <div className="pt-28 pb-32 relative text-[#C0C0C0] min-h-[90vh] flex flex-col justify-center">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        {/* Navigation Breadcrumb & Back Action */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] text-[#A0ABBA] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C0C0C0]" />
            <span>Return to Global Overview</span>
          </button>

          <div className="flex items-center gap-2.5 text-[11px] font-mono tracking-widest text-[#7C889E]">
            <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
            <span>GATEWAY: TLS 1.3 // AIR-GAPPED</span>
          </div>
        </div>

        {!isAuthenticated ? (
          /* Gated Login Form Gateway */
          <ScrollReveal distance={20}>
            <div className="max-w-xl mx-auto">
              {/* Security Shield Kicker */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 bg-gradient-to-br from-white/20 via-white/5 to-transparent border border-white/30 flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                  <Lock className="w-6 h-6" />
                </div>

                <h1 className="text-2xl sm:text-4xl font-serif text-white tracking-wide font-normal mb-2">
                  SECURE MEMBER <span className="silver-gradient-heading font-serif">PORTAL</span>
                </h1>

                <p className="text-xs sm:text-sm text-[#A0ABBA] font-light leading-relaxed">
                  Private cryptographic gateway for ratified patrons of Luxury Lounge.
                </p>
              </div>

              {/* Stark Obsidian Centered Card with Subtle White/Grey Glow */}
              <div className="secure-portal-card rounded-3xl p-7 sm:p-10 relative overflow-hidden">
                {/* Method Switcher Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-black/50 border border-white/10 mb-8">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('passkey');
                      setAuthError(null);
                    }}
                    className={`py-2.5 text-[11px] font-serif uppercase tracking-[0.16em] rounded-xl transition-all ${
                      authMethod === 'passkey'
                        ? 'bg-white text-[#050A15] font-semibold shadow-md'
                        : 'text-[#A0ABBA] hover:text-white'
                    }`}
                  >
                    Patron Keycard
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('hardware');
                      setAuthError(null);
                    }}
                    className={`py-2.5 text-[11px] font-serif uppercase tracking-[0.16em] rounded-xl transition-all ${
                      authMethod === 'hardware'
                        ? 'bg-white text-[#050A15] font-semibold shadow-md'
                        : 'text-[#A0ABBA] hover:text-white'
                    }`}
                  >
                    Hardware / FIDO2
                  </button>
                </div>

                {authError && (
                  <div className="mb-6 p-3.5 rounded-xl bg-white/[0.04] border border-white/30 flex items-center gap-2.5 text-xs text-white">
                    <AlertCircle className="w-4 h-4 text-white shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {authMethod === 'passkey' ? (
                  <form onSubmit={handleLogin} className="space-y-5">
                    {/* Patron ID */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-[#CBD5E1] mb-2">
                        Patron Identification Key
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={patronId}
                          onChange={(e) => setPatronId(e.target.value)}
                          placeholder="e.g. LL-8820-DXB"
                          className="luxury-box-input w-full pl-10"
                        />
                        <Key className="w-4 h-4 text-[#8E9AAE] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                      <span className="text-[10px] font-mono text-[#6C778B] mt-1 block">
                        Located on the reverse face of your obsidian membership keycard.
                      </span>
                    </div>

                    {/* Master Passphrase */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.22em] text-[#CBD5E1] mb-2">
                        Master Security Passphrase
                      </label>
                      <div className="relative">
                        <input
                          type={showPassphrase ? 'text' : 'password'}
                          value={passphrase}
                          onChange={(e) => setPassphrase(e.target.value)}
                          placeholder="••••••••••••••••"
                          className="luxury-box-input w-full pl-10 pr-10"
                        />
                        <Lock className="w-4 h-4 text-[#8E9AAE] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <button
                          type="button"
                          onClick={() => setShowPassphrase(!showPassphrase)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E9AAE] hover:text-white"
                        >
                          {showPassphrase ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <MagneticButton
                        type="submit"
                        disabled={isAuthenticating}
                        strength={0.32}
                        className="btn-silver w-full py-3.5 text-center text-xs tracking-[0.22em]"
                      >
                        {isAuthenticating ? 'Decrypting Clearance...' : 'Authenticate Clearance'}
                      </MagneticButton>
                    </div>
                  </form>
                ) : (
                  /* Hardware / FIDO2 Biometric Authentication */
                  <div className="text-center py-6">
                    <div
                      onClick={handleHardwareScan}
                      className={`w-28 h-28 mx-auto rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-500 mb-6 ${
                        isScanningBiometric
                          ? 'border-white bg-white/20 shadow-[0_0_35px_rgba(255,255,255,0.7)] animate-pulse'
                          : biometricSuccess
                          ? 'border-white bg-white text-[#050A15] shadow-[0_0_35px_rgba(255,255,255,0.8)]'
                          : 'border-white/30 bg-white/[0.04] text-white hover:border-white/70 hover:bg-white/[0.08]'
                      }`}
                    >
                      {biometricSuccess ? (
                        <CheckCircle2 className="w-12 h-12" />
                      ) : (
                        <Fingerprint className={`w-12 h-12 ${isScanningBiometric ? 'animate-spin-slow' : ''}`} />
                      )}
                    </div>

                    <h3 className="text-lg font-serif text-white mb-2">
                      {isScanningBiometric
                        ? 'Verifying Hardware Key & Biometrics...'
                        : biometricSuccess
                        ? 'Clearance Granted. Redirecting...'
                        : 'Tap Sensor to Authenticate'}
                    </h3>

                    <p className="text-xs text-[#8E9AAE] font-light max-w-xs mx-auto mb-6">
                      Compatible with YubiKey 5 Series, Apple Touch ID, Windows Hello, and hardware cryptographic tokens.
                    </p>

                    <button
                      type="button"
                      onClick={handleHardwareScan}
                      disabled={isScanningBiometric || biometricSuccess}
                      className="px-6 py-2.5 rounded-full border border-white/25 bg-white/[0.03] text-xs font-mono uppercase tracking-[0.18em] text-[#CBD5E1] hover:text-white hover:border-white transition-all"
                    >
                      Initiate Hardware Handshake
                    </button>
                  </div>
                )}

                {/* Demo Shortcut & Emergency Notice */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="text-[11px] font-mono text-[#CBD5E1] hover:text-white underline underline-offset-4 decoration-white/40 transition-colors"
                  >
                    Simulate Demo Patron Sign-In (LL-8820-DXB)
                  </button>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#738096]">
                    <Shield className="w-3 h-3 text-white/50" />
                    <span>Air-Gapped TLS 1.3 GCM</span>
                  </div>
                </div>
              </div>

              {/* Emergency Duty Officer Contact */}
              <div className="mt-8 text-center text-xs text-[#7A879D] font-light">
                <p>
                  Forgotten credentials or urgent crisis relocation dispatch?
                </p>
                <p className="font-mono text-white mt-1">
                  24/7 Senior Liaison Hotline: +971 585783038
                </p>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          /* Authenticated Patron Dispatch Terminal Dashboard */
          <ScrollReveal distance={20}>
            <div className="space-y-8">
              {/* Terminal Header */}
              <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.1] via-[#0E1628]/95 to-[#060B16] border border-white/35 flex flex-wrap items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#CBD5E1] mb-1">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>PATRON IDENTITY AUTHENTICATED // AIR-GAPPED SESSION</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
                    Lord Arundel of Kensington
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A0ABBA] mt-2">
                    <span className="px-2.5 py-0.5 rounded bg-white/10 text-white border border-white/20">
                      IMPERIAL COHORT #014
                    </span>
                    <span>KEYCARD: LL-8820-DXB</span>
                    <span>JURISDICTION: UK & UAE</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 bg-white/[0.04] text-xs font-serif uppercase tracking-[0.18em] text-[#CBD5E1] hover:text-white hover:border-white transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Terminate Session</span>
                  </button>
                </div>
              </div>

              {/* Status & Liaison Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Liaison Card */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/20">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#8E9AAE] mb-3">
                    <User className="w-3.5 h-3.5 text-white" />
                    <span>Assigned Senior Liaison</span>
                  </div>
                  <h3 className="text-lg font-serif text-white mb-1">Alexander Sterling</h3>
                  <p className="text-xs text-[#CBD5E1] font-light mb-3">
                    Senior Lifestyle & Operations Director (Dubai Private Desk)
                  </p>
                  <div className="space-y-1 text-xs font-mono text-[#A0ABBA] pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span>Direct Priority Phone:</span>
                      <a href="tel:+971585783038" className="text-white hover:text-white/80 transition-colors">+971 585783038</a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Encrypted Signal:</span>
                      <span className="text-white">Active (24/7 Desk)</span>
                    </div>
                  </div>
                </div>

                {/* Standby Air Asset */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/20">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#8E9AAE] mb-3">
                    <Plane className="w-3.5 h-3.5 text-white" />
                    <span>Standby Flight Asset</span>
                  </div>
                  <h3 className="text-lg font-serif text-white mb-1">Dassault Falcon 8X</h3>
                  <p className="text-xs text-[#CBD5E1] font-light mb-3">
                    Positioned at London Farnborough (EGLF) • 2-Hour Notice SLA
                  </p>
                  <div className="space-y-1 text-xs font-mono text-[#A0ABBA] pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span>Aircrew Duty Status:</span>
                      <span className="text-white">On Active Standby</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fuel & Flight Plan:</span>
                      <span className="text-white">Pre-cleared European Airspace</span>
                    </div>
                  </div>
                </div>

                {/* Session Security Telemetry */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/20">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#8E9AAE] mb-3">
                    <Shield className="w-3.5 h-3.5 text-white" />
                    <span>Encrypted Tunnel Telemetry</span>
                  </div>
                  <h3 className="text-lg font-serif text-white mb-1">Zero-Knowledge Vault</h3>
                  <p className="text-xs text-[#CBD5E1] font-light mb-3">
                    Hardware key signature validated via Swiss cryptographic node.
                  </p>
                  <div className="space-y-1 text-xs font-mono text-[#A0ABBA] pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span>Encryption Protocol:</span>
                      <span className="text-white">AES-256-GCM / SHA-384</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Session Auto-Expire:</span>
                      <span className="text-white">14:59 Minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Confidential Dispatch Box */}
              <div className="p-7 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/20">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white">
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>Confidential Direct Dispatch Line</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#738096]">
                    Routed Directly to Senior Concierge Liaison Desk
                  </span>
                </div>

                <form onSubmit={handleSendDispatch} className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={dispatchMessage}
                    onChange={(e) => setDispatchMessage(e.target.value)}
                    placeholder="Enter urgent flight directive, itinerary inquiry, or security escort request..."
                    className="luxury-box-input flex-1"
                  />
                  <MagneticButton
                    type="submit"
                    strength={0.3}
                    className="btn-silver px-6 py-2.5 text-xs tracking-[0.2em] shrink-0"
                  >
                    Transmit Directive
                  </MagneticButton>
                </form>

                {/* Live Dispatch Stream */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C778B] block mb-1">
                    Active Operational Log:
                  </span>
                  {dispatches.map((disp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#CBD5E1] flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span>{disp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};
