"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Hero3DCanvas from "@/components/Hero3DCanvas";
import General3DCanvas from "@/components/General3DCanvas";
import { GENERALS, General } from "@/lib/constants";
import {
  Swords,
  Crown,
  Zap,
  Bot,
  Scroll,
  ArrowRight,
  Volume2,
  Check,
  Rotate3d,
  ChevronRight,
  Eye,
  Lock,
  Layers,
  Sparkles,
  Flame,
  Award,
  Play
} from "lucide-react";

export default function HomePage() {
  const launchGenerals = GENERALS.filter(g => !g.isUpcoming);
  const [activeGeneralIndex, setActiveGeneralIndex] = useState(0);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [equippedGeneralId, setEquippedGeneralId] = useState<string>("zhuge_liang");
  const [equipToast, setEquipToast] = useState<string | null>(null);
  const [characterViewMode, setCharacterViewMode] = useState<"3d" | "2d">("3d");

  const currentGeneral = launchGenerals[activeGeneralIndex] || launchGenerals[0];

  useEffect(() => {
    const saved = localStorage.getItem("active_general");
    if (saved) {
      setEquippedGeneralId(saved);
      const foundIdx = launchGenerals.findIndex(g => g.id === saved);
      if (foundIdx !== -1) setActiveGeneralIndex(foundIdx);
    }
  }, [launchGenerals]);

  const handleEquipGeneral = (gen: General) => {
    setEquippedGeneralId(gen.id);
    localStorage.setItem("active_general", gen.id);
    setEquipToast(`Đã xuất trận danh tướng: ${gen.name}!`);
    setTimeout(() => setEquipToast(null), 3000);
  };

  const playVoiceAudio = (gen: General) => {
    setPlayingVoice(gen.id);
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const freqs: Record<string, number> = {
        shu: 392.00,    // G4
        wei: 329.63,    // E4
        wu: 440.00,     // A4
        neutral: 523.25 // C5
      };

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freqs[gen.faction] || 440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime((freqs[gen.faction] || 440) * 1.5, audioCtx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // Audio fallback
    }

    setTimeout(() => {
      setPlayingVoice(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {equipToast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-24 right-6 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-black shadow-[0_10px_35px_rgba(245,158,11,0.4)] flex items-center gap-3 border border-amber-300"
          >
            <Swords className="w-5 h-5 text-stone-950 shrink-0" />
            <span className="text-sm">{equipToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          1. HERO SANCTUARY: THE EMPEROR'S 3D CHESSBOARD
          (Thoáng Đãng, Tráng Lệ, Lấy Bàn Cờ 3D Làm Tâm Điểm Tuyệt Đối)
          ========================================================================= */}
      <section className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex flex-col items-center justify-between overflow-hidden border-b border-amber-900/30">
        
        {/* Full-width 3D Canvas Background Layer (Centered 3D Xiangqi Board) */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Hero3DCanvas />
        </div>

        {/* Soft Vignettes: Keeps center 3D board crystal clear while giving edges depth */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#06070a]/80 via-transparent to-[#06070a]" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#06070a]/70 via-transparent to-[#06070a]/70 hidden lg:block" />

        {/* Top Header Information */}
        <div className="relative z-20 w-full pt-10 sm:pt-14 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-950/80 border border-amber-500/35 backdrop-blur-xl shadow-[0_0_25px_rgba(245,158,11,0.2)] mb-4"
          >
            <span className="seal-stamp text-[10px] px-1.5 py-0.2 font-bold">御用</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
              Dynasty Chess 3D • Tam Quốc Kỳ Trận
            </span>
          </motion.div>

          {/* Grand Imperial Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-gold-metallic drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            DYNASTY CHESS 3D
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-stone-300 text-sm sm:text-base lg:text-lg font-medium tracking-wide mt-2 drop-shadow-md max-w-xl mx-auto"
          >
            Kỳ Vương Tam Quốc &bull; Đỉnh cao cờ tướng 3D &bull; Danh tướng trợ chiến
          </motion.p>
        </div>

        {/* Center Space for 3D Board Interaction */}
        <div className="relative z-20 flex-1 w-full flex items-center justify-center pointer-events-none min-h-[220px]">
          {/* Transparent interactive breathing zone */}
        </div>

        {/* Bottom Action Bar & Drag Hint */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="relative z-20 w-full pb-8 sm:pb-12 px-4 flex flex-col items-center gap-4"
        >
          {/* Two Prestigious Primary Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/play/bot"
              className="btn-luxury-shimmer w-full sm:w-auto py-4 px-9 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-black text-sm tracking-widest uppercase shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 border border-amber-200"
            >
              <Swords className="w-4 h-4 text-stone-950" />
              <span>Khởi Trận Ngay</span>
            </Link>

            <Link
              href="/characters"
              className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-stone-950/85 hover:bg-stone-900 border border-amber-500/35 hover:border-amber-400 text-amber-200 font-bold text-sm tracking-wide text-center backdrop-blur-xl transition-all flex items-center justify-center gap-2.5 shadow-xl hover:-translate-y-0.5"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Khám Phá Danh Tướng</span>
            </Link>
          </div>

          {/* Interactive Hint */}
          <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-950/70 px-4 py-1.5 rounded-full border border-amber-500/20 backdrop-blur-md">
            <Rotate3d className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Kéo chuột xoay 360° &bull; Di chuột nhấc quân cờ &bull; Nhấp gõ ngọc</span>
          </div>
        </motion.div>

      </section>

      {/* =========================================================================
          2. THE CRAFTSMANSHIP: NGHỆ THUẬT KỲ ĐẠO KHẢM VÀNG
          (Editorial Asymmetric Spread: Tôn Vinh Chi Tiết 3D & Luật Chuẩn WXF)
          ========================================================================= */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Artwork Feature (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card-luxury corner-accent p-2 shadow-2xl">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-950 to-black">
                <Image
                  src="/assets/shop/pieces_jade_gold.jpg"
                  alt="Quân Cờ Ngọc Phỉ Thúy & Vàng Ròng"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Floating Inlaid Stamp */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <span className="seal-stamp text-xs px-2 py-0.5 mb-1.5 inline-block">御用</span>
                    <h3 className="text-lg font-black text-amber-200">
                      Ngọc Thạch Khảm Kim Cổ
                    </h3>
                    <p className="text-xs text-stone-400">
                      Huyết Ngọc Chu Sa &bull; Huyền Bích Thạch &bull; Chỉ Vàng Thếp
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Backglow Aura */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 rounded-3xl blur-2xl -z-10" />
          </div>

          {/* Right Column: Editorial Craftsmanship Lore (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div>
              <span className="text-amber-400 text-xs font-black tracking-widest uppercase bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/25">
                Tinh Hoa Chế Tác
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-gold-metallic mt-4 mb-4 tracking-tight leading-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Tuyệt Tác Sơn Mài Khảm Vàng &amp; Ngọc Thạch Cổ
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Mỗi ván cờ tại Dynasty Chess 3D không đơn thuần là một trò chơi trí tuệ, mà là một tác phẩm nghệ thuật thủ công phương Đông. Từng đường chỉ cờ được khảm chỉ vàng ròng trên nền gỗ tử đàn đen ánh chu sa, tạo nên không gian cung đình trang nghiêm và tráng lệ.
              </p>
            </div>

            {/* 3 Refined Craftsmanship Highlights */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors flex items-start gap-4">
                <span className="font-mono text-amber-400 text-lg font-black shrink-0 mt-0.5">01</span>
                <div>
                  <h4 className="text-sm font-black text-amber-200 mb-1">Bàn Cờ Sơn Mài Tử Đàn Cổ Điển</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Độ phân giải 2K cực nét, 4 góc chạm khắc hoa văn Hồi Văn Ruyi phong thủy, phản chiếu ánh đèn vàng ấm áp và bóng đổ chân thực.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors flex items-start gap-4">
                <span className="font-mono text-amber-400 text-lg font-black shrink-0 mt-0.5">02</span>
                <div>
                  <h4 className="text-sm font-black text-amber-200 mb-1">Dòng Sông Sở Hà Sương Khói Động</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Dải sương mù huyền ảo cuộn chảy chậm rãi giữa hai bờ, chia cắt Hán Sở với ấn triện hoàng gia son đỏ khắc chữ &ldquo;帥&rdquo; ở trung lộ.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors flex items-start gap-4">
                <span className="font-mono text-amber-400 text-lg font-black shrink-0 mt-0.5">03</span>
                <div>
                  <h4 className="text-sm font-black text-amber-200 mb-1">Quy Chuẩn Thi Đấu WXF Quốc Tế</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Kiểm duyệt 100% luật cờ tướng quốc tế: quy tắc Cửu Cung, cản chân Mã, cản mắt Tượng, không lộ mặt Tướng và đồng hồ bấm giờ chuẩn xác.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. CHARACTER SPOTLIGHT: TỨ ĐẠI DANH TƯỚNG KHỞI NGUYÊN
          (Interactive Character Showcase: Bố Trí Tinh Tế, Có Mô Hình 3D Chuyển Động)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-20 border-t border-amber-900/20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/25">
            Danh Tướng Trợ Chiến
          </span>
          <h2
            className="text-3xl sm:text-5xl font-black text-gold-metallic mt-4 mb-3 tracking-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            TỨ ĐẠI DANH TƯỚNG KHỞI NGUYÊN
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Mỗi vị tướng sở hữu tượng điêu khắc 3D sống động với nhịp thở, thần binh lơ lửng, tuyệt kỹ binh pháp độc quyền và giọng lồng tiếng hào hùng.
          </p>
        </div>

        {/* Character Tab Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {launchGenerals.map((gen, idx) => {
            const isActive = idx === activeGeneralIndex;
            return (
              <button
                key={gen.id}
                onClick={() => setActiveGeneralIndex(idx)}
                className={`py-2.5 px-5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2.5 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105"
                    : "bg-stone-950/80 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-amber-500/30"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: gen.avatarColor, borderColor: gen.accentColor }}
                />
                <span>{gen.name}</span>
                {gen.id === equippedGeneralId && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-950 text-amber-300 font-bold">
                    Xuất Trận
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Character Cinematic Spotlight Card */}
        <div className="glass-card-luxury corner-accent rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: 3D Animated Figurine or 2D Portrait Visual (5 cols) */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              
              {/* View Mode Toggle Pill (3D Chuyển Động vs 2D Tranh Hoạ) */}
              <div className="flex items-center gap-1.5 bg-stone-950/90 p-1 rounded-2xl border border-amber-500/30 mb-3 shadow-lg z-10">
                <button
                  onClick={() => setCharacterViewMode("3d")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    characterViewMode === "3d"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md"
                      : "text-stone-400 hover:text-amber-200"
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>Tượng 3D Chuyển Động</span>
                </button>
                <button
                  onClick={() => setCharacterViewMode("2d")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    characterViewMode === "2d"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md"
                      : "text-stone-400 hover:text-amber-200"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Tranh Hoạ 2D</span>
                </button>
              </div>

              {/* Display Container */}
              <div className="w-full max-w-sm">
                {characterViewMode === "3d" ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30">
                    <General3DCanvas
                      general={currentGeneral}
                      height="460px"
                      showControls={true}
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl group">
                    {currentGeneral.portrait && (
                      <Image
                        src={currentGeneral.portrait}
                        alt={currentGeneral.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {/* Faction Seal Stamp at Top Right */}
                    <div className="absolute top-4 right-4">
                      <span className="seal-stamp text-xs px-2.5 py-1">
                        {currentGeneral.faction === "shu" ? "蜀 漢" : currentGeneral.faction === "wei" ? "曹 魏" : "群 雄"}
                      </span>
                    </div>

                    {/* Bottom Card Identity */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
                        {currentGeneral.title}
                      </span>
                      <h3
                        className="text-2xl sm:text-3xl font-black text-amber-100"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {currentGeneral.name}
                      </h3>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right: Tactical Lore & Abilities (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-extrabold text-xs">
                    {currentGeneral.rarity.toUpperCase()}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    Thần Binh: <strong className="text-amber-200">{currentGeneral.weapon}</strong>
                  </span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-black text-amber-100 mb-2"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {currentGeneral.name} &bull; {currentGeneral.title}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {currentGeneral.description}
                </p>
              </div>

              {/* Special Tactic Feature Box */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/25">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1.5">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Tuyệt Kỹ Binh Pháp: {currentGeneral.specialTactic}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {currentGeneral.tacticDesc}
                </p>
              </div>

              {/* General Voice Line Quote */}
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-amber-400 font-bold block mb-0.5">Khẩu Hiệu Xuất Trận:</span>
                  <p className="text-xs text-stone-300 italic truncate">
                    &ldquo;{currentGeneral.voiceLines.greeting}&rdquo;
                  </p>
                </div>
                <button
                  onClick={() => playVoiceAudio(currentGeneral)}
                  disabled={playingVoice === currentGeneral.id}
                  className="py-2 px-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{playingVoice === currentGeneral.id ? "Đang Phát..." : "Nghe Voice"}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleEquipGeneral(currentGeneral)}
                  disabled={equippedGeneralId === currentGeneral.id}
                  className={`py-3.5 px-6 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg ${
                    equippedGeneralId === currentGeneral.id
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 btn-luxury-shimmer"
                  }`}
                >
                  {equippedGeneralId === currentGeneral.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đang Xuất Trận</span>
                    </>
                  ) : (
                    <>
                      <Swords className="w-4 h-4" />
                      <span>Chọn Tướng Này Xuất Trận</span>
                    </>
                  )}
                </button>

                <Link
                  href="/characters"
                  className="py-3.5 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Bộ Sưu Tập Toàn Bộ Danh Tướng</span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Season 2 Roadmap Banner */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-stone-950 via-amber-950/20 to-stone-950 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="seal-stamp text-[10px] px-1.5 py-0.2">赤壁</span>
                <h4 className="text-sm font-black text-amber-200">
                  Lộ Trình Mùa 2: Đại Chiến Xích Bích
                </h4>
              </div>
              <p className="text-xs text-stone-400">
                Sắp mở khóa: Triệu Vân, Trương Phi, Chu Du, Tư Mã Ý, Lục Tốn, Điêu Thuyền.
              </p>
            </div>
          </div>

          <Link
            href="/characters"
            className="py-2.5 px-5 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-bold text-xs transition-all border border-stone-800 shrink-0 flex items-center gap-1.5"
          >
            <span>Xem Danh Sách Khóa</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* =========================================================================
          4. BATTLEFIELD MODES: 3 PANORAMIC GAME MODES
          (Bố Cục To Cảnh Rộng Thay Vì Hàng Loạt Hộp Nhỏ Lặp Lại)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-20">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/25">
            Chiến Trường Tranh Hùng
          </span>
          <h2
            className="text-3xl sm:text-5xl font-black text-gold-metallic mt-4 mb-3 tracking-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            CÁC CHẾ ĐỘ THI ĐẤU ĐỈNH CAO
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Từ rèn luyện thuật toán cùng AI MiniMax chuyên sâu, tỷ thí xếp hạng trực tuyến đến giải mã các thế cờ lịch sử.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Mode 1: Bot AI */}
          <div className="glass-card-luxury corner-accent rounded-3xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Bot className="w-7 h-7" />
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  4 CẤP ĐỘ AI
                </span>
              </div>

              <h3 className="text-xl font-black text-amber-100 mb-3 group-hover:text-amber-300 transition-colors">
                Luyện Công Bot AI MiniMax
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Thử sức với thuật toán tìm kiếm nước đi sâu Alpha-Beta Pruning. Hỗ trợ đầy đủ tính năng: gợi ý nước đi tối ưu (Hint), đi lại (Undo), chọn phe Đỏ/Đen và Avatar 3D xuất trận.
              </p>
            </div>

            <Link
              href="/play/bot"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs tracking-wider uppercase text-center transition-all flex items-center justify-center gap-2 shadow-lg btn-luxury-shimmer"
            >
              <span>Vào Đấu Trí Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mode 2: PvP Ranked */}
          <div className="glass-card-luxury corner-accent rounded-3xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                  <Swords className="w-7 h-7" />
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  XẾP HẠNG ELO
                </span>
              </div>

              <h3 className="text-xl font-black text-amber-100 mb-3 group-hover:text-rose-300 transition-colors">
                Đấu Trường PvP Trực Tuyến
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Ghép trận thời gian thực với kỳ thủ khắp năm châu. Hệ thống tính điểm ELO chuẩn quốc tế, bảng xếp hạng vinh danh mùa giải và hạ tầng WebSocket phản hồi tức thì.
              </p>
            </div>

            <Link
              href="/play/pvp"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-black text-xs tracking-wider uppercase text-center transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Tranh Đoạt Bảng Vàng</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mode 3: Xiangqi Historical Puzzles */}
          <div className="glass-card-luxury corner-accent rounded-3xl p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Scroll className="w-7 h-7" />
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  CHIẾN DỊCH
                </span>
              </div>

              <h3 className="text-xl font-black text-amber-100 mb-3 group-hover:text-emerald-300 transition-colors">
                Kỳ Phổ &amp; Cờ Thế Tam Quốc
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Tái hiện các thế cờ tàn hiểm hóc gắn liền với điển tích lịch sử: Vượt Năm Ải Trảm Sáu Tướng, Đơn Đao Phó Hội, Xích Bích Phá Trận. Giải cờ nhận thưởng vàng và ngọc bảo.
              </p>
            </div>

            <Link
              href="/play/puzzles"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-xs tracking-wider uppercase text-center transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Phá Trận Kỳ Cổ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </section>

      {/* =========================================================================
          5. CALL TO ACTION & FOOTER
          (Kết Bài Vương Quyền, Tối Giản, Đẳng Cấp)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full relative z-20 text-center">
        
        <div className="p-8 sm:p-14 rounded-3xl glass-card-luxury corner-accent relative overflow-hidden">
          <div className="relative z-10">
            <span className="seal-stamp text-xs px-2.5 py-1 mb-4 inline-block">
              天下為棋
            </span>
            <h2
              className="text-3xl sm:text-5xl font-black text-gold-metallic mb-4 tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Giang Sơn Như Họa &bull; Kỳ Đạo Quyết Binh
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Bước vào bàn cờ 3D, lĩnh hội mưu lược Gia Cát Lượng, dũng khí Quan Vũ và quyết đoán của Tào Tháo để khắc tên lên đỉnh cao bảng vàng.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/play/bot"
                className="btn-luxury-shimmer w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-black text-sm tracking-wider uppercase text-center shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-amber-200"
              >
                <Swords className="w-4 h-4 text-stone-950" />
                <span>Bắt Đầu Ván Cờ Ngay</span>
              </Link>

              <Link
                href="/play/custom"
                className="w-full sm:w-auto py-4 px-7 rounded-2xl bg-stone-950/80 hover:bg-stone-900 border border-stone-700 text-stone-200 hover:text-white font-bold text-sm tracking-wide text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Tạo Phòng Bạn Bè</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Elegant Minimalist Footer */}
      <footer className="border-t border-amber-500/15 py-10 px-4 text-center text-xs text-stone-400 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="font-serif font-black text-amber-400 text-base">帥</span>
            <span className="font-serif font-black text-stone-200 tracking-wider">DYNASTY CHESS 3D</span>
            <span className="text-stone-600">&bull;</span>
            <span>Kỳ Vương Tam Quốc 3D Online &amp; Offline</span>
          </div>
          <div>
            <span>Chuẩn Luật Thi Đấu WXF &bull; Bản Quyền 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
