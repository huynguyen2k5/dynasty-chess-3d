"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, Rotate3d, Sparkles } from "lucide-react";
import { General } from "@/types";

interface General3DCanvasProps {
  general: General;
  reaction?: "idle" | "check" | "capture" | "victory" | "defeat";
  height?: string;
  showControls?: boolean;
}

export default function General3DCanvas({
  general,
  reaction = "idle",
  height = "480px",
  showControls = true,
}: General3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // =========================================================================
    // 1. SCENE, CAMERA & LIGHTING (ACES Filmic & Theatrical Studio Rig)
    // =========================================================================
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.6, 6.4);
    camera.lookAt(0, 1.45, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.35);
    scene.add(ambientLight);

    // Main Overhead Directional Key Light
    const keyLight = new THREE.DirectionalLight(0xffecd2, 3.2);
    keyLight.position.set(4.5, 9.5, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // Faction-colored Rim Light
    const rimColor = new THREE.Color(general.accentColor);
    const rimLight = new THREE.PointLight(rimColor, 5.0, 14);
    rimLight.position.set(-4.5, 3.2, -3);
    scene.add(rimLight);

    // Cyan Fill Light
    const fillLight = new THREE.PointLight(0x38bdf8, 2.0, 10);
    fillLight.position.set(4, 2, 2.5);
    scene.add(fillLight);

    // Golden Pedestal Uplight
    const upLight = new THREE.PointLight(0xf59e0b, 2.2, 8);
    upLight.position.set(0, 0.6, 0);
    scene.add(upLight);

    // Master Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================================
    // 2. IMPERIAL PEDESTAL STAGE (Double Tier with Rotating Bagua Runes)
    // =========================================================================
    const stageGroup = new THREE.Group();
    rootGroup.add(stageGroup);

    // Base Stone Plinth
    const baseGeo = new THREE.CylinderGeometry(2.1, 2.3, 0.25, 36);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.85,
      roughness: 0.32,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.125;
    baseMesh.receiveShadow = true;
    stageGroup.add(baseMesh);

    // Inlaid Gold Rim Ring
    const goldRimGeo = new THREE.TorusGeometry(2.12, 0.045, 16, 48);
    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.92,
      roughness: 0.18,
    });
    const goldRim = new THREE.Mesh(goldRimGeo, goldRimMat);
    goldRim.rotation.x = Math.PI / 2;
    goldRim.position.y = 0.25;
    stageGroup.add(goldRim);

    // Upper Jade Platform
    const platformGeo = new THREE.CylinderGeometry(1.82, 1.95, 0.2, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x1a1c23,
      metalness: 0.65,
      roughness: 0.38,
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.y = 0.32;
    platformMesh.receiveShadow = true;
    stageGroup.add(platformMesh);

    // Outer Rotating Bagua Magic Circle
    const ringCanvas = document.createElement("canvas");
    ringCanvas.width = 512;
    ringCanvas.height = 512;
    const rCtx = ringCanvas.getContext("2d")!;
    rCtx.strokeStyle = general.accentColor;
    rCtx.lineWidth = 10;
    rCtx.beginPath();
    rCtx.arc(256, 256, 230, 0, Math.PI * 2);
    rCtx.stroke();
    rCtx.lineWidth = 4;
    rCtx.beginPath();
    rCtx.arc(256, 256, 200, 0, Math.PI * 2);
    rCtx.stroke();

    rCtx.font = "bold 34px 'Noto Serif SC', serif";
    rCtx.fillStyle = general.accentColor;
    rCtx.textAlign = "center";
    rCtx.textBaseline = "middle";
    const runes = ["乾", "坤", "震", "巽", "坎", "離", "艮", "兌"];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const rx = 256 + Math.cos(angle) * 215;
      const ry = 256 + Math.sin(angle) * 215;
      rCtx.fillText(runes[i], rx, ry);
    }

    const ringTexture = new THREE.CanvasTexture(ringCanvas);
    const trigramGeo = new THREE.PlaneGeometry(3.8, 3.8);
    const trigramMat = new THREE.MeshBasicMaterial({
      map: ringTexture,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const trigramMesh = new THREE.Mesh(trigramGeo, trigramMat);
    trigramMesh.rotation.x = -Math.PI / 2;
    trigramMesh.position.y = 0.43;
    stageGroup.add(trigramMesh);

    // Inner Celestial Concentric Ring
    const innerCanvas = document.createElement("canvas");
    innerCanvas.width = 256;
    innerCanvas.height = 256;
    const inCtx = innerCanvas.getContext("2d")!;
    inCtx.strokeStyle = "#f59e0b";
    inCtx.lineWidth = 6;
    inCtx.beginPath();
    inCtx.arc(128, 128, 110, 0, Math.PI * 2);
    inCtx.stroke();
    inCtx.font = "bold 22px 'Noto Serif SC', serif";
    inCtx.fillStyle = "#f59e0b";
    inCtx.textAlign = "center";
    inCtx.textBaseline = "middle";
    const innerRunes = ["天", "地", "風", "雷", "水", "火", "山", "澤"];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      inCtx.fillText(innerRunes[i], 128 + Math.cos(angle) * 85, 128 + Math.sin(angle) * 85);
    }
    const innerTex = new THREE.CanvasTexture(innerCanvas);
    const innerRingMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 2.4),
      new THREE.MeshBasicMaterial({
        map: innerTex,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      })
    );
    innerRingMesh.rotation.x = -Math.PI / 2;
    innerRingMesh.position.y = 0.44;
    stageGroup.add(innerRingMesh);

    // =========================================================================
    // 3. BESPOKE SCULPTED CHARACTER MODEL (Detailed Miniature Figurine)
    // =========================================================================
    const heroGroup = new THREE.Group();
    heroGroup.position.y = 0.42;
    rootGroup.add(heroGroup);

    const armorColor = new THREE.Color(general.avatarColor);
    const goldColor = new THREE.Color(0xf59e0b);
    const accentColor = new THREE.Color(general.accentColor);

    // Lower Armor / Robe Hauberk
    const hauberkGeo = new THREE.CylinderGeometry(0.56, 0.88, 1.25, 16);
    const hauberkMat = new THREE.MeshStandardMaterial({
      color: armorColor.clone().multiplyScalar(0.72),
      metalness: 0.45,
      roughness: 0.55,
    });
    const hauberkMesh = new THREE.Mesh(hauberkGeo, hauberkMat);
    hauberkMesh.position.y = 0.62;
    hauberkMesh.castShadow = true;
    heroGroup.add(hauberkMesh);

    // Lower Robe Gold Embroidered Trim Ring
    const skirtTrimGeo = new THREE.TorusGeometry(0.85, 0.035, 8, 24);
    const skirtTrimMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.88, roughness: 0.22 });
    const skirtTrim = new THREE.Mesh(skirtTrimGeo, skirtTrimMat);
    skirtTrim.rotation.x = Math.PI / 2;
    skirtTrim.position.y = 0.05;
    heroGroup.add(skirtTrim);

    // Upper Torso Cuirass
    const torsoGeo = new THREE.CylinderGeometry(0.68, 0.56, 0.98, 16);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: armorColor,
      metalness: 0.72,
      roughness: 0.32,
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat);
    torsoMesh.position.y = 1.62;
    torsoMesh.castShadow = true;
    heroGroup.add(torsoMesh);

    // Beast-Head Breastplate Crest (Thú Diện Kim Đái)
    const crestGeo = new THREE.BoxGeometry(0.38, 0.42, 0.16);
    const crestMat = new THREE.MeshStandardMaterial({ color: goldColor, metalness: 0.92, roughness: 0.18 });
    const crestMesh = new THREE.Mesh(crestGeo, crestMat);
    crestMesh.position.set(0, 1.66, 0.58);
    heroGroup.add(crestMesh);

    // Studded Golden Belt
    const beltGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.18, 16);
    const beltMat = new THREE.MeshStandardMaterial({ color: goldColor, metalness: 0.88, roughness: 0.24 });
    const beltMesh = new THREE.Mesh(beltGeo, beltMat);
    beltMesh.position.y = 1.16;
    heroGroup.add(beltMesh);

    // Pauldrons (Left & Right Dragon/Beast Shoulder Armor)
    const pauldronGeo = new THREE.SphereGeometry(0.34, 16, 12);
    const pauldronMat = new THREE.MeshStandardMaterial({ color: goldColor, metalness: 0.88, roughness: 0.22 });

    const leftPauldron = new THREE.Mesh(pauldronGeo, pauldronMat);
    leftPauldron.position.set(-0.78, 1.96, 0);
    leftPauldron.scale.set(1.2, 0.8, 1.05);
    leftPauldron.castShadow = true;
    heroGroup.add(leftPauldron);

    const rightPauldron = new THREE.Mesh(pauldronGeo, pauldronMat);
    rightPauldron.position.set(0.78, 1.96, 0);
    rightPauldron.scale.set(1.2, 0.8, 1.05);
    rightPauldron.castShadow = true;
    heroGroup.add(rightPauldron);

    // Head
    const headGeo = new THREE.SphereGeometry(0.34, 24, 20);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xfbcfe8,
      roughness: 0.65,
      metalness: 0.1,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.y = 2.42;
    headMesh.castShadow = true;
    heroGroup.add(headMesh);

    // =========================================================================
    // 4. SIGNATURE HEADDRESS & ACCESSORIES
    // =========================================================================
    let plumeLeft: THREE.Mesh | null = null;
    let plumeRight: THREE.Mesh | null = null;
    let beardMesh: THREE.Mesh | null = null;
    let fanGroup: THREE.Group | null = null;

    if (general.id === "zhuge_liang") {
      // Taoist Crane Crown (Khổng Minh Quán)
      const hatGeo = new THREE.CylinderGeometry(0.24, 0.38, 0.45, 12);
      const hatMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, metalness: 0.65, roughness: 0.35 });
      const hat = new THREE.Mesh(hatGeo, hatMat);
      hat.position.set(0, 2.74, -0.05);
      heroGroup.add(hat);

      // Gold Hair Pin
      const pinGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8);
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.rotation.z = Math.PI / 2;
      pin.position.set(0, 2.76, 0);
      heroGroup.add(pin);
    } else if (general.id === "guan_yu") {
      // Green Dragon Hood / Helmet
      const helmGeo = new THREE.ConeGeometry(0.4, 0.5, 16);
      const helmMat = new THREE.MeshStandardMaterial({ color: 0x14532d, metalness: 0.72, roughness: 0.28 });
      const helm = new THREE.Mesh(helmGeo, helmMat);
      helm.position.set(0, 2.75, 0);
      heroGroup.add(helm);

      // Magnificent Long Flowing Black Beard (Mỹ Nhiệm Công)
      const beardGeo = new THREE.ConeGeometry(0.18, 0.82, 12);
      const beardMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.95 });
      beardMesh = new THREE.Mesh(beardGeo, beardMat);
      beardMesh.position.set(0, 1.96, 0.32);
      beardMesh.rotation.x = 0.22;
      heroGroup.add(beardMesh);
    } else if (general.id === "cao_cao") {
      // Imperial Crown with Gold Beads (Bình Thiên Quán)
      const crownGeo = new THREE.BoxGeometry(0.52, 0.3, 0.52);
      const crownMat = new THREE.MeshStandardMaterial({ color: 0x312e81, metalness: 0.88, roughness: 0.2 });
      const crown = new THREE.Mesh(crownGeo, crownMat);
      crown.position.set(0, 2.78, 0);
      heroGroup.add(crown);

      const beadGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.44, 8);
      const beadMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 });
      const beadFront = new THREE.Mesh(beadGeo, beadMat);
      beadFront.rotation.x = Math.PI / 2;
      beadFront.position.set(0, 2.68, 0.32);
      heroGroup.add(beadFront);
    } else if (general.id === "lu_bu") {
      // Warlord Spiked Crown (Tử Kim Quán)
      const helmGeo = new THREE.ConeGeometry(0.4, 0.52, 12);
      const helmMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.88, roughness: 0.2 });
      const helm = new THREE.Mesh(helmGeo, helmMat);
      helm.position.set(0, 2.78, 0);
      heroGroup.add(helm);

      // Twin Long Crimson Pheasant Plumes (Song Vĩ Trĩ Linh)
      const plumeGeo = new THREE.CylinderGeometry(0.02, 0.048, 1.7, 8);
      const plumeMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.4 });

      plumeLeft = new THREE.Mesh(plumeGeo, plumeMat);
      plumeLeft.position.set(-0.26, 3.35, -0.2);
      plumeLeft.rotation.z = -0.38;
      plumeLeft.rotation.x = -0.32;
      heroGroup.add(plumeLeft);

      plumeRight = new THREE.Mesh(plumeGeo, plumeMat);
      plumeRight.position.set(0.26, 3.35, -0.2);
      plumeRight.rotation.z = 0.38;
      plumeRight.rotation.x = -0.32;
      heroGroup.add(plumeRight);
    } else {
      const helmGeo = new THREE.ConeGeometry(0.38, 0.42, 16);
      const helmMat = new THREE.MeshStandardMaterial({ color: goldColor, metalness: 0.85, roughness: 0.25 });
      const helm = new THREE.Mesh(helmGeo, helmMat);
      helm.position.set(0, 2.72, 0);
      heroGroup.add(helm);
    }

    // Double-Sided Flowing Battle Cape
    const capeGeo = new THREE.PlaneGeometry(1.25, 1.85, 8, 8);
    const capeMat = new THREE.MeshStandardMaterial({
      color: armorColor.clone().multiplyScalar(0.85),
      roughness: 0.65,
      side: THREE.DoubleSide,
    });
    const capeMesh = new THREE.Mesh(capeGeo, capeMat);
    capeMesh.position.set(0, 1.36, -0.52);
    capeMesh.rotation.x = 0.14;
    capeMesh.castShadow = true;
    heroGroup.add(capeMesh);

    // =========================================================================
    // 5. SIGNATURE DIVINE WEAPONS (Thần Binh Trấn Trận)
    // =========================================================================
    const weaponGroup = new THREE.Group();
    heroGroup.add(weaponGroup);
    let weaponBladeMat: THREE.MeshStandardMaterial | null = null;

    if (general.id === "zhuge_liang") {
      // Bát Quái Vũ Phiến (Feather Fan)
      fanGroup = new THREE.Group();
      fanGroup.position.set(0.82, 1.68, 0.45);

      const fanGeo = new THREE.CircleGeometry(0.52, 16, 0, Math.PI);
      const fanMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.35,
        side: THREE.DoubleSide
      });
      const fan = new THREE.Mesh(fanGeo, fanMat);
      fan.rotation.z = Math.PI / 1.8;
      fan.rotation.y = -0.28;
      fanGroup.add(fan);

      // Gold Handle
      const handleGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.65, 8);
      const handleMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85 });
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.position.set(-0.1, -0.2, 0);
      handle.rotation.z = -Math.PI / 4;
      fanGroup.add(handle);

      weaponGroup.add(fanGroup);
    } else if (general.id === "guan_yu") {
      // Thanh Long Yển Nguyệt Đao
      const shaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.0, 12);
      const shaftMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.65 });
      const shaft = new THREE.Mesh(shaftGeo, shaftMat);
      shaft.position.set(0.9, 1.72, 0.2);
      shaft.rotation.z = 0.2;
      weaponGroup.add(shaft);

      // Carved Gold Dragon Head Mouth
      const dragonHeadGeo = new THREE.BoxGeometry(0.22, 0.28, 0.18);
      const dragonHeadMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
      const dragonHead = new THREE.Mesh(dragonHeadGeo, dragonHeadMat);
      dragonHead.position.set(0.68, 2.3, 0.2);
      dragonHead.rotation.z = 0.2;
      weaponGroup.add(dragonHead);

      // Glowing Jade Crescent Blade
      const bladeGeo = new THREE.BoxGeometry(0.26, 1.25, 0.05);
      weaponBladeMat = new THREE.MeshStandardMaterial({
        color: 0xdcfce7,
        metalness: 0.95,
        roughness: 0.1,
        emissive: 0x10b981,
        emissiveIntensity: 0.45,
      });
      const blade = new THREE.Mesh(bladeGeo, weaponBladeMat);
      blade.position.set(0.64, 2.92, 0.2);
      blade.rotation.z = -0.25;
      weaponGroup.add(blade);
    } else if (general.id === "cao_cao") {
      // Ỷ Thiên Kiếm (Heaven Reliance Sword)
      const swordGeo = new THREE.BoxGeometry(0.09, 1.85, 0.05);
      weaponBladeMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        metalness: 0.95,
        roughness: 0.1,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.35,
      });
      const sword = new THREE.Mesh(swordGeo, weaponBladeMat);
      sword.position.set(0.85, 1.62, 0.3);
      sword.rotation.z = -0.3;
      weaponGroup.add(sword);

      const hiltGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.42, 8);
      const hiltMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.92 });
      const hilt = new THREE.Mesh(hiltGeo, hiltMat);
      hilt.position.set(0.6, 2.34, 0.3);
      hilt.rotation.z = -0.3;
      weaponGroup.add(hilt);
    } else if (general.id === "lu_bu") {
      // Phương Thiên Họa Kích (Sky Piercer Halberd)
      const poleGeo = new THREE.CylinderGeometry(0.045, 0.045, 3.1, 12);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.85 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(0.86, 1.72, 0.2);
      pole.rotation.z = 0.2;
      weaponGroup.add(pole);

      // Central Spear Blade
      const spearTipGeo = new THREE.ConeGeometry(0.14, 0.85, 8);
      weaponBladeMat = new THREE.MeshStandardMaterial({
        color: 0xfecdd3,
        metalness: 0.95,
        emissive: 0xe11d48,
        emissiveIntensity: 0.5,
      });
      const spearTip = new THREE.Mesh(spearTipGeo, weaponBladeMat);
      spearTip.position.set(0.56, 3.0, 0.2);
      spearTip.rotation.z = 0.2;
      weaponGroup.add(spearTip);

      // Crescent Moon Side Blades
      const crescentGeo = new THREE.TorusGeometry(0.24, 0.03, 8, 16, Math.PI);
      const crescentMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
      const crescentLeft = new THREE.Mesh(crescentGeo, crescentMat);
      crescentLeft.position.set(0.46, 2.7, 0.2);
      crescentLeft.rotation.z = 0.2;
      weaponGroup.add(crescentLeft);
    }

    // =========================================================================
    // 6. SPIRIT QI DUST PARTICLES (120 Particles)
    // =========================================================================
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 4.2;
      particlePos[i * 3 + 1] = Math.random() * 4.2 + 0.2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 4.2;

      particleVel[i * 3] = (Math.random() - 0.5) * 0.008;
      particleVel[i * 3 + 1] = Math.random() * 0.016 + 0.006;
      particleVel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d")!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    pGrad.addColorStop(0.35, general.accentColor);
    pGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.26,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================================
    // 7. DRAG ORBIT INTERACTION WITH INERTIA
    // =========================================================================
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      rootGroup.rotation.y += dx * 0.008;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // =========================================================================
    // 8. RENDER LOOP (GENTLE BREATHING, WEAPON FLOATING & CLOTH PHYSICS)
    // =========================================================================
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // 1. Counter-Rotating Magic Trigram Pedestal Rings
      trigramMesh.rotation.z = elapsed * 0.22;
      innerRingMesh.rotation.z = -elapsed * 0.32;

      // 2. Gentle Breathing Motion (Phập phồng nhẹ nhàng sống động)
      const breathe = Math.sin(elapsed * 1.8) * 0.025;
      heroGroup.position.y = 0.42 + breathe;

      // 3. Subtle Cloth & Cape Flapping
      capeMesh.rotation.x = 0.14 + Math.sin(elapsed * 2.2) * 0.045;
      capeMesh.rotation.z = Math.cos(elapsed * 1.6) * 0.02;

      // 4. Pauldron Breathing Flex
      leftPauldron.rotation.z = Math.sin(elapsed * 1.8) * 0.035;
      rightPauldron.rotation.z = -Math.sin(elapsed * 1.8) * 0.035;

      // 5. Divine Weapon Floating / Breathing
      weaponGroup.position.y = Math.sin(elapsed * 2.2) * 0.035;
      if (weaponBladeMat) {
        weaponBladeMat.emissiveIntensity = 0.38 + Math.sin(elapsed * 3.2) * 0.14;
      }

      // 6. Feather Fan Gentle Waving (Zhuge Liang)
      if (fanGroup) {
        fanGroup.rotation.z = Math.sin(elapsed * 2.0) * 0.07;
      }

      // 7. Long Beard Sway (Guan Yu)
      if (beardMesh) {
        beardMesh.rotation.z = Math.sin(elapsed * 1.6) * 0.04;
      }

      // 8. Twin Pheasant Plumes Spring Sway (Lu Bu)
      if (plumeLeft && plumeRight) {
        plumeLeft.rotation.z = -0.38 + Math.sin(elapsed * 2.8) * 0.05;
        plumeRight.rotation.z = 0.38 - Math.sin(elapsed * 2.8) * 0.05;
      }

      // 9. Slow Auto-Rotation
      if (!isDragging && isRotating) {
        rootGroup.rotation.y += 0.0035;
      }

      // 10. Floating Elemental Particles
      const positions = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let y = positions.getY(i) + particleVel[i * 3 + 1];
        let x = positions.getX(i) + particleVel[i * 3];
        let z = positions.getZ(i) + particleVel[i * 3 + 2];

        if (y > 4.5) {
          y = 0.25;
          x = (Math.random() - 0.5) * 4.0;
          z = (Math.random() - 0.5) * 4.0;
        }
        positions.setXYZ(i, x, y, z);
      }
      positions.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [general, isRotating]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900/60 via-[#0c0e17] to-stone-950 border border-amber-500/30 shadow-2xl flex flex-col items-center justify-center select-none"
      style={{ height }}
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Giữ chuột kéo để xoay mô hình 3D 360°"
      />

      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-stone-950/80 px-3 py-1.5 rounded-full border border-amber-500/30 backdrop-blur-md text-[11px] text-stone-300 pointer-events-auto shadow-md">
            <Rotate3d className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Kéo chuột xoay 360°</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border shadow-md flex items-center gap-1.5 ${
                isRotating
                  ? "bg-amber-500 text-stone-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  : "bg-stone-900/90 text-stone-300 border-stone-800 hover:text-white"
              }`}
            >
              {isRotating ? <Pause className="w-3 h-3 text-stone-950" /> : <Play className="w-3 h-3 text-stone-300" />}
              <span>{isRotating ? "Tự Xoay: BẬT" : "Tự Xoay: TẮT"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Banner Tag */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2.5 bg-stone-950/85 px-3.5 py-1.5 rounded-full border border-amber-500/30 backdrop-blur-md shadow-md">
        <span
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px]"
          style={{ backgroundColor: general.accentColor }}
        />
        <span className="text-xs font-black text-amber-200 tracking-wider">
          {general.name} &bull; {general.title}
        </span>
      </div>

      {/* Top Right 3D Badge */}
      <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full text-[10px] font-black text-amber-300 uppercase tracking-widest backdrop-blur-md">
        <Sparkles className="w-3 h-3" />
        <span>Tượng 3D Chuyển Động</span>
      </div>

    </div>
  );
}
