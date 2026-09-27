import { useState } from 'react';
import { ShieldAlert, Users, Swords, AlertTriangle, Eye, Server } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'users' | 'anticheat'>('rooms');

  const stats = [
    { title: 'Người Chơi Đang Online', value: '2,842', change: '+12%', icon: Users, color: 'text-emerald-400' },
    { title: 'Phòng Đấu Đang Live', value: '458', change: '840 kết nối WS', icon: Swords, color: 'text-amber-400' },
    { title: 'Nghi Vấn Bot / Cheat', value: '3', change: 'Cần kiểm tra', icon: AlertTriangle, color: 'text-red-400' },
    { title: 'Tải Máy Chủ (CPU / RAM)', value: '22% / 3.4GB', change: 'Ổn định', icon: Server, color: 'text-cyan-400' },
  ];

  const liveRooms = [
    { id: 'RM-9012', red: 'NgọaLong_KỳThánh (2480)', black: 'VũĐế_TàoMạnhĐức (2415)', time: '10+5', moves: 24, status: 'Đang đấu' },
    { id: 'RM-9011', red: 'TửLong_ThườngSơn (2320)', black: 'ChiếnThần_PhụngTiên (2295)', time: '3+2', moves: 18, status: 'Đang đấu' },
    { id: 'RM-9010', red: 'MỹChuLang (2390)', black: 'ChủngHổ_TrọngĐạt (2260)', time: '20+10', moves: 42, status: 'Chiếu tướng' },
    { id: 'RM-9009', red: 'KyThu_8192 (1200)', black: 'KyThu_3401 (1200)', time: '10+5', moves: 6, status: 'Đang đấu' },
  ];

  const usersList = [
    { id: 'U-101', name: 'NgọaLong_KỳThánh', elo: 2480, faction: 'Thục Hán', matches: 340, status: 'Bình thường' },
    { id: 'U-102', name: 'VũĐế_TàoMạnhĐức', elo: 2415, faction: 'Tào Ngụy', matches: 310, status: 'Bình thường' },
    { id: 'U-999', name: 'FastBot_Test01', elo: 2190, faction: 'Quần Hùng', matches: 45, status: 'Nghi vấn Bot' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center font-bold text-black text-xl">
            帥
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">KỲ VƯƠNG TAM QUỐC - TRUNG TÂM QUẢN TRỊ</h1>
            <p className="text-xs text-slate-400">Giám Sát Hệ Thống & Bảo Mật Ván Đấu Real-Time</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> WebSocket Cluster: Hoạt động bình thường
          </span>
          <span className="text-slate-400">Admin: <strong>SysAdmin</strong></span>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium">{s.title}</span>
                  <Icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-1">{s.change}</div>
              </div>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'rooms', label: '⚔️ Phòng Đấu Live' },
            { id: 'users', label: '👤 Quản Lý Kỳ Thủ' },
            { id: 'anticheat', label: '🛡️ Radar Chống Cheat' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Live Rooms */}
        {activeTab === 'rooms' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">Danh Sách Trận Đấu Đang Diễn Ra (Real-Time)</span>
              <span className="text-slate-400">Tự động cập nhật mỗi 5 giây</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Room ID</th>
                    <th className="py-3 px-4">Bên Đỏ</th>
                    <th className="py-3 px-4">Bên Đen</th>
                    <th className="py-3 px-4">Thời Gian</th>
                    <th className="py-3 px-4">Nước Đi</th>
                    <th className="py-3 px-4">Trạng Thái</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {liveRooms.map(r => (
                    <tr key={r.id} className="hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-mono text-amber-400 font-bold">{r.id}</td>
                      <td className="py-3 px-4 font-semibold text-red-400">{r.red}</td>
                      <td className="py-3 px-4 font-semibold text-slate-300">{r.black}</td>
                      <td className="py-3 px-4">{r.time}</td>
                      <td className="py-3 px-4 font-mono">{r.moves} nước</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="flex items-center gap-1 ml-auto px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-[11px]">
                          <Eye className="h-3 w-3 text-cyan-400" /> Xem Live
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Users */}
        {activeTab === 'users' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">Danh Sách Tài Khoản Kỳ Thủ</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm username hoặc ID..."
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">Tên Kỳ Thủ</th>
                  <th className="py-3 px-4">Điểm ELO</th>
                  <th className="py-3 px-4">Thế Lực</th>
                  <th className="py-3 px-4">Số Trận</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {usersList.map(u => (
                  <tr key={u.id} className="hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-mono text-slate-500">{u.id}</td>
                    <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">{u.elo}</td>
                    <td className="py-3 px-4">{u.faction}</td>
                    <td className="py-3 px-4 font-mono">{u.matches}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.status.includes('Nghi')
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium text-[11px]">
                        Khóa (Ban)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Anti-Cheat */}
        {activeTab === 'anticheat' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-400" /> Hệ Thống Phát Hiện Gian Lận & AI Bot Ngoài Luồng
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống tự động theo dõi tần suất ra nước cờ (Move Timings) và độ tương quan nước đi với engine Stockfish. Các tài khoản có độ chính xác trên 98% ở 15 nước liên tiếp sẽ bị gắn cờ để Admin thẩm định.
            </p>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              ⚠️ Đang có <strong>1 kỳ thủ</strong> bị phát hiện ra nước cờ đều đặn dưới 350ms tại Room ID: <strong>RM-9009</strong>.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
