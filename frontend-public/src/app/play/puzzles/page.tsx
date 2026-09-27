'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Puzzle, Trophy, Coins, Star, Swords, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PuzzlesPage() {
  const puzzlesList = [
    {
      id: 'pz_1',
      title: 'Hỏa Thiêu Tân Dã',
      chapter: 'Chương 1',
      difficulty: 'Dễ (2 nước chiếu bí)',
      generals: 'Gia Cát Lượng vs Tào Nhân',
      reward: 500,
      stars: 3,
      solved: true,
      desc: 'Khổng Minh phục binh dùng Pháo khóa chặt đường tiến thoái của Tướng địch.',
    },
    {
      id: 'pz_2',
      title: 'Đơn Đao Phó Hội',
      chapter: 'Chương 2',
      difficulty: 'Trung Bình (2 nước)',
      generals: 'Quan Vũ vs Lỗ Túc',
      reward: 800,
      stars: 2,
      solved: false,
      desc: 'Quan Vân Trường dùng Mã và Chốt áp sát Cung cấm đoạt mạng Tướng Đông Ngô.',
    },
    {
      id: 'pz_3',
      title: 'Bát Trận Đồ Uy Chấn',
      chapter: 'Chương 3',
      difficulty: 'Khó (3 nước)',
      generals: 'Gia Cát Lượng vs Lục Tốn',
      reward: 1200,
      stars: 3,
      solved: false,
      desc: 'Song Pháo liên hoàn điệp chiếu trong thạch trận ngọa long huyền ảo.',
    },
    {
      id: 'pz_4',
      title: 'Qua Năm Ải Trảm Sáu Tướng',
      chapter: 'Chương 4',
      difficulty: 'Đại Sư (4 nước)',
      generals: 'Quan Vũ vs Biện Hỷ',
      reward: 2000,
      stars: 3,
      solved: false,
      desc: 'Xe Pháo Mã kết hợp thọc sâu hạ gục các đồn ải hiểm trở.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3 shadow-lg shadow-amber-500/10">
          <Puzzle className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-white">
          CHIẾN DỊCH CỜ THẾ TAM QUỐC
        </h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-xl mx-auto">
          Tái hiện các chiến dịch tàn cuộc huyền thoại trong Tam Quốc Diễn Nghĩa. Giải phá thế trận hiểm hóc để nhận hàng ngàn Vàng!
        </p>
      </motion.div>

      {/* Grid of Puzzles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {puzzlesList.map((pz, idx) => (
          <motion.div
            key={pz.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30">
                  {pz.chapter}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: pz.stars }).map((_, sIdx) => (
                    <Star key={sIdx} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                {pz.title}
              </h3>
              <div className="text-xs text-zinc-400 font-semibold mb-3">{pz.generals} • <span className="text-red-400">{pz.difficulty}</span></div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {pz.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                <Coins className="h-4 w-4 text-yellow-400" />
                <span>+{pz.reward.toLocaleString()} Vàng</span>
              </div>

              <Link
                href={`/play?mode=puzzle&id=${pz.id}`}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                PHÁ TRẬN <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
