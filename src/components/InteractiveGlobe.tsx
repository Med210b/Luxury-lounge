import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, X, Plane, Sparkles, ChevronRight, MapPin, Globe } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import worldLandData from '../data/world-land.json';
import highlightedCountriesData from '../data/highlighted-countries.json';

export type DestinationRegion = 'ALL' | 'GULF' | 'NORTH AFRICA' | 'EUROPE';

export type LabelPlacement =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export interface DestinationHub {
  id: string;
  name: string;
  country: string;
  region: 'GULF' | 'NORTH AFRICA' | 'EUROPE';
  lat: number;
  lng: number;
  labelPlacement: LabelPlacement;
  tagline: string;
  fboTerminal: string;
  flightTimeFromDxb: string;
  privileges: string[];
}

export const DESTINATION_HUBS: DestinationHub[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'GULF',
    lat: 25.2048,
    lng: 55.2708,
    labelPlacement: 'top-right',
    tagline: 'Global Epicenter of Private Aviation, DIFC & Superyacht Berths',
    fboTerminal: 'Jetex VIP Terminal (DWC) & DXB Royal Apron',
    flightTimeFromDxb: 'Home Base',
    privileges: [
      'Expedited airside tarmac escort through Jetex VIP FBO',
      'Burj Al Arab Royal Suite reservations & dedicated butler',
      'Dubai Harbour 80m+ superyacht moorings & tender transfer',
      'Airside helicopter transfers across DIFC & Palm Jumeirah',
    ],
  },
  {
    id: 'saudi',
    name: 'Saudi',
    country: 'Kingdom of Saudi Arabia',
    region: 'GULF',
    lat: 24.6500,
    lng: 44.5000,
    labelPlacement: 'bottom-left',
    tagline: 'Royal Protocol, Diriyah Heritage & Red Sea Private Island Havens',
    fboTerminal: 'Riyadh Private Aviation Terminal (RUH) & Jeddah Royal Apron',
    flightTimeFromDxb: '1h 45m non-stop',
    privileges: [
      'Direct tarmac protocol clearance at King Khalid VIP Terminal',
      'Privileged VIP access to exclusive Riyadh Season & AlUla pavilions',
      'Red Sea Global luxury private yacht charter & island villa sequester',
      'Armoured executive convoy & sovereign business liaison support',
    ],
  },
  {
    id: 'qatar',
    name: 'Qatar',
    country: 'State of Qatar',
    region: 'GULF',
    lat: 25.3200,
    lng: 51.5200,
    labelPlacement: 'bottom',
    tagline: 'Lusail Marina Superyacht Moorings & Private Pearl Sanctuaries',
    fboTerminal: 'Doha Hamad VIP Executive Terminal (DOH)',
    flightTimeFromDxb: '1h 10m non-stop',
    privileges: [
      'Discreet tarmac customs & VIP lounge at Hamad Executive FBO',
      'Lusail Marina private superyacht mooring reservations',
      'Katara Towers & Raffles Doha Royal Suite arrangements',
      'Exclusive access to Qatar Museums private royal viewings',
    ],
  },
  {
    id: 'el-bahrain',
    name: 'El-Bahrain',
    country: 'Kingdom of Bahrain',
    region: 'GULF',
    lat: 26.2285,
    lng: 50.5860,
    labelPlacement: 'top',
    tagline: 'Financial Harbor Penthouses, F1 Paddock Clubs & Island Charters',
    fboTerminal: 'Bahrain International VIP Terminal (BAH)',
    flightTimeFromDxb: '1h 15m non-stop',
    privileges: [
      'Bespoke FBO reception at Bahrain International VIP Terminal',
      'Bahrain International Circuit F1 Paddock Club hospitality',
      'Four Seasons Bahrain Bay Royal Villa sequestration',
      'Private offshore island charters across Hawar archipelago',
    ],
  },
  {
    id: 'oman',
    name: 'Oman',
    country: 'Sultanate of Oman',
    region: 'GULF',
    lat: 23.3500,
    lng: 58.5500,
    labelPlacement: 'bottom-right',
    tagline: 'Musandam Fjords, Chedi Sanctuaries & Jabal Akhdar Cliffside Retreats',
    fboTerminal: 'Muscat International VIP Apron (MCT)',
    flightTimeFromDxb: '1h 05m non-stop',
    privileges: [
      'Airside luxury escort at Muscat Executive Apron',
      'Private dhow & superyacht expeditions through Musandam Fjords',
      'The Chedi Muscat & Alila Jabal Akhdar cliffside suites',
      'Helicopter transfers to Empty Quarter private desert encampments',
    ],
  },
  {
    id: 'egypte',
    name: 'Egypte',
    country: 'Arab Republic of Egypt',
    region: 'NORTH AFRICA',
    lat: 29.5000,
    lng: 31.0000,
    labelPlacement: 'bottom-right',
    tagline: 'Giza Private Plateau Access, Nile Dahabiyas & Red Sea Escapes',
    fboTerminal: 'Cairo International Private Jet Terminal (CAI)',
    flightTimeFromDxb: '3h 30m non-stop',
    privileges: [
      'Private after-hours access to Giza Pyramids & Grand Egyptian Museum',
      'Exclusive Nile charter aboard bespoke heritage Dahabiyas',
      'Four Seasons Nile Plaza & First Residence Royal Suites',
      'Airside private jet customs clearance at Cairo VIP Terminal',
    ],
  },
  {
    id: 'maroc',
    name: 'Maroc',
    country: 'Kingdom of Morocco',
    region: 'NORTH AFRICA',
    lat: 31.7917,
    lng: -7.0926,
    labelPlacement: 'bottom-left',
    tagline: 'Royal Mansour Riads, Palmeraie Estates & Atlas Heli-Skiing',
    fboTerminal: 'Marrakech Menara VIP Terminal (RAK) & Casablanca (CMN)',
    flightTimeFromDxb: '7h 30m non-stop',
    privileges: [
      'Royal Mansour Marrakech multi-story Private Riad sequestration',
      'Expedited diplomatic VIP lounge clearance at Marrakech Menara',
      'Helicopter expeditions into the High Atlas & Agafay Desert',
      'Exclusive reservations at La Mamounia & heritage riad salons',
    ],
  },
  {
    id: 'algeria',
    name: 'Algeria',
    country: 'People’s Democratic Republic of Algeria',
    region: 'NORTH AFRICA',
    lat: 33.5000,
    lng: 3.0588,
    labelPlacement: 'bottom',
    tagline: 'El Aurassi Bay Panoramas, Tassili n’Ajjer & Mediterranean Charters',
    fboTerminal: 'Algiers Houari Boumediene VIP Salon (ALG)',
    flightTimeFromDxb: '6h 45m non-stop',
    privileges: [
      'Diplomatic fast-track customs & airside salon at Algiers VIP FBO',
      'Private aviation charters to UNESCO Tassili n’Ajjer & Djanet oasis',
      'El Aurassi & luxury seafront Mediterranean villa accommodations',
      'Secure armoured motorcade transfers across the diplomatic quarter',
    ],
  },
  {
    id: 'tunisia',
    name: 'Tunisia',
    country: 'Republic of Tunisia',
    region: 'NORTH AFRICA',
    lat: 35.5000,
    lng: 9.8000,
    labelPlacement: 'top-right',
    tagline: 'Sidi Bou Said Blue Havens, Carthage Estates & Hammamet Retreats',
    fboTerminal: 'Tunis-Carthage Executive Pavilion (TUN)',
    flightTimeFromDxb: '6h 15m non-stop',
    privileges: [
      'VIP protocol reception at Tunis-Carthage Presidential Pavilion',
      'Private cliffside villa sequester overlooking the Gulf of Tunis',
      'After-hours curated access to Carthage ruins & Bardo Museum',
      'Superyacht charters along the Tabarka coral coast and Djerba',
    ],
  },
  {
    id: 'spain',
    name: 'Spain',
    country: 'Kingdom of Spain',
    region: 'EUROPE',
    lat: 40.4168,
    lng: -3.7038,
    labelPlacement: 'top-left',
    tagline: 'Salamanca Palaces, Marbella Golden Mile & Balearic Superyachts',
    fboTerminal: 'Madrid Barajas VIP Terminal (MAD) & Ibiza Jet Center (IBZ)',
    flightTimeFromDxb: '7h 10m non-stop',
    privileges: [
      'Fast-track private apron ramp clearance at Madrid & Ibiza FBOs',
      'Marbella Club & Puerto Banús superyacht berth reservations',
      'Mandarin Oriental Ritz Madrid Royal Suite bookings',
      'Private helicopter transfers to Formentera & Andalusian fincas',
    ],
  },
  {
    id: 'france',
    name: 'France',
    country: 'French Republic',
    region: 'EUROPE',
    lat: 47.0000,
    lng: 2.2137,
    labelPlacement: 'top',
    tagline: 'Le Bourget VIP Apron, Place Vendôme Salons & Côte d’Azur Villas',
    fboTerminal: 'Paris-Le Bourget VIP Terminal (LFPB) & Nice Jet Aviation (NCE)',
    flightTimeFromDxb: '6h 50m non-stop',
    privileges: [
      'Discreet airside tarmac clearance at Paris-Le Bourget',
      'The Ritz Paris & Hôtel de Crillon Presidential Suite access',
      'Côte d’Azur cliffside villa sequester & Saint-Tropez yacht berths',
      'Helicopter transfers direct to Courchevel 1850 altisurface',
    ],
  },
  {
    id: 'italy',
    name: 'Italy',
    country: 'Italian Republic',
    region: 'EUROPE',
    lat: 41.9028,
    lng: 12.4964,
    labelPlacement: 'top-right',
    tagline: 'Lake Como Historic Villas, Milan High Fashion & Costa Smeralda',
    fboTerminal: 'Milan Linate Prime (LIN) & Rome Ciampino VIP (CIA)',
    flightTimeFromDxb: '6h 15m non-stop',
    privileges: [
      'Priority ramp access and customs clearance at Milan Linate Prime',
      'Private historical villa buyout along Lake Como & Villa d’Este',
      'Porto Cervo Costa Smeralda guaranteed superyacht moorings',
      'After-hours private Vatican and Milanese couture atelier tours',
    ],
  },
];

