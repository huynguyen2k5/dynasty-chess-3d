'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Swords, Users, Shield, Zap, Search, Globe, Bot } from 'lucide-react';

export default function PlayPvPPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [timeControl, setTimeControl] = useState('10+5');

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-center">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-red-500/30 relative overflow-hidden">
        <div className="inline-flex p-4 rounded-3xl bg-red-500/10 border border-red-500/30 text-red-400 mb-4">
          <Swords className="h-10 w-10" />
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-white mb-2">
          ĐẤU TRƯỜNG ONLINE PVP
        </h1>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto mb-8">
          Hệ thống ghép trận tự động tìm kiếm đối thủ xứng tầm theo điểm số ELO, độ trễ WebSocket dưới 20ms.
        </p>

        {/* Time Control Options */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          {[
            { id: '3+2', title: 'Chớp (Blitz)', time: '3p + 2s' },
            { id: '10+5', title: 'Nhanh (Rapid)', time: '10p + 5s' },
            { id: '20+10', title: 'Tiêu chuẩn', time: '20p + 10s' },
          ].map(tc => (
            <button
              key={tc.id}
              onClick={() => setTimeControl(tc.id)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                timeControl === tc.id
                  ? 'border-amber-400 bg-amber-500/15 text-white shadow-lg'
                  : 'border-white/10 hover:border-white/30 text-zinc-400'
              }`}
            >
              <div className="font-bold text-sm text-white">{tc.title}</div>
              <div className="text-xs text-amber-400 mt-1">{tc.time}</div>
            </button>
          ))}
        </div>

        {/* Action Button */}
        {isSearching ? (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm animate-pulse">
              <Search className="h-4 w-4 animate-spin" /> Đang tìm đối thủ trong phạm vi ±50 ELO...
            </div>
            <div>
              <button
                onClick={() => setIsSearching(false)}
                className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-400"
              >
                Hủy Tìm Trận
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setIsSearching(true)}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-base shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              TÌM TRẬN NGAY
            </button>
            <div>
              <Link
                href="/play/bot"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-300 transition-colors"
              >
                <Bot className="h-3.5 w-3.5" /> Hoặc luyện tập trước với Bot Offline
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
