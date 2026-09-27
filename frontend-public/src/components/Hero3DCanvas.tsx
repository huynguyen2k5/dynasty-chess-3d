"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPieceName, setHoveredPieceName] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // =========================================================================
    // 1. SCENE, CAMERA & RENDERER SETUP (ACES Filmic & Soft Shadows)
    // =========================================================================
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 11.5, 14.5);
    camera.lookAt(0, -0.6, 0);

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
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // 2. DRAMATIC THEATRICAL LIGHTING (Imperial Golden & Battle Rims)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.3);
    scene.add(ambientLight);

    // Overhead Golden Key Spotlight
    const mainSpot = new THREE.SpotLight(0xffe082, 6.5, 60, Math.PI / 3.4, 0.35, 1.2);
    mainSpot.position.set(4, 22, 10);
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 2048;
    mainSpot.shadow.mapSize.height = 2048;
    mainSpot.shadow.bias = -0.0004;
    scene.add(mainSpot);

    // Shu Crimson Rim Light (South / Red)
    const crimsonRim = new THREE.PointLight(0xf43f5e, 5.0, 32);
    crimsonRim.position.set(-12, 7, -6);
    scene.add(crimsonRim);

    // Wei Moonlit Indigo Rim Light (North / Black)
    const cyanRim = new THREE.PointLight(0x38bdf8, 4.5, 32);
    cyanRim.position.set(12, 7, 6);
    scene.add(cyanRim);

    // Center Table Uplift Warmth
    const tableWarmth = new THREE.PointLight(0xf59e0b, 2.5, 16);
    tableWarmth.position.set(0, 2.8, 0);
    scene.add(tableWarmth);

    // Master Group for the Table & Board
    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    // =========================================================================
    // 3. MASTER PROCEDURAL BOARD TEXTURE (Sandalwood & Gold Inlay 2048x2276)
    // =========================================================================
    const boardCanvas = document.createElement("canvas");
    boardCanvas.width = 2048;
    boardCanvas.height = 2276;
    const ctx = boardCanvas.getContext("2d")!;

    // Rich Dark Emperor Sandalwood Lacquer Gradient
    const bgGrad = ctx.createRadialGradient(1024, 1138, 120, 1024, 1138, 1450);
    bgGrad.addColorStop(0, "#1f120a");
    bgGrad.addColorStop(0.45, "#130a05");
    bgGrad.addColorStop(0.8, "#0a0503");
    bgGrad.addColorStop(1, "#040201");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 2048, 2276);

    // Organic Fine Wood Grain Sheen
    ctx.fillStyle = "rgba(245, 158, 11, 0.025)";
    for (let i = 0; i < 180; i++) {
      ctx.beginPath();
      const y = Math.random() * 2276;
      ctx.ellipse(1024 + (Math.random() - 0.5) * 800, y, 1400, Math.random() * 22 + 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer Dual Royal Golden Filigree Borders
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 26;
    ctx.strokeRect(80, 80, 1888, 2116);

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 8;
    ctx.strokeRect(104, 104, 1840, 2068);

    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 4;
    ctx.strokeRect(124, 124, 1800, 2028);

    // Ornate Corner Ruyi Filigree Brackets (4 corners)
    const drawCornerBracket = (cx: number, cy: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(84, 0);
      ctx.lineTo(84, 26);
      ctx.lineTo(26, 26);
      ctx.lineTo(26, 84);
      ctx.lineTo(0, 84);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = "rgba(245, 158, 11, 0.35)";
      ctx.fill();
      ctx.restore();
    };

    drawCornerBracket(130, 130, 0);
    drawCornerBracket(1918, 130, Math.PI / 2);
    drawCornerBracket(1918, 2146, Math.PI);
    drawCornerBracket(130, 2146, -Math.PI / 2);

    // Grid Dimensions (9 columns x 10 rows)
    const marginX = 180;
    const marginY = 180;
    const stepX = (2048 - marginX * 2) / 8; // 211px per col
    const stepY = (2276 - marginY * 2) / 9; // 212.8px per row

    // Engraved Golden Inlay Grid Lines
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 8;
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 8;

    // Horizontal Lines (all 10 rows)
    for (let r = 0; r < 10; r++) {
      const y = marginY + r * stepY;
      ctx.beginPath();
      ctx.moveTo(marginX, y);
      ctx.lineTo(2048 - marginX, y);
      ctx.stroke();
    }

    // Vertical Lines (interrupted at River)
    for (let c = 0; c < 9; c++) {
      const x = marginX + c * stepX;
      if (c === 0 || c === 8) {
        ctx.beginPath();
        ctx.moveTo(x, marginY);
        ctx.lineTo(x, 2276 - marginY);
        ctx.stroke();
      } else {
        // Top half (North / Black)
        ctx.beginPath();
        ctx.moveTo(x, marginY);
        ctx.lineTo(x, marginY + 4 * stepY);
        ctx.stroke();

        // Bottom half (South / Red)
        ctx.beginPath();
        ctx.moveTo(x, marginY + 5 * stepY);
        ctx.lineTo(x, marginY + 9 * stepY);
        ctx.stroke();
      }
    }

    // Imperial Palaces (Cửu Cung X-Lines)
    const drawPalaceX = (topRow: number) => {
      const yTop = marginY + topRow * stepY;
      const yBottom = marginY + (topRow + 2) * stepY;
      const xLeft = marginX + 3 * stepX;
      const xRight = marginX + 5 * stepX;

      ctx.lineWidth = 6;
      ctx.strokeStyle = "#fbbf24";
      ctx.beginPath();
      ctx.moveTo(xLeft, yTop);
      ctx.lineTo(xRight, yBottom);
      ctx.moveTo(xRight, yTop);
      ctx.lineTo(xLeft, yBottom);
      ctx.stroke();
    };
    drawPalaceX(0); // North Palace
    drawPalaceX(7); // South Palace

    // Star Corner Markers (Pháo & Tốt Cross-Markers)
    const drawCross = (cx: number, cy: number, corners: [boolean, boolean, boolean, boolean]) => {
      const d = 16;
      const l = 34;
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 4;

      if (corners[0]) {
        ctx.beginPath();
        ctx.moveTo(cx - d - l, cy - d); ctx.lineTo(cx - d, cy - d); ctx.lineTo(cx - d, cy - d - l);
        ctx.stroke();
      }
      if (corners[1]) {
        ctx.beginPath();
        ctx.moveTo(cx + d + l, cy - d); ctx.lineTo(cx + d, cy - d); ctx.lineTo(cx + d, cy - d - l);
        ctx.stroke();
      }
      if (corners[2]) {
        ctx.beginPath();
        ctx.moveTo(cx - d - l, cy + d); ctx.lineTo(cx - d, cy + d); ctx.lineTo(cx - d, cy + d + l);
        ctx.stroke();
      }
      if (corners[3]) {
        ctx.beginPath();
        ctx.moveTo(cx + d + l, cy + d); ctx.lineTo(cx + d, cy + d); ctx.lineTo(cx + d, cy + d + l);
        ctx.stroke();
      }
    };

    // Cannon Points
    drawCross(marginX + 1 * stepX, marginY + 2 * stepY, [true, true, true, true]);
    drawCross(marginX + 7 * stepX, marginY + 2 * stepY, [true, true, true, true]);
    drawCross(marginX + 1 * stepX, marginY + 7 * stepY, [true, true, true, true]);
    drawCross(marginX + 7 * stepX, marginY + 7 * stepY, [true, true, true, true]);

    // Soldier Points
    for (let c = 0; c < 9; c += 2) {
      drawCross(marginX + c * stepX, marginY + 3 * stepY, [c > 0, c < 8, c > 0, c < 8]);
      drawCross(marginX + c * stepX, marginY + 6 * stepY, [c > 0, c < 8, c > 0, c < 8]);
    }

    // THE CHU-HAN RIVER (SỞ HÀ - HÁN GIỚI)
    const riverY = marginY + 4 * stepY;
    const riverH = stepY;
    const riverGrad = ctx.createLinearGradient(marginX, riverY, 2048 - marginX, riverY + riverH);
    riverGrad.addColorStop(0, "rgba(6, 182, 212, 0.08)");
    riverGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.14)");
    riverGrad.addColorStop(1, "rgba(225, 29, 72, 0.08)");
    ctx.fillStyle = riverGrad;
    ctx.fillRect(marginX + 4, riverY + 4, (2048 - marginX * 2) - 8, riverH - 8);

    // Calligraphy River Text
    ctx.font = '900 96px "Noto Serif SC", "Cinzel", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowBlur = 24;

    // 楚 河 (Chu River - Left)
    ctx.fillStyle = "#fde68a";
    ctx.shadowColor = "#f59e0b";
    ctx.fillText("楚   河", marginX + stepX * 2, riverY + riverH * 0.5);

    // 漢 界 (Han Border - Right)
    ctx.fillStyle = "#fed7aa";
    ctx.shadowColor = "#ea580c";
    ctx.fillText("漢   界", marginX + stepX * 6, riverY + riverH * 0.5);

    // Center Imperial Vermilion Seal Emblem
    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 5;
    ctx.strokeRect(1024 - 44, riverY + riverH * 0.5 - 44, 88, 88);
    ctx.font = '900 48px "Noto Serif SC", serif';
    ctx.fillStyle = "#ef4444";
    ctx.shadowColor = "#dc2626";
    ctx.fillText("帥", 1024, riverY + riverH * 0.5 + 2);

    const boardTexture = new THREE.CanvasTexture(boardCanvas);
    boardTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 3D Board Slab with Beveled Chamfer
    const boardWidth = 9.8;
    const boardLength = 10.9;
    const boardThickness = 0.55;

    const boardMatTop = new THREE.MeshStandardMaterial({
      map: boardTexture,
      roughness: 0.26,
      metalness: 0.28,
    });

    const boardMatSide = new THREE.MeshStandardMaterial({
      color: 0x140804,
      roughness: 0.32,
      metalness: 0.65,
    });

    const boardMesh = new THREE.Mesh(
      new THREE.BoxGeometry(boardWidth, boardThickness, boardLength),
      [boardMatSide, boardMatSide, boardMatTop, boardMatSide, boardMatSide, boardMatSide]
    );
    boardMesh.receiveShadow = true;
    boardMesh.castShadow = true;
    boardGroup.add(boardMesh);

    // Tangible Wooden Plinth Base Beneath the Board
    const plinthMesh = new THREE.Mesh(
      new THREE.BoxGeometry(boardWidth + 0.6, 0.35, boardLength + 0.6),
      new THREE.MeshStandardMaterial({
        color: 0x0c0502,
        roughness: 0.45,
        metalness: 0.5,
      })
    );
    plinthMesh.position.set(0, -0.42, 0);
    plinthMesh.receiveShadow = true;
    boardGroup.add(plinthMesh);

    // Dynamic Flowing Mist Over the Chu-Han River
    const riverGeo = new THREE.PlaneGeometry(boardWidth * 0.82, 0.95);
    const riverMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    riverMesh.rotation.x = -Math.PI / 2;
    riverMesh.position.set(0, 0.29, 0);
    boardGroup.add(riverMesh);

    // =========================================================================
    // 4. MASTERPIECE 3D PIECES (IMPERIAL JADE & ENGRAVED GOLD RIM)
    // =========================================================================
    const pieceTypes: Record<string, { label: string; name: string; red: boolean }> = {
      r_k: { label: "帥", name: "Tướng Đỏ (Soái)", red: true },
      r_a: { label: "仕", name: "Sĩ Đỏ", red: true },
      r_e: { label: "相", name: "Tượng Đỏ", red: true },
      r_h: { label: "傌", name: "Mã Đỏ", red: true },
      r_r: { label: "俥", name: "Xe Đỏ", red: true },
      r_c: { label: "炮", name: "Pháo Đỏ", red: true },
      r_s: { label: "兵", name: "Binh Đỏ", red: true },

      b_k: { label: "將", name: "Tướng Đen (Tướng)", red: false },
      b_a: { label: "士", name: "Sĩ Đen", red: false },
      b_e: { label: "象", name: "Tượng Đen", red: false },
      b_h: { label: "馬", name: "Mã Đen", red: false },
      b_r: { label: "車", name: "Xe Đen", red: false },
      b_c: { label: "砲", name: "Pháo Đen", red: false },
      b_s: { label: "卒", name: "Tốt Đen", red: false },
    };

    const makeLuxuryPieceTexture = (label: string, isRed: boolean) => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 384;
      pCanvas.height = 384;
      const pCtx = pCanvas.getContext("2d")!;

      // Radial Nephrite Jade Disc with Deep Organic Core
      const pGrad = pCtx.createRadialGradient(192, 192, 25, 192, 192, 190);
      if (isRed) {
        pGrad.addColorStop(0, "#881337");
        pGrad.addColorStop(0.45, "#4c0519");
        pGrad.addColorStop(0.85, "#22030b");
        pGrad.addColorStop(1, "#110105");
      } else {
        pGrad.addColorStop(0, "#065f46");
        pGrad.addColorStop(0.45, "#022c22");
        pGrad.addColorStop(0.85, "#041a14");
        pGrad.addColorStop(1, "#010b08");
      }
      pCtx.fillStyle = pGrad;
      pCtx.beginPath();
      pCtx.arc(192, 192, 188, 0, Math.PI * 2);
      pCtx.fill();

      // Outer Inlaid Gold Bevel Rings
      pCtx.strokeStyle = "#f59e0b";
      pCtx.lineWidth = 10;
      pCtx.beginPath();
      pCtx.arc(192, 192, 172, 0, Math.PI * 2);
      pCtx.stroke();

      pCtx.strokeStyle = "#b45309";
      pCtx.lineWidth = 3;
      pCtx.beginPath();
      pCtx.arc(192, 192, 156, 0, Math.PI * 2);
      pCtx.stroke();

      // Embossed Gold Chinese Calligraphy
      pCtx.font = '900 195px "Noto Serif SC", "Cinzel", serif';
      pCtx.textAlign = "center";
      pCtx.textBaseline = "middle";

      pCtx.shadowBlur = 18;
      pCtx.shadowColor = isRed ? "#f43f5e" : "#34d399";
      pCtx.fillStyle = isRed ? "#fff1f2" : "#f0fdf4";
      pCtx.fillText(label, 192, 198);

      pCtx.strokeStyle = "#fbbf24";
      pCtx.lineWidth = 3;
      pCtx.strokeText(label, 192, 198);

      const tex = new THREE.CanvasTexture(pCanvas);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    // Standard starting positions mapped to 3D coordinates
    const initialPieces = [
      // Black (Top/North)
      { type: "b_r", col: 0, row: 0 }, { type: "b_h", col: 1, row: 0 }, { type: "b_e", col: 2, row: 0 },
      { type: "b_a", col: 3, row: 0 }, { type: "b_k", col: 4, row: 0 }, { type: "b_a", col: 5, row: 0 },
      { type: "b_e", col: 6, row: 0 }, { type: "b_h", col: 7, row: 0 }, { type: "b_r", col: 8, row: 0 },
      { type: "b_c", col: 1, row: 2 }, { type: "b_c", col: 7, row: 2 },
      { type: "b_s", col: 0, row: 3 }, { type: "b_s", col: 2, row: 3 }, { type: "b_s", col: 4, row: 3 },
      { type: "b_s", col: 6, row: 3 }, { type: "b_s", col: 8, row: 3 },

      // Red (Bottom/South)
      { type: "r_r", col: 0, row: 9 }, { type: "r_h", col: 1, row: 9 }, { type: "r_e", col: 2, row: 9 },
      { type: "r_a", col: 3, row: 9 }, { type: "r_k", col: 4, row: 9 }, { type: "r_a", col: 5, row: 9 },
      { type: "r_e", col: 6, row: 9 }, { type: "r_h", col: 7, row: 9 }, { type: "r_r", col: 8, row: 9 },
      { type: "r_c", col: 1, row: 7 }, { type: "r_c", col: 7, row: 7 },
      { type: "r_s", col: 0, row: 6 }, { type: "r_s", col: 2, row: 6 }, { type: "r_s", col: 4, row: 6 },
      { type: "r_s", col: 6, row: 6 }, { type: "r_s", col: 8, row: 6 },
    ];

    const pieceGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.24, 36);
    const pieceMeshes: Array<{
      mesh: THREE.Mesh;
      baseY: number;
      targetY: number;
      name: string;
      halo?: THREE.Mesh;
    }> = [];

    // Focus ring under hovered piece
    const hoverRingGeo = new THREE.RingGeometry(0.48, 0.58, 32);
    const hoverRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    const hoverRingMesh = new THREE.Mesh(hoverRingGeo, hoverRingMat);
    hoverRingMesh.rotation.x = -Math.PI / 2;
    hoverRingMesh.position.y = 0.285;
    boardGroup.add(hoverRingMesh);

    initialPieces.forEach(({ type, col, row }) => {
      const info = pieceTypes[type];
      const topTex = makeLuxuryPieceTexture(info.label, info.red);

      const sideMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.88,
        roughness: 0.2,
      });

      const topMat = new THREE.MeshStandardMaterial({
        map: topTex,
        roughness: 0.22,
        metalness: 0.38,
        emissive: info.red ? 0x4c0519 : 0x022c22,
        emissiveIntensity: 0.28,
      });

      const pieceMesh = new THREE.Mesh(pieceGeo, [sideMat, topMat, sideMat]);
      pieceMesh.castShadow = true;
      pieceMesh.receiveShadow = true;

      const x = ((col - 4) / 4) * 3.88;
      const z = ((row - 4.5) / 4.5) * 4.46;
      const baseY = 0.38;

      pieceMesh.position.set(x, baseY, z);
      pieceMesh.userData = { pieceName: info.name, isRed: info.red };
      boardGroup.add(pieceMesh);

      // Kings / Generals Halo
      let haloMesh: THREE.Mesh | undefined;
      if (type === "r_k" || type === "b_k") {
        const ringGeo = new THREE.RingGeometry(0.48, 0.58, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: info.red ? 0xf59e0b : 0x10b981,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide
        });
        haloMesh = new THREE.Mesh(ringGeo, ringMat);
        haloMesh.rotation.x = -Math.PI / 2;
        haloMesh.position.set(x, 0.28, z);
        boardGroup.add(haloMesh);
      }

      pieceMeshes.push({
        mesh: pieceMesh,
        baseY,
        targetY: baseY,
        name: info.name,
        halo: haloMesh,
      });
    });

    // Initial Board Cinematic Angle
    boardGroup.rotation.x = 0.52;
    boardGroup.rotation.y = -0.25;
    boardGroup.position.set(0, -0.4, 0);

    // =========================================================================
    // 5. SPIRIT QI & CELESTIAL EMBER PARTICLES (240 Particles)
    // =========================================================================
    const emberCount = 240;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    const emberVel = new Float32Array(emberCount * 3);
    const emberCol = new Float32Array(emberCount * 3);

    const goldColor = new THREE.Color(0xf59e0b);
    const crimsonColor = new THREE.Color(0xf43f5e);
    const cyanColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 26;
      emberPos[i * 3 + 1] = Math.random() * 16 - 3;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 26;

      emberVel[i * 3] = (Math.random() - 0.5) * 0.015;
      emberVel[i * 3 + 1] = Math.random() * 0.025 + 0.01;
      emberVel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

      const r = Math.random();
      const chosenColor = r < 0.6 ? goldColor : r < 0.85 ? crimsonColor : cyanColor;
      emberCol[i * 3] = chosenColor.r;
      emberCol[i * 3 + 1] = chosenColor.g;
      emberCol[i * 3 + 2] = chosenColor.b;
    }

    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    emberGeo.setAttribute("color", new THREE.BufferAttribute(emberCol, 3));

    const emberCanvas = document.createElement("canvas");
    emberCanvas.width = 64;
    emberCanvas.height = 64;
    const eCtx = emberCanvas.getContext("2d")!;
    const eGrad = eCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    eGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    eGrad.addColorStop(0.3, "rgba(254, 240, 138, 0.9)");
    eGrad.addColorStop(0.65, "rgba(245, 158, 11, 0.4)");
    eGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    eCtx.fillStyle = eGrad;
    eCtx.fillRect(0, 0, 64, 64);
    const emberTexture = new THREE.CanvasTexture(emberCanvas);

    const emberMat = new THREE.PointsMaterial({
      size: 0.38,
      map: emberTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const emberParticles = new THREE.Points(emberGeo, emberMat);
    scene.add(emberParticles);

    // =========================================================================
    // 6. RAYCASTING HOVER & TACTILE JADE SOUND INTERACTION
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouseRay = new THREE.Vector2(-1000, -1000);

    const playJadeClackSound = () => {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(840, audioCtx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.12);

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(1680, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(340, audioCtx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.28, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(audioCtx.currentTime + 0.15);
        osc2.stop(audioCtx.currentTime + 0.15);
      } catch {
        // Fallback
      }
    };

    // =========================================================================
    // 7. CINEMATIC INERTIA ORBIT & PARALLAX
    // =========================================================================
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotationX = 0.52;
    let targetRotationY = -0.25;
    let mouseNormX = 0;
    let mouseNormY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNormX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseNormY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      mouseRay.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRay.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        targetRotationY += dx * 0.005;
        targetRotationX = Math.max(0.2, Math.min(0.92, targetRotationX + dy * 0.005));
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;

      raycaster.setFromCamera(mouseRay, camera);
      const meshes = pieceMeshes.map(p => p.mesh);
      const intersects = raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        playJadeClackSound();
        const hit = pieceMeshes.find(p => p.mesh === intersects[0].object);
        if (hit) {
          hit.targetY = hit.baseY + 0.55;
          setTimeout(() => {
            hit.targetY = hit.baseY;
          }, 240);
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      targetRotationY += dx * 0.005;
      targetRotationX = Math.max(0.2, Math.min(0.92, targetRotationX + dy * 0.005));
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // =========================================================================
    // 8. RENDER LOOP (ORGANIC WAVE + CAMERA PARALLAX + PIECE LEVITATION)
    // =========================================================================
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Weighted Lerp for Board Drag Rotation
      boardGroup.rotation.y = THREE.MathUtils.lerp(boardGroup.rotation.y, targetRotationY, 0.07);
      boardGroup.rotation.x = THREE.MathUtils.lerp(boardGroup.rotation.x, targetRotationX, 0.07);

      // Subtle Idle Floating Breathe
      boardGroup.position.y = -0.4 + Math.sin(elapsedTime * 0.75) * 0.05;

      // Parallax Camera Sway
      const targetCamX = mouseNormX * 1.1;
      const targetCamY = 11.5 - mouseNormY * 0.7;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05);
      camera.lookAt(0, -0.6, 0);

      // Living River Opacity Wave
      riverMat.opacity = 0.12 + Math.sin(elapsedTime * 2.0) * 0.05;

      // Raycast piece hover
      if (!isDragging) {
        raycaster.setFromCamera(mouseRay, camera);
        const meshes = pieceMeshes.map(p => p.mesh);
        const intersects = raycaster.intersectObjects(meshes);

        let activeHitName: string | null = null;
        let activeHitMesh: THREE.Mesh | null = null;

        if (intersects.length > 0) {
          activeHitMesh = intersects[0].object as THREE.Mesh;
          activeHitName = activeHitMesh.userData.pieceName || null;
        }

        setHoveredPieceName(activeHitName);

        pieceMeshes.forEach(p => {
          if (p.mesh === activeHitMesh) {
            p.targetY = p.baseY + 0.32;
            hoverRingMesh.position.x = p.mesh.position.x;
            hoverRingMesh.position.z = p.mesh.position.z;
            hoverRingMat.opacity = THREE.MathUtils.lerp(hoverRingMat.opacity, 0.75, 0.15);
          } else {
            p.targetY = p.baseY;
          }

          p.mesh.position.y = THREE.MathUtils.lerp(p.mesh.position.y, p.targetY, 0.12);
        });

        if (!activeHitMesh) {
          hoverRingMat.opacity = THREE.MathUtils.lerp(hoverRingMat.opacity, 0, 0.1);
        }
      }

      // Animate Qi Particles
      const posArr = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        posArr[i * 3] += emberVel[i * 3];
        posArr[i * 3 + 1] += emberVel[i * 3 + 1];
        posArr[i * 3 + 2] += emberVel[i * 3 + 2];

        posArr[i * 3] += Math.sin(elapsedTime + i) * 0.004;

        if (posArr[i * 3 + 1] > 13) {
          posArr[i * 3 + 1] = -3;
          posArr[i * 3] = (Math.random() - 0.5) * 26;
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 26;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

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
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);

      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {hoveredPieceName && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-stone-950/85 border border-amber-500/40 text-amber-200 text-xs font-black tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.3)] pointer-events-none transition-all flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{hoveredPieceName}</span>
        </div>
      )}
    </div>
  );
}