const FLIGHT_ARCS = [
  { from: 'dubai', to: 'saudi' },
  { from: 'dubai', to: 'qatar' },
  { from: 'dubai', to: 'el-bahrain' },
  { from: 'dubai', to: 'oman' },
  { from: 'dubai', to: 'egypte' },
  { from: 'egypte', to: 'tunisia' },
  { from: 'tunisia', to: 'algeria' },
  { from: 'algeria', to: 'maroc' },
  { from: 'maroc', to: 'spain' },
  { from: 'spain', to: 'france' },
  { from: 'france', to: 'italy' },
  { from: 'italy', to: 'dubai' },
  { from: 'dubai', to: 'france' },
  { from: 'dubai', to: 'spain' },
];

/**
 * Spherical coordinate conversion:
 * Maps latitude and longitude to 3D Cartesian coordinates on the sphere.
 */
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Generates an accurate 2D continental mask from Natural Earth GeoJSON
 * to sample authentic landmasses, coastlines, and open seas on the 3D globe.
 */
function generateLandMask(): (lat: number, lng: number) => boolean {
  const width = 720;
  const height = 360;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => false;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';

  const toX = (lng: number) => ((lng + 180) / 360) * width;
  const toY = (lat: number) => ((90 - lat) / 180) * height;

  const drawRing = (ring: [number, number][]) => {
    if (!ring || ring.length < 3) return;
    ctx.beginPath();
    ctx.moveTo(toX(ring[0][0]), toY(ring[0][1]));
    for (let i = 1; i < ring.length; i++) {
      ctx.lineTo(toX(ring[i][0]), toY(ring[i][1]));
    }
    ctx.closePath();
    ctx.fill();
  };

  // Render all real world landmass features from Natural Earth
  (worldLandData as any).features.forEach((feat: any) => {
    if (feat.geometry.type === 'Polygon') {
      feat.geometry.coordinates.forEach((ring: any) => drawRing(ring));
    } else if (feat.geometry.type === 'MultiPolygon') {
      feat.geometry.coordinates.forEach((poly: any) => {
        poly.forEach((ring: any) => drawRing(ring));
      });
    }
  });

  const imgData = ctx.getImageData(0, 0, width, height).data;

  return (lat: number, lng: number): boolean => {
    const x = Math.min(width - 1, Math.max(0, Math.floor(((lng + 180) / 360) * width)));
    const y = Math.min(height - 1, Math.max(0, Math.floor(((90 - lat) / 180) * height)));
    const idx = (y * width + x) * 4;
    return imgData[idx] > 100;
  };
}

