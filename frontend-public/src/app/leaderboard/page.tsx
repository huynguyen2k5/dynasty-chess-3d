'use client';

import React from 'react';
import { Trophy, Medal, Crown, Flame, Shield } from 'lucide-react';

export default function LeaderboardPage() {
  const topPlayers = [
    { rank: 1, name: 'NgọaLong_KỳThánh', faction: 'Thục Hán', elo: 2480, winRate: '88%', general: 'Gia Cát Lượng' },
    { rank: 2, name: 'VũĐế_TàoMạnhĐức', faction: 'Tào Ngụy', elo: 2415, winRate: '85%', general: 'Tào Tháo' },
    { rank: 3, name: 'MỹChuLang_XíchBích', faction: 'Đông Ngô', elo: 2390, winRate: '83%', general: 'Chu Du' },
    { rank: 4, name: 'TửLong_ThườngSơn', faction: 'Thục Hán', elo: 2320, winRate: '79%', general: 'Triệu Vân' },
    { rank: 5, name: 'ChiếnThần_PhụngTiên', faction: 'Quần Hùng', elo: 2295, winRate: '78%', general: 'Lữ Bố' },
    { rank: 6, name: 'ChủngHổ_TrọngĐạt', faction: 'Tào Ngụy', elo: 2260, winRate: '76%', general: 'Tư Mã Ý' },
    { rank: 7, name: 'BếNguyệt_MỹNữ', faction: 'Quần Hùng', elo: 2180, winRate: '74%', general: 'Điêu Thuyền' },
    { rank: 8, name: 'VânTrường_QuanCông', faction: 'Thục Hán', elo: 2150, winRate: '72%', general: 'Quan Vũ' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
          <Trophy className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-white">
          BẢNG ANH HÙNG KỲ VƯƠNG
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Top những đại cao thủ có điểm số ELO cao nhất trên toàn cõi Tam Quốc.
        </p>
      </div>

      {/* Faction War Points Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 mb-8">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-red-400">THỤC HÁN (42%)</span>
          <span className="text-blue-400">TÀO NGỤY (35%)</span>
          <span className="text-emerald-400">ĐÔNG NGÔ (23%)</span>
        </div>
        <div className="h-3 w-full rounded-full overflow-hidden flex bg-zinc-800">
          <div className="h-full bg-red-600" style={{ width: '42%' }} />
          <div className="h-full bg-blue-600" style={{ width: '35%' }} />
          <div className="h-full bg-emerald-600" style={{ width: '23%' }} />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/50 text-xs uppercase font-bold text-zinc-400 border-b border-white/10">
              <tr>
                <th className="py-4 px-6">Hạng</th>
                <th className="py-4 px-6">Kỳ Thủ</th>
                <th className="py-4 px-6">Thế Lực</th>
                <th className="py-4 px-6">Danh Tướng</th>
                <th className="py-4 px-6">Tỉ Lệ Thắng</th>
                <th className="py-4 px-6 text-right">Điểm ELO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {topPlayers.map(p => (
                <tr key={p.rank} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-bold">
                    {p.rank === 1 ? (
                      <span className="flex items-center gap-1.5 text-amber-400 font-extrabold text-base">
                        <Trophy className="w-5 h-5 text-amber-400 shrink-0" /> #1
                      </span>
                    ) : p.rank === 2 ? (
                      <span className="flex items-center gap-1.5 text-slate-300 font-extrabold text-base">
                        <Medal className="w-5 h-5 text-slate-300 shrink-0" /> #2
                      </span>
                    ) : p.rank === 3 ? (
                      <span className="flex items-center gap-1.5 text-amber-600 font-extrabold text-base">
                        <Medal className="w-5 h-5 text-amber-600 shrink-0" /> #3
                      </span>
                    ) : (
                      <span className="text-zinc-500 font-mono">#{p.rank}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 font-bold text-white">{p.name}</td>
                  <td className="py-4 px-6">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                      {p.faction}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-amber-400 font-medium">{p.general}</td>
                  <td className="py-4 px-6 font-semibold text-emerald-400">{p.winRate}</td>
                  <td className="py-4 px-6 text-right font-mono font-black text-amber-400 text-base">
                    {p.elo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
