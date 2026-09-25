import React, { useState, useRef } from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';

export interface SignatureServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  scope: string[];
  turnaround: string;
  icon: LucideIcon;
  badge?: string;
  isOriginal?: boolean;
}

interface ServiceCard3DProps {
  service: SignatureServiceItem;
  index: number;
  onSelect: (service: SignatureServiceItem) => void;
}

export const ServiceCard3D: React.FC<ServiceCard3DProps> = ({ service, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage for shine
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    setShinePos({ x: percentX, y: percentY });

    // Calculate 3D tilt angles (-12 to +12 degrees max)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setShinePos({ x: 50, y: 50 });
  };

  const Icon = service.icon || Sparkles;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(service)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl border border-white/20 hover:border-white/70 transition-colors duration-300 cursor-pointer group overflow-hidden bg-gradient-to-b from-white/[0.14] via-[#0E1524]/85 to-[#070B14]/95 shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_45px_rgba(255,255,255,0.22)]"
    >
      {/* 3D Dynamic Radial Specular Glint */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 280px at ${shinePos.x}% ${shinePos.y}%, rgba(255, 255, 255, 0.32), transparent 70%)`,
        }}
      />

      {/* Top Edge Frosting */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

      {/* Card Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-white/30 via-white/10 to-transparent border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:border-white transition-all duration-300">
            <Icon className="w-6 h-6 text-[#FFFFFF] drop-shadow-[0_0_8px_rgba(255,255,255,0.65)]" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-[#A0ABBA]">
            <span className="text-[#F1F5F9] font-semibold">#{String(index + 1).padStart(2, '0')}</span>
            <span>·</span>
            <span className="truncate max-w-[140px] text-[#CBD5E1]">{service.category}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-lg sm:text-xl font-serif font-medium text-white mb-2.5 leading-snug group-hover:text-[#F1F5F9] transition-colors duration-200">
          {service.title}
        </h4>

        {/* Description */}
        <p className="text-[13px] text-[#A0ABBA] font-light leading-relaxed mb-5 line-clamp-3">
          {service.description}
        </p>
      </div>

      {/* Card Footer: Scope Snippet & Detail Indicator */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
        <span className="text-[#CBD5E1] font-mono tracking-wider">
          {service.turnaround}
        </span>

        <span className="inline-flex items-center gap-1 text-white font-serif uppercase tracking-wider text-[10px] group-hover:text-white group-hover:translate-x-0.5 transition-all">
          <span>Inspect Protocol</span>
          <span className="text-xs">→</span>
        </span>
      </div>
    </div>
  );
};
