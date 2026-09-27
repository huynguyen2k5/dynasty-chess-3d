import { Piece, PieceColor, PieceType, Move } from '@/types';

export function createInitialBoard(): (Piece | null)[][] {
  const board: (Piece | null)[][] = Array(10).fill(null).map(() => Array(9).fill(null));

  // Helper to place piece
  const place = (type: PieceType, color: PieceColor, x: number, y: number) => {
    board[y][x] = { id: `${color}_${type}_${x}_${y}`, type, color, x, y };
  };

  // Black pieces (y = 0..3)
  place('chariot', 'black', 0, 0);
  place('horse', 'black', 1, 0);
  place('elephant', 'black', 2, 0);
  place('advisor', 'black', 3, 0);
  place('king', 'black', 4, 0);
  place('advisor', 'black', 5, 0);
  place('elephant', 'black', 6, 0);
  place('horse', 'black', 7, 0);
  place('chariot', 'black', 8, 0);

  place('cannon', 'black', 1, 2);
  place('cannon', 'black', 7, 2);

  place('soldier', 'black', 0, 3);
  place('soldier', 'black', 2, 3);
  place('soldier', 'black', 4, 3);
  place('soldier', 'black', 6, 3);
  place('soldier', 'black', 8, 3);

  // Red pieces (y = 6..9)
  place('soldier', 'red', 0, 6);
  place('soldier', 'red', 2, 6);
  place('soldier', 'red', 4, 6);
  place('soldier', 'red', 6, 6);
  place('soldier', 'red', 8, 6);

  place('cannon', 'red', 1, 7);
  place('cannon', 'red', 7, 7);

  place('chariot', 'red', 0, 9);
  place('horse', 'red', 1, 9);
  place('elephant', 'red', 2, 9);
  place('advisor', 'red', 3, 9);
  place('king', 'red', 4, 9);
  place('advisor', 'red', 5, 9);
  place('elephant', 'red', 6, 9);
  place('horse', 'red', 7, 9);
  place('chariot', 'red', 8, 9);

  return board;
}

export function cloneBoard(board: (Piece | null)[][]): (Piece | null)[][] {
  return board.map(row => row.map(cell => cell ? { ...cell } : null));
}

export function findKing(board: (Piece | null)[][], color: PieceColor): [number, number] | null {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const p = board[y][x];
      if (p && p.type === 'king' && p.color === color) {
        return [x, y];
      }
    }
  }
  return null;
}

// Check if kings face each other with no obstacle in between (Flying General)
export function isFlyingGeneral(board: (Piece | null)[][]): boolean {
  const redKing = findKing(board, 'red');
  const blackKing = findKing(board, 'black');
  if (!redKing || !blackKing) return false;

  if (redKing[0] === blackKing[0]) {
    const col = redKing[0];
    const minY = Math.min(redKing[1], blackKing[1]);
    const maxY = Math.max(redKing[1], blackKing[1]);
    let obstacles = 0;
    for (let y = minY + 1; y < maxY; y++) {
      if (board[y][col] !== null) obstacles++;
    }
    if (obstacles === 0) return true;
  }
  return false;
}

