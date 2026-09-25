import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageOption } from '../types/language';
import { CountryFlag } from './CountryFlag';
import {
  getStoredLanguageCode,
  getLanguageByCode,
  switchLanguage,
  applyDirectionAndLangAttributes,
} from '../utils/languageManager';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'compact' | 'mobile-drawer';
  className?: string;
  onLanguageSelected?: () => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'navbar',
  className = '',
  onLanguageSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState<string>(getStoredLanguageCode);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang: LanguageOption = getLanguageByCode(currentLangCode);

  // Sync on mount and listen to global language change events
  useEffect(() => {
    const initialCode = getStoredLanguageCode();
    setCurrentLangCode(initialCode);
    applyDirectionAndLangAttributes(initialCode);

    const handleLanguageChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{ code: string }>;
      if (customEvent.detail && customEvent.detail.code) {
        setCurrentLangCode(customEvent.detail.code);
      }
    };

    window.addEventListener('luxuryLanguageChanged', handleLanguageChanged);
    return () => {
      window.removeEventListener('luxuryLanguageChanged', handleLanguageChanged);
    };
  }, []);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code: string) => {
    setCurrentLangCode(code);
    switchLanguage(code);
    setIsOpen(false);
    if (onLanguageSelected) {
      onLanguageSelected();
    }
  };

  if (variant === 'mobile-drawer') {
    return (
      <div className={`w-full py-2 ${className}`}>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-[10px] font-mono tracking-[0.22em] text-[#8E9AAE] uppercase flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#A0A7B8]" />
            Select Language
          </span>
          <span className="text-[10px] font-sans text-white/50">
            {currentLang.nativeName}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLangCode;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white/[0.14] border-white/60 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/30 text-[#A0A7B8] hover:text-white hover:bg-white/[0.07]'
                }`}
                aria-pressed={isSelected}
              >
                <div className="mb-1.5 flex items-center justify-center">
                  <CountryFlag countryCode={lang.countryCode} className="w-6 h-4" alt={lang.name} />
                </div>
                <span className="text-[11px] font-sans font-medium leading-tight">
                  {lang.name}
                </span>
                <span className="text-[9px] text-[#7E889B] font-sans leading-tight mt-0.5">
                  {lang.nativeName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current language: ${currentLang.name}. Click to change language.`}
        className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ease-out cursor-pointer select-none ${
          isOpen
            ? 'border-white/60 bg-white/[0.12] text-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
            : 'border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.08] text-[#E2E8F0] shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
        }`}
      >
        {/* Country Flag Badge */}
        <CountryFlag
          countryCode={currentLang.countryCode}
          className="w-4 h-3 sm:w-4.5 sm:h-3.5 shadow-sm"
          alt={currentLang.name}
        />

        {/* Language Name (responsive: full name on desktop, compact code on very narrow screens) */}
        <span className="text-xs font-sans font-medium tracking-wide">
          <span className="hidden sm:inline">{currentLang.name}</span>
          <span className="sm:hidden uppercase">{currentLang.code.slice(0, 2)}</span>
        </span>

        {/* Small Elegant Chevron Icon */}
        <ChevronDown
          className={`w-3 h-3 text-[#A0A7B8] group-hover:text-white transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full mt-2 right-0 sm:right-auto sm:left-0 min-w-[230px] z-[120] rounded-2xl border border-white/20 bg-[#0A101D]/98 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.06)]"
            role="menu"
            aria-orientation="vertical"
          >
            {/* Header info */}
            <div className="flex items-center justify-between px-2.5 py-1.5 mb-1 border-b border-white/10">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#7E889B] flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-[#A0A7B8]" />
                Select Language
              </span>
              <span className="text-[9px] font-mono text-[#8E9AAE]">
                {SUPPORTED_LANGUAGES.length} Languages
              </span>
            </div>

            {/* List of Languages */}
            <div className="space-y-0.5 max-h-[380px] overflow-y-auto custom-scrollbar py-0.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLangCode;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    role="menuitem"
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all duration-150 group cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.12] text-white border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
                        : 'text-[#CBD5E1] hover:text-white hover:bg-white/[0.07] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CountryFlag
                        countryCode={lang.countryCode}
                        className="w-5 h-3.5 shrink-0"
                        alt={lang.name}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-sans font-medium tracking-wide leading-tight truncate">
                          {lang.name}
                        </span>
                        <span
                          className={`text-[10px] leading-tight font-sans transition-colors ${
                            isSelected
                              ? 'text-white/80'
                              : 'text-[#7E889B] group-hover:text-[#A0A7B8]'
                          }`}
                        >
                          {lang.nativeName}
                        </span>
                      </div>
                    </div>

                    {/* Indicator */}
                    <div className="flex items-center pl-2 shrink-0">
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white">
                          <Check className="w-3 h-3 text-white stroke-[2.5]" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-white/20 group-hover:text-white/60 transition-colors uppercase">
                          {lang.code.slice(0, 2)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer with Google Translate attribution */}
            <div className="mt-1 pt-1.5 border-t border-white/10 px-2 flex items-center justify-between text-[9px] text-[#7E889B] font-sans">
              <span>Automatic Translation</span>
              <span className="font-mono text-white/40">Google Translate</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
