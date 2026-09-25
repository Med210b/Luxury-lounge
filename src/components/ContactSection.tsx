import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { SectionHeader } from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  initialTier?: string | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialTier }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactName: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = [leftColRef.current, rightColRef.current].filter(Boolean);
      if (cols.length > 0) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            onComplete: () => {
              gsap.set(cols, { clearProps: 'transform' });
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (initialTier) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `I am inquiring regarding the ${initialTier} Membership tier.`,
      }));
    }
  }, [initialTier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 relative bg-transparent overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] rounded-full bg-[#0A1128] opacity-40 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <SectionHeader
          chapter="Chapter VII • Confidential Dispatch"
          title="Private Client Desk"
          subtitle="“Direct communication with our senior managing partners and airside logistics desk for expedited priority review.”"
        />

        {/* 2-Column Layout with Sticky Left Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Sticky Landmark Visual & Coordinates Bento Boxes */}
          <div
            ref={leftColRef}
            className="contact-col lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col gap-6"
          >
            {/* Landmark Showcase Photo in Structured Bento Frame */}
            <div className="relative w-full h-72 sm:h-84 rounded-2xl overflow-hidden border border-white/25 border-t-white/60 shadow-[0_20px_45px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.45)] bg-[#070D1C] group">
              <img
                src="https://res.cloudinary.com/swcgor0l/image/upload/v1790295611/ChatGPT_Image_Sep_25_2026_04_19_57_AM_prdl7s.png"
                alt="Luxury Lounge Dubai Residency Landmark"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A15]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-white/90">
                <span className="uppercase">DUBAI RESIDENCY</span>
                <span>25°08'N 55°11'E</span>
              </div>
            </div>

            {/* Direct Wire Bento Box with Clean Borders */}
            <div className="p-6 rounded-2xl border border-[rgba(192,192,192,0.2)] bg-[rgba(255,255,255,0.025)] backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8E96A8]">
                DIRECT WIRE COORDINATES
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(192,192,192,0.1)]">
                  <span className="text-[#A0A7B8] font-light">Dedicated Private Line</span>
                  <a
                    href="tel:+971585783038"
                    className="text-white font-number tracking-widest hover:text-[#C0C0C0] transition-colors"
                  >
                    +971 585783038
                  </a>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(192,192,192,0.1)]">
                  <span className="text-[#A0A7B8] font-light">Priority WhatsApp</span>
                  <a
                    href="https://wa.me/971585783038?text=Hello%20Luxury%20Lounge%20Private%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-number tracking-widest hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>+971 585783038</span>
                    <span className="text-[9px] font-mono uppercase bg-[#25D366]/15 px-1.5 py-0.5 rounded border border-[#25D366]/40">Active</span>
                  </a>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(192,192,192,0.1)]">
                  <span className="text-[#A0A7B8] font-light">Encrypted Dispatch</span>
                  <a
                    href="mailto:aksa@luxury-lounge.ae"
                    className="text-white font-mono text-[11px] hover:text-[#C0C0C0] transition-colors"
                  >
                    aksa@luxury-lounge.ae
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#A0A7B8] font-light">Confidentiality Protocol</span>
                  <span className="text-white font-mono text-[11px]">Bilateral 256-Bit NDA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Card matching image.png exactly */}
          <div
            ref={rightColRef}
            className="contact-col lg:col-span-7 relative rounded-2xl p-8 sm:p-11 backdrop-blur-xl border border-white/30 border-t-white/70 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.7)] overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 22%, rgba(15, 22, 38, 0.8) 55%, rgba(8, 13, 24, 0.95) 100%)',
            }}
          >
            {/* Luminous Frosted White Top Glow Bloom */}
            <div
              className="absolute inset-x-0 top-0 h-40 pointer-events-none rounded-t-2xl"
              style={{
                background:
                  'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.12) 50%, transparent 80%)',
              }}
            />

            {/* Specular White Top Edge Highlight */}
            <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-[0.06em] text-white mb-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Contact
              </h2>

              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-14 h-14 mx-auto rounded-full border border-white/60 bg-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <i className="fa-solid fa-check text-xl text-white" />
                  </div>
                  <h3 className="text-xl font-serif text-white tracking-wide">
                    Inquiry Transmitted
                  </h3>
                  <p className="text-xs text-[#CBD5E1] max-w-sm mx-auto font-light leading-relaxed">
                    Thank you, {formData.firstName || 'Client'}. Your confidential message has been received by our private office. We will respond promptly.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          firstName: '',
                          lastName: '',
                          contactName: '',
                          email: '',
                          message: '',
                        });
                      }}
                      className="inline-flex items-center justify-center px-8 py-2.5 rounded-full border border-white/40 bg-white/5 hover:bg-white hover:text-[#050A15] text-white text-xs tracking-[0.2em] font-serif uppercase transition-all"
                    >
                      Transmit Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name: Label + Two rounded boxes side by side matching image.png */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-[#CBD5E1] font-light mb-2">
                      Name
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                        className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/60 focus:bg-white/[0.07] transition-all backdrop-blur-sm"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                        className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/60 focus:bg-white/[0.07] transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Email address: Label + Name & Email stacked matching image.png */}
                  <div className="space-y-2.5">
                    <label className="block text-xs uppercase tracking-[0.16em] text-[#CBD5E1] font-light mb-2">
                      Email address
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/60 focus:bg-white/[0.07] transition-all backdrop-blur-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/60 focus:bg-white/[0.07] transition-all backdrop-blur-sm"
                    />
                  </div>

                  {/* Message: Label + Textarea matching image.png */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.16em] text-[#CBD5E1] font-light mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message..."
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/60 focus:bg-white/[0.07] transition-all resize-none backdrop-blur-sm"
                    />
                  </div>

                  {/* Submit Button: Modern Structured Layout */}
                  <div className="pt-3 text-center">
                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      strength={0.32}
                      className="inline-flex items-center justify-center gap-2.5 px-10 py-3.5 min-w-[230px] text-[11px] tracking-[0.22em] font-sans font-medium uppercase border border-white/50 bg-[rgba(255,255,255,0.04)] text-white hover:bg-white hover:text-[#050A15] hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Transmitting Dossier...' : 'Submit Written Inquiry'}</span>
                      <span>→</span>
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
