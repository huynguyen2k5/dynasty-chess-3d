'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Volume2,
  Shield,
  Swords,
  Sparkles,
  Award,
  CheckCircle2,
  Lock,
  Flame,
  Zap,
  Crown,
  ChevronRight,
  Info,
  Brain,
  Castle,
  Check,
  MessageSquare,
  Rotate3d
} from 'lucide-react';
import { GENERALS, General } from '@/lib/constants';
import General3DCanvas from '@/components/General3DCanvas';

export default function CharactersPage() {
  const launchGenerals = GENERALS.filter(g => !g.isUpcoming);
  const upcomingGenerals = GENERALS.filter(g => g.isUpcoming);

  const [selectedGeneral, setSelectedGeneral] = useState<General>(launchGenerals[0]);
  const [equippedGeneralId, setEquippedGeneralId] = useState<string>('zhuge_liang');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync equipped general
  useEffect(() => {
    const saved = localStorage.getItem('active_general');
    if (saved) {
      setEquippedGeneralId(saved);
      const found = GENERALS.find(g => g.id === saved);
      if (found) setSelectedGeneral(found);
    }
  }, []);

  const handleEquip = (gen: General) => {
    if (gen.isUpcoming) return;
    setEquippedGeneralId(gen.id);
    localStorage.setItem('active_general', gen.id);
    window.dispatchEvent(new Event('storage'));
    setToastMessage(`Đã xuất trận danh tướng: ${gen.name}!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const playVoice = (gen: General) => {
    setIsPlayingAudio(true);
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const freqs: Record<string, number> = {
        shu: 392.00,
        wei: 329.63,
        wu: 440.00,
        neutral: 523.25,
      };

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freqs[gen.faction] || 440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime((freqs[gen.faction] || 440) * 1.6, audioCtx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.4);
    } catch {
      // Audio fallback
    }

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 3500);
  };

  const factionStyles: Record<string, { badge: string; color: string; border: string; bg: string }> = {
    shu: { badge: 'Thục Hán (蜀)', color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-950/60' },
    wei: { badge: 'Tào Ngụy (魏)', color: 'text-indigo-400', border: 'border-indigo-500/40', bg: 'bg-indigo-950/60' },
    wu: { badge: 'Đông Ngô (吳)', color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-950/60' },
    neutral: { badge: 'Quần Hùng (群)', color: 'text-rose-400', border: 'border-rose-500/40', bg: 'bg-rose-950/60' },
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-amber-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-24 right-6 z-50 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black shadow-2xl flex items-center gap-3 border border-amber-300"
          >
            <CheckCircle2 className="h-5 w-5 text-stone-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full">
        
        {/* =========================================================================
            HEADER: BREADCRUMB & TITLE
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-amber-900/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-2">
              <Link href="/" className="hover:underline">Trang Chủ</Link>
              <span>/</span>
              <span className="text-stone-400">Doanh Trại Danh Tướng 3D</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 tracking-tight">
              DOANH TRẠI DANH TƯỚNG 3D
            </h1>
            <p className="text-stone-400 text-sm sm:text-base mt-1.5 max-w-2xl">
              Bộ tứ trụ danh tướng khởi đầu được chế tác tỉ mỉ với mô hình 3D 360°, thần binh đặc hữu, tuyệt kỹ trận pháp và âm thanh voice thoại hào hùng.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/play/bot"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2"
            >
              <Swords className="h-4 w-4" />
              <span>Vào Đấu Trí Ngay</span>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            1. BỘ TỨ DANH TƯỚNG KHỞI ĐẦU (4 METICULOUS LAUNCH LEGENDS)
            ========================================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-amber-200 tracking-wide">
                TỨ TRỤ DANH TƯỚNG KHỞI ĐẦU (4 VỊ TƯỚNG TIÊU BIỂU)
              </h2>
            </div>
            <span className="text-xs font-bold text-stone-400 bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
              Được Điêu Khắc 3D & Lồng Tiếng Hoàn Hảo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {launchGenerals.map(gen => {
              const isSelected = selectedGeneral.id === gen.id;
              const isEquipped = equippedGeneralId === gen.id;
              const fStyle = factionStyles[gen.faction];

              return (
                <motion.div
                  key={gen.id}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedGeneral(gen)}
                  className={`cursor-pointer rounded-3xl p-4 bg-gradient-to-b from-stone-900/90 to-stone-950 border transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden ${
                    isSelected
                      ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                      : 'border-stone-800 hover:border-amber-500/50'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3.5 bg-stone-950 border border-stone-800 shadow-inner group-hover:border-amber-500/40 transition-colors">
                    {gen.portrait && (
                      <Image
                        src={gen.portrait}
                        alt={gen.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Gradient Overlay for card text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Active Status Badge */}
                    {isEquipped && (
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 font-black text-[10px] shadow-lg flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Đang Xuất Trận</span>
                      </div>
                    )}

                    {/* Rarity Tag */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/75 text-amber-300 font-extrabold text-[9px] border border-amber-500/30 uppercase backdrop-blur-md">
                      {gen.rarity === 'mythic' ? '★ Thần Thoại' : 'Huyền Thoại'}
                    </div>

                    {/* Faction Bottom Tag */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] border backdrop-blur-sm ${fStyle.bg} ${fStyle.color} ${fStyle.border}`}>
                        {fStyle.badge}
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono">
                        {gen.stats.tactics}/100 Mưu
                      </span>
                    </div>
                  </div>

                  {/* General Name & Title */}
                  <div className="mb-3">
                    <h3 className="text-lg font-black text-amber-100 group-hover:text-amber-300 transition-colors">
                      {gen.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-medium">{gen.title}</p>
                    
                    {/* Special Tactic Badge */}
                    <div className="mt-2 p-2 rounded-xl bg-amber-950/25 border border-amber-500/20 text-[11px]">
                      <span className="text-amber-400 font-bold flex items-center gap-1 mb-0.5"><Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {gen.specialTactic}:</span>
                      <p className="text-stone-300 text-[10px] line-clamp-2 leading-relaxed">
                        {gen.tacticDesc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-stone-800/80">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEquip(gen);
                      }}
                      disabled={isEquipped}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                        isEquipped
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1.5">{isEquipped ? <><Check className="w-3.5 h-3.5 text-emerald-300" /> Đang Dùng</> : <><Swords className="w-3.5 h-3.5 text-stone-950" /> Xuất Trận</>}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playVoice(gen);
                      }}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition-colors"
                      title="Nghe thoại xuất trận"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            2. KHU VỰC GIÁM ĐỊNH 3D NÂNG CAO (DETAILED 3D INSPECTOR STAGE)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* 3D Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-3xl bg-gradient-to-b from-[#0c0e18] via-[#090b12] to-black border border-amber-500/30 p-2 shadow-2xl relative overflow-hidden">
              <General3DCanvas
                general={selectedGeneral}
                reaction="idle"
                height="520px"
                showControls={true}
              />

              <div className="absolute top-6 right-6 flex items-center gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[11px] border border-amber-500/40 uppercase tracking-widest backdrop-blur-md">
                  {selectedGeneral.rarity === 'mythic' ? '★ Thần Thoại' : 'Huyền Thoại'}
                </span>
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${factionStyles[selectedGeneral.faction].bg} ${factionStyles[selectedGeneral.faction].color} ${factionStyles[selectedGeneral.faction].border}`}>
                  {factionStyles[selectedGeneral.faction].badge}
                </span>
              </div>
            </div>

            {/* General Speech Banner */}
            <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-3.5 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <MessageSquare className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                    Khẩu Hiệu Xuất Trận • {selectedGeneral.name}
                  </span>
                  <button
                    onClick={() => playVoice(selectedGeneral)}
                    className="text-xs text-amber-300 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                    <span>{isPlayingAudio ? 'Đang phát thoại...' : 'Nghe Voice'}</span>
                  </button>
                </div>
                <p className="text-sm text-stone-200 italic mt-1 leading-relaxed">
                  "{selectedGeneral.voiceLines.greeting}"
                </p>
              </div>
            </div>
          </div>

          {/* Details & Combat Radar (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-amber-500/30 shadow-2xl relative">
              <div className="flex items-center gap-4 mb-4">
                {selectedGeneral.portrait ? (
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg shrink-0">
                    <Image
                      src={selectedGeneral.portrait}
                      alt={selectedGeneral.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg border-2 shrink-0"
                    style={{ backgroundColor: selectedGeneral.avatarColor, borderColor: selectedGeneral.accentColor }}
                  >
                    {selectedGeneral.name[0]}
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-black text-amber-100">{selectedGeneral.name}</h3>
                  <p className="text-xs text-amber-400 font-semibold">{selectedGeneral.title}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Thần binh: <strong className="text-stone-200">{selectedGeneral.weapon}</strong></p>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-6 border-t border-white/5 pt-3">
                {selectedGeneral.description}
              </p>

              {/* Special Tactic Box */}
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 mb-6">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-1">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>Tuyệt Kỹ Binh Pháp: {selectedGeneral.specialTactic}</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {selectedGeneral.tacticDesc}
                </p>
              </div>

              {/* Combat Stats Bars */}
              <div className="space-y-2.5 text-xs mb-6">
                <div>
                  <div className="flex items-center justify-between text-stone-300 mb-1">
                    <span className="font-bold flex items-center gap-1.5"><Brain className="w-4 h-4 text-amber-400" /> Mưu Lược</span>
                    <span className="font-mono font-bold text-amber-300">{selectedGeneral.stats.tactics}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedGeneral.stats.tactics}%` }}
                      className="h-full rounded-full bg-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-stone-300 mb-1">
                    <span className="font-bold flex items-center gap-1.5"><Swords className="w-4 h-4 text-rose-400" /> Sát Khí</span>
                    <span className="font-mono font-bold text-rose-400">{selectedGeneral.stats.aggression}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedGeneral.stats.aggression}%` }}
                      className="h-full rounded-full bg-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-stone-300 mb-1">
                    <span className="font-bold flex items-center gap-1.5"><Shield className="w-4 h-4 text-indigo-400" /> Thống Soái</span>
                    <span className="font-mono font-bold text-indigo-300">{selectedGeneral.stats.command}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedGeneral.stats.command}%` }}
                      className="h-full rounded-full bg-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-stone-300 mb-1">
                    <span className="font-bold flex items-center gap-1.5"><Castle className="w-4 h-4 text-emerald-400" /> Phòng Thủ</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedGeneral.stats.defense}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedGeneral.stats.defense}%` }}
                      className="h-full rounded-full bg-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Equip Action Button */}
              <button
                onClick={() => handleEquip(selectedGeneral)}
                disabled={equippedGeneralId === selectedGeneral.id}
                className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl ${
                  equippedGeneralId === selectedGeneral.id
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 cursor-default'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5'
                }`}
              >
                <span className="flex items-center justify-center gap-2">{equippedGeneralId === selectedGeneral.id ? <><Check className="w-4 h-4" /> Đang Xuất Trận Trên Bàn Cờ</> : <><Swords className="w-4 h-4" /> Xuất Trận Cùng Tướng Này</>}</span>
              </button>
            </div>

          </div>

        </div>

        {/* =========================================================================
            3. DANH TƯỚNG SẮP CẬP NHẬT TRONG MÙA 2 (SEASON 2 ROADMAP)
            ========================================================================= */}
        <div className="border-t border-amber-900/30 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500" />
                <h3 className="text-xl font-black text-amber-200 tracking-wide">
                  DANH TƯỚNG SẮP XUẤT THẾ (BẢN CẬP NHẬT MÙA 2: XÍCH BÍCH)
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Đang trong quá trình hoàn thiện mô hình 3D cao cấp và vũ khí thần binh
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Dự Kiến Ra Mắt: Quý 4/2026
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {upcomingGenerals.map(gen => (
              <div
                key={gen.id}
                className="rounded-2xl p-4 bg-stone-900/50 border border-stone-800/80 flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity relative overflow-hidden group"
              >
                {/* Lock Badge */}
                <div className="w-full aspect-square rounded-xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center p-3 mb-3 text-center relative overflow-hidden">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-2"><Lock className="w-5 h-5 text-amber-400" /></div>
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">
                    Mùa 2
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                </div>

                <div>
                  <h4 className="font-black text-sm text-stone-200 truncate">{gen.name}</h4>
                  <p className="text-[11px] text-stone-400 truncate">{gen.title}</p>
                  <p className="text-[10px] text-amber-500/80 truncate mt-1">
                    {gen.weapon}
                  </p>
                </div>

                <div className="mt-3 py-1 px-2 rounded-lg bg-stone-950 text-stone-400 text-[10px] font-bold text-center border border-stone-800">
                  Sắp Ra Mắt
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
