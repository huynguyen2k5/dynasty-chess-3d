'use client';

import React, { useState } from 'react';
import { Piece, PieceColor, PieceType } from '@/types';
import { getLegalMoves, executeMove } from '@/lib/xiangqiEngine';

interface XiangqiBoardProps {
  board: (Piece | null)[][];
  turn: PieceColor;
  onMove: (fromX: number, fromY: number, toX: number, toY: number) => void;
  disabled?: boolean;
  lastMove?: { from: [number, number]; to: [number, number] };
}

// Chinese characters for Xiangqi pieces
const PIECE_LABELS: Record<PieceColor, Record<PieceType, string>> = {
  red: {
    king: '帥',
    advisor: '仕',
    elephant: '相',
    horse: '傌',
    chariot: '俥',
    cannon: '炮',
    soldier: '兵',
  },
  black: {
    king: '將',
    advisor: '士',
    elephant: '象',
    horse: '馬',
    chariot: '車',
    cannon: '砲',
    soldier: '卒',
  },
};

export default function XiangqiBoard({
  board,
  turn,
  onMove,
  disabled = false,
  lastMove,
}: XiangqiBoardProps) {
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [validMoves, setValidMoves] = useState<[number, number][]>([]);

  // Sound effect using Web Audio API
  const playSound = (isCapture: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (isCapture) {
        osc.frequency.setValueAtTime(160, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.18);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.18);
      } else {
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      }
    } catch {
      // AudioContext unavailable
    }
  };

  const handleCellClick = (x: number, y: number) => {
    if (disabled) return;

    const clickedPiece = board[y][x];

    // If already selected a piece
    if (selected) {
      const [fromX, fromY] = selected;

      // Clicked on a valid target move
      const isValid = validMoves.some(([vx, vy]) => vx === x && vy === y);
      if (isValid) {
        const isCap = board[y][x] !== null;
        playSound(isCap);
        onMove(fromX, fromY, x, y);
        setSelected(null);
        setValidMoves([]);
        return;
      }

      // If clicked on own piece of same turn, switch selection
      if (clickedPiece && clickedPiece.color === turn) {
        setSelected([x, y]);
        setValidMoves(getLegalMoves(board, x, y));
        return;
      }

      // Otherwise cancel selection
      setSelected(null);
      setValidMoves([]);
      return;
    }

    // Select piece
    if (clickedPiece && clickedPiece.color === turn) {
      setSelected([x, y]);
      setValidMoves(getLegalMoves(board, x, y));
    }
  };

  return (
    <div className="relative mx-auto flex flex-col items-center select-none">
      {/* Board Outer Wooden Frame */}
      <div className="relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#4a2711] via-[#2c1507] to-[#1a0a03] shadow-2xl border-4 border-[#b45309] shadow-black/80">
        {/* SVG Board Grid & Lines */}
        <div className="relative w-[340px] h-[380px] sm:w-[480px] sm:h-[534px] bg-[#d79f64] rounded-lg border-2 border-[#5c2b08] shadow-inner">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 450 500">
            {/* Outer Margin Rect */}
            <rect x="25" y="25" width="400" height="450" fill="none" stroke="#5c2b08" strokeWidth="2.5" />

            {/* Horizontal Lines (10 lines) */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="25"
                y1={25 + i * 50}
                x2="425"
                y2={25 + i * 50}
                stroke="#5c2b08"
                strokeWidth="1.5"
              />
            ))}

            {/* Vertical Lines (9 lines) */}
            {/* Top half (y = 0 to 4) */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`vt-${i}`}
                x1={25 + i * 50}
                y1="25"
                x2={25 + i * 50}
                y2="225"
                stroke="#5c2b08"
                strokeWidth="1.5"
              />
            ))}

            {/* Bottom half (y = 5 to 9) */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`vb-${i}`}
                x1={25 + i * 50}
                y1="275"
                x2={25 + i * 50}
                y2="475"
                stroke="#5c2b08"
                strokeWidth="1.5"
              />
            ))}

            {/* River Borders (Outer borders across river) */}
            <line x1="25" y1="225" x2="25" y2="275" stroke="#5c2b08" strokeWidth="1.5" />
            <line x1="425" y1="225" x2="425" y2="275" stroke="#5c2b08" strokeWidth="1.5" />

            {/* Top Palace Diagonals (Black) */}
            <line x1="175" y1="25" x2="275" y2="125" stroke="#5c2b08" strokeWidth="1.5" />
            <line x1="275" y1="25" x2="175" y2="125" stroke="#5c2b08" strokeWidth="1.5" />

            {/* Bottom Palace Diagonals (Red) */}
            <line x1="175" y1="375" x2="275" y2="475" stroke="#5c2b08" strokeWidth="1.5" />
            <line x1="275" y1="375" x2="175" y2="475" stroke="#5c2b08" strokeWidth="1.5" />

            {/* River Text: SỞ HÀ - HÁN GIỚI */}
            <text x="110" y="258" fontSize="22" fontFamily="serif" fontWeight="bold" fill="#78350f" textAnchor="middle">
              楚 河
            </text>
            <text x="340" y="258" fontSize="22" fontFamily="serif" fontWeight="bold" fill="#78350f" textAnchor="middle">
              漢 界
            </text>
          </svg>

          {/* Interactive Cell Grid (10 rows x 9 columns) */}
          <div className="absolute inset-0 grid grid-rows-10 grid-cols-9 p-[14px] sm:p-[20px]">
            {Array.from({ length: 10 }).map((_, y) =>
              Array.from({ length: 9 }).map((_, x) => {
                const piece = board[y][x];
                const isSelected = selected && selected[0] === x && selected[1] === y;
                const isValidTarget = validMoves.some(([vx, vy]) => vx === x && vy === y);
                const isLastMoveFrom = lastMove && lastMove.from[0] === x && lastMove.from[1] === y;
                const isLastMoveTo = lastMove && lastMove.to[0] === x && lastMove.to[1] === y;

                return (
                  <div
                    key={`${x}-${y}`}
                    onClick={() => handleCellClick(x, y)}
                    className="relative flex items-center justify-center cursor-pointer transition-all duration-150"
                  >
                    {/* Last Move Indicator */}
                    {(isLastMoveFrom || isLastMoveTo) && (
                      <div className="absolute inset-1 rounded-full bg-amber-400/25 animate-pulse-slow pointer-events-none" />
                    )}

                    {/* Valid Move Indicator Dot / Ring */}
                    {isValidTarget && (
                      <div
                        className={`absolute z-20 rounded-full transition-transform ${
                          piece
                            ? 'inset-0.5 border-4 border-emerald-500 animate-pulse bg-emerald-500/20'
                            : 'w-4 h-4 bg-emerald-500/80 shadow-md shadow-emerald-500/50 scale-110'
                        }`}
                      />
                    )}

                    {/* Render Chess Piece */}
                    {piece && (
                      <div
                        className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                          isSelected
                            ? 'scale-110 -translate-y-1 shadow-2xl ring-4 ring-amber-400 ring-offset-2 ring-offset-black'
                            : 'hover:scale-105 shadow-md'
                        } ${
                          piece.color === 'red'
                            ? 'bg-gradient-to-b from-[#fef2f2] to-[#fee2e2] border-2 border-[#b91c1c] text-[#b91c1c] shadow-red-950/40'
                            : 'bg-gradient-to-b from-[#27272a] to-[#18181b] border-2 border-[#09090b] text-[#f4f4f5] shadow-black/80'
                        } w-7 h-7 sm:w-11 sm:h-11`}
                      >
                        {/* Piece Character */}
                        <span className="font-serif font-black text-sm sm:text-xl drop-shadow-sm leading-none">
                          {PIECE_LABELS[piece.color][piece.type]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
