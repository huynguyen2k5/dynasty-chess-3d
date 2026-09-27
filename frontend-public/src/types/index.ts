export type Faction = 'shu' | 'wei' | 'wu' | 'neutral';
export type Rarity = 'mythic' | 'legendary' | 'epic' | 'rare';

export interface General {
  id: string;
  name: string;
  title: string;
  faction: Faction;
  rarity: Rarity;
  weapon: string;
  avatarColor: string;
  accentColor: string;
  stats: {
    tactics: number;   // Mưu Lược (0-100)
    aggression: number;// Sát Khí (0-100)
    command: number;   // Thống Soái (0-100)
    defense: number;   // Thủ Thế (0-100)
  };
  voiceLines: {
    greeting: string;
    check: string;
    capture: string;
    victory: string;
    defeat: string;
    taunt: string;
  };
  priceGold: number;
  priceSilver: number;
  description: string;
  unlockedByDefault?: boolean;
  specialTactic?: string;
  tacticDesc?: string;
  portrait?: string;
  isUpcoming?: boolean;
  releaseSeason?: string;
}

export type PieceType = 'king' | 'advisor' | 'elephant' | 'horse' | 'chariot' | 'cannon' | 'soldier';
export type PieceColor = 'red' | 'black';

export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  x: number; // 0 to 8
  y: number; // 0 to 9
}

export interface Move {
  from: [number, number];
  to: [number, number];
  piece: Piece;
  captured?: Piece;
  notation: string;
}

export interface BoardState {
  board: (Piece | null)[][]; // 10 rows x 9 columns
  turn: PieceColor;
  moves: Move[];
  selected: [number, number] | null;
  validMoves: [number, number][];
  isCheck: boolean;
  isCheckmate: boolean;
  winner: PieceColor | null;
  capturedRed: Piece[];
  capturedBlack: Piece[];
}

export type ShopCategory = 'generals' | 'boards' | 'pieces';

export interface ShopItem {
  id: string;
  category: ShopCategory;
  name: string;
  rarity: Rarity;
  priceGold: number;
  priceSilver: number;
  description: string;
  imageTheme: string;
  badge?: string;
  relatedGeneralId?: string;
}
