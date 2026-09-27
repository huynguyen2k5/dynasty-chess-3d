'use client';

import React, { useState, useEffect } from 'react';
import { Piece, PieceColor, Move, General } from '@/types';
import { createInitialBoard, getBestBotMove, executeMove, isPositionInCheck } from '@/lib/xiangqiEngine';
import { GENERALS } from '@/lib/constants';
import XiangqiBoard from '@/components/XiangqiBoard';
import General3DCanvas from '@/components/General3DCanvas';
import confetti from 'canvas-confetti';
import { RotateCcw, Swords, Volume2, Trophy, AlertTriangle, ShieldCheck, Flag, ShieldAlert } from 'lucide-react';

export default function PlayBotPage() {
  const [board, setBoard] = useState<(Piece | null)[][]>(createInitialBoard());
  const [turn, setTurn] = useState<PieceColor>('red');
  const [moves, setMoves] = useState<Move[]>([]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'master'>('medium');
  const [lastMove, setLastMove] = useState<{ from: [number, number]; to: [number, number] } | undefined>();

  // Generals: Player (Red) vs Bot (Black)
  const [playerGeneral, setPlayerGeneral] = useState<General>(GENERALS[0]);
  const [botGeneral, setBotGeneral] = useState<General>(GENERALS[3]); // Cao Cao by default

  const [playerReaction, setPlayerReaction] = useState<'idle' | 'check' | 'capture' | 'victory' | 'defeat'>('idle');
  const [botReaction, setBotReaction] = useState<'idle' | 'check' | 'capture' | 'victory' | 'defeat'>('idle');
  const [speech, setSpeech] = useState<{ speaker: string; text: string } | null>(null);

  const [winner, setWinner] = useState<PieceColor | null>(null);

  // Timers (seconds)
  const [redTime, setRedTime] = useState(600); // 10 minutes
  const [blackTime, setBlackTime] = useState(600);

  useEffect(() => {
    const savedGenId = localStorage.getItem('kyvuong_active_general');
    if (savedGenId) {
      const found = GENERALS.find(g => g.id === savedGenId);
      if (found) setPlayerGeneral(found);
    }
  }, []);

  // Timer Tick
  useEffect(() => {
    if (winner) return;
    const interval = setInterval(() => {
      if (turn === 'red') {
        setRedTime(t => Math.max(0, t - 1));
      } else {
        setBlackTime(t => Math.max(0, t - 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [turn, winner]);

  // Voice speech trigger
  const speak = (speaker: string, text: string) => {
    setSpeech({ speaker, text });
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'vi-VN';
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      }
    } catch {
      //
    }
    setTimeout(() => setSpeech(null), 5000);
  };

  // Player makes move
  const handlePlayerMove = (fromX: number, fromY: number, toX: number, toY: number) => {
    if (turn !== 'red' || isBotThinking || winner) return;

    const { newBoard, move, isCheck, isCheckmate } = executeMove(board, fromX, fromY, toX, toY);
    setBoard(newBoard);
    setMoves(prev => [...prev, move]);
    setLastMove({ from: [fromX, fromY], to: [toX, toY] });

    if (move.captured) {
      setPlayerReaction('capture');
      speak(playerGeneral.name, playerGeneral.voiceLines.capture);
      setTimeout(() => setPlayerReaction('idle'), 2000);
    }

    if (isCheckmate) {
      setWinner('red');
      setPlayerReaction('victory');
      setBotReaction('defeat');
      speak(playerGeneral.name, playerGeneral.voiceLines.victory);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      return;
    }

    if (isCheck) {
      setBotReaction('check');
      speak(playerGeneral.name, playerGeneral.voiceLines.check);
      setTimeout(() => setBotReaction('idle'), 2000);
    }

    // Switch turn to Bot
    setTurn('black');
    setIsBotThinking(true);

    // Bot AI move calculation
    setTimeout(() => {
      const botMove = getBestBotMove(newBoard, difficulty);
      if (botMove) {
        const botExec = executeMove(newBoard, botMove.from[0], botMove.from[1], botMove.to[0], botMove.to[1]);
        setBoard(botExec.newBoard);
        setMoves(prev => [...prev, botExec.move]);
        setLastMove({ from: botMove.from, to: botMove.to });

        if (botExec.move.captured) {
          setBotReaction('capture');
          speak(botGeneral.name, botGeneral.voiceLines.capture);
          setTimeout(() => setBotReaction('idle'), 2000);
        }

        if (botExec.isCheckmate) {
          setWinner('black');
          setBotReaction('victory');
          setPlayerReaction('defeat');
          speak(botGeneral.name, botGeneral.voiceLines.victory);
        } else if (botExec.isCheck) {
          setPlayerReaction('check');
          speak(botGeneral.name, botGeneral.voiceLines.check);
          setTimeout(() => setPlayerReaction('idle'), 2000);
        }
      }
      setTurn('red');
      setIsBotThinking(false);
    }, 600);
  };

  const handleRestart = () => {
    setBoard(createInitialBoard());
    setTurn('red');
    setMoves([]);
    setWinner(null);
    setRedTime(600);
    setBlackTime(600);
    setLastMove(undefined);
  };

  const handleSurrender = () => {
    if (winner) return;
    setWinner('black');
    setBotReaction('victory');
    setPlayerReaction('defeat');
    speak(playerGeneral.name, playerGeneral.voiceLines.defeat);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Speech Bubble Notification */}
      {speech && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-amber-400 text-amber-200 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md text-sm font-semibold max-w-md text-center animate-in fade-in zoom-in-95">
          <span className="text-amber-400 font-bold block text-xs uppercase tracking-wider mb-0.5">
            {speech.speaker}
          </span>
          "{speech.text}"
        </div>
      )}

      {/* Main Play Arena Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Player General Card */}
        <div className="lg:col-span-3 glass-panel rounded-3xl p-5 border border-red-500/30 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Quân Đỏ (Bạn)
          </div>
          <h3 className="font-serif text-2xl font-black text-white">{playerGeneral.name}</h3>
          <p className="text-xs text-amber-400 font-medium mb-3">{playerGeneral.title}</p>

          <div className="w-full h-[220px] bg-black/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative">
            <General3DCanvas general={playerGeneral} reaction={playerReaction} height="220px" />
          </div>

          <div className="mt-4 w-full p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Đồng hồ:</span>
            <span className="font-mono text-xl font-black text-red-400">{formatTime(redTime)}</span>
          </div>
        </div>

        {/* Center: Xiangqi Board */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Game Controls Bar */}
          <div className="w-full flex items-center justify-between gap-4 mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">Độ khó Bot:</span>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as any)}
                className="bg-black/60 border border-white/10 text-amber-300 rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none"
              >
                <option value="easy">Tân Thủ</option>
                <option value="medium">Kỳ Thủ</option>
                <option value="hard">Cao Thủ</option>
                <option value="master">Đại Sư</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-200 font-bold transition-all"
                title="Bắt đầu ván mới"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Đánh Lại
              </button>
              <button
                onClick={handleSurrender}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-400 font-bold transition-all"
                title="Đầu hàng ván đấu"
              >
                <Flag className="h-3.5 w-3.5" /> Nhận Thua
              </button>
            </div>
          </div>

          {/* Winner Banner */}
          {winner && (
            <div className="w-full mb-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-amber-400/50 text-center animate-in zoom-in-95">
              <h4 className="font-serif text-2xl font-black text-amber-300 flex items-center justify-center gap-2">
                {winner === 'red' ? (
                  <><Trophy className="w-6 h-6 text-amber-300" /> CHIẾN THẮNG QUANG VINH!</>
                ) : (
                  <><ShieldAlert className="w-6 h-6 text-rose-400" /> THẤT BẠI TRẬN NÀY!</>
                )}
              </h4>
              <p className="text-xs text-zinc-300 mt-1">
                {winner === 'red' ? `${playerGeneral.name} đã đánh bại đối thủ!` : 'Hãy phục hồi tinh thần và tái chiến!'}
              </p>
            </div>
          )}

          {/* Interactive Chess Board Component */}
          <XiangqiBoard
            board={board}
            turn={turn}
            onMove={handlePlayerMove}
            disabled={turn !== 'red' || isBotThinking || !!winner}
            lastMove={lastMove}
          />
        </div>

        {/* Right: Bot Opponent Card & Move History */}
        <div className="lg:col-span-3 space-y-6">
          {/* Bot General Card */}
          <div className="glass-panel rounded-3xl p-5 border border-zinc-700 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-zinc-400" /> Quân Đen (Bot AI)
            </div>
            <h3 className="font-serif text-2xl font-black text-white">{botGeneral.name}</h3>
            <p className="text-xs text-zinc-400 font-medium mb-3">{botGeneral.title}</p>

            <div className="w-full h-[220px] bg-black/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative">
              <General3DCanvas general={botGeneral} reaction={botReaction} height="220px" />
              {isBotThinking && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-amber-300 animate-pulse">
                  Bot đang tính nước cờ...
                </div>
              )}
            </div>

            <div className="mt-4 w-full p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Đồng hồ:</span>
              <span className="font-mono text-xl font-black text-zinc-300">{formatTime(blackTime)}</span>
            </div>
          </div>

          {/* Move Log Panel */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10">
            <div className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider flex items-center justify-between">
              <span>Biên Bản Ván Cờ</span>
              <span className="text-amber-400">{moves.length} nước</span>
            </div>
            <div className="h-36 overflow-y-auto space-y-1 text-xs font-mono pr-1">
              {moves.length === 0 ? (
                <div className="text-zinc-600 text-center py-6">Chưa có nước đi</div>
              ) : (
                moves.map((m, idx) => (
                  <div key={idx} className="flex justify-between py-1 px-2 rounded bg-white/5 text-zinc-300">
                    <span className="text-zinc-500">{idx + 1}.</span>
                    <span>{m.notation}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
