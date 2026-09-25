import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  className?: string;
  alt?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  className = 'w-5 h-3.5',
  alt = '',
}) => {
  const code = countryCode.toLowerCase();

  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.5)] border border-white/20 select-none align-middle ${className}`}
      title={alt}
      aria-label={alt}
    >
      {code === 'gb' && (
        <svg viewBox="0 0 60 36" className="w-full h-full block">
          <clipPath id="gb-cp">
            <path d="M0,0 v36 h60 v-36 z" />
          </clipPath>
          <path d="M0,0 v36 h60 v-36 z" fill="#012169" />
          <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,36 M60,0 L0,36" clipPath="url(#gb-cp)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v36 M0,18 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v36 M0,18 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      )}

      {code === 'fr' && (
        <svg viewBox="0 0 3 2" className="w-full h-full block">
          <rect width="1" height="2" fill="#002654" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#CE1126" />
        </svg>
      )}

      {code === 'sa' && (
        <svg viewBox="0 0 3 2" className="w-full h-full block">
          <rect width="3" height="2" fill="#006C35" />
          {/* Stylized White Arabic calligraphy and sword emblem */}
          <path
            d="M0.7,0.7 C1.0,0.6 1.4,0.6 1.8,0.7 C2.1,0.7 2.3,0.8 2.4,0.9 C2.3,1.0 2.0,1.0 1.8,1.0 C1.4,1.0 1.0,0.9 0.7,0.7 Z"
            fill="#FFFFFF"
          />
          <path
            d="M0.8,1.25 L2.2,1.25 M0.8,1.25 L1.0,1.15 M0.8,1.25 L1.0,1.35 M2.1,1.15 L2.1,1.35"
            stroke="#FFFFFF"
            strokeWidth="0.08"
            strokeLinecap="round"
          />
        </svg>
      )}

      {code === 'es' && (
        <svg viewBox="0 0 3 2" className="w-full h-full block">
          <rect width="3" height="2" fill="#AA151B" />
          <rect y="0.5" width="3" height="1" fill="#F1BF00" />
          {/* Subtle crest indicator */}
          <circle cx="0.8" cy="1" r="0.25" fill="#AA151B" opacity="0.8" />
        </svg>
      )}

      {code === 'it' && (
        <svg viewBox="0 0 3 2" className="w-full h-full block">
          <rect width="1" height="2" fill="#008D46" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#D9272E" />
        </svg>
      )}

      {code === 'cn' && (
        <svg viewBox="0 0 3 2" className="w-full h-full block">
          <rect width="3" height="2" fill="#DE2910" />
          {/* Main golden star */}
          <polygon
            points="0.5,0.3 0.56,0.48 0.75,0.48 0.6,0.6 0.65,0.78 0.5,0.67 0.35,0.78 0.4,0.6 0.25,0.48 0.44,0.48"
            fill="#FFDE00"
          />
          {/* Mini satellite stars */}
          <circle cx="0.9" cy="0.3" r="0.05" fill="#FFDE00" />
          <circle cx="1.05" cy="0.45" r="0.05" fill="#FFDE00" />
          <circle cx="1.05" cy="0.65" r="0.05" fill="#FFDE00" />
          <circle cx="0.9" cy="0.8" r="0.05" fill="#FFDE00" />
        </svg>
      )}

      {code === 'ru' && (
        <svg viewBox="0 0 3 2" className="w-full h-full block">
          <rect width="3" height="2" fill="#D52B1E" />
          <rect width="3" height="1.333" fill="#0039A6" />
          <rect width="3" height="0.667" fill="#FFFFFF" />
        </svg>
      )}

      {code === 'tr' && (
        <svg viewBox="0 0 3 2" className="w-full h-full block">
          <rect width="3" height="2" fill="#E30A17" />
          {/* Crescent */}
          <circle cx="1.2" cy="1" r="0.5" fill="#FFFFFF" />
          <circle cx="1.35" cy="1" r="0.4" fill="#E30A17" />
          {/* Star */}
          <polygon
            points="1.7,1 1.85,0.92 1.8,1.08 1.95,1.15 1.78,1.15 1.7,1.3 1.62,1.15 1.45,1.15 1.6,1.08 1.55,0.92"
            fill="#FFFFFF"
          />
        </svg>
      )}

      {code === 'nl' && (
        <svg viewBox="0 0 3 2" className="w-full h-full block">
          <rect width="3" height="2" fill="#21468B" />
          <rect width="3" height="1.333" fill="#FFFFFF" />
          <rect width="3" height="0.667" fill="#AE1C28" />
        </svg>
      )}
    </span>
  );
};
