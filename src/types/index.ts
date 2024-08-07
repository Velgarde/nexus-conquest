export type Player = 1 | 2;

export enum PieceType {
    Empty = 0,
    Commander = 1,
    Scout = 2,
    Soldier = 3,
    Engineer = 4,
}

export interface Piece {
    type: PieceType;
    player: Player;
}

export interface GameState {
    board: Piece[][];
    currentPlayer: Player;
    round: number;
    selectedPiece: [number, number] | null;
    controlPoints: [number, number];
    barriers: [number, number][];
}

export interface Move {
    from: [number, number];
    to: [number, number];
}