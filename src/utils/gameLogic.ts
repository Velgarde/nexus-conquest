import { GameState, Move, PieceType, Player } from '../types';
import { BOARD_SIZE, getAdjacentHexes, isValidHex } from './boardUtils';

export function isValidMove(gameState: GameState, move: Move): boolean {
    const { board, currentPlayer, barriers } = gameState;
    const [fromRow, fromCol] = move.from;
    const [toRow, toCol] = move.to;

    if (!isValidHex(toRow, toCol)) return false;

    const piece = board[fromRow][fromCol];
    if (piece.player !== currentPlayer) return false;

    if (barriers.some(([r, c]) => r === toRow && c === toCol)) return false;

    const dx = Math.abs(toRow - fromRow);
    const dy = Math.abs(toCol - fromCol);
    const distance = Math.max(dx, dy);

    switch (piece.type) {
        case PieceType.Commander:
            return distance <= 1;
        case PieceType.Scout:
            return distance <= 3;
        case PieceType.Soldier:
            return distance <= 2;
        case PieceType.Engineer:
            return distance <= 1;
        default:
            return false;
    }
}

export function getValidMoves(gameState: GameState, selectedPiece: [number, number]): [number, number][] {
    const [row, col] = selectedPiece;
    const piece = gameState.board[row][col];

    const validMoves: [number, number][] = [];

    let maxDistance: number;
    switch (piece.type) {
        case PieceType.Commander:
            maxDistance = 1;
            break;
        case PieceType.Scout:
            maxDistance = 3;
            break;
        case PieceType.Soldier:
            maxDistance = 2;
            break;
        case PieceType.Engineer:
            maxDistance = 1;
            break;
        default:
            maxDistance = 0;
    }

    for (let r = Math.max(0, row - maxDistance); r <= Math.min(BOARD_SIZE - 1, row + maxDistance); r++) {
        for (let c = Math.max(0, col - maxDistance); c <= Math.min(BOARD_SIZE - 1, col + maxDistance); c++) {
            if (isValidMove(gameState, { from: [row, col], to: [r, c] })) {
                validMoves.push([r, c]);
            }
        }
    }

    return validMoves;
}

export function performMove(gameState: GameState, move: Move): GameState {
    const newBoard = gameState.board.map(row => [...row]);
    const [fromRow, fromCol] = move.from;
    const [toRow, toCol] = move.to;

    const movingPiece = newBoard[fromRow][fromCol];
    const targetPiece = newBoard[toRow][toCol];

    // Capture logic
    if (targetPiece.type !== PieceType.Empty && targetPiece.player !== movingPiece.player) {
        // Implement capture rules here
        if (movingPiece.type === PieceType.Commander && targetPiece.type === PieceType.Commander) {
            // Commander cannot capture Commander
            return gameState;
        }
    }

    newBoard[toRow][toCol] = movingPiece;
    newBoard[fromRow][fromCol] = { type: PieceType.Empty, player: 0 as Player };

    const newControlPoints = [...gameState.controlPoints] as [number, number];
    if (isNeutralZone(toRow)) {
        newControlPoints[gameState.currentPlayer - 1]++;
    }

    return {
        ...gameState,
        board: newBoard,
        selectedPiece: null,
        controlPoints: newControlPoints,
    };
}

export function isGameOver(gameState: GameState): Player | null {
    const { board, round, controlPoints } = gameState;

    // Check if a Commander is surrounded
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = board[row][col];
            if (piece.type === PieceType.Commander) {
                const adjacentHexes = getAdjacentHexes(row, col);
                if (adjacentHexes.every(([r, c]) => board[r][c].player !== piece.player)) {
                    return piece.player === 1 ? 2 : 1;
                }
            }
        }
    }

    // Check if the game has reached 15 rounds
    if (round >= 15) {
        return controlPoints[0] > controlPoints[1] ? 1 : 2;
    }

    return null;
}

function isNeutralZone(row: number): boolean {
    return row >= 4 && row <= 6;
}

export function canPlaceBarrier(gameState: GameState, hex: [number, number]): boolean {
    const [row, col] = hex;
    const { board, barriers } = gameState;

    if (!isValidHex(row, col)) return false;
    if (board[row][col].type !== PieceType.Empty) return false;
    if (barriers.length >= 6) return false;
    if (barriers.some(([r, c]) => r === row && c === col)) return false;

    return true;
}

export function placeBarrier(gameState: GameState, hex: [number, number]): GameState {
    if (!canPlaceBarrier(gameState, hex)) return gameState;

    return {
        ...gameState,
        barriers: [...gameState.barriers, hex],
    };
}

export function removeBarrier(gameState: GameState, hex: [number, number]): GameState {
    return {
        ...gameState,
        barriers: gameState.barriers.filter(([r, c]) => r !== hex[0] || c !== hex[1]),
    };
}