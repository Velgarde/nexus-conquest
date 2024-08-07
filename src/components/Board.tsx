import React from 'react';
import styled from 'styled-components';
import Hex from './Hex';
import { GameState } from '../types';

interface BoardProps {
    gameState: GameState;
    selectedPiece: [number, number] | null;
    validMoves: [number, number][];
    onHexClick: (row: number, col: number) => void;
    onPlaceBarrier: (row: number, col: number) => void;
    onRemoveBarrier: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({
                                         gameState,
                                         selectedPiece,
                                         validMoves,
                                         onHexClick,
                                         onPlaceBarrier,
                                         onRemoveBarrier,
                                     }) => {
    const { board, currentPlayer, barriers } = gameState;

    return (
        <BoardContainer currentPlayer={currentPlayer}>
            {board.map((row, rowIndex) => (
                <Row key={rowIndex} even={rowIndex % 2 === 0}>
                    {row.map((piece, colIndex) => (
                        <Hex
                            key={`${rowIndex}-${colIndex}`}
                            piece={piece}
                            row={rowIndex}
                            col={colIndex}
                            isSelected={selectedPiece?.[0] === rowIndex && selectedPiece?.[1] === colIndex}
                            isValidMove={validMoves.some(([r, c]) => r === rowIndex && c === colIndex)}
                            hasBarrier={barriers.some(([r, c]) => r === rowIndex && c === colIndex)}
                            isCurrentPlayerZone={
                                (currentPlayer === 1 && rowIndex <= 3) || (currentPlayer === 2 && rowIndex >= 7)
                            }
                            onClick={() => onHexClick(rowIndex, colIndex)}
                            onPlaceBarrier={() => onPlaceBarrier(rowIndex, colIndex)}
                            onRemoveBarrier={() => onRemoveBarrier(rowIndex, colIndex)}
                        />
                    ))}
                </Row>
            ))}
        </BoardContainer>
    );
};

const BoardContainer = styled.div<{ currentPlayer: number }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: ${props => (props.currentPlayer === 1 ? '#3498db' : '#e74c3c')};
        box-shadow: 0 0 10px ${props => (props.currentPlayer === 1 ? '#3498db' : '#e74c3c')};
        animation: glow 1.5s ease-in-out infinite alternate;
    }

    @keyframes glow {
        from {
            opacity: 0.5;
        }
        to {
            opacity: 1;
        }
    }
`;

const Row = styled.div<{ even: boolean }>`
    display: flex;
    margin-top: -14px;
    margin-left: ${props => (props.even ? '0' : '26px')};

    &:first-child {
        margin-top: 0;
    }
`;

export default Board;