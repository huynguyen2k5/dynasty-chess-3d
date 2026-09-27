import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Dynasty Chess 3D - Đỉnh Cao Cờ Tướng Tam Quốc',
  description: 'Chơi Cờ Tướng Online PvP và Offline PvB cùng các Danh Tướng Tam Quốc 3D tương tác sống động, công nghệ chịu tải cao, mượt mà trên mọi thiết bị.',
  openGraph: {
    title: 'Dynasty Chess 3D - Đỉnh Cao Cờ Tướng Tam Quốc',
    description: 'Chinh phục giang sơn, so tài mưu lược cùng Gia Cát Lượng, Quan Vũ, Tào Tháo.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className="min-h-screen flex flex-col bg-[#07090E] text-zinc-100 selection:bg-amber-500 selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 bg-black/60 py-8 px-4 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-serif font-bold text-sm text-zinc-300">
              DYNASTY CHESS 3D © 2026 - Tinh Hoa Cờ Tướng Chiến Thuật
            </div>
            <div className="flex gap-6 text-zinc-400">
              <span className="hover:text-amber-400 cursor-pointer">Điều khoản</span>
              <span className="hover:text-amber-400 cursor-pointer">Bảo mật</span>
              <span className="hover:text-amber-400 cursor-pointer">Hỗ trợ cộng đồng</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
