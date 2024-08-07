import { Piece, PieceType, Player } from '../types';

export const BOARD_SIZE = 11;

export function initializeBoard(): Piece[][] {
    const board: Piece[][] = Array(BOARD_SIZE).fill(null).map(() =>
        Array(BOARD_SIZE).fill({ type: PieceType.Empty, player: 0 as Player })
    );

    // Set up Player 1's pieces
    board[0][5] = { type: PieceType.Commander, player: 1 };
    board[1][4] = { type: PieceType.Scout, player: 1 };
    board[1][5] = { type: PieceType.Scout, player: 1 };
    board[1][6] = { type: PieceType.Scout, player: 1 };
    board[2][3] = { type: PieceType.Soldier, player: 1 };
    board[2][4] = { type: PieceType.Soldier, player: 1 };
    board[2][5] = { type: PieceType.Soldier, player: 1 };
    board[2][6] = { type: PieceType.Soldier, player: 1 };
    board[3][3] = { type: PieceType.Engineer, player: 1 };
    board[3][4] = { type: PieceType.Engineer, player: 1 };
    board[3][5] = { type: PieceType.Engineer, player: 1 };
    board[3][6] = { type: PieceType.Engineer, player: 1 };

    // Set up Player 2's pieces
    board[10][5] = { type: PieceType.Commander, player: 2 };
    board[9][4] = { type: PieceType.Scout, player: 2 };
    board[9][5] = { type: PieceType.Scout, player: 2 };
    board[9][6] = { type: PieceType.Scout, player: 2 };
    board[8][4] = { type: PieceType.Soldier, player: 2 };
    board[8][5] = { type: PieceType.Soldier, player: 2 };
    board[8][6] = { type: PieceType.Soldier, player: 2 };
    board[8][7] = { type: PieceType.Soldier, player: 2 };
    board[7][4] = { type: PieceType.Engineer, player: 2 };
    board[7][5] = { type: PieceType.Engineer, player: 2 };
    board[7][6] = { type: PieceType.Engineer, player: 2 };
    board[7][7] = { type: PieceType.Engineer, player: 2 };

    return board;
}

export function isValidHex(row: number, col: number): boolean {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

export function getAdjacentHexes(row: number, col: number): [number, number][] {
    const directions = [
        [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]
    ];
    return directions
        .map(([dr, dc]) => [row + dr, col + dc] as [number, number])
        .filter(([r, c]) => isValidHex(r, c));
}