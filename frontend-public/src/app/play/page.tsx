'use client';

import React, { useState, useEffect } from 'react';
import { Piece, PieceColor, Move, General } from '@/types';
import { 
  createInitialBoard, getBestBotMove, executeMove, isPositionInCheck, getLegalMoves, cloneBoard 
} from '@/lib/xiangqiEngine';
import { GENERALS } from '@/lib/constants';
import XiangqiBoard from '@/components/XiangqiBoard';
import General3DCanvas from '@/components/General3DCanvas';
import confetti from 'canvas-confetti';
import { 
  Bot, Swords, Users, Puzzle, Smartphone, RotateCcw, Lightbulb, Flag, 
  Volume2, Trophy, Copy, Check, Play, ShieldAlert, Sparkles, Clock, Share2
} from 'lucide-react';

export type GameMode = 'bot' | 'pvp' | 'room' | 'puzzle' | 'pass_play';

interface PuzzleLevel {
  id: string;
  title: string;
  story: string;
  rewardGold: number;
  initialBoard: () => (Piece | null)[][];
  targetMovesCount: number;
}

// Classical Historical Xiangqi Puzzles
const PUZZLES: PuzzleLevel[] = [
  {
    id: 'pz_1',
    title: 'Thế 1: Hỏa Thiêu Tân Dã',
    story: 'Khổng Minh dùng phục binh Pháo giăng bẫy Tào Tháo tại Tân Dã. Hãy dùng Pháo - Xe kết hợp chiếu bí quân Đen trong 2 nước!',
    rewardGold: 500,
    targetMovesCount: 2,
    initialBoard: () => {
      const b: (Piece | null)[][] = Array(10).fill(null).map(() => Array(9).fill(null));
      b[0][4] = { id: 'bk', type: 'king', color: 'black', x: 4, y: 0 };
      b[0][3] = { id: 'ba1', type: 'advisor', color: 'black', x: 3, y: 0 };
      b[0][5] = { id: 'ba2', type: 'advisor', color: 'black', x: 5, y: 0 };

      b[9][4] = { id: 'rk', type: 'king', color: 'red', x: 4, y: 9 };
      b[2][4] = { id: 'rc', type: 'chariot', color: 'red', x: 4, y: 2 }; // Xe chiếu
      b[5][4] = { id: 'rp', type: 'cannon', color: 'red', x: 4, y: 5 };  // Pháo sau
      return b;
    }
  },
  {
    id: 'pz_2',
    title: 'Thế 2: Đơn Đao Phó Hội',
    story: 'Quan Vân Trường một đao một ngựa xông vào hang hùm Đông Ngô. Dùng Mã và Tốt áp sát Cung cấm đoạt thủ cấp Tướng địch!',
    rewardGold: 800,
    targetMovesCount: 2,
    initialBoard: () => {
      const b: (Piece | null)[][] = Array(10).fill(null).map(() => Array(9).fill(null));
      b[1][4] = { id: 'bk', type: 'king', color: 'black', x: 4, y: 1 };
      b[0][3] = { id: 'ba1', type: 'advisor', color: 'black', x: 3, y: 0 };

      b[9][4] = { id: 'rk', type: 'king', color: 'red', x: 4, y: 9 };
      b[3][2] = { id: 'rh', type: 'horse', color: 'red', x: 2, y: 3 };
      b[2][4] = { id: 'rs', type: 'soldier', color: 'red', x: 4, y: 2 };
      return b;
    }
  },
  {
    id: 'pz_3',
    title: 'Thế 3: Bát Trận Đồ Uy Chấn',
    story: 'Lục Tốn lạc vào thạch trận Ngọa Long. Tận dụng Song Pháo liên hoàn chiếu không cho Tướng địch kịp trở tay!',
    rewardGold: 1200,
    targetMovesCount: 3,
    initialBoard: () => {
      const b: (Piece | null)[][] = Array(10).fill(null).map(() => Array(9).fill(null));
      b[0][4] = { id: 'bk', type: 'king', color: 'black', x: 4, y: 0 };
      b[0][5] = { id: 'ba', type: 'advisor', color: 'black', x: 5, y: 0 };
      b[0][2] = { id: 'br', type: 'chariot', color: 'black', x: 2, y: 0 };

      b[9][4] = { id: 'rk', type: 'king', color: 'red', x: 4, y: 9 };
      b[3][4] = { id: 'rp1', type: 'cannon', color: 'red', x: 4, y: 3 };
      b[6][4] = { id: 'rp2', type: 'cannon', color: 'red', x: 4, y: 6 };
      b[1][1] = { id: 'rr', type: 'chariot', color: 'red', x: 1, y: 1 };
      return b;
    }
  }
];