export function getRawPieceMoves(board: (Piece | null)[][], x: number, y: number): [number, number][] {
  const piece = board[y][x];
  if (!piece) return [];
  const moves: [number, number][] = [];
  const color = piece.color;
  const oppColor: PieceColor = color === 'red' ? 'black' : 'red';

  const inBounds = (nx: number, ny: number) => nx >= 0 && nx < 9 && ny >= 0 && ny < 10;
  const inPalace = (nx: number, ny: number, c: PieceColor) => {
    if (nx < 3 || nx > 5) return false;
    return c === 'red' ? (ny >= 7 && ny <= 9) : (ny >= 0 && ny <= 2);
  };

  switch (piece.type) {
    case 'king': {
      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (inPalace(nx, ny, color)) {
          const dest = board[ny][nx];
          if (!dest || dest.color === oppColor) {
            moves.push([nx, ny]);
          }
        }
      }
      break;
    }

    case 'advisor': {
      const diagDirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      for (const [dx, dy] of diagDirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (inPalace(nx, ny, color)) {
          const dest = board[ny][nx];
          if (!dest || dest.color === oppColor) {
            moves.push([nx, ny]);
          }
        }
      }
      break;
    }

    case 'elephant': {
      const eleDirs = [[2, 2], [2, -2], [-2, 2], [-2, -2]];
      for (const [dx, dy] of eleDirs) {
        const nx = x + dx;
        const ny = y + dy;
        // Cannot cross river
        const onSameSide = color === 'red' ? ny >= 5 : ny <= 4;
        if (inBounds(nx, ny) && onSameSide) {
          // Check eye (midpoint)
          const eyeX = x + dx / 2;
          const eyeY = y + dy / 2;
          if (board[eyeY][eyeX] === null) {
            const dest = board[ny][nx];
            if (!dest || dest.color === oppColor) {
              moves.push([nx, ny]);
            }
          }
        }
      }
      break;
    }

    case 'horse': {
      const horseMoves: [number, number, number, number][] = [
        // [dx, dy, blockX, blockY]
        [1, 2, 0, 1],
        [-1, 2, 0, 1],
        [1, -2, 0, -1],
        [-1, -2, 0, -1],
        [2, 1, 1, 0],
        [2, -1, 1, 0],
        [-2, 1, -1, 0],
        [-2, -1, -1, 0],
      ];
      for (const [dx, dy, bx, by] of horseMoves) {
        const nx = x + dx;
        const ny = y + dy;
        const legX = x + bx;
        const legY = y + by;
        if (inBounds(nx, ny) && inBounds(legX, legY)) {
          if (board[legY][legX] === null) {
            const dest = board[ny][nx];
            if (!dest || dest.color === oppColor) {
              moves.push([nx, ny]);
            }
          }
        }
      }
      break;
    }

    case 'chariot': {
      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dx, dy] of dirs) {
        let step = 1;
        while (true) {
          const nx = x + dx * step;
          const ny = y + dy * step;
          if (!inBounds(nx, ny)) break;
          const dest = board[ny][nx];
          if (!dest) {
            moves.push([nx, ny]);
          } else {
            if (dest.color === oppColor) {
              moves.push([nx, ny]);
            }
            break;
          }
          step++;
        }
      }
      break;
    }

    case 'cannon': {
      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dx, dy] of dirs) {
        let step = 1;
        let screenFound = false;
        while (true) {
          const nx = x + dx * step;
          const ny = y + dy * step;
          if (!inBounds(nx, ny)) break;
          const dest = board[ny][nx];

          if (!screenFound) {
            if (!dest) {
              moves.push([nx, ny]); // Move without jumping
            } else {
              screenFound = true; // Found screen/ngoi
            }
          } else {
            if (dest) {
              if (dest.color === oppColor) {
                moves.push([nx, ny]); // Capture over screen
              }
              break;
            }
          }
          step++;
        }
      }
      break;
    }

    case 'soldier': {
      const forwardY = color === 'red' ? -1 : 1;
      const crossedRiver = color === 'red' ? y <= 4 : y >= 5;

      // Always move forward
      const forwardNx = x;
      const forwardNy = y + forwardY;
      if (inBounds(forwardNx, forwardNy)) {
        const dest = board[forwardNy][forwardNx];
        if (!dest || dest.color === oppColor) {
          moves.push([forwardNx, forwardNy]);
        }
      }

      // If crossed river, can also move left and right
      if (crossedRiver) {
        for (const dx of [-1, 1]) {
          const nx = x + dx;
          const ny = y;
          if (inBounds(nx, ny)) {
            const dest = board[ny][nx];
            if (!dest || dest.color === oppColor) {
              moves.push([nx, ny]);
            }
          }
        }
      }
      break;
    }
  }

  return moves;
}

// Check if a color is in check
export function isPositionInCheck(board: (Piece | null)[][], color: PieceColor): boolean {
  if (isFlyingGeneral(board)) return true;
  const kingPos = findKing(board, color);
  if (!kingPos) return true; // King dead

  const oppColor: PieceColor = color === 'red' ? 'black' : 'red';

  // Check if any opponent piece can attack kingPos
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const p = board[y][x];
      if (p && p.color === oppColor) {
        const rawMoves = getRawPieceMoves(board, x, y);
        if (rawMoves.some(([mx, my]) => mx === kingPos[0] && my === kingPos[1])) {
          return true;
        }
      }
    }
  }
  return false;
}

// Get legal moves (filters out any moves leaving king in check)
export function getLegalMoves(board: (Piece | null)[][], x: number, y: number): [number, number][] {
  const piece = board[y][x];
  if (!piece) return [];
  const rawMoves = getRawPieceMoves(board, x, y);
  const legal: [number, number][] = [];

  for (const [toX, toY] of rawMoves) {
    const nextBoard = cloneBoard(board);
    nextBoard[toY][toX] = { ...piece, x: toX, y: toY };
    nextBoard[y][x] = null;

    if (!isPositionInCheck(nextBoard, piece.color)) {
      legal.push([toX, toY]);
    }
  }

  return legal;
}

