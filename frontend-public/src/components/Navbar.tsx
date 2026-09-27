'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Swords,
  Trophy,
  Users,
  Store,
  ChevronDown,
  Coins,
  Gem,
  Star,
  Crown,
  Shield,
  Award,
  History,
  Settings,
  Volume2,
  Menu,
  X,
  Bot,
  UserCheck,
  DoorOpen,
  Puzzle,
  Share2
} from 'lucide-react';
import { GENERALS, General } from '@/lib/constants';

export default function Navbar() {
  const pathname = usePathname();
  const [isModesOpen, setIsModesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeGeneral, setActiveGeneral] = useState<General>(GENERALS[0]);
  const [gold, setGold] = useState(2500);
  const [silver, setSilver] = useState(17000);

  const profileRef = useRef<HTMLDivElement>(null);
  const modesRef = useRef<HTMLDivElement>(null);

  // Sync active general from localStorage
  useEffect(() => {
    const updateGeneral = () => {
      const savedId = localStorage.getItem('active_general');
      if (savedId) {
        const found = GENERALS.find(g => g.id === savedId);
        if (found) setActiveGeneral(found);
      }
      const savedGold = localStorage.getItem('user_gold');
      if (savedGold) setGold(parseInt(savedGold, 10));
      const savedSilver = localStorage.getItem('user_silver');
      if (savedSilver) setSilver(parseInt(savedSilver, 10));
    };

    updateGeneral();
    window.addEventListener('storage', updateGeneral);
    return () => window.removeEventListener('storage', updateGeneral);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (modesRef.current && !modesRef.current.contains(e.target as Node)) {
        setIsModesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const playModes = [
    {
      href: '/play/bot',
      label: 'Đấu Trí Bot AI',
      desc: '4 cấp độ thông minh, gợi ý & đi lại',
      icon: Bot,
      badge: 'Luyện Tập',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
    },
    {
      href: '/play/pvp',
      label: 'Đấu Trường PvP',
      desc: 'Ghép trận trực tuyến, tính điểm ELO',
      icon: Swords,
      badge: 'Xếp Hạng',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
    },
    {
      href: '/play/custom',
      label: 'Tạo Phòng Bạn Bè',
      desc: 'Mã PIN ngẫu nhiên 1-click, mời nhanh',
      icon: DoorOpen,
      badge: 'Riêng Tư',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
    },
    {
      href: '/play/puzzles',
      label: 'Cờ Thế Tam Quốc',
      desc: 'Phá vây chiến dịch, nhận thưởng Vàng',
      icon: Puzzle,
      badge: 'Chiến Dịch',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
    {
      href: '/play/pass-and-play',
      label: '2 Người 1 Máy',
      desc: 'Đấu trực tiếp ngoại tuyến, tự xoay cờ',
      icon: Users,
      badge: 'Offline',
      color: 'text-amber-300',
      bgColor: 'bg-amber-600/10',
      borderColor: 'border-amber-600/30',
    },
  ];

  const mainLinks = [
    { href: '/', label: 'Trang Chủ', icon: Sparkles },
    { href: '/characters', label: 'Danh Tướng', icon: Shield },
    { href: '/shop', label: 'Tàng Bảo Các', icon: Store },
    { href: '/leaderboard', label: 'Bảng Xếp Hạng', icon: Trophy },
  ];

  const factionBorderColors: Record<string, string> = {
    shu: 'from-emerald-400 to-emerald-600',
    wei: 'from-indigo-400 to-indigo-600',
    wu: 'from-amber-400 to-amber-600',
    neutral: 'from-rose-400 to-rose-600',
  };

  const factionBadgeColors: Record<string, string> = {
    shu: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
    wei: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30',
    wu: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
    neutral: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 bg-[#07080c]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. BRAND LOGO (CLEAN & ROYAL)
            ========================================================================= */}
        <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
          {/* Royal Seal Badge */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-red-700 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.35)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] group-hover:scale-105 transition-all duration-300">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0c0e15]">
              <span className="text-2xl font-serif font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                帥
              </span>
            </div>
          </div>

          <div>
            <div className="font-serif text-lg font-black tracking-wider text-white flex items-center gap-2 group-hover:text-amber-200 transition-colors">
              DYNASTY CHESS
              <span className="text-amber-400 text-[10px] tracking-widest font-sans font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 shadow-inner">
                3D
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-sans tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Kỳ Vương Tam Quốc
            </p>
          </div>
        </Link>

        {/* =========================================================================
            2. DESKTOP NAVIGATION LINKS (CLEAN, CLEAR, TYPOGRAPHIC ELEGANCE)
            ========================================================================= */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          
          {/* Trang Chủ */}
          <Link
            href="/"
            className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-lg ${
              pathname === '/'
                ? 'text-amber-300 font-bold'
                : 'text-stone-400 hover:text-stone-100 hover:bg-white/[0.04]'
            }`}
          >
            <span>Trang Chủ</span>
            {pathname === '/' && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>

          {/* Chế Độ Chơi (Dropdown Menu) */}
          <div ref={modesRef} className="relative">
            <button
              onClick={() => setIsModesOpen(!isModesOpen)}
              className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-lg ${
                pathname.startsWith('/play') || isModesOpen
                  ? 'text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-white/[0.04]'
              }`}
            >
              <span>Chế Độ Chơi</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isModesOpen ? 'rotate-180 text-amber-400' : 'text-stone-400'
                }`}
              />
              {pathname.startsWith('/play') && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* Dropdown Popover */}
            <AnimatePresence>
              {isModesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-full left-0 mt-2.5 w-80 rounded-2xl bg-[#0c0e17]/98 p-2.5 shadow-2xl border border-amber-500/25 backdrop-blur-2xl z-50 divide-y divide-white/5"
                >
                  <div className="px-3 py-2 text-[10px] font-bold text-amber-400/90 uppercase tracking-widest flex items-center justify-between">
                    <span>Chọn Chiến Trường</span>
                    <span className="text-stone-500 font-normal">5 Chế Độ</span>
                  </div>

                  <div className="pt-1.5 space-y-1">
                    {playModes.map(mode => {
                      const Icon = mode.icon;
                      const isCurrent = pathname === mode.href;
                      return (
                        <Link
                          key={mode.href}
                          href={mode.href}
                          onClick={() => setIsModesOpen(false)}
                          className={`flex items-center gap-3 p-2.5 rounded-xl transition-all group ${
                            isCurrent
                              ? 'bg-amber-500/15 border border-amber-500/30'
                              : 'hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className={`p-2 rounded-xl ${mode.bgColor} ${mode.color} border ${mode.borderColor} group-hover:scale-105 transition-transform`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-200 group-hover:text-amber-300 transition-colors">
                                {mode.label}
                              </span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-stone-300 font-mono font-semibold">
                                {mode.badge}
                              </span>
                            </div>
                            <div className="text-[11px] text-stone-400 truncate mt-0.5">{mode.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Danh Tướng 3D */}
          <Link
            href="/characters"
            className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-lg ${
              pathname === '/characters'
                ? 'text-amber-300 font-bold'
                : 'text-stone-400 hover:text-stone-100 hover:bg-white/[0.04]'
            }`}
          >
            <span>Danh Tướng</span>
            {pathname === '/characters' && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>

          {/* Tàng Bảo Các */}
          <Link
            href="/shop"
            className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-lg ${
              pathname === '/shop'
                ? 'text-amber-300 font-bold'
                : 'text-stone-400 hover:text-stone-100 hover:bg-white/[0.04]'
            }`}
          >
            <span>Tàng Bảo Các</span>
            {pathname === '/shop' && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>

          {/* Bảng Xếp Hạng */}
          <Link
            href="/leaderboard"
            className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-lg ${
              pathname === '/leaderboard'
                ? 'text-amber-300 font-bold'
                : 'text-stone-400 hover:text-stone-100 hover:bg-white/[0.04]'
            }`}
          >
            <span>Xếp Hạng</span>
            {pathname === '/leaderboard' && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>

        </nav>

        {/* =========================================================================
            3. RIGHT SECTION: WALLETS + ELEVATED USER AVATAR + CTA
            ========================================================================= */}
        <div className="flex items-center gap-3">
          
          {/* Wallet Chips (Clean & Polished) */}
          <div className="hidden sm:flex items-center gap-3 bg-stone-950/80 border border-amber-500/20 rounded-full px-3.5 py-1.5 shadow-inner backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs" title="Vàng Hoàng Kim">
              <Coins className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-mono">{gold.toLocaleString()}</span>
            </div>
            <span className="text-stone-700 font-light">|</span>
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs" title="Ngọc Bảo Bạc">
              <Gem className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-mono">{silver.toLocaleString()}</span>
            </div>
          </div>

          {/* USER AVATAR WIDGET (STUNNING & LUXURIOUS) */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 sm:pr-3 rounded-full bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-amber-500/30 hover:border-amber-400 transition-all shadow-md group hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              title="Xem hồ sơ kỳ thủ & danh tướng"
            >
              {/* Avatar Sphere with Faction Aura Ring & Level Badge */}
              <div className="relative">
                <div
                  className={`w-9 h-9 rounded-full p-0.5 bg-gradient-to-br ${
                    factionBorderColors[activeGeneral.faction] || 'from-amber-400 to-amber-600'
                  } shadow-md group-hover:scale-105 transition-transform`}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-sm font-black text-white shadow-inner"
                    style={{ backgroundColor: activeGeneral.avatarColor }}
                  >
                    {activeGeneral.name[0]}
                  </div>
                </div>

                {/* Level Badge Pip */}
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 font-black text-[9px] border border-stone-950 shadow-sm leading-tight">
                  28
                </div>
              </div>

              {/* Player & General Info Text */}
              <div className="text-left hidden md:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-stone-100 group-hover:text-amber-300 transition-colors leading-tight">
                    {activeGeneral.name}
                  </span>
                  <Crown className="h-3 w-3 text-amber-400" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-amber-400/90 leading-tight font-medium">
                  <span>Kỳ Vương II</span>
                  <span className="text-stone-600">•</span>
                  <span className="text-emerald-400 font-mono font-bold">1,850 ELO</span>
                </div>
              </div>

              <ChevronDown className={`hidden md:block h-3.5 w-3.5 text-stone-400 group-hover:text-amber-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Card */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-80 sm:w-88 rounded-3xl bg-[#0c0e17]/98 p-5 shadow-2xl border border-amber-500/30 backdrop-blur-2xl z-50"
                >
                  {/* Profile Header */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-white/10 mb-4">
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg"
                      >
                        <div
                          className="w-full h-full rounded-[14px] flex items-center justify-center text-2xl font-black text-white"
                          style={{ backgroundColor: activeGeneral.avatarColor }}
                        >
                          {activeGeneral.name[0]}
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] border-2 border-stone-950">
                        Lv.28
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-base text-amber-100 truncate">
                          Kỳ Thánh Tam Quốc
                        </h4>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[9px] border border-amber-500/30 uppercase">
                          VIP 4
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 truncate mt-0.5">
                        Xuất trận: <strong className="text-amber-300">{activeGeneral.name}</strong> ({activeGeneral.title})
                      </p>
                      <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        <Trophy className="h-3 w-3" />
                        <span>Hạng 42 Toàn Quốc</span>
                      </div>
                    </div>
                  </div>

                  {/* Player Stats Mini Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 bg-stone-950/70 rounded-2xl border border-stone-800/80 text-center mb-4">
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider">Điểm ELO</div>
                      <div className="text-sm font-black text-amber-300 font-mono mt-0.5">1,850</div>
                    </div>
                    <div className="border-x border-stone-800">
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider">Tỷ Lệ Thắng</div>
                      <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">68.2%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider">Tổng Trận</div>
                      <div className="text-sm font-black text-stone-200 font-mono mt-0.5">208</div>
                    </div>
                  </div>

                  {/* Active General Skill Badge */}
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 mb-4 text-xs">
                    <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3.5 w-3.5 text-amber-400" />
                        Tuyệt Kỹ Đồng Hành:
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                        {activeGeneral.weapon}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 italic line-clamp-2">
                      "{activeGeneral.voiceLines.greeting}"
                    </p>
                  </div>

                  {/* Quick Profile Actions */}
                  <div className="space-y-1.5 pt-1 text-xs font-bold">
                    <Link
                      href="/characters"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/80 hover:bg-amber-500 hover:text-stone-950 text-stone-200 transition-all border border-stone-800 hover:border-amber-400 group"
                    >
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-400 group-hover:text-stone-950" />
                        Đổi Danh Tướng Xuất Trận
                      </span>
                      <span className="text-stone-500 group-hover:text-stone-950">→</span>
                    </Link>

                    <Link
                      href="/shop"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/80 hover:bg-white/10 text-stone-200 transition-colors border border-stone-800"
                    >
                      <span className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-indigo-400" />
                        Tàng Bảo Các (Mua Skin / Quân Cờ)
                      </span>
                      <span className="text-stone-500">→</span>
                    </Link>

                    <Link
                      href="/leaderboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/80 hover:bg-white/10 text-stone-200 transition-colors border border-stone-800"
                    >
                      <span className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        Bảng Vinh Danh Top 100
                      </span>
                      <span className="text-stone-500">→</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Play CTA Button (Prominent) */}
          <Link
            href="/play/bot"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Swords className="h-4 w-4" />
            <span>Vào Chơi</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
            aria-label="Mở menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* =========================================================================
          4. MOBILE EXPANDED MENU DRAWER
          ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-amber-500/20 bg-[#07080c]/98 px-4 py-6 space-y-4 backdrop-blur-2xl"
          >
            {/* Mobile Wallet Bar */}
            <div className="flex items-center justify-around bg-stone-950 p-3 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Coins className="h-4 w-4" />
                <span>{gold.toLocaleString()} Vàng</span>
              </div>
              <span className="text-stone-700">|</span>
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Gem className="h-4 w-4" />
                <span>{silver.toLocaleString()} Bạc</span>
              </div>
            </div>

            {/* Mobile Links */}
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-stone-200 hover:bg-white/5"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                Trang Chủ
              </Link>

              <div className="pt-2 pb-1 px-4 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Các Chế Độ Chơi
              </div>
              {playModes.map(mode => {
                const Icon = mode.icon;
                return (
                  <Link
                    key={mode.href}
                    href={mode.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-stone-300 hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${mode.color}`} />
                      <span>{mode.label}</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-stone-400">
                      {mode.badge}
                    </span>
                  </Link>
                );
              })}

              <div className="pt-2 pb-1 px-4 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Khám Phá
              </div>
              <Link
                href="/characters"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-stone-200 hover:bg-white/5"
              >
                <Users className="h-4 w-4 text-amber-400" />
                Danh Tướng 3D
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-stone-200 hover:bg-white/5"
              >
                <Store className="h-4 w-4 text-indigo-400" />
                Tàng Bảo Các
              </Link>
              <Link
                href="/leaderboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-stone-200 hover:bg-white/5"
              >
                <Trophy className="h-4 w-4 text-yellow-400" />
                Bảng Xếp Hạng
              </Link>
            </div>

            {/* Mobile Play CTA */}
            <div className="pt-2">
              <Link
                href="/play/bot"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black text-sm text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Swords className="h-4 w-4" />
                Vào Chơi Ngay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
