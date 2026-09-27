'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Swords, RotateCw, ArrowRight } from 'lucide-react';

export default function PassAndPlayPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-center">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30">
        <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
          <Smartphone className="h-10 w-10" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-white mb-2">
          CHƠI 2 NGƯỜI TRÊN 1 THIẾT BỊ
        </h1>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-8">
          Chế độ lý tưởng cho điện thoại, máy tính bảng hoặc laptop khi bạn bè ngồi đối diện nhau. Hệ thống tự động đếm giờ và phân định lượt cờ.
        </p>

        <Link
          href="/play?mode=pass_play"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 text-black font-extrabold text-base shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
        >
          <Swords className="h-5 w-5" /> BẮT ĐẦU VÁN ĐẤU 2 NGƯỜI
        </Link>
      </div>
    </div>
  );
}
