'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Copy, Check, ArrowRight, Shield, Swords, Sparkles, Key, Lock, Share2 } from 'lucide-react';

export default function CustomRoomPage() {
  const [createdRoomCode, setCreatedRoomCode] = useState('TAMQUOC-8899');
  const [joinCode, setJoinCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeControl, setTimeControl] = useState('10+5');
  const [side, setSide] = useState<'random' | 'red' | 'black'>('random');

  const copyCode = () => {
    navigator.clipboard.writeText(createdRoomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNewCode = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    setCreatedRoomCode(`TAMQUOC-${num}`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3 shadow-lg shadow-cyan-500/10">
          <Users className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-white">
          PHÒNG THI ĐẤU GIAO HỮU BẠN BÈ
        </h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
          Tạo phòng riêng biệt hoặc nhập mã phòng của bạn bè để so tài cờ tướng không tính ELO.
        </p>
      </motion.div>

      {/* Grid: Create Room (Left) vs Join Room (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Create Room Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel p-8 rounded-3xl border border-cyan-500/30 relative flex flex-col justify-between shadow-2xl hover:border-cyan-400/50 transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Tạo Phòng Mới
              </span>
              <button
                onClick={handleGenerateNewCode}
                className="text-[11px] text-zinc-400 hover:text-cyan-300 underline"
              >
                Đổi mã mới
              </button>
            </div>

            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              Mã Phòng Độc Quyền
            </h2>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Gửi mã phòng này cho bạn bè qua Zalo, Messenger hoặc gửi link trực tiếp để mời vào bàn cờ.
            </p>

            {/* Room Code Display Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 flex items-center justify-between gap-3 mb-6">
              <span className="font-mono text-2xl font-black text-cyan-300 tracking-widest">
                {createdRoomCode}
              </span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Đã sao chép' : 'Sao chép'}
              </button>
            </div>

            {/* Room Settings */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Thời Gian Đấu:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '5+3', label: '5p + 3s' },
                    { id: '10+5', label: '10p + 5s' },
                    { id: '20+10', label: '20p + 10s' },
                  ].map(tc => (
                    <button
                      key={tc.id}
                      onClick={() => setTimeControl(tc.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        timeControl === tc.id
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                          : 'border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      {tc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Chọn Cầm Quân:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'random', label: 'Ngẫu Nhiên', icon: 'dices' },
                    { id: 'red', label: 'Đi Trước (Đỏ)', icon: 'red' },
                    { id: 'black', label: 'Đi Sau (Đen)', icon: 'black' },
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSide(s.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                        side === s.id
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                          : 'border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4">
            <Link
              href={`/play/bot?room=${createdRoomCode}&mode=custom`}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <Swords className="h-4 w-4" /> VÀO BÀN CỜ ĐỢI BẠN
            </Link>
          </div>
        </motion.div>

        {/* Join Room Card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel p-8 rounded-3xl border border-white/10 relative flex flex-col justify-between shadow-2xl hover:border-amber-400/40 transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5" /> Tham Gia Phòng
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              Nhập Mã Phòng Bạn Bè
            </h2>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Dán mã phòng hoặc nhập mã PIN do bạn bè chia sẻ để ngay lập tức vào đài thi đấu.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Mã Phòng:</label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="VD: TAMQUOC-8899"
                  className="w-full bg-black/60 border border-white/15 focus:border-amber-400 rounded-2xl px-5 py-3.5 text-lg font-mono font-bold text-amber-300 uppercase tracking-widest placeholder:text-zinc-600 focus:outline-none transition-all"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                  <Shield className="h-4 w-4 text-emerald-400" /> Kết nối bảo mật thời gian thực
                </div>
                <p>Không phân biệt tài khoản khách hay thành viên, bất kỳ ai có mã đều có thể giao đấu mượt mà.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4">
            <Link
              href={joinCode ? `/play/bot?room=${joinCode}&mode=custom` : '#'}
              className={`w-full py-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                joinCode
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-black shadow-xl shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              THAM GIA PHÒNG ĐẤU <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
