import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Subtle luxury color palette: platinum, silver, faint celestial starlight
    const colorPalette = [
      '220, 226, 240',
      '192, 192, 192',
      '160, 174, 200',
      '235, 238, 245',
    ];

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const createParticles = () => {
      const area = width * height;
      // Lightweight particle count: 30-45 particles
      const count = Math.min(Math.floor(area / 24000), 45);
      particles = [];

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.4 + 0.6;
        const baseAlpha = Math.random() * 0.35 + 0.15;
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.3 - 0.05,
          radius,
          baseAlpha,
          currentAlpha: baseAlpha,
          twinkleSpeed: Math.random() * 0.015 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
        });
      }
    };

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      createParticles();
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      // Pause drawing if tab is inactive
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((time - lastTime) / 1000, 0.08);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Ultra-efficient particle loop
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.twinklePhase += p.twinkleSpeed;
        const twinkle = Math.sin(p.twinklePhase);
        p.currentAlpha = Math.max(0.08, p.baseAlpha + twinkle * 0.18);

        p.x += p.vx * 60 * delta;
        p.y += p.vy * 60 * delta;

        // Subtle mouse reaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < mouse.radius * mouse.radius && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / mouse.radius) * 0.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Screen boundary wrap-around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }

        // Fast crisp dot draw (no expensive gradient allocations per frame)
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color}, ${p.currentAlpha})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
};