function getPlacementClass(placement: LabelPlacement): string {
  switch (placement) {
    case 'top-left':
      return '-translate-x-full -translate-y-full -translate-x-2 -translate-y-2';
    case 'top':
      return '-translate-x-1/2 -translate-y-full -translate-y-3';
    case 'top-right':
      return 'translate-x-2.5 -translate-y-full -translate-y-2';
    case 'bottom-left':
      return '-translate-x-full translate-y-2 -translate-x-2';
    case 'bottom':
      return '-translate-x-1/2 translate-y-3';
    case 'bottom-right':
      return 'translate-x-2.5 translate-y-2';
    default:
      return 'translate-x-2 -translate-y-1/2';
  }
}

export const InteractiveGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const labelDomsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const [selectedHub, setSelectedHub] = useState<DestinationHub | null>(null);
  const [hoveredHub, setHoveredHub] = useState<DestinationHub | null>(null);
  const [activeRegion, setActiveRegion] = useState<DestinationRegion>('ALL');
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(true);

  const filteredHubs =
    activeRegion === 'ALL'
      ? DESTINATION_HUBS
      : DESTINATION_HUBS.filter((h) => h.region === activeRegion);

  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Rotate smoothly to bring selected Hub front and center
  const handleSelectHub = useCallback((hub: DestinationHub) => {
    setSelectedHub(hub);
    setIsRotating(false);

    const targetY = ((-hub.lng - 90) * Math.PI) / 180;
    const targetX = ((hub.lat * Math.PI) / 180) * 0.75;
    targetRotationRef.current = { x: targetX, y: targetY };
  }, []);

  // Reset to default cinematic perspective (Europe / Middle East / Africa visible)
  const handleReset = useCallback(() => {
    targetRotationRef.current = {
      x: 0.20,
      y: ((-25 - 90) * Math.PI) / 180,
    };
    setSelectedHub(null);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 580;
    let height = container.clientHeight || 580;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Position camera for optimal globe presence and generous label clearance
    camera.position.set(0, 0, 230);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Globe Group
    const globeGroup = new THREE.Group();
    // Default orientation: Europe, Africa, and Dubai/Middle East facing camera
    globeGroup.rotation.x = 0.20;
    globeGroup.rotation.y = ((-25 - 90) * Math.PI) / 180;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const GLOBE_RADIUS = 72;

    // 3A. Dark Solid Inner Core (Occludes rear dots naturally)
    const coreGeo = new THREE.SphereGeometry(GLOBE_RADIUS - 0.4, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x050a15,
      transparent: true,
      opacity: 0.98,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 3B. Delicate Lat/Lng Grid Wireframe
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(GLOBE_RADIUS + 0.1, 24, 24));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.08,
    });
    const wireSphere = new THREE.LineSegments(wireGeo, wireMat);
    globeGroup.add(wireSphere);

    // 3C. High-Density Luminous White Particle Cloud for Continents
    const isLand = generateLandMask();
    const dotsCount = 16500;
    const dotPositions: number[] = [];
    const dotColors: number[] = [];
    const phiAngle = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    const pureWhite = new THREE.Color(0xffffff);
    const brightSilver = new THREE.Color(0xe2e8f0);
    const oceanDark = new THREE.Color(0x111c2e);

    for (let i = 0; i < dotsCount; i++) {
      const y = 1 - (i / (dotsCount - 1)) * 2;
      const lat = 90 - Math.acos(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
      const theta = phiAngle * i;
      let lng = ((theta * 180) / Math.PI) % 360;
      if (lng > 180) lng -= 360;

      const land = isLand(lat, lng);

      if (land || Math.random() < 0.04) {
        const pt = latLngToVector3(lat, lng, GLOBE_RADIUS * (land ? 1.002 : 0.998));
        dotPositions.push(pt.x, pt.y, pt.z);

        if (land) {
          const col = Math.random() > 0.25 ? pureWhite : brightSilver;
          dotColors.push(col.r, col.g, col.b);
        } else {
          dotColors.push(oceanDark.r, oceanDark.g, oceanDark.b);
        }
      }
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));
    const dotMat = new THREE.PointsMaterial({
      size: 1.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.94,
    });
    const globePoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(globePoints);

    // 3D. Atmospheric Edge Glow Rim (Celestial horizon sheen matching lux lou.jpg)
    const haloGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 36, 36);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 3E. Glowing 3D National Borders for the 12 Destination Countries
    const borderGroup = new THREE.Group();
    const borderMat = new THREE.LineBasicMaterial({
      color: 0xc4cfe0,
      transparent: true,
      opacity: 0.5,
    });

    (highlightedCountriesData as any).features.forEach((feat: any) => {
      const addRing = (ring: [number, number][]) => {
        if (!ring || ring.length < 2) return;
        const pts = ring.map(([lng, lat]) => latLngToVector3(lat, lng, GLOBE_RADIUS * 1.003));
        const geom = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(geom, borderMat);
        borderGroup.add(line);
      };

      if (feat.geometry.type === 'Polygon') {
        feat.geometry.coordinates.forEach((ring: any) => addRing(ring));
      } else if (feat.geometry.type === 'MultiPolygon') {
        feat.geometry.coordinates.forEach((poly: any) => poly.forEach((ring: any) => addRing(ring)));
      }
    });
    globeGroup.add(borderGroup);

    // 4. Interactive 3D Destination Pins
    const hitObjects: THREE.Object3D[] = [];
    const pinTrackers: { hubId: string; headMesh: THREE.Mesh; pulseRing: THREE.Mesh }[] = [];

    DESTINATION_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, GLOBE_RADIUS);
      const normal = pos.clone().normalize();
      const pinSubgroup = new THREE.Group();

      // Slender vertical silver stem
      const stemHeight = 6.0;
      const stemGeo = new THREE.CylinderGeometry(0.3, 0.3, stemHeight, 8);
      stemGeo.translate(0, stemHeight / 2, 0);
      const stemMat = new THREE.MeshBasicMaterial({ color: 0xe5e7eb });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.copy(pos);
      stemMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      pinSubgroup.add(stemMesh);

      // Glowing Jewel Pearl Head
      const headPos = pos.clone().add(normal.clone().multiplyScalar(stemHeight));
      const headGeo = new THREE.SphereGeometry(1.6, 16, 16);
      const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.copy(headPos);
      pinSubgroup.add(headMesh);

      // Concentric Radar Beacon Pulse Ring
      const ringGeo = new THREE.RingGeometry(1.0, 2.2, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.4)));
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      pinSubgroup.add(ringMesh);

      // Raycaster Hit Target (Transparent so Three.js Raycaster detects clicks reliably!)
      const hitGeo = new THREE.SphereGeometry(7.5, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(headPos);
      hitMesh.userData = { hubId: hub.id };
      pinSubgroup.add(hitMesh);
      hitObjects.push(hitMesh);

      globeGroup.add(pinSubgroup);
      pinTrackers.push({ hubId: hub.id, headMesh, pulseRing: ringMesh });
    });

    // 5. Silver Flight Arcs
    const flightPulses: { curve: THREE.CatmullRomCurve3; mesh: THREE.Mesh; progress: number; speed: number }[] = [];

    FLIGHT_ARCS.forEach((arc, idx) => {
      const fromHub = DESTINATION_HUBS.find((h) => h.id === arc.from);
      const toHub = DESTINATION_HUBS.find((h) => h.id === arc.to);
      if (!fromHub || !toHub) return;

      const v1 = latLngToVector3(fromHub.lat, fromHub.lng, GLOBE_RADIUS);
      const v2 = latLngToVector3(toHub.lat, toHub.lng, GLOBE_RADIUS);
      const dist = v1.distanceTo(v2);

      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      const altitude = GLOBE_RADIUS + Math.min(22, dist * 0.22);
      mid.normalize().multiplyScalar(altitude);

      const p1 = v1.clone().lerp(mid, 0.5).normalize().multiplyScalar(GLOBE_RADIUS + Math.min(15, dist * 0.15));
      const p2 = v2.clone().lerp(mid, 0.5).normalize().multiplyScalar(GLOBE_RADIUS + Math.min(15, dist * 0.15));

      const curve = new THREE.CatmullRomCurve3([v1, p1, mid, p2, v2]);
      const pts = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xc4cfe0,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(line);

      const pulseGeo = new THREE.SphereGeometry(0.8, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      globeGroup.add(pulseMesh);

      flightPulses.push({
        curve,
        mesh: pulseMesh,
        progress: (idx * 0.22) % 1,
        speed: 0.0022 + (idx % 2) * 0.0007,
      });
    });

    // 6. User Drag & Click Controls
    let isDragging = false;
    let dragDistance = 0;
    let dragStartTime = 0;
    let prevPointer = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };

    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      isDragging = true;
      dragDistance = 0;
      dragStartTime = Date.now();
      prevPointer = { x: clientX, y: clientY };
      velocity = { x: 0, y: 0 };
      targetRotationRef.current = null;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const dx = clientX - prevPointer.x;
        const dy = clientY - prevPointer.y;
        dragDistance += Math.hypot(dx, dy);

        globeGroup.rotation.y += dx * 0.0055;
        globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x + dy * 0.0055));

        velocity = { x: dx * 0.004, y: dy * 0.004 };
        prevPointer = { x: clientX, y: clientY };
      } else if (!('touches' in e)) {
        // Desktop Raycasting for Hover Detection
        const rect = container.getBoundingClientRect();
        mouseNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouseNDC, camera);
        const intersects = raycaster.intersectObjects(hitObjects);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const hubId = hit.userData.hubId;
          const found = DESTINATION_HUBS.find((h) => h.id === hubId);
          if (found) {
            setHoveredHub(found);
            container.style.cursor = 'pointer';
          }
        } else {
          setHoveredHub(null);
          container.style.cursor = 'grab';
        }
      }
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      isDragging = false;

      // Click detection (Displacement < 10px & Duration < 400ms)
      if (dragDistance < 10 && Date.now() - dragStartTime < 400) {
        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
        const rect = container.getBoundingClientRect();

        mouseNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouseNDC, camera);
        const intersects = raycaster.intersectObjects(hitObjects);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const hubId = hit.userData.hubId;
          const found = DESTINATION_HUBS.find((h) => h.id === hubId);
          if (found) {
            handleSelectHub(found);
          }
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        if (cr.width > 0 && cr.height > 0) {
          width = cr.width;
          height = cr.height;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. 60 FPS Render Loop
    let animId: number;
    let pulseScale = 1;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Handle Smooth Rotation Target
      if (targetRotationRef.current) {
        const tr = targetRotationRef.current;
        let dy = tr.y - globeGroup.rotation.y;
        while (dy > Math.PI) dy -= Math.PI * 2;
        while (dy < -Math.PI) dy += Math.PI * 2;

        globeGroup.rotation.y += dy * 0.06;
        globeGroup.rotation.x += (tr.x - globeGroup.rotation.x) * 0.06;

        if (Math.abs(dy) < 0.002 && Math.abs(tr.x - globeGroup.rotation.x) < 0.002) {
          targetRotationRef.current = null;
        }
      } else if (!isDragging) {
        if (Math.abs(velocity.x) > 0.0001 || Math.abs(velocity.y) > 0.0001) {
          globeGroup.rotation.y += velocity.x;
          globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x + velocity.y));
          velocity.x *= 0.94;
          velocity.y *= 0.94;
        } else if (isRotatingRef.current) {
          globeGroup.rotation.y += 0.0016;
        }
      }

      // Animate Flight pulses
      flightPulses.forEach((pulse) => {
        pulse.progress = (pulse.progress + pulse.speed) % 1;
        const pt = pulse.curve.getPoint(pulse.progress);
        pulse.mesh.position.copy(pt);
      });

      // Animate Pin beacon rings
      pulseScale += 0.02;
      if (pulseScale > 2.5) pulseScale = 1;
      pinTrackers.forEach((item) => {
        item.pulseRing.scale.set(pulseScale, pulseScale, pulseScale);
        const mat = item.pulseRing.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 0.6 * (1 - (pulseScale - 1) / 1.5));
      });

      // Project 3D Pin Positions Directly to Screen Coordinates
      pinTrackers.forEach((tracker) => {
        const labelDom = labelDomsRef.current.get(tracker.hubId);
        if (!labelDom) return;

        // Obtain exact 3D world position of the pin head from Three.js scene hierarchy
        tracker.headMesh.getWorldPosition(tempVec);

        // Visibility check: Front-facing hemisphere (z > 2)
        const isFacing = tempVec.z > 2;

        if (isFacing) {
          // Project 3D world vector into normalized device coordinates (-1 to +1)
          tempVec.project(camera);
          const screenX = (tempVec.x * 0.5 + 0.5) * width;
          const screenY = (-(tempVec.y * 0.5) + 0.5) * height;

          // Smooth edge opacity falloff as pin approaches globe horizon
          const edgeOpacity = Math.max(0, Math.min(1, (tracker.headMesh.getWorldPosition(new THREE.Vector3()).z - 2) / 16));

          labelDom.style.transform = `translate3d(${screenX}px, ${screenY}px, 0)`;
          labelDom.style.opacity = `${edgeOpacity}`;
          labelDom.style.pointerEvents = edgeOpacity > 0.4 ? 'auto' : 'none';
        } else {
          labelDom.style.opacity = '0';
          labelDom.style.pointerEvents = 'none';
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [handleSelectHub]);

  return (
    <section
      id="destinations"
      className="py-20 md:py-28 relative bg-transparent overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#0A1128] opacity-60 blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Section Heading */}
        <SectionHeader
          chapter="Chapter II • Global Destinations"
          title="Explore Global Possibilities"
          subtitle="“Interactive cartography of international private aviation corridors, diplomatic FBO aprons, and sovereign moorings.”"
          className="mb-8"
        />

        {/* Destination Quick Selector Strip */}
        <div className="w-full max-w-4xl mb-6 z-20 flex flex-col items-center gap-3">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {(['ALL', 'GULF', 'NORTH AFRICA', 'EUROPE'] as DestinationRegion[]).map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setActiveRegion(reg)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  activeRegion === reg
                    ? 'bg-white text-[#050A15] font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {reg === 'ALL'
                  ? 'ALL (12)'
                  : reg === 'GULF'
                  ? 'GULF (5)'
                  : reg === 'NORTH AFRICA'
                  ? 'NORTH AFRICA (4)'
                  : 'EUROPE (3)'}
              </button>
            ))}
          </div>

          {/* Destination Quick Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 px-2 max-w-3xl">
            {filteredHubs.map((hub) => {
              const isSelected = selectedHub?.id === hub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => handleSelectHub(hub)}
                  className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-r from-white to-[#F8FAFC] text-[#050A15] font-semibold shadow-[0_0_15px_rgba(255,255,255,0.5)] border border-white'
                      : 'bg-white/[0.05] border border-white/15 hover:border-white/70 text-[#CBD5E1] hover:text-white hover:bg-white/[0.1]'
                  }`}
                >
                  <MapPin
                    className={`w-3 h-3 transition-transform group-hover:scale-110 ${
                      isSelected ? 'text-[#050A15]' : 'text-[#E2E8F0]'
                    }`}
                  />
                  <span>{hub.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Dotted Particle Globe Stage - Pure Floating Canvas Matching lux lou.jpg */}
        <div className="relative w-full max-w-[720px] aspect-square flex items-center justify-center select-none">
          {/* Three.js Canvas */}
          <div
            ref={containerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            title="Drag to rotate the 3D globe • Click pins to explore destination privileges"
          />

          {/* Floating Projected City Labels (Rendered directly in DOM matching lux lou.jpg) */}
          <div
            ref={labelsContainerRef}
            className="absolute inset-0 pointer-events-none overflow-hidden z-20"
          >
            {DESTINATION_HUBS.map((hub) => {
              const isSelected = selectedHub?.id === hub.id;
              const isHovered = hoveredHub?.id === hub.id;

              return (
                <div
                  key={hub.id}
                  ref={(el) => {
                    if (el) labelDomsRef.current.set(hub.id, el);
                    else labelDomsRef.current.delete(hub.id);
                  }}
                  onClick={() => handleSelectHub(hub)}
                  className={`absolute top-0 left-0 transition-opacity duration-200 cursor-pointer pointer-events-auto select-none ${
                    isSelected || isHovered ? 'z-30' : 'z-20'
                  }`}
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                    opacity: 0,
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Directionally offset pin and label based on authentic geography */}
                  <div className={`flex items-center gap-1.5 group transition-all duration-300 ${getPlacementClass(hub.labelPlacement)}`}>
                    {/* Teardrop Map Pin Icon Marker */}
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-white text-[#050A15] shadow-[0_0_18px_rgba(255,255,255,0.95)] scale-110'
                          : isHovered
                          ? 'bg-white text-[#050A15] shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-105'
                          : 'bg-[#050A15]/90 text-white border border-[rgba(255,255,255,0.6)] backdrop-blur-md group-hover:border-white'
                      }`}
                    >
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                      </svg>
                    </div>

                    {/* Crisp Typography Label directly adjacent to pin */}
                    <span
                      className={`text-[10px] sm:text-xs font-serif tracking-wider px-2 py-0.5 rounded-full transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-nowrap backdrop-blur-md ${
                        isSelected
                          ? 'text-white font-semibold bg-[#050A15]/95 border border-white/80 shadow-[0_0_14px_rgba(255,255,255,0.55)]'
                          : isHovered
                          ? 'text-white font-medium bg-[#050A15]/90 border border-white/60'
                          : 'text-[#E2E8F0] bg-[#050A15]/75 border border-white/20 group-hover:text-white group-hover:border-white/50'
                      }`}
                    >
                      {hub.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimalist Floating Controls (Orbit & Reset) */}
          <div className="absolute bottom-2 right-2 sm:right-4 flex items-center gap-2 text-[11px] text-[#A0A7B8] z-30">
            <button
              type="button"
              onClick={() => setIsRotating(!isRotating)}
              aria-label={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
              className="px-3.5 py-1.5 rounded-full border border-white/40 bg-[rgba(255,255,255,0.08)] hover:bg-white hover:text-[#050A15] text-white hover:font-medium transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(255,255,255,0.15)]"
            >
              {isRotating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isRotating ? 'Orbit' : 'Paused'}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset View"
              className="p-2 rounded-full border border-white/40 bg-[rgba(255,255,255,0.08)] hover:bg-white hover:text-[#050A15] text-white transition-all cursor-pointer backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(255,255,255,0.15)]"
              title="Reset View"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Destination Hub Card Overlay (Appears smoothly when any pin is clicked) */}
        <AnimatePresence mode="wait">
          {selectedHub && (
            <motion.div
              key={selectedHub.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 p-6 sm:p-8 rounded-2xl border border-white/30 border-t-white/70 backdrop-blur-2xl max-w-2xl w-full shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.6)] relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 22%, rgba(15, 22, 38, 0.82) 55%, rgba(8, 13, 24, 0.95) 100%)',
              }}
            >
              {/* Luminous Frosted White Top Glow Bloom */}
              <div
                className="absolute inset-x-0 top-0 h-36 pointer-events-none rounded-t-2xl"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.12) 50%, transparent 80%)',
                }}
              />

              {/* Razor-sharp Specular White Top Rim */}
              <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedHub(null)}
                aria-label="Close details"
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/30 bg-white/[0.05] hover:border-white hover:bg-white hover:text-[#050A15] flex items-center justify-center text-white transition-all cursor-pointer z-20 shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title & Tagline */}
              <div className="relative z-10 pr-8 pb-4 border-b border-white/20">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#CBD5E1] mb-1">
                  <span>{selectedHub.country}</span>
                  <span>•</span>
                  <span>{selectedHub.flightTimeFromDxb}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {selectedHub.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#E2E8F0] font-light mt-1 italic">
                  {selectedHub.tagline}
                </p>
              </div>

              {/* Privileges List */}
              <div className="relative z-10 mt-5 space-y-2.5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#CBD5E1] font-serif mb-2">
                  Exclusive Privileges
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedHub.privileges.map((privilege) => (
                    <div
                      key={privilege}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.06] border border-white/20 text-xs text-[#F1F5F9] backdrop-blur-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{privilege}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dedicated Terminal Access & Inquiry Button */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                  <Plane className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>VIP Terminal: <span className="text-white font-medium">{selectedHub.fboTerminal}</span></span>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full border border-white/40 bg-white text-[#050A15] font-serif text-[11px] tracking-[0.2em] uppercase font-semibold hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all cursor-pointer"
                >
                  <span>Charter Flight</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
