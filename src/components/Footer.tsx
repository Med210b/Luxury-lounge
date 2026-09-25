import React from 'react';
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent via-[#050A15]/80 to-[#02050B] border-t border-[rgba(192,192,192,0.18)] pt-16 sm:pt-20 pb-12 relative overflow-hidden text-[#C0C0C0]">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-[#0A1628] opacity-30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[200px] bg-[#070D1C] opacity-30 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Main Two-Column Luxury Agency Layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 pb-12 border-b border-white/10">
          {/* LEFT SIDE: Brand Logo + Architectural Brief */}
          <div className="flex flex-col items-start text-left max-w-lg">
            <a href="#home" className="inline-block mb-4 group cursor-pointer" aria-label="Luxury Lounge Home">
              <img
                src="https://res.cloudinary.com/swcgor0l/image/upload/v1790089140/dad1d938-dba2-4299-8e56-830655f5f41ejjjjjjjjjjjj_pv6vmo.png"
                alt="Luxury Lounge Logo"
                className="h-[46px] sm:h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ maxHeight: '52px' }}
              />
            </a>

            <p className="text-xs sm:text-[13.5px] text-[#9EA7B8] font-light tracking-wide leading-relaxed mb-4">
              Ultra-exclusive concierge architecture, private aviation dispatch, and confidential lifestyle stewardship for world principals.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] text-[10px] font-mono tracking-[0.2em] text-[#8E96A8] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span>Sovereign Client Operations • 180+ Jurisdictions</span>
            </div>
          </div>

          {/* RIGHT SIDE: Phone Number, Email in Times New Roman + Social Details */}
          <div className="flex flex-col items-start lg:items-end text-left lg:text-right gap-3 w-full lg:w-auto">
            <span className="text-[10px] font-mono tracking-[0.26em] uppercase text-[#7E889B]">
              Direct Private Line &amp; Dispatch Desk
            </span>

            {/* Phone Number in Times New Roman */}
            <a
              href="tel:+971585783038"
              style={{ fontFamily: "'Times New Roman', Times, 'Tinos', serif" }}
              className="text-2xl sm:text-3xl lg:text-4xl text-white hover:text-[#C0C0C0] transition-colors tracking-wide font-normal drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)] flex items-center lg:justify-end gap-2.5 group cursor-pointer"
            >
              <Phone className="w-4 h-4 text-white/60 group-hover:text-white transition-colors lg:order-2 shrink-0" />
              <span>+971 585783038</span>
            </a>

            {/* Email in Times New Roman */}
            <a
              href="mailto:aksa@luxury-lounge.ae"
              style={{ fontFamily: "'Times New Roman', Times, 'Tinos', serif" }}
              className="text-base sm:text-lg lg:text-xl text-[#C0C8D6] hover:text-white transition-colors italic tracking-wide flex items-center lg:justify-end gap-2.5 group cursor-pointer"
            >
              <Mail className="w-4 h-4 text-white/50 group-hover:text-white transition-colors lg:order-2 shrink-0" />
              <span>aksa@luxury-lounge.ae</span>
            </a>

            {/* Social Media Details */}
            <div className="mt-3 flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61594787669435"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-facebook-link"
                aria-label="Facebook Luxury Lounge Official"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] hover:border-white hover:bg-white/10 hover:shadow-[0_0_16px_rgba(255,255,255,0.5)] flex items-center justify-center text-white transition-all duration-300 group cursor-pointer"
              >
                <Facebook className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/luxury_lounge.ae/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram-link"
                aria-label="Instagram Luxury Lounge Official"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] hover:border-white hover:bg-white/10 hover:shadow-[0_0_16px_rgba(255,255,255,0.5)] flex items-center justify-center text-white transition-all duration-300 group cursor-pointer"
              >
                <Instagram className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/971585783038?text=Hello%20Luxury%20Lounge%20Private%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20services."
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp-link"
                aria-label="WhatsApp Luxury Lounge Private Desk"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] hover:border-[#25D366] hover:bg-[#25D366]/15 hover:shadow-[0_0_16px_rgba(37,211,102,0.4)] flex items-center justify-center text-[#25D366] transition-all duration-300 group cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.41 0-2.8-.36-4.02-1.05l-.29-.16-3.11.82.83-3.03-.19-.31a8.21 8.21 0 01-1.26-4.43c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                </svg>
              </a>
            </div>

            <span className="text-[11px] font-times italic text-[#7E889B] mt-0.5">
              Dubai, United Arab Emirates
            </span>
          </div>
        </div>

        {/* Structured Luxury Site Navigation Columns */}
        <div className="py-12 border-b border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left">
          {/* Column 1: Services Protocols */}
          <div>
            <h5 className="text-[11px] font-mono uppercase tracking-[0.24em] text-white font-medium mb-4">
              Service Protocols
            </h5>
            <ul className="space-y-2.5 text-xs text-[#9EA7B8] font-light">
              <li>
                <a href="#service-protocol-1" className="hover:text-white transition-colors cursor-pointer block">
                  Private Aviation Dispatch (Heavy Jets)
                </a>
              </li>
              <li>
                <a href="#service-protocol-2" className="hover:text-white transition-colors cursor-pointer block">
                  Superyacht Charter &amp; Port Hercule
                </a>
              </li>
              <li>
                <a href="#service-protocol-3" className="hover:text-white transition-colors cursor-pointer block">
                  Jet Cabin Sanctuary &amp; Staterooms
                </a>
              </li>
              <li>
                <a href="#service-protocol-4" className="hover:text-white transition-colors cursor-pointer block">
                  Marine Leisure &amp; Island Residences
                </a>
              </li>
              <li>
                <a href="#service-protocol-5" className="hover:text-white transition-colors cursor-pointer block">
                  Executive Aviation &amp; Overflight
                </a>
              </li>
              <li>
                <a href="#service-protocol-6" className="hover:text-white transition-colors cursor-pointer block">
                  VIP Cabin Suite &amp; Haute Gastronomy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Membership Charters */}
          <div>
            <h5 className="text-[11px] font-mono uppercase tracking-[0.24em] text-white font-medium mb-4">
              Membership Charters
            </h5>
            <ul className="space-y-2.5 text-xs text-[#9EA7B8] font-light">
              <li>
                <a href="#signature" className="hover:text-white transition-colors cursor-pointer block">
                  Signature Tier · Executive Access
                </a>
              </li>
              <li>
                <a href="#prestige" className="hover:text-white transition-colors cursor-pointer block">
                  Prestige Tier · Maritime &amp; Helipad
                </a>
              </li>
              <li>
                <a href="#imperial" className="hover:text-white transition-colors cursor-pointer block">
                  Imperial Tier · Sovereign Diplomatic
                </a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-white transition-colors cursor-pointer block">
                  Admissions &amp; Patron Vetting Protocol
                </a>
              </li>
              <li>
                <a href="#vault" className="hover:text-white transition-colors cursor-pointer block">
                  Case Studies &amp; Operations Vault
                </a>
              </li>
              <li>
                <a href="#portal" className="hover:text-white transition-colors cursor-pointer block">
                  Encrypted Patron Portal &amp; Dispatch
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Private Client Office */}
          <div>
            <h5 className="text-[11px] font-mono uppercase tracking-[0.24em] text-white font-medium mb-4">
              Private Client Office
            </h5>
            <ul className="space-y-2.5 text-xs text-[#9EA7B8] font-light">
              <li>
                <a href="#about" className="hover:text-white transition-colors cursor-pointer block">
                  About Luxury Lounge &amp; House Heritage
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors cursor-pointer block">
                  House Philosophy &amp; Gabrielle Chanel
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors cursor-pointer block">
                  Destination 3D Maps &amp; Corridors
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-white transition-colors cursor-pointer block">
                  Client Testimonials &amp; Google Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors cursor-pointer block">
                  Frequently Asked Questions (FAQ)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors cursor-pointer block">
                  Confidential Contact Desk &amp; Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Seats */}
          <div>
            <h5 className="text-[11px] font-mono uppercase tracking-[0.24em] text-white font-medium mb-4">
              Physical Seats
            </h5>
            <div className="space-y-3 text-xs text-[#9EA7B8] font-light">
              <div>
                <span className="text-white block font-serif">Dubai DIFC Gate Precinct 4</span>
                <span className="text-[11px] text-[#7E889B]">Global Headquarters &amp; Salon</span>
              </div>
              <div>
                <span className="text-white block font-serif">Dubai Al Maktoum (DWC) Jetex</span>
                <span className="text-[11px] text-[#7E889B]">Airside Aviation Dispatch Command</span>
              </div>
              <div>
                <span className="text-white block font-serif">Dubai Harbour Marina</span>
                <span className="text-[11px] text-[#7E889B]">Deepwater Maritime Allocation Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Bilateral Protocol Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#737A8C] font-light tracking-wider gap-4">
          <div>
            © {new Date().getFullYear()} Luxury Lounge Private Client Office Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
            <span>Strict Bilateral NDA</span>
            <span>•</span>
            <span>Institutional Clearance Level 1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
