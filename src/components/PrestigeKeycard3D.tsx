import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Move3d } from 'lucide-react';

export const PrestigeKeycard3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, (width / height) || 1.4, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL unavailable in PrestigeKeycard3D, using CSS card:', err);
      setWebglAvailable(false);
      return;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.8);
    dirLight1.position.set(5, 5, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x94a3b8, 2.4);
    dirLight2.position.set(-6, -4, -3);
    scene.add(dirLight2);

    const specularPointerLight = new THREE.PointLight(0xffffff, 4.2, 14);
    specularPointerLight.position.set(0, 0, 4);
    scene.add(specularPointerLight);

    // Card Group
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Canvas Texture for Card Front
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 1024;
    canvasTexture.height = 640;
    const ctx = canvasTexture.getContext('2d');

    if (ctx) {
      // Midnight Platinum Obsidian Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
      bgGrad.addColorStop(0, '#101626');
      bgGrad.addColorStop(0.3, '#070C16');
      bgGrad.addColorStop(0.65, '#141E34');
      bgGrad.addColorStop(1, '#050912');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 640);

      // Geometric Guilloche / Diamond Lattice in Subtle Silver
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.16)';
      ctx.lineWidth = 1;
      for (let i = -640; i < 1024; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 640, 640);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i + 640, 0);
        ctx.lineTo(i, 640);
        ctx.stroke();
      }

      // Outer Dual Metallic Frame (Brilliant Silver & White)
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 5;
      ctx.strokeRect(26, 26, 972, 588);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(38, 38, 948, 564);

      // Corner Cornerstones
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(22, 22, 18, 18);
      ctx.fillRect(984, 22, 18, 18);
      ctx.fillRect(22, 600, 18, 18);
      ctx.fillRect(984, 600, 18, 18);

      // Brand Wordmark
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Cinzel", serif';
      ctx.letterSpacing = '6px';
      ctx.fillText('LUXURY LOUNGE', 75, 110);

      ctx.fillStyle = '#CBD5E1';
      ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('EXECUTIVE & PRIVATE OFFICE • GLOBAL', 75, 142);

      // EMV Platinum Chip
      const chipGrad = ctx.createLinearGradient(75, 205, 185, 290);
      chipGrad.addColorStop(0, '#FFFFFF');
      chipGrad.addColorStop(0.5, '#E2E8F0');
      chipGrad.addColorStop(1, '#94A3B8');
      ctx.fillStyle = chipGrad;
      ctx.roundRect ? ctx.roundRect(75, 205, 110, 85, 8) : ctx.fillRect(75, 205, 110, 85);
      ctx.fill();

      // Chip Circuits
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(88, 218, 84, 59);
      ctx.beginPath();
      ctx.moveTo(130, 205);
      ctx.lineTo(130, 290);
      ctx.moveTo(75, 247);
      ctx.lineTo(185, 247);
      ctx.stroke();

      // Contactless Wave
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2.5;
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(235, 247, r * 14, -Math.PI / 3, Math.PI / 3);
        ctx.stroke();
      }

      // Tier Name: PRESTIGE
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 64px "Cinzel", serif';
      ctx.fillText('PRESTIGE', 75, 425);

      // Role
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('ROLE: EXECUTIVE & LIFESTYLE CONCIERGE', 75, 480);

      // Member ID & Expiry
      ctx.font = '500 17px monospace';
      ctx.fillStyle = '#E2E8F0';
      ctx.fillText('LL-PRE • 0088 / 2026', 75, 560);

      ctx.textAlign = 'right';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#F1F5F9';
      ctx.fillText('EXTENDED-HOURS DESK', 945, 560);
    }

    const frontTexture = new THREE.CanvasTexture(canvasTexture);
    frontTexture.colorSpace = THREE.SRGBColorSpace;

    // Card Back Texture
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 1024;
    backCanvas.height = 640;
    const bCtx = backCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#090D18';
      bCtx.fillRect(0, 0, 1024, 640);

      // Magnetic Stripe
      bCtx.fillStyle = '#020407';
      bCtx.fillRect(0, 70, 1024, 110);

      // Signature Strip
      bCtx.fillStyle = '#F8FAFC';
      bCtx.fillRect(60, 240, 680, 65);
      bCtx.font = 'italic 28px "Playfair Display", cursive';
      bCtx.fillStyle = '#0F172A';
      bCtx.fillText('Executive Client Signature • Verified Access', 80, 282);

      // Security Code
      bCtx.fillStyle = '#1E293B';
      bCtx.fillRect(750, 240, 120, 65);
      bCtx.fillStyle = '#FFFFFF';
      bCtx.font = 'bold 24px monospace';
      bCtx.fillText('912', 790, 282);

      // Guidelines & Hotline
      bCtx.fillStyle = '#94A3B8';
      bCtx.font = '15px "Plus Jakarta Sans", sans-serif';
      bCtx.fillText('PRIORITY EXECUTIVE HOTLINE: +971 4 800 PRESTIGE', 60, 370);
      bCtx.fillText('PRIORITY HANDLING FOR LAST-MINUTE REQUESTS', 60, 400);
      bCtx.fillText('EXTENDED-HOURS SUPPORT • PRIVATE AVIATION & ASSETS', 60, 430);

      // Silver Frame
      bCtx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      bCtx.lineWidth = 4;
      bCtx.strokeRect(30, 30, 964, 580);
    }

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;

    // Card Materials
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.96,
      roughness: 0.16,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      metalness: 0.82,
      roughness: 0.24,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: 0.8,
      roughness: 0.3,
    });

    // Box Geometry: width 4.5, height 2.85, depth 0.08
    const cardGeometry = new THREE.BoxGeometry(4.5, 2.85, 0.07);

    const materials = [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      frontMaterial,
      backMaterial,
    ];

    const cardMesh = new THREE.Mesh(cardGeometry, materials);
    cardGroup.add(cardMesh);

    // Beveled Wireframe Edge
    const frameGeo = new THREE.BoxGeometry(4.56, 2.91, 0.05);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: true,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    cardGroup.add(frameMesh);

    // Orbiting Particles (Silver & Diamond Starlight)
    const particlesCount = 320;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.8 + Math.random() * 2.5;
      const y = (Math.random() - 0.5) * 4.2;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.052,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Tracking
    let targetRotationX = 0.18;
    let targetRotationY = -0.35;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      specularPointerLight.position.x = x * 4.5;
      specularPointerLight.position.y = y * 3.5;

      if (!isDragging) {
        targetRotationY = x * 0.75;
        targetRotationX = -y * 0.55;
      } else {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        cardGroup.rotation.y += deltaX * 0.01;
        cardGroup.rotation.x += deltaY * 0.01;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    // Mobile touch interaction
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMouseX;
        const deltaY = e.touches[0].clientY - previousMouseY;
        cardGroup.rotation.y += deltaX * 0.012;
        cardGroup.rotation.x += deltaY * 0.012;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 450;
      const h = container.clientHeight || 320;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (renderer) renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      try {
        const elapsedTime = clock.getElapsedTime();

        if (particles && particles.rotation) {
          particles.rotation.y = elapsedTime * 0.09;
          particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.12;
        }

        if (!isDragging && cardGroup) {
          if (autoRotate) {
            cardGroup.rotation.y += 0.007;
            cardGroup.rotation.x = THREE.MathUtils.lerp(
              cardGroup.rotation.x,
              Math.sin(elapsedTime * 1.2) * 0.12 + targetRotationX * 0.4,
              0.05
            );
          } else {
            cardGroup.rotation.x = THREE.MathUtils.lerp(cardGroup.rotation.x, targetRotationX, 0.06);
            cardGroup.rotation.y = THREE.MathUtils.lerp(cardGroup.rotation.y, targetRotationY, 0.06);
          }
          cardGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      } catch (renderErr) {
        console.warn('Prestige card render error, using CSS fallback:', renderErr);
        cancelAnimationFrame(animationFrameId);
        setWebglAvailable(false);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('touchstart', onTouchStart);

      try {
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        if (renderer) renderer.dispose();
        cardGeometry.dispose();
        frameGeo.dispose();
        particleGeometry.dispose();
        frontTexture.dispose();
        backTexture.dispose();
        edgeMaterial.dispose();
        frontMaterial.dispose();
        backMaterial.dispose();
        frameMat.dispose();
        particleMaterial.dispose();
      } catch {
        // Safe cleanup
      }
    };
  }, [autoRotate]);

  if (!webglAvailable) {
    return (
      <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#111A2E]/90 via-[#080E1C]/95 to-[#02050B] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex items-center justify-center p-6 group select-none">
        <div className="relative w-full max-w-[420px] aspect-[1.586/1] rounded-2xl p-6 border-2 border-white/60 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.15)] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03]">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-white font-serif font-bold text-lg tracking-[0.2em] uppercase">LUXURY LOUNGE</div>
              <div className="text-[#94A3B8] font-mono text-[9px] tracking-widest uppercase">EXECUTIVE CLIENT OFFICE • MONACO</div>
            </div>
            <div className="w-12 h-9 rounded-md bg-gradient-to-br from-white via-[#CBD5E1] to-[#64748B] border border-white/40 shadow-sm flex items-center justify-center">
              <div className="w-8 h-5 border border-[#334155]/40 rounded-sm" />
            </div>
          </div>
          <div className="my-auto py-2">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-[0.25em] uppercase luxury-silver-animated-text luxury-silver-prestige">
              PRESTIGE
            </div>
            <div className="text-[10px] font-mono text-[#CBD5E1] tracking-widest uppercase mt-1">
              EXECUTIVE KEYCARD • VERIFIED NO. 0029-MCO
            </div>
          </div>
          <div className="flex items-end justify-between border-t border-white/15 pt-3">
            <div>
              <div className="text-[9px] font-mono text-[#94A3B8] uppercase">PATRON HOLDER</div>
              <div className="text-xs font-mono text-white font-medium tracking-widest">EXECUTIVE MEMBER</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-mono text-[#94A3B8] uppercase">VALID WORLDWIDE</div>
              <div className="text-[10px] font-mono text-[#E2E8F0] tracking-widest">HELIPAD & JET DISPATCH</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#111A2E]/85 via-[#080E1C]/90 to-[#02050B] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between p-3.5 sm:p-6 group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.18),transparent_65%)]" />

      {/* 3D Top Header Overlay */}
      <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
          <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#F1F5F9]">
            Interactive 3D Executive Keycard
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#A0ABBA] hidden xs:block">
          {isInteracting ? 'Free Orbit' : autoRotate ? 'Auto Orbit' : 'Active'}
        </div>
      </div>

      {/* Three.js Canvas Mount */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
        title="Swipe or drag to rotate 3D Prestige Keycard • Move cursor to inspect platinum sheen"
      />

      {/* 3D Bottom Floating Control HUD */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-[#CBD5E1] font-light bg-black/55 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 rounded-full border border-white/10">
          <Move3d className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
          <span className="hidden sm:inline">Click + Drag to rotate 360° • Move cursor to tilt</span>
          <span className="sm:hidden">Swipe to rotate 360°</span>
        </div>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-2.5 sm:px-3 py-1.5 text-[9px] sm:text-[10px] tracking-wider uppercase font-serif rounded-full transition-all duration-300 flex items-center gap-1.5 border cursor-pointer ${
            autoRotate
              ? 'bg-white/20 border-white/60 text-white'
              : 'bg-white/5 border-white/20 text-[#C0C8D6] hover:bg-white/10'
          }`}
        >
          <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
          <span>{autoRotate ? 'Pause 360°' : 'Resume 360°'}</span>
        </button>
      </div>
    </div>
  );
};
