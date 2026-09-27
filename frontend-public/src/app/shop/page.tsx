'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Coins,
  Gem,
  Store,
  Sparkles,
  CheckCircle2,
  Gift,
  Eye,
  Shield,
  Swords,
  Crown,
  X,
  ExternalLink,
  ShoppingCart,
  Check
} from 'lucide-react';
import { SHOP_ITEMS, GENERALS, ShopItem, General } from '@/lib/constants';
import General3DCanvas from '@/components/General3DCanvas';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<ShopItem | null>(null);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [gold, setGold] = useState(2500);
  const [silver, setSilver] = useState(17000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Artwork mappings for shop items
  const itemArtMap: Record<string, string> = {
    gen_lu_bu: '/assets/generals/lu_bu.jpg',
    gen_cao_cao: '/assets/generals/cao_cao.jpg',
    board_xibi: '/assets/shop/board_xibi.jpg',
    pieces_jade: '/assets/shop/pieces_jade_gold.jpg',
    board_mun_gold: '/assets/shop/board_xibi.jpg',
    pieces_gold: '/assets/shop/pieces_jade_gold.jpg',
  };

  useEffect(() => {
    const savedPurchased = localStorage.getItem('purchased_items');
    if (savedPurchased) setPurchasedIds(JSON.parse(savedPurchased));

    const savedGold = localStorage.getItem('user_gold');
    if (savedGold) setGold(parseInt(savedGold, 10));

    const savedSilver = localStorage.getItem('user_silver');
    if (savedSilver) setSilver(parseInt(savedSilver, 10));
  }, []);

  const handleClaimFreeGift = () => {
    const newGold = gold + 2000;
    const newSilver = silver + 15000;
    setGold(newGold);
    setSilver(newSilver);
    localStorage.setItem('user_gold', newGold.toString());
    localStorage.setItem('user_silver', newSilver.toString());
    window.dispatchEvent(new Event('storage'));
    setToastMessage('Đã nhận thành công 2,000 Vàng & 15,000 Ngân Lượng!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePurchase = (item: ShopItem) => {
    if (purchasedIds.includes(item.id)) return;

    if (item.priceGold > 0 && gold < item.priceGold) {
      setToastMessage('Không đủ Vàng Hoàng Kim! Hãy nhận thêm ngân lượng.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }
    if (item.priceSilver > 0 && silver < item.priceSilver) {
      setToastMessage('Không đủ Ngân Lượng Bạc!');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    const newGold = gold - item.priceGold;
    const newSilver = silver - item.priceSilver;
    const newPurchased = [...purchasedIds, item.id];

    setGold(newGold);
    setSilver(newSilver);
    setPurchasedIds(newPurchased);

    localStorage.setItem('user_gold', newGold.toString());
    localStorage.setItem('user_silver', newSilver.toString());
    localStorage.setItem('purchased_items', JSON.stringify(newPurchased));
    window.dispatchEvent(new Event('storage'));

    // If it's a general, also unlock it
    if (item.relatedGeneralId) {
      localStorage.setItem('active_general', item.relatedGeneralId);
      window.dispatchEvent(new Event('storage'));
    }

    setToastMessage(`Mua thành công: ${item.name}!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredItems = selectedCategory === 'all'
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter(it => it.category === selectedCategory);

  const previewGeneral: General = previewItem?.relatedGeneralId
    ? GENERALS.find(g => g.id === previewItem.relatedGeneralId) || GENERALS[0]
    : GENERALS[0];

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
        
        {/* Header Breadcrumbs & Wallets */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-amber-900/30 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-2">
              <Link href="/" className="hover:underline">Trang Chủ</Link>
              <span>/</span>
              <span className="text-stone-400">Tàng Bảo Các (Cửa Hàng)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 tracking-tight">
              TÀNG BẢO CÁC
            </h1>
            <p className="text-stone-400 text-sm sm:text-base mt-1.5 max-w-2xl">
              Kho báu vật phẩm quý hiếm: Mở khóa danh tướng vô song, thu thập skin bàn cờ và quân cờ ngọc hoàng cung.
            </p>
          </div>

          {/* Right Wallet Status & Gift Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-stone-900/90 border border-amber-500/30 rounded-2xl px-4 py-2.5 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                <Coins className="h-4 w-4 text-amber-400" />
                <span className="font-mono">{gold.toLocaleString()} Vàng</span>
              </div>
              <span className="text-stone-700">|</span>
              <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
                <Gem className="h-4 w-4 text-cyan-400" />
                <span className="font-mono">{silver.toLocaleString()} Bạc</span>
              </div>
            </div>

            <button
              onClick={handleClaimFreeGift}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center gap-2"
            >
              <Gift className="h-4 w-4 text-emerald-200" />
              <span>Nhận Quà Thử Nghiệm (+Vàng)</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: 'Tất Cả Vật Phẩm (6)' },
            { id: 'general', label: 'Gói Danh Tướng (2)' },
            { id: 'board', label: 'Skin Bàn Cờ 3D (2)' },
            { id: 'pieces', label: 'Skin Quân Cờ (2)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === tab.id
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Shop Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map(item => {
            const isPurchased = purchasedIds.includes(item.id);
            const artwork = itemArtMap[item.id] || '/assets/shop/board_xibi.jpg';

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className="rounded-3xl p-5 bg-gradient-to-b from-stone-900/90 to-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Item Image with Rarity Badge */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-stone-950 border border-stone-800 group-hover:border-amber-500/40 transition-colors">
                    <Image
                      src={artwork}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-black tracking-widest text-amber-300 border border-amber-500/30 uppercase">
                      {item.rarity === 'mythic' ? '★ Thần Thoại' : item.rarity === 'legendary' ? 'Huyền Thoại' : 'Sử Thi'}
                    </div>

                    <button
                      onClick={() => setPreviewItem(item)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-amber-300 text-xs font-bold border border-amber-500/40 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Xem 3D</span>
                    </button>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-black text-lg text-amber-100 group-hover:text-amber-200 transition-colors mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="border-t border-stone-800/80 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-stone-400 font-semibold">Giá Bán:</span>
                    <div className="flex items-center gap-2">
                      {item.priceGold > 0 && (
                        <div className="flex items-center gap-1 text-amber-400 font-mono font-black text-sm">
                          <Coins className="h-4 w-4" />
                          <span>{item.priceGold.toLocaleString()}</span>
                        </div>
                      )}
                      {item.priceSilver > 0 && (
                        <div className="flex items-center gap-1 text-cyan-300 font-mono font-black text-sm">
                          <Gem className="h-4 w-4" />
                          <span>{item.priceSilver.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={isPurchased}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isPurchased
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] transform hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                        {isPurchased ? (
                          <><Check className="w-3.5 h-3.5 text-emerald-300" /> Đã Sở Hữu Trong Kho</>
                        ) : (
                          <><ShoppingCart className="w-3.5 h-3.5 text-stone-950" /> Mua Ngay</>
                        )}
                      </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE 3D PREVIEW MODAL
          ========================================================================= */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-4xl rounded-3xl bg-[#0c0e17] border border-amber-500/40 p-6 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors border border-stone-700 z-20"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* 3D Model Inspector */}
                <div className="w-full">
                  {previewItem.relatedGeneralId ? (
                    <General3DCanvas
                      general={previewGeneral}
                      reaction="idle"
                      height="420px"
                      showControls={true}
                    />
                  ) : (
                    <div className="relative w-full h-[420px] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
                      <Image
                        src={itemArtMap[previewItem.id] || '/assets/shop/board_xibi.jpg'}
                        alt={previewItem.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                        <div className="text-xs text-amber-300 font-bold bg-stone-950/80 px-3 py-1.5 rounded-full border border-amber-500/30">
                          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hiển thị trực tiếp trong trận đấu 3D</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Column */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 uppercase tracking-widest mb-3">
                    <span>★</span> {previewItem.rarity.toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-black text-amber-100 mb-2">
                    {previewItem.name}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-6">
                    {previewItem.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 mb-6">
                    <div className="text-xs text-stone-400 mb-1">Giá bán ưu đãi:</div>
                    <div className="flex items-center gap-3">
                      {previewItem.priceGold > 0 && (
                        <div className="flex items-center gap-1.5 text-amber-400 font-black text-xl font-mono">
                          <Coins className="h-5 w-5" />
                          <span>{previewItem.priceGold.toLocaleString()} Vàng</span>
                        </div>
                      )}
                      {previewItem.priceSilver > 0 && (
                        <div className="flex items-center gap-1.5 text-cyan-300 font-black text-xl font-mono">
                          <Gem className="h-5 w-5" />
                          <span>{previewItem.priceSilver.toLocaleString()} Bạc</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        handlePurchase(previewItem);
                        setPreviewItem(null);
                      }}
                      disabled={purchasedIds.includes(previewItem.id)}
                      className={`flex-1 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        purchasedIds.includes(previewItem.id)
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-xl'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                    {purchasedIds.includes(previewItem.id) ? (
                      <><Check className="w-4 h-4 text-emerald-300" /> Đã Sở Hữu</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4 text-stone-950" /> Mua Vật Phẩm Này</>
                    )}
                  </span>
                    </button>
                    <button
                      onClick={() => setPreviewItem(null)}
                      className="px-5 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold text-sm transition-colors border border-stone-700"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
