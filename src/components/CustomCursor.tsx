import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if user is on a touch-first device
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        !window.matchMedia('(hover: hover)').matches)
    ) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update inner dot immediately for instantaneous responsiveness
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (!isVisible) {
        setIsVisible(true);
        ringX = mouseX;
        ringY = mouseY;
      }

      // Check if hovering over clickable or interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, label, [data-cursor-interactive], .cursor-pointer, .btn-silver, [class*="card"], [class*="item"], [class*="btn"]'
        );
        setIsHovering(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    // Smooth physics loop using lerp (Linear Interpolation)
    const render = () => {
      // Direct positioning for inner dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Fluid interpolated trailing for outer metallic ring (0.16 smoothing factor)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Fluid Metallic Follower Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
            isHovering
              ? 'w-14 h-14 border border-[rgba(255,255,255,0.85)] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(200,200,200,0.04)_60%,transparent_100%)] shadow-[0_0_24px_rgba(255,255,255,0.35),inset_0_0_12px_rgba(255,255,255,0.12)] backdrop-blur-[1px]'
              : isClicking
              ? 'w-6 h-6 border border-[rgba(255,255,255,0.95)] bg-[rgba(255,255,255,0.18)] shadow-[0_0_16px_rgba(255,255,255,0.5)]'
              : 'w-8 h-8 border border-[rgba(224,224,224,0.4)] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(192,192,192,0.01)_70%,transparent_100%)] shadow-[0_0_12px_rgba(255,255,255,0.15)]'
          }`}
        >
          {/* Subtle liquid metallic rotating hairline highlight on hover */}
          {isHovering && (
            <div className="absolute inset-0 rounded-full border border-t-[rgba(255,255,255,0.9)] border-r-transparent border-b-[rgba(255,255,255,0.4)] border-l-transparent animate-spin-slow opacity-80" />
          )}
        </div>
      </div>

      {/* Inner Precision Metallic Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-200 ease-out bg-gradient-to-br from-white via-[#E2E8F0] to-[#94A3B8] shadow-[0_0_8px_rgba(255,255,255,0.9)] ${
            isHovering
              ? 'w-1 h-1 opacity-50'
              : isClicking
              ? 'w-1.5 h-1.5 opacity-90 scale-90'
              : 'w-1.5 h-1.5 opacity-100'
          }`}
        />
      </div>
    </div>
  );
};