// Check if player has any legal moves
export function hasAnyLegalMoves(board: (Piece | null)[][], color: PieceColor): boolean {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const p = board[y][x];
      if (p && p.color === color) {
        const moves = getLegalMoves(board, x, y);
        if (moves.length > 0) return true;
      }
    }
  }
  return false;
}

// Execute a move and return new state info
export function executeMove(
  board: (Piece | null)[][],
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): {
  newBoard: (Piece | null)[][];
  move: Move;
  isCheck: boolean;
  isCheckmate: boolean;
} {
  const piece = board[fromY][fromX]!;
  const captured = board[toY][toX] || undefined;
  const newBoard = cloneBoard(board);

  newBoard[toY][toX] = { ...piece, x: toX, y: toY };
  newBoard[fromY][fromX] = null;

  const nextColor: PieceColor = piece.color === 'red' ? 'black' : 'red';
  const isCheck = isPositionInCheck(newBoard, nextColor);
  const hasMoves = hasAnyLegalMoves(newBoard, nextColor);
  const isCheckmate = isCheck && !hasMoves;

  // Chinese Chess notation (simplified)
  const pieceNames: Record<PieceType, string> = {
    king: piece.color === 'red' ? 'Tướng' : 'Tướng',
    advisor: 'Sĩ',
    elephant: 'Tượng',
    horse: 'Mã',
    chariot: 'Xe',
    cannon: 'Pháo',
    soldier: piece.color === 'red' ? 'Binh' : 'Tốt'
  };

  const notation = `${pieceNames[piece.type]} (${fromX + 1},${10 - fromY}) -> (${toX + 1},${10 - toY})${captured ? ' [Ăn]' : ''}${isCheck ? ' [Chiếu]' : ''}`;

  const move: Move = {
    from: [fromX, fromY],
    to: [toX, toY],
    piece,
    captured,
    notation
  };

  return { newBoard, move, isCheck, isCheckmate };
}

// AI Bot Evaluation & MiniMax Engine
const PIECE_VALUES: Record<PieceType, number> = {
  king: 10000,
  chariot: 900,
  cannon: 450,
  horse: 400,
  elephant: 200,
  advisor: 200,
  soldier: 100
};

export function evaluateBoard(board: (Piece | null)[][]): number {
  let score = 0;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const p = board[y][x];
      if (!p) continue;
      let val = PIECE_VALUES[p.type];

      // Bonus for crossed soldier
      if (p.type === 'soldier') {
        const crossed = p.color === 'red' ? y <= 4 : y >= 5;
        if (crossed) val += 80;
      }
      // Bonus for center control
      if (x >= 2 && x <= 6) val += 15;

      if (p.color === 'black') {
        score += val; // AI plays black by default
      } else {
        score -= val;
      }
    }
  }
  return score;
}

export function getBestBotMove(
  board: (Piece | null)[][],
  difficulty: 'easy' | 'medium' | 'hard' | 'master'
): { from: [number, number]; to: [number, number] } | null {
  const allMoves: { from: [number, number]; to: [number, number]; score: number }[] = [];

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 9; x++) {
      const p = board[y][x];
      if (p && p.color === 'black') {
        const legal = getLegalMoves(board, x, y);
        for (const [toX, toY] of legal) {
          const nextBoard = cloneBoard(board);
          nextBoard[toY][toX] = { ...p, x: toX, y: toY };
          nextBoard[y][x] = null;
          let moveScore = evaluateBoard(nextBoard);

          // Add bonus if capturing
          const target = board[toY][toX];
          if (target) {
            moveScore += PIECE_VALUES[target.type] * 1.5;
          }

          allMoves.push({ from: [x, y], to: [toX, toY], score: moveScore });
        }
      }
    }
  }

  if (allMoves.length === 0) return null;

  // Difficulty adjustment
  if (difficulty === 'easy') {
    // 40% random move
    if (Math.random() < 0.4) {
      const rnd = allMoves[Math.floor(Math.random() * allMoves.length)];
      return { from: rnd.from, to: rnd.to };
    }
  }

  // Sort descending (best for black)
  allMoves.sort((a, b) => b.score - a.score);

  if (difficulty === 'medium') {
    // Pick among top 3
    const top = allMoves.slice(0, Math.min(3, allMoves.length));
    return top[Math.floor(Math.random() * top.length)];
  }

  // Hard & Master: pick absolute best move
  return { from: allMoves[0].from, to: allMoves[0].to };
}
