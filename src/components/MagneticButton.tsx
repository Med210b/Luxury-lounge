import React, { useRef, useState, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  strength?: number; // default 0.35
  maxDistance?: number; // max pull distance in px, default 18
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  strength = 0.35,
  maxDistance = 18,
  type = 'button',
  disabled = false,
  target,
  rel,
  ariaLabel,
  id,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = (e.clientX - centerX) * strength;
      let dy = (e.clientY - centerY) * strength;

      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > maxDistance) {
        dx = (dx / dist) * maxDistance;
        dy = (dy / dist) * maxDistance;
      }

      setOffset({ x: dx, y: dy });
    },
    [disabled, strength, maxDistance]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  const transformStyle: React.CSSProperties = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: isHovered
      ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
      : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const innerStyle: React.CSSProperties = {
    transform: `translate3d(${offset.x * 0.35}px, ${offset.y * 0.35}px, 0)`,
    transition: isHovered
      ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)'
      : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  if (href) {
    return (
      <a
        ref={(el) => {
          containerRef.current = el;
        }}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        id={id}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={transformStyle}
        className={`inline-block relative will-change-transform ${className}`}
      >
        <span style={innerStyle} className="inline-flex items-center justify-center will-change-transform">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={(el) => {
        containerRef.current = el;
      }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      id={id}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className={`relative will-change-transform ${className}`}
    >
      <span style={innerStyle} className="inline-flex items-center justify-center will-change-transform">
        {children}
      </span>
    </button>
  );
};