export default function PlayArenaPage() {
  const [mode, setMode] = useState<GameMode>('bot');

  // Board State
  const [board, setBoard] = useState<(Piece | null)[][]>(createInitialBoard());
  const [turn, setTurn] = useState<PieceColor>('red');
  const [moves, setMoves] = useState<Move[]>([]);
  const [lastMove, setLastMove] = useState<{ from: [number, number]; to: [number, number] } | undefined>();
  const [winner, setWinner] = useState<PieceColor | null>(null);

  // Generals
  const [playerGeneral, setPlayerGeneral] = useState<General>(GENERALS[0]);
  const [opponentGeneral, setOpponentGeneral] = useState<General>(GENERALS[3]); // Cao Cao
  const [playerReaction, setPlayerReaction] = useState<'idle' | 'check' | 'capture' | 'victory' | 'defeat'>('idle');
  const [botReaction, setBotReaction] = useState<'idle' | 'check' | 'capture' | 'victory' | 'defeat'>('idle');
  const [speech, setSpeech] = useState<{ speaker: string; text: string } | null>(null);

  // Timers (seconds)
  const [redTime, setRedTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);

  // Mode 1: Bot Settings
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'master'>('medium');
  const [isBotThinking, setIsBotThinking] = useState(false);

  // Mode 2: PvP Settings
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [queueSeconds, setQueueSeconds] = useState(0);

  // Mode 3: Custom Room
  const [roomCode, setRoomCode] = useState('TAMQUOC-8899');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Mode 4: Puzzle Settings
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  // Hint highlight
  const [hintMove, setHintMove] = useState<{ from: [number, number]; to: [number, number] } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('kyvuong_active_general');
    if (saved) {
      const g = GENERALS.find(item => item.id === saved);
      if (g) setPlayerGeneral(g);
    }
  }, []);

  // Timer interval
  useEffect(() => {
    if (winner || isMatchmaking) return;
    const timer = setInterval(() => {
      if (turn === 'red') {
        setRedTime(t => Math.max(0, t - 1));
      } else {
        setBlackTime(t => Math.max(0, t - 1));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [turn, winner, isMatchmaking]);

  // Matchmaking counter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMatchmaking) {
      interval = setInterval(() => setQueueSeconds(s => s + 1), 1000);
    } else {
      setQueueSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isMatchmaking]);

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

  // Change Mode Handler
  const handleSwitchMode = (newMode: GameMode) => {
    setMode(newMode);
    setWinner(null);
    setMoves([]);
    setLastMove(undefined);
    setHintMove(null);

    if (newMode === 'puzzle') {
      const pz = PUZZLES[currentPuzzleIdx];
      setBoard(pz.initialBoard());
      setTurn('red');
      setPuzzleSolved(false);
      speak(playerGeneral.name, pz.story);
    } else {
      setBoard(createInitialBoard());
      setTurn('red');
      setRedTime(600);
      setBlackTime(600);
    }
  };

  // Switch puzzle level
  const handleSelectPuzzle = (idx: number) => {
    setCurrentPuzzleIdx(idx);
    const pz = PUZZLES[idx];
    setBoard(pz.initialBoard());
    setTurn('red');
    setMoves([]);
    setWinner(null);
    setPuzzleSolved(false);
    speak(playerGeneral.name, pz.story);
  };

  // Move Execution
  const handleMove = (fromX: number, fromY: number, toX: number, toY: number) => {
    if (winner) return;
    setHintMove(null);

    const { newBoard, move, isCheck, isCheckmate } = executeMove(board, fromX, fromY, toX, toY);
    setBoard(newBoard);
    setMoves(prev => [...prev, move]);
    setLastMove({ from: [fromX, fromY], to: [toX, toY] });

    if (move.captured) {
      setPlayerReaction('capture');
      speak(turn === 'red' ? playerGeneral.name : opponentGeneral.name, playerGeneral.voiceLines.capture);
      setTimeout(() => setPlayerReaction('idle'), 2000);
    }

    if (isCheckmate) {
      const winColor = turn;
      setWinner(winColor);
      setPlayerReaction('victory');
      setBotReaction('defeat');
      speak(playerGeneral.name, playerGeneral.voiceLines.victory);
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });

      if (mode === 'puzzle') {
        setPuzzleSolved(true);
        // Reward gold
        const curGold = parseInt(localStorage.getItem('kyvuong_gold') || '1500');
        const reward = PUZZLES[currentPuzzleIdx].rewardGold;
        localStorage.setItem('kyvuong_gold', (curGold + reward).toString());
        window.dispatchEvent(new Event('storage'));
      }
      return;
    }

    if (isCheck) {
      setBotReaction('check');
      speak(playerGeneral.name, playerGeneral.voiceLines.check);
      setTimeout(() => setBotReaction('idle'), 2000);
    }

    // Pass and Play mode: alternate turns between two humans
    if (mode === 'pass_play') {
      setTurn(t => t === 'red' ? 'black' : 'red');
      return;
    }

    // Bot mode: trigger Bot AI
    if (mode === 'bot') {
      setTurn('black');
      setIsBotThinking(true);

      setTimeout(() => {
        const botMove = getBestBotMove(newBoard, difficulty);
        if (botMove) {
          const botExec = executeMove(newBoard, botMove.from[0], botMove.from[1], botMove.to[0], botMove.to[1]);
          setBoard(botExec.newBoard);
          setMoves(prev => [...prev, botExec.move]);
          setLastMove({ from: botMove.from, to: botMove.to });

          if (botExec.move.captured) {
            setBotReaction('capture');
            speak(opponentGeneral.name, opponentGeneral.voiceLines.capture);
            setTimeout(() => setBotReaction('idle'), 2000);
          }

          if (botExec.isCheckmate) {
            setWinner('black');
            setBotReaction('victory');
            setPlayerReaction('defeat');
            speak(opponentGeneral.name, opponentGeneral.voiceLines.victory);
          } else if (botExec.isCheck) {
            setPlayerReaction('check');
            speak(opponentGeneral.name, opponentGeneral.voiceLines.check);
            setTimeout(() => setPlayerReaction('idle'), 2000);
          }
        }
        setTurn('red');
        setIsBotThinking(false);
      }, 500);
    }
  };

  // Hint feature
  const handleGiveHint = () => {
    if (turn !== 'red' || isBotThinking || winner) return;
    // Calculate best move for red
    let bestRedMove: { from: [number, number]; to: [number, number]; score: number } | null = null;

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        const p = board[y][x];
        if (p && p.color === 'red') {
          const legals = getLegalMoves(board, x, y);
          for (const [toX, toY] of legals) {
            const temp = cloneBoard(board);
            temp[toY][toX] = { ...p, x: toX, y: toY };
            temp[y][x] = null;
            // score (higher is better for red)
            const target = board[toY][toX];
            const score = target ? 200 : 50;
            if (!bestRedMove || score > bestRedMove.score) {
              bestRedMove = { from: [x, y], to: [toX, toY], score };
            }
          }
        }
      }
    }

    if (bestRedMove) {
      setHintMove({ from: bestRedMove.from, to: bestRedMove.to });
      speak(playerGeneral.name, 'Kế này khả dĩ phá địch! Hãy quan sát ô phát sáng trên đài cờ.');
      setTimeout(() => setHintMove(null), 6000);
    }
  };

  // Undo feature
  const handleUndo = () => {
    if (moves.length === 0 || isBotThinking || winner) return;
    if (mode === 'bot') {
      if (moves.length < 2) {
        setBoard(createInitialBoard());
        setMoves([]);
        setTurn('red');
      } else {
        // Pop last 2 moves (bot move and player move)
        const updatedMoves = moves.slice(0, -2);
        let b = createInitialBoard();
        for (const m of updatedMoves) {
          const res = executeMove(b, m.from[0], m.from[1], m.to[0], m.to[1]);
          b = res.newBoard;
        }
        setBoard(b);
        setMoves(updatedMoves);
        setTurn('red');
      }
    } else {
      const updatedMoves = moves.slice(0, -1);
      let b = createInitialBoard();
      for (const m of updatedMoves) {
        const res = executeMove(b, m.from[0], m.from[1], m.to[0], m.to[1]);
        b = res.newBoard;
      }
      setBoard(b);
      setMoves(updatedMoves);
      setTurn(t => t === 'red' ? 'black' : 'red');
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Speech Notification */}
      {speech && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-amber-400 text-amber-200 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md text-sm font-semibold max-w-md text-center animate-in fade-in zoom-in-95">
          <span className="text-amber-400 font-bold block text-xs uppercase tracking-wider mb-0.5">
            {speech.speaker}
          </span>
          "{speech.text}"
        </div>
      )}

      {/* Mode Selector Header Bar */}
      <div className="glass-panel p-2.5 rounded-2xl border border-white/10 mb-8 overflow-x-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'bot', label: 'Luyện Với Bot AI', icon: Bot, badge: 'OFFLINE' },
            { id: 'pvp', label: 'Đấu Xếp Hạng PvP', icon: Swords, badge: 'RANKED' },
            { id: 'room', label: 'Tạo Phòng Với Bạn', icon: Users, badge: 'CUSTOM' },
            { id: 'puzzle', label: 'Cờ Thế Tam Quốc', icon: Puzzle, badge: 'THỬ THÁCH' },
            { id: 'pass_play', label: '2 Người 1 Máy', icon: Smartphone, badge: 'PASS & PLAY' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSwitchMode(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/25 scale-[1.02]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode-Specific Action Panels */}
      {/* 1. PvP Matchmaking Panel */}
      {mode === 'pvp' && (
        <div className="mb-6 glass-panel p-6 rounded-2xl border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest">
              <Swords className="h-4 w-4" /> Đấu Trường Xếp Hạng Online
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Ghép trận ngẫu nhiên dựa trên điểm ELO. WebSocket phản hồi tức thì dưới 20ms.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isMatchmaking ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-amber-300 font-bold flex items-center gap-2">
                  <Clock className="h-4 w-4 animate-spin text-amber-400" />
                  Đang tìm đối thủ ({queueSeconds}s)...
                </span>
                <button
                  onClick={() => setIsMatchmaking(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 text-xs font-bold"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsMatchmaking(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white font-extrabold text-xs shadow-lg shadow-red-600/30"
              >
                TÌM TRẬN XẾP HẠNG
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Custom Room Panel */}
      {mode === 'room' && (
        <div className="mb-6 glass-panel p-6 rounded-2xl border border-cyan-500/30 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Users className="h-4 w-4" /> Mã Phòng Của Bạn
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="font-mono text-2xl font-black text-white bg-black/60 px-4 py-2 rounded-xl border border-white/10 tracking-widest">
                {roomCode}
              </div>
              <button
                onClick={copyRoomCode}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
              >
                {copiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copiedCode ? 'Đã sao chép' : 'Sao chép mã'}
              </button>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
            <div className="text-xs font-bold text-zinc-300 mb-2">Hoặc Nhập Mã Phòng Của Bạn Bè:</div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={joinCodeInput}
                onChange={e => setJoinCodeInput(e.target.value.toUpperCase())}
                placeholder="VD: TAMQUOC-1234"
                className="bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-amber-400 flex-1"
              />
              <button
                onClick={() => {
                  if (joinCodeInput) {
                    setRoomCode(joinCodeInput);
                    speak(playerGeneral.name, 'Đã tham gia phòng thi đấu! Chuẩn bị nghênh chiến.');
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md"
              >
                Vào Phòng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Puzzle Mode Header */}
      {mode === 'puzzle' && (
        <div className="mb-6 glass-panel p-6 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-amber-400" /> CỜ THẾ TAM QUỐC (#{currentPuzzleIdx + 1})</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                Thưởng: +{PUZZLES[currentPuzzleIdx].rewardGold} Vàng
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-white">
              {PUZZLES[currentPuzzleIdx].title}
            </h2>
            <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
              {PUZZLES[currentPuzzleIdx].story}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {PUZZLES.map((pz, idx) => (
              <button
                key={pz.id}
                onClick={() => handleSelectPuzzle(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentPuzzleIdx === idx
                    ? 'bg-amber-500 text-black'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400'
                }`}
              >
                Thế {idx + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Chess Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Player General Card */}
        <div className="lg:col-span-3 glass-panel rounded-3xl p-5 border border-red-500/30 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Bên Đỏ ({mode === 'pass_play' ? 'Người chơi 1' : 'Bạn'})
          </div>
          <h3 className="font-serif text-2xl font-black text-white">{playerGeneral.name}</h3>
          <p className="text-xs text-amber-400 font-medium mb-3">{playerGeneral.title}</p>

          <div className="w-full h-[200px] bg-black/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative">
            <General3DCanvas general={playerGeneral} reaction={playerReaction} height="200px" />
          </div>

          <div className="mt-4 w-full p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Đồng hồ:</span>
            <span className="font-mono text-xl font-black text-red-400">{formatTime(redTime)}</span>
          </div>
        </div>

        {/* Center: Xiangqi Board */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Controls Bar */}
          <div className="w-full flex items-center justify-between gap-4 mb-4 px-2">
            <div className="flex items-center gap-2">
              {mode === 'bot' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-400 font-medium">Cấp độ:</span>
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
              )}
              {mode === 'pass_play' && (
                <span className="text-xs text-amber-300 font-bold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  Lượt: {turn === 'red' ? 'Đỏ' : 'Đen'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Hint button */}
              {(mode === 'bot' || mode === 'puzzle') && (
                <button
                  onClick={handleGiveHint}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs text-amber-300 font-bold transition-all"
                  title="Gợi ý nước đi tối ưu"
                >
                  <Lightbulb className="h-3.5 w-3.5 text-amber-400" /> Gợi Ý
                </button>
              )}

              {/* Undo button */}
              {mode !== 'pvp' && (
                <button
                  onClick={handleUndo}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-200 font-bold transition-all"
                  title="Đi lại nước cờ"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Hoàn Cờ
                </button>
              )}

              <button
                onClick={() => {
                  if (mode === 'puzzle') {
                    handleSelectPuzzle(currentPuzzleIdx);
                  } else {
                    setBoard(createInitialBoard());
                    setTurn('red');
                    setMoves([]);
                    setWinner(null);
                    setRedTime(600);
                    setBlackTime(600);
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-400 font-medium"
              >
                Làm Mới
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
                {mode === 'puzzle' && puzzleSolved
                  ? `Chúc mừng bạn đã giải thành công cờ thế! Nhận ngay +${PUZZLES[currentPuzzleIdx].rewardGold} Vàng.`
                  : winner === 'red' ? 'Kỳ nghệ tuyệt luân, danh chấn tam quân!' : 'Binh gia chuyện thường tình, hãy phục thù trận sau!'}
              </p>
            </div>
          )}

          {/* Interactive Chess Board Component */}
          <XiangqiBoard
            board={board}
            turn={turn}
            onMove={handleMove}
            disabled={(mode === 'bot' && turn !== 'red') || isBotThinking || !!winner}
            lastMove={hintMove ? hintMove : lastMove}
          />
        </div>

        {/* Right: Opponent Card & Move History */}
        <div className="lg:col-span-3 space-y-6">
          {/* Opponent General Card */}
          <div className="glass-panel rounded-3xl p-5 border border-zinc-700 flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-zinc-400" /> Bên Đen ({mode === 'bot' ? 'Bot AI' : mode === 'pass_play' ? 'Người chơi 2' : 'Đối Thủ'})
            </div>
            <h3 className="font-serif text-2xl font-black text-white">{opponentGeneral.name}</h3>
            <p className="text-xs text-zinc-400 font-medium mb-3">{opponentGeneral.title}</p>

            <div className="w-full h-[200px] bg-black/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative">
              <General3DCanvas general={opponentGeneral} reaction={botReaction} height="200px" />
              {isBotThinking && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-amber-300 animate-pulse">
                  Đang tính nước cờ...
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
            <div className="h-32 overflow-y-auto space-y-1 text-xs font-mono pr-1">
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
